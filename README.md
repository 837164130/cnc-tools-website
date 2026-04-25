# CCCNC - 专业硬质合金刀具网站

## 项目概述

CCCNC 是一家专业的硬质合金刀具供应商网站，提供铣刀、钻头、丝锥、铰刀、车刀片、刀柄、卡簧、刀盘等全系列产品。

## 网站功能

### 核心功能
- **产品展示**: 7大分类，18个子分类，200+产品型号
- **产品搜索**: 支持按型号、名称、关键词搜索
- **产品对比**: 最多3款产品同时对比
- **切削计算器**: 根据材料和刀具计算最佳切削参数
- **多语言支持**: 中文、俄语、英语

### 交互功能
- **快速查看**: 产品卡片悬停快速预览
- **收藏功能**: 本地存储收藏的产品
- **分享功能**: 支持 WhatsApp、Telegram、邮件分享
- **主题切换**: 浅色/深色模式
- **键盘快捷键**: /搜索、T主题、H首页、C联系

### 技术特性
- **响应式设计**: 适配桌面、平板、手机
- **PWA支持**: 可安装为桌面应用，离线访问
- **性能优化**: 图片懒加载、代码分割、缓存策略
- **SEO优化**: sitemap.xml、robots.txt、语义化标签
- **打印优化**: 专门的打印样式表

## 项目结构

```
cnc-tools-website/
├── index.html              # 首页
├── about.html              # 关于我们
├── contact.html            # 联系我们
├── search.html             # 产品搜索
├── compare.html            # 产品对比
├── calculator.html         # 切削计算器
├── products/               # 产品分类页面
│   ├── endmills.html
│   ├── drills.html
│   ├── taps.html
│   ├── reamers.html
│   ├── inserts.html
│   ├── tool-holders.html
│   ├── collets.html
│   └── arbors.html
├── products/detail/        # 产品详情页面
│   ├── flat-endmills.html
│   ├── ball-endmills.html
│   ├── corner-radius.html
│   ├── roughing.html
│   ├── twist-drills.html
│   ├── center-drills.html
│   ├── internal-coolant.html
│   ├── machine-taps.html
│   ├── forming-taps.html
│   ├── straight-reamers.html
│   ├── adjustable-reamers.html
│   ├── turning-inserts.html
│   ├── milling-inserts.html
│   ├── bt-holders.html
│   ├── hsk-holders.html
│   ├── er-collets.html
│   ├── face-mills.html
│   └── end-mill-holders.html
├── css/
│   ├── enhanced.css        # 增强样式
│   └── print.css           # 打印样式
├── js/
│   ├── main.js             # 主入口
│   ├── mobile-nav.js       # 移动端导航
│   ├── search.js           # 搜索功能
│   ├── filter.js           # 产品筛选
│   ├── product-enhancements.js  # 产品增强
│   ├── image-loader.js     # 图片懒加载
│   ├── scroll-animations.js     # 滚动动画
│   ├── breadcrumb.js       # 面包屑导航
│   ├── back-to-top.js      # 回到顶部
│   ├── page-loader.js      # 页面加载器
│   ├── share.js            # 分享功能
│   ├── language-switcher.js     # 语言切换
│   ├── notifications.js    # 通知系统
│   ├── performance.js      # 性能优化
│   ├── analytics.js        # 分析追踪
│   ├── favorites.js        # 收藏功能
│   ├── theme-switcher.js   # 主题切换
│   ├── keyboard-shortcuts.js    # 键盘快捷键
│   └── recommendations.js  # 产品推荐
├── data/
│   ├── products.json       # 产品数据
│   └── products-full.json  # 完整产品数据
├── scripts/
│   ├── build-products.js   # 产品页面生成器
│   ├── update-pages.js     # 页面更新脚本
│   ├── update-nav.js       # 导航更新脚本
│   ├── update-links.js     # 链接更新脚本
│   ├── enhance-details.js  # 详情页增强脚本
│   ├── add-features.js     # 功能添加脚本
│   └── enhance-svgs.js     # SVG增强脚本
├── sw.js                   # Service Worker
├── manifest.json           # PWA配置
├── sitemap.xml             # 站点地图
├── robots.txt              # 爬虫规则
├── offline.html            # 离线页面
└── 404.html                # 404页面
```

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: 自定义CSS，Apple设计风格
- **字体**: Inter (Google Fonts)
- **部署**: Vercel (自动部署)
- **版本控制**: Git + GitHub

## 产品数据

### 产品分类

1. **硬质合金铣刀**
   - 平底铣刀 (2刃/3刃/4刃)
   - 球头铣刀 (2刃/4刃)
   - 圆鼻铣刀 (4刃/6刃)
   - 粗皮铣刀 (3刃/4刃)
   - 锥度铣刀
   - 深沟铣刀

2. **硬质合金钻头**
   - 麻花钻 (3D/5D/8D)
   - 中心钻 (60°/90°)
   - 内冷钻 (3D/5D/8D)

3. **丝锥系列**
   - 机用丝锥 (公制/UNC/UNF)
   - 挤压丝锥 (公制/UNC)

4. **铰刀系列**
   - 直柄铰刀 (H7/H8)
   - 可调铰刀

5. **车刀片**
   - 车削刀片 (CNMG/WNMG/TNMG/DNMG)
   - 铣削刀片 (APKT/RPMT/SPMT)

6. **刀柄刀杆**
   - BT刀柄 (BT30/BT40/BT50)
   - HSK刀柄 (HSK63A/HSK100A)

7. **卡簧夹头**
   - ER弹簧夹头 (ER16/ER20/ER32/ER40)

8. **刀盘刀杆**
   - 面铣刀盘
   - 立铣刀杆

## 开发脚本

```bash
# 生成产品详情页面
node scripts/build-products.js

# 更新所有页面导航
node scripts/update-nav.js

# 更新产品链接
node scripts/update-links.js

# 增强产品详情页
node scripts/enhance-details.js

# 添加产品特点
node scripts/add-features.js

# 增强SVG图纸
node scripts/enhance-svgs.js
```

## 部署

网站自动部署到 Vercel，每次推送到 main 分支会自动触发部署。

- **生产环境**: https://cccnc.ru
- **备用地址**: https://837164130.github.io/cnc-tools-website/

## 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 许可证

© 2025 CCCNC. All rights reserved.
