// Floating Chat Button
class ChatFloat {
  constructor() {
    this.init();
  }

  init() {
    this.createButton();
  }

  createButton() {
    const btn = document.createElement('div');
    btn.className = 'chat-float-btn';
    btn.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #34c759, #30d158);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(52, 199, 89, 0.4);
      z-index: 999;
      transition: transform 0.3s, box-shadow 0.3s;
      font-size: 28px;
    `;
    btn.innerHTML = '💬';

    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.1)';
      btn.style.boxShadow = '0 6px 30px rgba(52, 199, 89, 0.5)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 20px rgba(52, 199, 89, 0.4)';
    });

    btn.addEventListener('click', () => {
      this.openChat();
    });

    document.body.appendChild(btn);
  }

  openChat() {
    // Check if chat modal already exists
    let chatModal = document.querySelector('.chat-modal');
    if (chatModal) {
      chatModal.remove();
      return;
    }

    chatModal = document.createElement('div');
    chatModal.className = 'chat-modal';
    chatModal.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 360px;
      height: 500px;
      background: var(--bg-primary);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      z-index: 998;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid var(--border);
    `;

    chatModal.innerHTML = `
      <div style="padding: 20px; background: linear-gradient(135deg, #34c759, #30d158); color: white;">
        <div style="font-weight: 600; font-size: 18px;">在线客服</div>
        <div style="font-size: 14px; opacity: 0.9; margin-top: 4px;">我们通常几分钟内回复</div>
      </div>
      <div style="flex: 1; padding: 20px; overflow-y: auto;">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="align-self: flex-start; max-width: 80%; padding: 12px 16px; background: var(--bg-secondary); border-radius: 16px 16px 16px 4px; font-size: 14px; line-height: 1.6;">
            您好！欢迎来到CCCNC。有什么可以帮助您的吗？
          </div>
        </div>
      </div>
      <div style="padding: 16px; border-top: 1px solid var(--border); display: flex; gap: 8px;">
        <input type="text" placeholder="输入消息..." style="flex: 1; padding: 12px; border: 2px solid var(--border); border-radius: 24px; background: var(--bg-primary); font-size: 14px; outline: none;">
        <button style="width: 44px; height: 44px; background: #34c759; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; color: white;">➤</button>
      </div>
    `;

    document.body.appendChild(chatModal);

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!chatModal.contains(e.target) && !e.target.closest('.chat-float-btn')) {
        chatModal.remove();
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ChatFloat();
});
