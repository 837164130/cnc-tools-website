// Live Chat Widget
class LiveChat {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createWidget();
    this.attachEventListeners();
  }

  createWidget() {
    const widget = document.createElement('div');
    widget.id = 'live-chat-widget';
    widget.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
    `;

    widget.innerHTML = `
      <div class="chat-window" style="
        display: none;
        width: 360px;
        height: 500px;
        background: var(--bg-primary);
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        overflow: hidden;
        flex-direction: column;
        margin-bottom: 16px;
      ">
        <div style="
          padding: 16px 20px;
          background: #0071e3;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <div>
            <div style="font-weight: 600;">在线客服</div>
            <div style="font-size: 12px; opacity: 0.9;">通常几分钟内回复</div>
          </div>
          <button class="close-chat" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">✕</button>
        </div>
        
        <div class="chat-messages" style="
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        ">
          <div style="
            align-self: flex-start;
            max-width: 80%;
            padding: 12px 16px;
            background: var(--bg-secondary);
            border-radius: 16px 16px 16px 4px;
            font-size: 14px;
            line-height: 1.5;
          ">
            您好！欢迎来到 CCCNC 数控刀具商城。有什么可以帮助您的吗？
          </div>
        </div>
        
        <div style="
          padding: 16px;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 12px;
        ">
          <input type="text" class="chat-input" placeholder="输入消息..." style="
            flex: 1;
            padding: 12px;
            border: 1px solid var(--border);
            border-radius: 24px;
            outline: none;
            font-size: 14px;
          ">
          <button class="send-message" style="
            width: 40px;
            height: 40px;
            background: #0071e3;
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          ">➤</button>
        </div>
      </div>
      
      <button class="chat-toggle" style="
        width: 56px;
        height: 56px;
        background: #0071e3;
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(0,113,227,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
      ">💬</button>
    `;

    document.body.appendChild(widget);
    this.widget = widget;
  }

  attachEventListeners() {
    const toggle = this.widget.querySelector('.chat-toggle');
    const close = this.widget.querySelector('.close-chat');
    const window = this.widget.querySelector('.chat-window');
    const input = this.widget.querySelector('.chat-input');
    const send = this.widget.querySelector('.send-message');
    const messages = this.widget.querySelector('.chat-messages');

    toggle.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      window.style.display = this.isOpen ? 'flex' : 'none';
      toggle.style.transform = this.isOpen ? 'rotate(90deg)' : '';
      toggle.innerHTML = this.isOpen ? '✕' : '💬';
    });

    close.addEventListener('click', () => {
      this.isOpen = false;
      window.style.display = 'none';
      toggle.style.transform = '';
      toggle.innerHTML = '💬';
    });

    const sendMessage = () => {
      const text = input.value.trim();
      if (!text) return;

      // User message
      const userMsg = document.createElement('div');
      userMsg.style.cssText = `
        align-self: flex-end;
        max-width: 80%;
        padding: 12px 16px;
        background: #0071e3;
        color: white;
        border-radius: 16px 16px 4px 16px;
        font-size: 14px;
        line-height: 1.5;
      `;
      userMsg.textContent = text;
      messages.appendChild(userMsg);

      input.value = '';
      messages.scrollTop = messages.scrollHeight;

      // Auto-reply simulation
      setTimeout(() => {
        const replies = [
          '感谢您的咨询！我们的客服人员会尽快为您解答。',
          '您可以在产品页面查看详细规格，或留下联系方式我们为您提供专业建议。',
          '我们支持批量采购，数量越多优惠越大，具体请联系我们的销售团队。',
          '所有产品均提供质量保证，如有问题请在7天内联系我们。'
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];

        const botMsg = document.createElement('div');
        botMsg.style.cssText = `
          align-self: flex-start;
          max-width: 80%;
          padding: 12px 16px;
          background: var(--bg-secondary);
          border-radius: 16px 16px 16px 4px;
          font-size: 14px;
          line-height: 1.5;
        `;
        botMsg.textContent = reply;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 1000);
    };

    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LiveChat();
});
