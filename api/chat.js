export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawKey = process.env.GROQ_API_KEY;
  const apiKey = rawKey ? rawKey.replace(/^['"]|['"]$/g, '') : null;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY environment variable is missing.' });
  }

  try {
    const { messages, context } = req.body || {};

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
    
    if (!response.ok) {
      console.error('Groq API Error:', data);
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Serverless Function Error:', error);
    res.status(500).json({ error: 'Internal server error while communicating with Groq.' });
  }
}
