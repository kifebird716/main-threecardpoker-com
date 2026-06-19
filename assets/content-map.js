// assets/content-map.js

const contentMap = {
  siteUrl: "https://main-threecardpoker.com",
  siteName: "炸金花游戏",
  sections: [
    {
      id: "rules",
      title: "基本规则",
      tags: ["炸金花", "规则", "比牌", "牌型"],
      cards: [
        { name: "豹子", description: "三张同点数的牌" },
        { name: "同花顺", description: "同花色顺子" },
        { name: "金花", description: "同花色非顺子" },
        { name: "顺子", description: "不同花色顺子" },
        { name: "对子", description: "两张同点数" },
        { name: "散牌", description: "无特殊组合" }
      ]
    },
    {
      id: "strategy",
      title: "策略技巧",
      tags: ["炸金花", "策略", "心理战", "下注"],
      tips: [
        "观察对手下注模式",
        "合理管理筹码",
        "适时诈唬与弃牌",
        "利用位置优势"
      ]
    },
    {
      id: "variants",
      title: "变种玩法",
      tags: ["炸金花", "变种", "限注", "无限注"],
      items: [
        { name: "经典模式", description: "标准炸金花规则" },
        { name: "限注模式", description: "每轮下注上限固定" },
        { name: "无限注模式", description: "无下注上限" }
      ]
    }
  ],
  keywords: ["炸金花", "扑克", "比牌", "下注", "诈唬", "牌型"],
  searchFilter: function(query) {
    if (!query || typeof query !== "string") return [];
    const lower = query.toLowerCase();
    const results = [];
    this.sections.forEach(section => {
      const matchTags = section.tags.some(t => t.toLowerCase().includes(lower));
      const matchTitle = section.title.toLowerCase().includes(lower);
      const matchCards = section.cards
        ? section.cards.some(c => c.name.toLowerCase().includes(lower) || c.description.toLowerCase().includes(lower))
        : false;
      const matchTips = section.tips
        ? section.tips.some(t => t.toLowerCase().includes(lower))
        : false;
      const matchItems = section.items
        ? section.items.some(i => i.name.toLowerCase().includes(lower) || i.description.toLowerCase().includes(lower))
        : false;
      if (matchTags || matchTitle || matchCards || matchTips || matchItems) {
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          relevance: (matchTags ? 1 : 0) + (matchTitle ? 1 : 0) + (matchCards || matchTips || matchItems ? 1 : 0)
        });
      }
    });
    results.sort((a, b) => b.relevance - a.relevance);
    return results;
  },
  getSectionById: function(id) {
    return this.sections.find(s => s.id === id) || null;
  },
  getAllTags: function() {
    const tagSet = new Set();
    this.sections.forEach(s => s.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet);
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = contentMap;
}