import { brand, categoryOrder, questions, ui } from "./data.js";

const app = document.querySelector("#app");
let language = "en";
let screen = "landing";
let current = 0;
let answers = {};
let results = null;

const t = (key) => ui[language][key] ?? key;
const category = (id) => ui[language].categories[id];
const text = (value) => value[language] ?? value.en;
const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function icon(name, size = 18) {
  const paths = {
    arrow: `<path d="M4 9h11M11 4l5 5-5 5" />`,
    arrowBack: `<path d="M16 9H5m5-5-5 5 5 5" />`,
    check: `<path d="m5 9 2.6 2.6L15 4.8" />`,
    lock: `<rect x="4" y="7" width="12" height="10" rx="2"/><path d="M6.5 7V5.5a3.5 3.5 0 0 1 7 0V7M8 12h.01M12 12h.01"/>`,
    print: `<path d="M5 7V3h10v4M5 13H3v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4h-2M5 11h10v6H5v-6Z"/>`,
    restart: `<path d="M15.5 7A5.5 5.5 0 1 0 16 12"/><path d="M16 3v4h-4"/>`,
    spark: `<path d="m9 2 .9 3.7L13 7l-3.1 1.3L9 12l-.9-3.7L5 7l3.1-1.3L9 2ZM15 11l.5 2 1.5.6-1.5.6-.5 2-.5-2-1.5-.6 1.5-.6.5-2Z"/>`,
    shield: `<path d="M9 2 16 5v4.2c0 3.7-2.7 6.1-7 7.8-4.3-1.7-7-4.1-7-7.8V5l7-3Z"/><path d="m5.5 9 2.2 2.2L12.8 6"/>`,
    plus: `<path d="M9 4v10M4 9h10"/>`,
  };
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[name] ?? paths.spark}</svg>`;
}

function logo() {
  return `<a class="brand" href="#" data-action="home" aria-label="NIVRA home">
    <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="brand-name">${brand.name}</span>
  </a>`;
}

function header() {
  return `<header class="site-header">
    <div class="header-inner">
      ${logo()}
      <nav class="desktop-nav" aria-label="Main navigation">
        <a href="#overview" data-action="home">${t("home")}</a>
        <a href="#how-it-works" data-action="how">${t("howItWorks")}</a>
      </nav>
      <div class="header-actions">
        <button class="language-button" data-action="language" type="button"><span class="language-dot"></span>${t("language")}</button>
        ${screen === "quiz" ? `<span class="header-state">${t("assessment")} <span>·</span> ${String(current + 1).padStart(2, "0")}/${questions.length}</span>` : ""}
      </div>
    </div>
  </header>`;
}

function shell(content, className = "") {
  return `${header()}<main class="${className}">${content}</main><footer class="site-footer"><div>${logo()}<span class="footer-copy">${brand.tagline[language]}</span></div><span class="footer-note">NIVRA / AI skills assessment</span></footer>`;
}

function landing() {
  const measures = categoryOrder.map((id, index) => `<div class="measure-card">
    <span class="measure-number">${String(index + 1).padStart(2, "0")}</span>
    <span class="measure-icon">${icon(["spark", "plus", "arrow", "check", "shield", "lock"][index], 17)}</span>
    <h3>${category(id).label}</h3>
    <p>${category(id).description}</p>
  </div>`).join("");

  return shell(`<section class="landing-screen" id="overview">
    <div class="hero-grid">
      <div class="hero-copy">
        <div class="eyebrow"><span class="eyebrow-line"></span>${t("heroKicker")}</div>
        <h1>${t("heroTitle")}</h1>
        <p class="hero-body">${t("heroBody")}</p>
        <div class="hero-actions">
          <button class="button button-dark" data-action="start" type="button">${t("assess")} ${icon("arrow", 17)}</button>
          <a class="text-link" href="#how-it-works" data-action="how">${t("howItWorks")} <span>↘</span></a>
        </div>
        <div class="hero-footnote"><span class="status-dot"></span>${t("private")}</div>
      </div>
      <div class="hero-visual">
        <div class="visual-grid-lines"></div>
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
        <div class="visual-center">
          <div class="visual-mark"><i></i><i></i><i></i></div>
          <span class="visual-index">01</span>
        </div>
        <div class="visual-tag tag-top">JUDGMENT <span>+</span></div>
        <div class="visual-tag tag-bottom">FLUENCY <span>↗</span></div>
        <div class="visual-caption"><span>01 — 06</span><strong>${t("heroCardTitle")}</strong><small>${t("heroCardBody")}</small></div>
      </div>
    </div>
    <div class="metric-strip">
      <div class="metric"><strong>${t("time")}</strong><span>${t("duration")}</span></div>
      <div class="metric"><strong>${t("categories")}</strong><span>${t("categoriesLabel")}</span></div>
      <div class="metric"><strong>${t("questions")}</strong><span>${t("questionsLabel")}</span></div>
      <div class="metric metric-private"><span class="metric-lock">${icon("lock", 15)}</span><strong>${t("private")}</strong><span>${t("privateBody")}</span></div>
    </div>
    <section class="measures-section" id="how-it-works">
      <div class="section-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span>02 / ${t("assessment")}</div><h2>${t("whatMeasures")}</h2></div><p>${t("measureBody")}</p></div>
      <div class="measure-grid">${measures}</div>
    </section>
    <section class="start-panel">
      <div><span class="panel-kicker">NIVRA / 03</span><h2>${t("startLine")}</h2><p>${t("startBody")}</p></div>
      <button class="button button-lime" data-action="start" type="button">${t("assess")} ${icon("arrow", 17)}</button>
    </section>
  </section>`);
}

function progressBar() {
  const percent = Math.round((current / questions.length) * 100);
  return `<div class="progress-wrap"><div class="progress-meta"><span>${t("yourProgress")}</span><span>${percent}%</span></div><div class="progress-track"><span style="width:${percent}%"></span></div></div>`;
}

function quiz() {
  const q = questions[current];
  const selected = answers[q.id];
  const options = q.options.map((option, index) => `<button class="option ${selected === index ? "selected" : ""}" data-action="answer" data-index="${index}" type="button">
    <span class="option-letter">${String.fromCharCode(65 + index)}</span><span class="option-text">${text(option)}</span><span class="option-check">${icon("check", 15)}</span>
  </button>`).join("");
  const sideCategories = categoryOrder.map((id, index) => `<div class="quiz-category ${id === q.category ? "active" : ""} ${hasCategoryAnswer(id) ? "done" : ""}"><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${category(id).label}</strong><small>${category(id).description}</small></div>${hasCategoryAnswer(id) ? `<b>${icon("check", 13)}</b>` : ""}</div>`).join("");
  const canContinue = selected !== undefined;
  return shell(`<section class="quiz-screen">
    <div class="quiz-layout">
      <aside class="quiz-sidebar"><span class="sidebar-label">${t("assessment")}</span><h2>${t("heroCardTitle")}</h2><p>${t("heroCardBody")}</p><div class="category-list">${sideCategories}</div><div class="sidebar-private">${icon("lock", 15)} ${t("private")}</div></aside>
      <div class="quiz-main">
        ${progressBar()}
        <div class="question-header"><span class="question-count">${t("question")} ${String(current + 1).padStart(2, "0")} <em>${t("of")} ${String(questions.length).padStart(2, "0")}</em></span><span class="category-pill">${category(q.category).label}</span></div>
        <h1>${text(q.text)}</h1><p class="question-note">${t("chooseAnswer")}</p>
        <div class="options-list">${options}</div>
        <div class="quiz-error ${canContinue ? "hidden" : ""}" role="alert">${t("answerRequired")}</div>
        <div class="quiz-controls"><button class="button button-ghost ${current === 0 ? "invisible" : ""}" data-action="back" type="button">${icon("arrowBack", 17)} ${t("back")}</button><button class="button button-dark ${canContinue ? "" : "disabled"}" data-action="next" type="button">${current === questions.length - 1 ? t("finish") : t("next")} ${icon("arrow", 17)}</button></div>
      </div>
    </div>
  </section>`);
}

function hasCategoryAnswer(id) {
  return questions.filter((question) => question.category === id).every((question) => answers[question.id] !== undefined);
}

function calculateResults() {
  const categoryScores = {};
  categoryOrder.forEach((id) => {
    const categoryQuestions = questions.filter((question) => question.category === id);
    const earned = categoryQuestions.reduce((sum, question) => sum + question.options[answers[question.id]].score, 0);
    categoryScores[id] = { earned, max: categoryQuestions.length * 4, percent: Math.round((earned / (categoryQuestions.length * 4)) * 100) };
  });
  const total = Object.values(categoryScores).reduce((sum, item) => sum + item.earned, 0);
  const score = Math.round((total / (questions.length * 4)) * 100);
  let level = "Foundation";
  if (score >= 80) level = "Strategist";
  else if (score >= 60) level = "Practitioner";
  else if (score >= 40) level = "Explorer";
  return { score, level, categoryScores, ranked: categoryOrder.slice().sort((a, b) => categoryScores[b].percent - categoryScores[a].percent) };
}

function levelCopy(level) {
  const key = { Foundation: "levelFoundation", Explorer: "levelExplorer", Practitioner: "levelPractitioner", Strategist: "levelStrategist" }[level];
  return { name: t(key), body: t(`${key}Body`) };
}

function radarChart(result) {
  const points = (radius) => categoryOrder.map((id, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / categoryOrder.length;
    const value = radius * (result.categoryScores[id].percent / 100);
    return `${(140 + Math.cos(angle) * value).toFixed(1)},${(140 + Math.sin(angle) * value).toFixed(1)}`;
  }).join(" ");
  const grid = [40, 70, 100].map((radius) => `<polygon points="${categoryOrder.map((_, index) => { const angle = -Math.PI / 2 + (index * Math.PI * 2) / categoryOrder.length; return `${140 + Math.cos(angle) * radius},${140 + Math.sin(angle) * radius}`; }).join(" ")}" />`).join("");
  const axes = categoryOrder.map((_, index) => { const angle = -Math.PI / 2 + (index * Math.PI * 2) / categoryOrder.length; return `<line x1="140" y1="140" x2="${140 + Math.cos(angle) * 108}" y2="${140 + Math.sin(angle) * 108}" />`; }).join("");
  const labels = categoryOrder.map((id, index) => { const angle = -Math.PI / 2 + (index * Math.PI * 2) / categoryOrder.length; const x = 140 + Math.cos(angle) * 125; const y = 140 + Math.sin(angle) * 125; return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${escapeHtml(category(id).label.split(" ")[0])}</text>`; }).join("");
  return `<svg class="radar-chart" viewBox="0 0 280 280" role="img" aria-label="${t("yourProfile")}"><g class="radar-grid">${grid}${axes}</g><polygon class="radar-area" points="${points(108)}"></polygon><polygon class="radar-line" points="${points(108)}"></polygon>${labels}</svg>`;
}

function signalLabel(percent) {
  if (percent >= 75) return t("prompts").highSignal;
  if (percent >= 55) return t("prompts").mediumSignal;
  return t("prompts").lowSignal;
}

function resultsScreen() {
  results ??= calculateResults();
  const level = levelCopy(results.level);
  const strengths = results.ranked.slice(0, 2);
  const growth = results.ranked.slice(-2).reverse();
  const cards = (items, className) => items.map((id) => `<div class="signal-card ${className}"><div class="signal-top"><span class="signal-icon">${className === "strength-card" ? "↗" : "＋"}</span><span>${signalLabel(results.categoryScores[id].percent)}</span></div><strong>${category(id).label}</strong><div class="mini-bar"><span style="width:${results.categoryScores[id].percent}%"></span></div><small>${results.categoryScores[id].percent}% ${t("prompts").score}</small></div>`).join("");
  const breakdown = categoryOrder.map((id, index) => `<div class="breakdown-row"><div class="breakdown-label"><span class="breakdown-index">${String(index + 1).padStart(2, "0")}</span><strong>${category(id).label}</strong></div><div class="breakdown-bar"><span style="width:${results.categoryScores[id].percent}%"></span></div><b>${results.categoryScores[id].percent}%</b></div>`).join("");
  const recommendations = growth.map((id, index) => `<article class="recommendation"><span class="recommendation-number">0${index + 1}</span><div><span class="recommendation-label">${category(id).label}</span><h3>${ui[language].recommendationsByCategory[id]}</h3></div></article>`).join("");
  return shell(`<section class="results-screen" id="results-content">
    <div class="results-topbar"><div><div class="eyebrow"><span class="eyebrow-line"></span>${t("resultKicker")}</div><h1>${t("resultTitle")}</h1></div><div class="result-actions"><button class="button button-outline hide-print" data-action="print" type="button">${icon("print", 16)} ${t("print")}</button><button class="button button-ghost hide-print" data-action="restart" type="button">${icon("restart", 16)} ${t("retake")}</button></div></div>
    <div class="result-hero">
      <div class="score-card"><div class="score-ring" style="--score:${results.score * 3.6}deg"><div><strong>${results.score}</strong><span>/ 100</span></div></div><span class="score-label">${t("index")}</span><span class="score-private">${icon("lock", 13)} ${t("private")}</span></div>
      <div class="level-card"><span class="card-kicker">01 / ${t("yourProfile")}</span><div class="level-heading"><h2>${level.name}</h2><span class="level-badge">${results.level}</span></div><p>${level.body}</p><div class="level-scale"><span class="scale-active"></span><span></span><span></span><span></span></div><div class="scale-labels"><span>${t("levelFoundation")}</span><span>${t("levelStrategist")}</span></div></div>
      <div class="profile-card"><span class="card-kicker">02 / ${t("yourProfile")}</span>${radarChart(results)}</div>
    </div>
    <div class="signals-section"><div class="signals-column"><div class="subsection-title"><span>03</span><h2>${t("strengths")}</h2></div>${cards(strengths, "strength-card")}</div><div class="signals-column"><div class="subsection-title"><span>04</span><h2>${t("growthAreas")}</h2></div>${cards(growth, "growth-card")}</div></div>
    <section class="breakdown-section"><div class="section-heading compact"><div><div class="eyebrow"><span class="eyebrow-line"></span>05 / ${t("assessment")}</div><h2>${t("skillBreakdown")}</h2></div><span class="breakdown-total">${questions.length} ${t("categoryQuestions")}</span></div><div class="breakdown-list">${breakdown}</div></section>
    <section class="recommendations-section"><div class="section-heading compact"><div><div class="eyebrow"><span class="eyebrow-line"></span>06 / ${t("recommendations")}</div><h2>${t("recommendations")}</h2></div><p>${t("recommendationsBody")}</p></div><div class="recommendations-list">${recommendations || `<article class="recommendation"><span class="recommendation-number">01</span><h3>${t("recommendationFallback")}</h3></article>`}</div></section>
    <div class="print-note hide-print">${icon("print", 15)} <span>${t("printHint")}</span></div>
  </section>`);
}

function render() {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  app.innerHTML = screen === "landing" ? landing() : screen === "quiz" ? quiz() : resultsScreen();
  window.scrollTo({ top: 0, behavior: "auto" });
}

function start() {
  answers = {};
  current = 0;
  results = null;
  screen = "quiz";
  render();
}

function next() {
  const question = questions[current];
  if (answers[question.id] === undefined) {
    document.querySelector(".quiz-error")?.classList.remove("hidden");
    return;
  }
  if (current < questions.length - 1) {
    current += 1;
    render();
  } else {
    results = calculateResults();
    screen = "results";
    render();
  }
}

app.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;
  const action = actionTarget.dataset.action;
  if (action === "language") {
    language = language === "en" ? "ar" : "en";
    render();
  } else if (action === "start") {
    start();
  } else if (action === "home") {
    screen = "landing";
    render();
  } else if (action === "how") {
    if (screen !== "landing") { screen = "landing"; render(); }
    requestAnimationFrame(() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" }));
  } else if (action === "answer") {
    answers[questions[current].id] = Number(actionTarget.dataset.index);
    render();
  } else if (action === "back") {
    if (current > 0) { current -= 1; render(); }
  } else if (action === "next") {
    next();
  } else if (action === "restart") {
    start();
  } else if (action === "print") {
    window.print();
  }
});

render();