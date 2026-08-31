import { articles } from './data/articles.js';
import { marked } from 'marked';

export const initChatbot = (router) => {
  // Check if already injected
  if (document.getElementById('qlip-chatbot-container')) return;

  // Create UI
  const container = document.createElement('div');
  container.id = 'qlip-chatbot-container';
  container.innerHTML = `
    <button id="chatbot-toggle" class="magnetic" aria-label="Open AI Assistant">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
      </svg>
    </button>
    <div id="chatbot-window" class="hidden">
      <div class="chatbot-header">
        <div class="chatbot-title">
          <span>TheQlipAI Agent</span>
          <div class="online-indicator"></div>
        </div>
        <button id="chatbot-close">&times;</button>
      </div>
      <div id="chatbot-messages" data-lenis-prevent="true">
        <div class="message ai-message">Initialize sequence complete. How can I assist you with The Qlip's engineering services today?</div>
      </div>
      <form id="chatbot-form">
        <input type="text" id="chatbot-input" placeholder="Message TheQlipAI Agent..." autocomplete="off" />
        <button type="submit" id="chatbot-send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(container);

  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close');
  const chatWindow = document.getElementById('chatbot-window');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');

  let isProcessing = false;
  let messageHistory = [];

  const toggleChat = () => {
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
      chatInput.focus();
    }
  };

  toggleBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!chatWindow.classList.contains('hidden')) {
      if (!chatWindow.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleChat();
      }
    }
  });

  const addMessage = (text, sender) => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    if (sender === 'ai') {
      msgDiv.innerHTML = marked.parse(text);
    } else {
      msgDiv.textContent = text;
    }
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // Build Context (RAG)
  const getContext = () => {
    let ctx = 'Here are our latest insights and case studies:\\n';
    articles.forEach(a => {
      ctx += `- ${a.title} (${a.category}): ${a.excerpt}\\n`;
    });
    return ctx;
  };

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query || isProcessing) return;

    // Add user message
    addMessage(query, 'user');
    chatInput.value = '';
    isProcessing = true;
    
    // Add to history
    messageHistory.push({ role: 'user', content: query });

    // Show loading
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'ai-message', 'loading');
    loadingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: messageHistory,
          context: getContext()
        })
      });

      const data = await response.json();
      
      // Remove loading
      messagesContainer.removeChild(loadingDiv);

      if (response.ok && data.choices && data.choices.length > 0) {
        const msg = data.choices[0].message;
        
        // Show text if it exists
        if (msg.content) {
          let displayContent = msg.content;
          let navigated = false;

          // Format 1: XML-style tool calls (<navigate_to page="...">)
          const xmlRegex = /<navigate_to[\s\S]*?page=["']([^"']+)["'][\s\S]*?(?:><\/navigate_to>|\/>)/gi;
          let match;
          while ((match = xmlRegex.exec(displayContent)) !== null) {
            const page = match[1];
            if (router && page && !navigated) {
              addMessage(`Navigating you to ${page}...`, 'ai');
              router.navigate(page);
              navigated = true;
            }
          }
          // Strip Format 1
          displayContent = displayContent.replace(/<navigate_to[\s\S]*?(?:><\/navigate_to>|\/>)/gi, '').trim();

          // Format 2: Llama-specific function tags (<function=navigate_to>...</function>)
          // Make the closing tag optional in case the LLM stops generating or it gets cut off
          const funcRegex = /<function=navigate_to>\s*(\{[\s\S]*?\})\s*(?:<\/function>|$)/gi;
          while ((match = funcRegex.exec(displayContent)) !== null) {
            try {
              const args = JSON.parse(match[1].trim());
              if (router && args.page && !navigated) {
                addMessage(`Navigating you to ${args.page}...`, 'ai');
                router.navigate(args.page);
                navigated = true;
              }
            } catch (e) {
              console.error("Failed to parse tool call JSON", e);
            }
          }
          // Strip Format 2 (including if it didn't close)
          displayContent = displayContent.replace(/<function=navigate_to>\s*\{[\s\S]*?\}\s*(?:<\/function>|$)/gi, '').trim();

          if (displayContent) {
            addMessage(displayContent, 'ai');
          }
          
          // Push original content to history
          messageHistory.push({ role: 'assistant', content: msg.content });
        }

        // Handle Tool Calls (Agentic UI)
        if (msg.tool_calls && msg.tool_calls.length > 0) {
          const tool = msg.tool_calls[0];
          if (tool.function.name === 'navigate_to') {
            const args = JSON.parse(tool.function.arguments);
            if (router && args.page) {
              addMessage(`Navigating you to ${args.page}...`, 'ai');
              router.navigate(args.page);
              messageHistory.push({ role: 'assistant', content: `(I used a tool to navigate the user to ${args.page})` });
            }
          }
        }
      } else {
        const errorMsg = data.error?.message || data.error || "Unable to reach core logic.";
        addMessage(`System Error: ${typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg)}`, 'ai');
        console.error("Chat Error:", data);
      }

    } catch (err) {
      if (messagesContainer.contains(loadingDiv)) {
         messagesContainer.removeChild(loadingDiv);
      }
      addMessage("Connection timeout. The matrix is overloaded.", 'ai');
      console.error(err);
    } finally {
      isProcessing = false;
    }
  });
};
