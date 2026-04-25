// Product Live Chat
class LiveChat {
  constructor() {
    this.init();
  }

  init() {
    this.displayLiveChat();
  }

  displayLiveChat() {
    const container = document.querySelector('[data-live-chat]');
    if (!container) return;

    const config = JSON.parse(container.dataset.liveChat || '{}');

    container.innerHTML = `
      <div style="
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1000;
      ">
        <button class="chat-toggle" style="
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0071e3 0%, #5856d6 100%);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 24px;
          box-shadow: 0 4px 16px rgba(0,113,227,0.4);
          transition: transform 0.2s;
        ">💬</button>
        
        <div class="chat-window" style="
          display: none;
          position: absolute;
          bottom: 72px;
          right: 0;
          width: 360px;
          height: 480px;
          background: var(--bg-primary);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          overflow: hidden;
          flex-direction: column;
        ">
          <div style="
            padding: 16px;
            background: linear-gradient(135deg, #0071e3 0%, #5856d6 100%);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
          ">
            <div>
              <div style="font-weight: 600;">${config.title || '在线客服'}</div>
              <div style="font-size: 12px; opacity: 0.8;">● 在线</div>
            </div>
            <button class="chat-close" style="
              background: none;
              border: none;
              color: white;
              cursor: pointer;
              font-size: 20px;
            ">✕</button>
          </div>
          
          <div class="chat-messages" style="
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
          ">
            <div style="
              align-self: flex-start;
              max-width: 80%;
              padding: 12px;
              background: var(--bg-tertiary);
              border-radius: 12px 12px 12px 4px;
              font-size: 14px;
            ">
              您好！我是智能客服助手，有什么可以帮助您的吗？
            </div>
          </div>
          
          <div style="
            padding: 12px;
            border-top: 1px solid var(--border);
            display: flex;
            gap: 8px;
          ">
            <input type="text" class="chat-input" placeholder="输入消息..." style="
              flex: 1;
              padding: 10px;
              border: 1px solid var(--border);
              border-radius: 20px;
              font-size: 14px;
              background: var(--bg-secondary);
              color: var(--text-primary);
            ">
            <button class="chat-send" style="
              padding: 10px 16px;
              background: #0071e3;
              color: white;
              border: none;
              border-radius: 20px;
              cursor: pointer;
              font-size: 14px;
            ">发送</button>
          </div>
        </div>
      </div>
    `;

    const toggle = container.querySelector('.chat-toggle');
    const window = container.querySelector('.chat-window');
    const close = container.querySelector('.chat-close');
    const input = container.querySelector('.chat-input');
    const send = container.querySelector('.chat-send');
    const messages = container.querySelector('.chat-messages');

    if (toggle && window) {
      toggle.addEventListener('click', () => {
        window.style.display = window.style.display === 'flex' ? 'none' : 'flex';
      });
    }

    if (close && window) {
      close.addEventListener('click', () => {
        window.style.display = 'none';
      });
    }

    const sendMessage = () => {
      const text = input.value.trim();
      if (!text) return;

      // User message
      const userMsg = document.createElement('div');
      userMsg.style.cssText = `
        align-self: flex-end;
        max-width: 80%;
        padding: 12px;
        background: #0071e3;
        color: white;
        border-radius: 12px 12px 4px 12px;
        font-size: 14px;
      `;
      userMsg.textContent = text;
      messages.appendChild(userMsg);

      input.value = '';
      messages.scrollTop = messages.scrollHeight;

      // Simulate response
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.style.cssText = `
          align-self: flex-start;
          max-width: 80%;
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: 12px 12px 12px 4px;
          font-size: 14px;
        `;
        botMsg.textContent = '感谢您的留言，客服人员会尽快回复您。';
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 1000);
    };

    if (send) {
      send.addEventListener('click', sendMessage);
    }

    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LiveChat();
});
