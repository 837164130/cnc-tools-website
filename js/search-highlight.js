// Search Highlight
class SearchHighlight {
  constructor() {
    this.init();
  }

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
      this.highlight(query);
    }
  }

  highlight(query) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const nodes = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.parentElement.tagName !== 'SCRIPT' && 
          node.parentElement.tagName !== 'STYLE' &&
          node.textContent.toLowerCase().includes(query.toLowerCase())) {
        nodes.push(node);
      }
    }

    nodes.forEach(node => {
      const span = document.createElement('span');
      span.innerHTML = node.textContent.replace(
        new RegExp(`(${this.escapeRegex(query)})`, 'gi'),
        '<mark style="background: #ffeb3b; padding: 2px 4px; border-radius: 4px;">$1</mark>'
      );
      node.parentNode.replaceChild(span, node);
    });
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SearchHighlight();
});
