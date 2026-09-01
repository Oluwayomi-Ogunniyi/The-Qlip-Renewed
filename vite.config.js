import { defineConfig } from 'vite';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',   // ← (important for GitHub Pages)

    build: {
      chunkSizeWarningLimit: 700, // three.js vendor chunk is intentionally large
      rollupOptions: {
        output: {
          // Split vendor libraries into cacheable chunks (better TTFB + long-term caching)
          manualChunks(id) {
            if (id.includes('node_modules/three/')) return 'three';
            if (id.includes('node_modules/gsap/') || id.includes('node_modules/lenis/')) return 'animations';
            if (id.includes('node_modules/marked/')) return 'markdown';
          },
        },
      },
    },
    plugins: [
      {
        name: 'configure-server',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            const rawKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
            const apiKey = rawKey ? rawKey.replace(/^['"]|['"]$/g, '') : null;
            
            if (!apiKey) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'GROQ_API_KEY environment variable is missing in .env file.' }));
              return;
            }

            // Read the POST body
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });

            req.on('end', async () => {
              try {
                const { messages, context } = JSON.parse(body);

                let systemPrompt = 'You are TheQlipAI Agent, the intelligent assistant for The Qlip (a deep-tech engineering and AI agency). Be concise, highly professional, and lean into a confident, no-nonsense engineering persona. Do NOT use flowery AI buzzwords like "revolutionize", "delve", "embark", or "leverage". Speak like a highly competent software engineer. Keep answers brief unless asked for detail. You specialize in answering questions about software engineering, system testing, multimedia, cybersecurity, ML & robotics, and training. STRICT RULES: 1) NEVER provide pricing details or cost estimates; route them to our WhatsApp line (+2347087342882) or Email (theqlipglobal@gmail.com). 2) If asked "what services do you offer", LIST them out in text! DO NOT navigate for a general services question. 3) Proactively navigate the user ONLY when they ask about a SPECIFIC service or portfolio. 4) To navigate the user, you MUST append an XML tag at the very end of your conversational text reply, exactly like this: <navigate_to page="/path" />. 5) ALWAYS provide a conversational text reply explaining what you are doing BEFORE the XML tag. 6) ONLY use valid routes. There is NO "/services" route. Valid routes: "/", "/work", "/about", "/insights", "/services/software-engineering", "/services/testing-support", "/services/multimedia", "/services/cybersecurity", "/services/machine-learning", "/services/training-consultancy"';
                
                if (context) {
                   systemPrompt += '\\n\\nHere is some dynamic context about our recent insights and articles:\\n' + context;
                }

                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    model: 'openai/gpt-oss-120b',
                    messages: [
                      { role: 'system', content: systemPrompt },
                      ...messages
                    ]
                  })
                });

                const data = await response.json();
                
                res.setHeader('Content-Type', 'application/json');
                if (!response.ok) {
                  res.statusCode = response.status;
                  res.end(JSON.stringify(data));
                  return;
                }

                res.statusCode = 200;
                res.end(JSON.stringify(data));
              } catch (error) {
                console.error('Local Dev Server Error:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal server error while communicating with Groq.' }));
              }
            });
          });
        }
      }
    ]
  };
});