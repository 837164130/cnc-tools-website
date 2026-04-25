// Product Recommendation Engine
class RecommendationEngine {
  constructor() {
    this.init();
  }

  init() {
    this.displayRecommendations();
  }

  displayRecommendations() {
    const container = document.querySelector('[data-recommendation-engine]');
    if (!container) return;

    const config = JSON.parse(container.dataset.recommendationEngine || '{}');

    container.innerHTML = `
      <div style="
        padding: 24px;
        background: var(--bg-secondary);
        border-radius: 12px;
      ">
        <h3 style="margin-bottom: 16px;">${config.title || '智能推荐'}</h3>
        <p style="margin-bottom: 24px; color: var(--text-secondary);">${config.description || '根据您的需求推荐最适合的产品'}</p>
        
        <div class="recommendation-quiz" style="margin-bottom: 24px;">
          <div style="font-weight: 600; margin-bottom: 16px;">回答几个问题，获取个性化推荐</div>
          
          ${(config.questions || []).map((q, i) => `
            <div class="quiz-question" data-question="${i}" style="margin-bottom: 20px; ${i > 0 ? 'display: none;' : ''}">
              <div style="margin-bottom: 12px; font-weight: 600;">${q.question}</div>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px;">
                ${(q.options || []).map((opt, j) => `
                  <button class="quiz-option" data-question="${i}" data-value="${opt.value}" style="
                    padding: 12px;
                    background: var(--bg-tertiary);
                    border: 2px solid transparent;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    text-align: center;
                    transition: all 0.2s;
                  ">${opt.label}</button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="recommendation-results" style="display: none;">
          <div style="font-weight: 600; margin-bottom: 16px;">为您推荐</div>
          <div class="recommendation-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px;">
            <!-- Results will be inserted here -->
          </div>
        </div>
      </div>
    `;

    const questions = container.querySelectorAll('.quiz-question');
    const resultsDiv = container.querySelector('.recommendation-results');
    const resultGrid = container.querySelector('.recommendation-grid');
    const answers = {};

    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', function() {
        const questionIdx = parseInt(this.dataset.question);
        answers[questionIdx] = this.dataset.value;

        // Highlight selected
        container.querySelectorAll(`.quiz-option[data-question="${questionIdx}"]`).forEach(b => {
          b.style.background = 'var(--bg-tertiary)';
          b.style.borderColor = 'transparent';
        });
        this.style.background = '#0071e310';
        this.style.borderColor = '#0071e3';

        // Show next question or results
        if (questionIdx < questions.length - 1) {
          setTimeout(() => {
            questions[questionIdx].style.display = 'none';
            questions[questionIdx + 1].style.display = 'block';
          }, 300);
        } else {
          setTimeout(() => {
            this.showResults(answers, config, resultGrid, resultsDiv);
          }, 300);
        }
      });
    });
  }

  showResults(answers, config, resultGrid, resultsDiv) {
    // Generate recommendations based on answers
    const recommendations = this.generateRecommendations(answers, config);
    
    resultGrid.innerHTML = recommendations.map(product => `
      <div style="
        padding: 20px;
        background: var(--bg-tertiary);
        border-radius: 12px;
        text-align: center;
        transition: transform 0.2s;
        cursor: pointer;
      " onmouseenter="this.style.transform='translateY(-4px)'" onmouseleave="this.style.transform=''">
        <div style="font-size: 48px; margin-bottom: 12px;">${product.icon || '📦'}</div>
        <div style="font-weight: 600; margin-bottom: 8px;">${product.name}</div>
        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">${product.description}</div>
        <div style="font-size: 18px; color: #0071e3; font-weight: 700;">${product.price}</div>
        <div style="margin-top: 8px;">
          <span style="
            padding: 4px 12px;
            background: #34c75920;
            color: #34c759;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
          ">匹配度 ${product.match}%</span>
        </div>
      </div>
    `).join('');

    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
  }

  generateRecommendations(answers, config) {
    return [
      { name: '硬质合金立铣刀', description: '适用于高精度加工', price: '¥128', icon: '🔧', match: 95 },
      { name: '涂层钻头套装', description: '耐磨涂层，寿命长', price: '¥299', icon: '🔩', match: 88 },
      { name: '精密刀柄', description: '高刚性设计', price: '¥450', icon: '🔨', match: 82 },
      { name: '陶瓷刀片', description: '高速加工首选', price: '¥256', icon: '⚙️', match: 76 }
    ];
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new RecommendationEngine();
});
