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