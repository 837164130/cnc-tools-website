// Product Recommendations
class ProductRecommendations {
  constructor() {
    this.recommendations = {
      steel: {
        endmills: ['EM-4F', 'EM-4F-HRC', 'CRM-4F'],
        drills: ['TD-3D', 'TD-5D'],
        taps: ['MT-M'],
        inserts: ['CNMG-1204']
      },
      stainless: {
        endmills: ['EM-4F-HRC', 'CRM-6F'],
        drills: ['ICD-3D', 'ICD-5D'],
        taps: ['MT-M'],
        inserts: ['WNMG-0804']
      },
      aluminum: {
        endmills: ['EM-2F-AL', 'EM-3F-AL', 'BM-2F'],
        drills: ['TD-3D'],
        taps: ['FT-M'],
        inserts: ['APKT-1604']
      },
      titanium: {
        endmills: ['EM-4F-HRC', 'CRM-6F'],
        drills: ['ICD-5D', 'ICD-8D'],
        taps: ['MT-M'],
        inserts: ['CNMG-1204']
      },
      castiron: {
        endmills: ['EM-4F', 'RM-4F'],
        drills: ['TD-3D', 'TD-5D'],
        taps: ['MT-M'],
        inserts: ['DNMG-1506']
      }
    };
  }

  getRecommendations(material, operation) {
    const materialRecs = this.recommendations[material];
    if (!materialRecs) return [];

    if (operation && materialRecs[operation]) {
      return materialRecs[operation];
    }

    // Return all recommendations for material
    return Object.values(materialRecs).flat();
  }

  displayRecommendations(material) {
    const container = document.getElementById('recommendations');
    if (!container) return;

    const recs = this.getRecommendations(material);
    
    if (recs.length === 0) {
      container.innerHTML = '<p>请选择材料类型获取推荐</p>';
      return;
    }

    container.innerHTML = `
      <h3>推荐产品</h3>
      <div class="recommendation-grid">
        ${recs.map(rec => `
          <div class="recommendation-card">
            <div class="recommendation-model">${rec}</div>
            <div class="recommendation-material">适合加工: ${this.getMaterialName(material)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  getMaterialName(material) {
    const names = {
      steel: '碳钢/合金钢',
      stainless: '不锈钢',
      aluminum: '铝合金',
      titanium: '钛合金',
      castiron: '铸铁'
    };
    return names[material] || material;
  }
}

// Initialize
window.productRecommendations = new ProductRecommendations();
