const revealTargets = document.querySelectorAll(".card, .hero");
const langButtons = document.querySelectorAll(".lang-button");
const trackButtons = document.querySelectorAll(".track-button");
const reassembleTargets = document.querySelectorAll(".hero, .card");
const musicToggle = document.querySelector(".music-toggle");
const bgmPlayer = document.querySelector("#bgm-player");
const qrFrames = document.querySelectorAll(".qr-frame");
const journeyLead = document.querySelector("#journey-lead");
const journeyLane = document.querySelector("#journey-lane");
const pixelFlash = document.createElement("div");
let transitionTimer;
let reassembleTimer;
let currentTrackIndex = 0;
let musicStarted = false;
let currentLanguage = "zh";
let currentCareerTrack = "internet";

pixelFlash.className = "pixel-flash";
document.body.appendChild(pixelFlash);

const bgmPlaylist = [
  "./assets/bgm/track-01.mp3",
  "./assets/bgm/track-02.mp3",
  "./assets/bgm/track-03.mp3",
];

const translations = {
  zh: {
    title: "Elaine Level Up",
    description: "Elaine 的个人网站：打怪升级中",
    systemTag: "World PLAYER",
    heroIntro: "Start MY Level up",
    heroMetaCreative: "Creative",
    heroMetaCore: "Product x AI x Data",
    heroMetaEnergy: "Energetic",
    fav1: "KPOP",
    fav2: "YUQI",
    fav3: "IDLE",
    fav4: "MINI",
    fav5: "GAME MODE",
    marquee: "SELECT HERO / BOSS MODE ON",
    heroFallback: "DROP HERO ART HERE",
    educationKicker: "BOSS RUSH / ACADEMY",
    educationTitle: "教育背景",
    educationLead: "主线任务：进度2/3，最终BOSS加载中...",
    edu1Status: "NOW FIGHTING",
    edu1School: "香港中文大学（深圳）",
    edu1Degree: "公司金融与投资 · 硕士（全日制）",
    edu1Desc: "装备技能：财务报表分析 / 固定收益 / 公司金融 / 公司估值",
    edu2Status: "BOSS CLEARED",
    edu2School: "中央财经大学",
    edu2Degree: "工商管理 · 第二学位（全日制）",
    edu3Status: "BOSS CLEARED",
    edu3School: "中央财经大学",
    edu3Degree: "金融科技 · 本科（全日制）",
    edu3Desc: "装备技能：人工智能 / 软件工程 / 金融学 / 金融科技",
    xpKicker: "BOSS RUSH / EXPERIENCE",
    xpTitle: "实习经历",
    trackInternet: "互联网",
    trackFinance: "金融",
    journeyTracks: {
      internet: {
        lead: "支线任务：互联网 BOSS 战 2/2 完美通关！产品经验持续升级中",
        cards: [
          {
            status: "BOSS CLEARED",
            time: "2025.09 - 2026.02",
            title: "美团 · 商业增值部 · 商业化数据产品",
            desc: "竞品拆解、商家调研、产品设计一路推进到上线交付，负责两个产品项目（二期迭代和0-1MVP），在高强度商业化场景里，训练产品思维和跨部门合作能力。",
            wide: true,
          },
          {
            status: "BOSS CLEARED",
            time: "2025.05 - 2025.09",
            title: "OPPO · 印度区 GTM 部 · 用户数据产品",
            desc: "负责市场调研、用户洞察和场景挖掘，以数据支持产品决策；借助COZE搭建自动化数据分析工作流，显著提升数据分析效率。",
            wide: true,
          },
        ],
      },
      finance: {
        lead: "支线任务：金融线切换完成，恭喜你的地图覆盖率已超过 98% 玩家！",
        cards: [
          {
            status: "BOSS CLEARED",
            time: "2025.03 - 2025.07",
            title: "国信证券经济研究所 · 固收研究助理",
            desc: "维护 5000+ 时间序列的全球宏观数据库，跟踪海内外政策与跨境银行观点，持续输出周报、月报和专题拆解，辅助团队做投资策略与资产配置判断。",
            wide: true,
          },
          {
            status: "BOSS CLEARED",
            time: "2024.12 - 2025.03",
            title: "国信证券固收事业部 · 债承实习生",
            desc: "参与发行人深度尽调与内核材料优化，通过穿透核查、抽凭和交叉验证识别未披露关联交易风险，并完成高密度反馈答复材料。",
            wide: true,
          },
          {
            status: "BOSS CLEARED",
            time: "2023.01 - 2023.03",
            title: "立信会计师事务所 · 审计实习生",
            desc: "参与上市公司年审与财务尽调，协助完成多类会计科目底稿、200+ 询证函跟踪及供应商 / 客户 / 银行实地盘点核验。",
            wide: true,
          },
          {
            status: "BOSS CLEARED",
            time: "2021.11 - 2022.01",
            title: "中再资产管理 · 投资研究助理",
            desc: "协助撰写智能驾驶行业产业链深度研究，聚焦于传感器，搭建行业与重点公司分析框架，支撑投研判断。",
            wide: true,
          },
        ],
      },
    },
    portfolioKicker: "SKILL DECK",
    portfolioTitle: "作品集",
    portfolioLead: "达成成就：I——AI！ 我即AI",
    project1Title: "「森罗 Sylvan」AI 个人知识库 Web App",
    project1Desc: "针对“知识碎片化”提出“知识生命化”理念。注重低摩擦、无感化、构建体系化知识库。基于Cursor开发，目前MVP已上线网页。",
    projectLink: "进入森罗",
    project2Title: "「碎花」智能记账小程序",
    project2Desc: "将“情感价值”赋予枯燥的记账日常，让记账像玩游戏一样简单。通过 Gemini 与 Cursor 开发，已上线微信小程序。",
    qrFallback: "MINI PROGRAM QR",
    qrChip: "SCAN TO PLAY",
    qrText: "微信扫码进入「碎花」，解锁智能记账花园",
    project3Title: "AI 网申智能填表 Google 插件",
    project3Desc: "针对毕业生网申痛点开发。LLM 替代传统关键词匹配，完成简历解析、网页语义识别和字段自动填充，单次网申时间从 30 分钟以上压缩到 5 分钟以内。",
    project3Github: "前往 GitHub",
    skillsKicker: "DROP REWARDS",
    skillsTitle: "专业技能",
    skillsLead: "持续升级，技能树点亮中...",
    reward1: "爬虫 / 数据处理",
    reward2: "查询 / 指标分析",
    reward3: "VLOOKUP / 可视化",
    reward4: "原型 / 信息架构",
    reward5: "LLM 应用 / 智能体 / 工作流",
    reward6: "实验意识 / 结果验证",
    reward7: "IELTS 6.5 / 英语可作工作语言",
    reward8: "调研 / 设计 / 推进落地",
    reward9: "金融数据库 / 数据追踪 / 上市公司分析",
    reward10: "市场数据 / 跨资产信息检索",
    reward11: "公司估值 / 基本面分析",
    resumeKicker: "SAVE POINT",
    resumeTitle: "简历下载",
    resumeInternetTag: "INTERNET",
    resumeInternetTitle: "互联网方向",
    resumeInternetMeta: "产品 / AI / 数据应用",
    resumeFinanceTag: "FINANCE",
    resumeFinanceTitle: "金融方向",
    resumeFinanceMeta: "固收 / 债承 / 二级研究",
    resumeButton: "DOWNLOAD CV",
    contactKicker: "FINAL STAGE",
    contactTitle: "与我联系",
    contactMood: "Mood / Ready to join, ready to build, ready to make it iconic.",
    musicLabel: "BGM OFF",
    musicLabelOn: "BGM ON",
    musicAria: "切换背景音乐",
  },
  en: {
    title: "Elaine Level Up",
    description: "Elaine's personal website: leveling up through every stage.",
    systemTag: "WORLD PLAYER",
    heroIntro: "Start MY Level up",
    heroMetaCreative: "Creative",
    heroMetaCore: "Product x AI x Data",
    heroMetaEnergy: "Energetic",
    fav1: "KPOP",
    fav2: "YUQI",
    fav3: "IDLE",
    fav4: "MINI",
    fav5: "GAME MODE",
    marquee: "SELECT HERO / BOSS MODE ON",
    heroFallback: "DROP HERO ART HERE",
    educationKicker: "BOSS RUSH / ACADEMY",
    educationTitle: "Education",
    educationLead: "Main quest: 2/3 stages cleared, final boss still loading...",
    edu1Status: "NOW FIGHTING",
    edu1School: "The Chinese University of Hong Kong, Shenzhen",
    edu1Degree: "MSc in Finance · Full-time",
    edu1Desc: "Skill loadout: Financial Statement Analysis / Fixed Income / Corporate Finance / Valuation",
    edu2Status: "BOSS CLEARED",
    edu2School: "Central University of Finance and Economics",
    edu2Degree: "Second Bachelor's Degree in Business Administration · Full-time",
    edu3Status: "BOSS CLEARED",
    edu3School: "Central University of Finance and Economics",
    edu3Degree: "BSc in Financial Technology · Full-time",
    edu3Desc: "Skill loadout: AI / Software Engineering / Finance / FinTech",
    xpKicker: "BOSS RUSH / EXPERIENCE",
    xpTitle: "Internships",
    trackInternet: "INTERNET",
    trackFinance: "FINANCE",
    journeyTracks: {
      internet: {
        lead: "Side quest: 2/2 internet boss stages perfectly cleared. Product experience still leveling up.",
        cards: [
          {
            status: "BOSS CLEARED",
            time: "2025.09 - 2026.02",
            title: "Meituan · Commercial Value-Added · Commercial Data Products",
            desc: "Pushed competitor analysis, merchant research, and product design all the way to launch delivery. Took ownership of two product projects, including a second-phase iteration and a 0-to-1 MVP, while sharpening product thinking and cross-functional collaboration in a high-intensity commercial setting.",
            wide: true,
          },
          {
            status: "BOSS CLEARED",
            time: "2025.05 - 2025.09",
            title: "OPPO · India GTM · User Data Products",
            desc: "Worked on market research, user insights, and scenario mining to support product decisions, while building an automated data analysis workflow with Coze that significantly improved efficiency.",
            wide: true,
          },
        ],
      },
      finance: {
        lead: "Finance route switched on. Congratulations: your map completion is now above 98% of players.",
        cards: [
          {
            status: "BOSS CLEARED",
            time: "2025.03 - 2025.07",
            title: "Guosen Securities Research Institute · Fixed Income Research Assistant",
            desc: "Maintained a global macro database with 5,000+ time series, tracked domestic and overseas policy developments and cross-border bank views, and continuously produced weekly reports, monthly reports, and topical breakdowns to support investment strategy and asset allocation decisions.",
            wide: true,
          },
          {
            status: "BOSS CLEARED",
            time: "2024.12 - 2025.03",
            title: "Guosen Securities Fixed Income Division · Debt Underwriting Intern",
            desc: "Participated in deep due diligence and internal review optimization for issuers, identifying undisclosed related-party transaction risks through penetration checks, voucher sampling, and cross-validation, while handling dense feedback response materials.",
            wide: true,
          },
          {
            status: "BOSS CLEARED",
            time: "2023.01 - 2023.03",
            title: "BDO China Shu Lun Pan CPAs · Audit Intern",
            desc: "Took part in annual audit and financial due diligence for a listed company, supporting workpapers across multiple accounting subjects, tracking 200+ confirmation letters, and assisting with on-site verification for suppliers, clients, and banks.",
            wide: true,
          },
          {
            status: "BOSS CLEARED",
            time: "2021.11 - 2022.01",
            title: "China Re Asset Management · Investment Research Assistant",
            desc: "Assisted with in-depth smart-driving industry chain research focused on sensors, built frameworks for sector and key-company analysis, and supported investment research judgment.",
            wide: true,
          },
        ],
      },
    },
    portfolioKicker: "SKILL DECK",
    portfolioTitle: "Portfolio",
    portfolioLead: "Achievement unlocked: I = AI. I am AI.",
    project1Title: "Sylvan AI Personal Knowledge Base Web App",
    project1Desc: "Built around the concept of turning fragmented knowledge into a living system. Focused on low-friction capture, passive collection, and structured knowledge-building. Developed with Cursor, and the MVP is already live on the web.",
    projectLink: "Enter Sylvan",
    project2Title: "Bloom Smart Budgeting WeChat Mini Program",
    project2Desc: "Turned emotional value into part of everyday budgeting, making expense tracking feel more like a game. Built with Gemini and Cursor, and already launched as a WeChat Mini Program.",
    qrFallback: "MINI PROGRAM QR",
    qrChip: "SCAN TO PLAY",
    qrText: "Scan in WeChat to enter Bloom and unlock the smart budgeting garden.",
    project3Title: "AI Auto-Fill Google Extension for Job Applications",
    project3Desc: "Built for graduates dealing with repetitive online applications. Replaced traditional keyword matching with LLM-powered resume parsing, semantic page understanding, and automatic field filling, cutting each application from over 30 minutes to under 5.",
    project3Github: "View on GitHub",
    skillsKicker: "DROP REWARDS",
    skillsTitle: "Skill Drops",
    skillsLead: "Still upgrading. Skill tree lighting up...",
    reward1: "Web Scraping / Data Processing",
    reward2: "Querying / Metrics Analysis",
    reward3: "VLOOKUP / Visualization",
    reward4: "Prototyping / Information Architecture",
    reward5: "LLM Applications / Agents / Workflows",
    reward6: "Experiment Thinking / Validation",
    reward7: "IELTS 6.5 / English as a Working Language",
    reward8: "Research / Design / Execution",
    reward9: "Financial Database / Data Tracking / Listed Company Analysis",
    reward10: "Market Data / Cross-Asset Research",
    reward11: "Company Valuation / Fundamental Analysis",
    resumeKicker: "SAVE POINT",
    resumeTitle: "Resume Download",
    resumeInternetTag: "INTERNET",
    resumeInternetTitle: "Internet Track",
    resumeInternetMeta: "Product / AI / Data Applications",
    resumeFinanceTag: "FINANCE",
    resumeFinanceTitle: "Finance Track",
    resumeFinanceMeta: "Fixed Income / Debt Underwriting / Secondary Research",
    resumeButton: "DOWNLOAD CV",
    contactKicker: "FINAL STAGE",
    contactTitle: "Contact Me",
    contactMood: "Mood / Ready to join, ready to build, ready to make it iconic.",
    musicLabel: "BGM OFF",
    musicLabelOn: "BGM ON",
    musicAria: "toggle background music",
  },
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealTargets.forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});

function setLanguage(lang) {
  const dictionary = translations[lang];
  if (!dictionary) {
    return;
  }

  currentLanguage = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = dictionary.title;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", dictionary.description);
  }

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.getAttribute("data-i18n-aria-label");
    if (key && dictionary[key]) {
      node.setAttribute("aria-label", dictionary[key]);
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });

  updateMusicButtonLabel();
  updateTrackButtons();
  renderCareerTrack();
}

function playLanguageTransition() {
  document.body.classList.remove("lang-transition");
  pixelFlash.classList.remove("active");
  void document.body.offsetWidth;
  document.body.classList.add("lang-transition");
  pixelFlash.classList.add("active");
  clearTimeout(transitionTimer);
  transitionTimer = window.setTimeout(() => {
    document.body.classList.remove("lang-transition");
    pixelFlash.classList.remove("active");
  }, 480);
}

function playReassembleTransition(activeButton) {
  clearTimeout(reassembleTimer);

  reassembleTargets.forEach((element, index) => {
    element.classList.remove("reassemble");
    element.style.setProperty("--delay", `${index * 55}ms`);
    void element.offsetWidth;
    element.classList.add("reassemble");
  });

  [...langButtons, ...trackButtons].forEach((button) => {
    button.classList.remove("jump-glow");
  });

  if (activeButton) {
    void activeButton.offsetWidth;
    activeButton.classList.add("jump-glow");
  }

  reassembleTimer = window.setTimeout(() => {
    reassembleTargets.forEach((element) => {
      element.classList.remove("reassemble");
      element.style.removeProperty("--delay");
    });

    [...langButtons, ...trackButtons].forEach((button) => {
      button.classList.remove("jump-glow");
    });
  }, 1100);
}

function getCurrentLanguage() {
  return currentLanguage;
}

function updateTrackButtons() {
  const dictionary = translations[currentLanguage];
  trackButtons.forEach((button) => {
    const track = button.dataset.track;
    button.classList.toggle("is-active", track === currentCareerTrack);
    button.textContent = track === "finance" ? dictionary.trackFinance : dictionary.trackInternet;
    button.setAttribute("aria-selected", String(track === currentCareerTrack));
  });
}

function renderCareerTrack() {
  const dictionary = translations[currentLanguage];
  const trackData = dictionary?.journeyTracks?.[currentCareerTrack];
  if (!trackData || !journeyLane || !journeyLead) {
    return;
  }

  journeyLead.textContent = trackData.lead;
  journeyLane.innerHTML = trackData.cards.map((card) => `
    <article class="boss-card is-cleared${card.wide ? " wide-card" : ""}">
      <p class="boss-status">${card.status}</p>
      <p class="boss-time">${card.time}</p>
      <h3>${card.title}</h3>
      <p>${card.desc}</p>
    </article>
  `).join("");
}

function updateMusicButtonLabel() {
  const lang = getCurrentLanguage();
  const dictionary = translations[lang];
  if (!musicToggle || !dictionary) {
    return;
  }

  const isOn = musicToggle.classList.contains("is-on");
  musicToggle.setAttribute("aria-pressed", String(isOn));
  musicToggle.setAttribute("title", isOn ? dictionary.musicLabelOn : dictionary.musicLabel);
}

function loadTrack(index) {
  if (!bgmPlayer || !bgmPlaylist.length) {
    return;
  }

  currentTrackIndex = (index + bgmPlaylist.length) % bgmPlaylist.length;
  bgmPlayer.src = bgmPlaylist[currentTrackIndex];
  bgmPlayer.load();
}

async function enableMusic() {
  if (!bgmPlayer || !musicToggle) {
    return;
  }

  if (!musicStarted) {
    loadTrack(currentTrackIndex);
    musicStarted = true;
  }

  try {
    await bgmPlayer.play();
    musicToggle.classList.add("is-on");
  } catch (_error) {
    musicToggle.classList.remove("is-on");
  }

  updateMusicButtonLabel();
}

function disableMusic() {
  if (!bgmPlayer || !musicToggle) {
    return;
  }

  bgmPlayer.pause();
  musicToggle.classList.remove("is-on");
  updateMusicButtonLabel();
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playLanguageTransition();
    playReassembleTransition(button);
    setLanguage(button.dataset.lang);
  });
});

trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentCareerTrack = button.dataset.track === "finance" ? "finance" : "internet";
    playLanguageTransition();
    playReassembleTransition(button);
    updateTrackButtons();
    renderCareerTrack();
  });
});

if (bgmPlayer) {
  bgmPlayer.volume = 0.45;
  bgmPlayer.addEventListener("ended", () => {
    loadTrack(currentTrackIndex + 1);
    if (musicToggle?.classList.contains("is-on")) {
      bgmPlayer.play().catch(() => {});
    }
  });
}

if (musicToggle) {
  musicToggle.addEventListener("click", async () => {
    if (musicToggle.classList.contains("is-on")) {
      disableMusic();
      return;
    }

    await enableMusic();
  });
}

qrFrames.forEach((frame) => {
  const image = frame.querySelector(".qr-image");
  if (!image) {
    return;
  }

  const syncState = () => {
    if (image.complete && image.naturalWidth > 0) {
      frame.classList.add("has-image");
    } else {
      frame.classList.remove("has-image");
    }
  };

  image.addEventListener("load", syncState);
  image.addEventListener("error", () => {
    frame.classList.remove("has-image");
  });
  syncState();
});

setLanguage("zh");
