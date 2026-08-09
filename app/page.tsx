"use client";

import { useEffect, useRef, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const destinations = [
  { id: "map", no: "01", icon: "◎", title: "World Map", sub: "我的旅行地图" },
  { id: "about", no: "02", icon: "♙", title: "About Me", sub: "一本关于我的护照" },
  { id: "works", no: "03", icon: "✦", title: "Creative Works", sub: "灵感与创作收藏" },
  { id: "projects", no: "04", icon: "↗", title: "Projects", sub: "我做过的有趣事情" },
  { id: "experience", no: "05", icon: "⌁", title: "Experience", sub: "沿途留下的足迹" },
  { id: "skills", no: "06", icon: "◇", title: "Skills", sub: "旅行箱里的能力" },
  { id: "contact", no: "07", icon: "✉", title: "Contact", sub: "从这里寄出一封信" },
];

const travelStops = [
  { code: "UK", country: "英国", left: "51%", top: "29%", cities: ["Southampton"], note: "在这里学习时尚市场营销与品牌，也第一次真正把生活放进另一种文化里。" },
  { code: "FR", country: "法国", left: "52%", top: "34%", cities: [], note: "照片、城市与当时的故事，正在整理进这本旅行档案。" },
  { code: "IT", country: "意大利", left: "54%", top: "39%", cities: [], note: "照片、城市与当时的故事，正在整理进这本旅行档案。" },
  { code: "AT", country: "奥地利", left: "55%", top: "32%", cities: [], note: "照片、城市与当时的故事，正在整理进这本旅行档案。" },
  { code: "TR", country: "土耳其", left: "61%", top: "39%", cities: [], note: "照片、城市与当时的故事，正在整理进这本旅行档案。" },
  { code: "MT", country: "马耳他", left: "54%", top: "43%", cities: [], note: "照片、城市与当时的故事，正在整理进这本旅行档案。" },
  { code: "MA", country: "摩洛哥", left: "48%", top: "43%", cities: [], note: "照片、城市与当时的故事，正在整理进这本旅行档案。" },
  { code: "GR", country: "希腊", left: "58%", top: "40%", cities: [], note: "照片、城市与当时的故事，正在整理进这本旅行档案。" },
  { code: "IS", country: "冰岛", left: "44%", top: "23%", cities: [], note: "照片、城市与当时的故事，正在整理进这本旅行档案。" },
  { code: "AU", country: "澳大利亚", left: "84%", top: "75%", cities: ["Sydney"], note: "南半球的阳光、海风和城市天际线，被收进了我关于自由的一页。" },
  { code: "NZ", country: "新西兰", left: "93%", top: "81%", cities: [], note: "照片、城市与当时的故事，正在整理进这本旅行档案。" },
  { code: "TH", country: "泰国", left: "77%", top: "55%", cities: ["Chiang Mai"], note: "第一次更确定：我喜欢独自旅行，也喜欢在陌生城市里重新认识自己。" },
  { code: "JP", country: "日本", left: "88%", top: "38%", cities: [], note: "照片、城市与当时的故事，正在整理进这本旅行档案。" },
];

const works = [
  { type: "ACG / ILLUSTRATION", title: "从创作到社群", className: "work-blue", mark: "200+ WORKS" },
  { type: "SOCIAL MEDIA", title: "三账号内容矩阵", className: "work-film", mark: "5K+ FANS" },
  { type: "SHORT VIDEO", title: "百万播放内容策划", className: "work-orange", mark: "1M+ VIEWS" },
  { type: "PRODUCT DESIGN", title: "五月天主题周边", className: "work-stripe", mark: "100 PCS" },
];

const projects = [
  { tag: "CUSTOMER CAMPAIGN", title: "“周四厅堂主题活动日”", detail: "基于客户画像，从零完成主题策划、视觉物料、人员协调、现场执行和活动复盘，首场“小小银行家”被辖区评为优秀案例。", result: "1,000+ 触达" },
  { tag: "CULTURAL MARKETING", title: "剧目全周期品牌宣发", detail: "参与《无人生还》《敦煌奇妙夜》《猫》等剧目，从预热、爆发到收官设计内容节奏，并用受众数据迭代选题。", result: "+20% 点击率" },
  { tag: "CREATIVE IP EVENT", title: "千人级城市文化活动", detail: "参与“元宇宙·新消费·智西湖”与西泠书画青少年艺术大展，负责传播方案、社媒文案与视觉物料统筹。", result: "1W+ 阅读" },
];

function Plane() {
  return <span className="plane" aria-hidden="true">✈</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("UK");
  const [transitioning, setTransitioning] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const selectedStop = travelStops.find((stop) => stop.code === selectedCountry) ?? travelStops[0];

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const renderLight = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      hero.style.setProperty("--pointer-x", currentX.toFixed(4));
      hero.style.setProperty("--pointer-y", currentY.toFixed(4));
      frame = window.requestAnimationFrame(renderLight);
    };
    const onMove = (event: PointerEvent) => {
      targetX = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2));
    };
    const settle = () => {
      targetX = 0;
      targetY = 0;
    };

    frame = window.requestAnimationFrame(renderLight);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", settle);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", settle);
    };
  }, []);

  const travelTo = (id: string) => {
    setMenuOpen(false);
    setTransitioning(true);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => setTransitioning(false), 520);
    }, 420);
  };

  return (
    <main>
      <div className={`flight-transition ${transitioning ? "is-flying" : ""}`} aria-hidden="true"><Plane /><i /></div>

      <header className="topbar">
        <button className="brand" onClick={() => travelTo("home")} aria-label="回到首页">FH<span>✦</span></button>
        <div className="edition">THE TRAVEL ARCHIVE<br /><span>EST. 1999 · VOL. 01</span></div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          <span>{menuOpen ? "Close" : "Destinations"}</span><b>{menuOpen ? "×" : "☰"}</b>
        </button>
      </header>

      <div className={`destination-drawer ${menuOpen ? "open" : ""}`}>
        <p className="eyebrow">✈ CHOOSE A DESTINATION</p>
        <nav>
          {destinations.map((item) => (
            <button key={item.id} onClick={() => travelTo(item.id)}>
              <span>{item.no}</span><b>{item.icon} {item.title}</b><em>{item.sub}</em><i>↗</i>
            </button>
          ))}
        </nav>
      </div>

      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-sky-photo" style={{ backgroundImage: `url(${asset("/hero-sky-v2.jpg")})` }} aria-hidden="true" />
        <div className="hero-light-field" aria-hidden="true" />
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-film" aria-hidden="true" />
        <div className="hero-copy">
          <p className="hero-kicker">A PERSONAL ARCHIVE OF</p>
          <h1>FAY<br /><em>HUANG</em></h1>
          <div className="hero-tags"><span>MARKETING</span><i>✦</i><span>TRAVEL</span><i>✦</i><span>CREATIVITY</span></div>
          <p className="intro">欢迎来到我的人生旅行档案馆。<br />这里收藏沿途的故事、创意与成长。</p>
          <button className="ticket-button" onClick={() => setMenuOpen(true)}>
            <span><small>BOARDING PASS</small>CHOOSE A DESTINATION</span><b>✈</b>
          </button>
        </div>
        <div className="scroll-note"><span>SCROLL TO DEPART</span><i /></div>
        <p className="coordinates">30.2741° N<br />120.1551° E</p>
      </section>

      <section id="map" className="section map-section">
        <SectionTitle number="01" kicker="THE PLACES THAT SHAPED ME" title={<>My world is made of<br /><em>places & stories.</em></>} />
        <div className="map-layout">
          <div className="map-board">
            <img className="illustrated-map" src={asset("/travel-map.jpg")} alt="Fay 去过的国家手绘世界地图" />
            <div className="map-grid" />
            <div className="route route-a" /><div className="route route-b" /><div className="route route-c" />
            {travelStops.map((stop) => (
              <button key={stop.code} className={`map-pin ${selectedCountry === stop.code ? "active" : ""}`} style={{ left: stop.left, top: stop.top }} onClick={() => setSelectedCountry(stop.code)} aria-label={`查看${stop.country}旅行故事`}>
                <i /><span>{stop.code}</span>
              </button>
            ))}
            <div className="map-plane"><Plane /></div>
            <div className="map-caption"><small>TRAVEL LOG</small><b>14</b><span>COUNTRIES<br />AND COUNTING</span></div>
          </div>
          <aside className="story-card">
            <div className="photo-placeholder"><span>{selectedStop.code}</span><small>TRAVEL PHOTO<br />ARCHIVE IN PROGRESS</small></div>
            <p className="stamp">PASSPORT<br /><b>FAY ARCHIVE</b></p>
            <div className="story-copy">
              <p className="eyebrow">CURRENT DESTINATION · {selectedStop.country}</p>
              <h3>{selectedStop.country}<br />{selectedStop.cities[0] || "Travel Archive"}</h3>
              <p>“{selectedStop.note}”</p>
              <div className="city-tags">{selectedStop.cities.length ? selectedStop.cities.map((city) => <span key={city}>{city}</span>) : <span>城市档案待迁入</span>}</div>
              <button>OPEN TRAVEL JOURNAL <span>↗</span></button>
            </div>
          </aside>
        </div>
      </section>

      <section id="about" className="section paper-section">
        <SectionTitle number="02" kicker="MEET THE TRAVELLER" title={<>More than a résumé.<br /><em>This is my passport.</em></>} />
        <div className="passport-wrap">
          <article className="passport-card">
            <div className="passport-photo"><img src={asset("/resume-profile-source.png")} alt="黄菲洋" /></div>
            <div className="passport-info">
              <p>PERSONAL ARCHIVE · HANGZHOU, CHINA</p><h3>Fay Huang</h3>
              <div className="passport-fields">
                <span><small>DIRECTION</small>Marketing · Content</span><span><small>BASED IN</small>Hangzhou, China</span>
                <span><small>EDUCATION</small>Southampton · Marketing</span><span><small>LANGUAGES</small>中文 · English · 日本語</span>
              </div>
              <blockquote>“我相信好的营销，不只是让人看见，而是让人感受到。”</blockquote>
            </div>
            <div className="passport-seal">OPEN<br />TO WORK</div>
          </article>
          <div className="values-note"><p className="eyebrow">MY NORTH STAR</p><h3>Stay curious.<br />Make it human.<br />Keep moving.</h3><p>新闻传播与市场营销的双重背景，让我习惯从人、内容与业务三个角度理解问题。我想把观察变成创意，再把创意变成真实发生的体验。</p><a className="text-link" href={asset("/fay-huang-resume-travel-marketing.pdf")} download>下载旅游营销简历 ↓</a></div>
        </div>
      </section>

      <section id="works" className="section works-section">
        <SectionTitle number="03" kicker="THINGS I HAVE MADE" title={<>A cabinet of<br /><em>creative curiosities.</em></>} />
        <div className="works-grid">
          {works.map((work, index) => <article className={`work-card ${work.className}`} key={work.title} style={{ transform: `rotate(${index % 2 ? 1.2 : -1.1}deg)` }}><div className="work-visual"><b>{work.mark}</b><span>✦</span></div><p>{work.type}</p><h3>{work.title}</h3><button aria-label={`查看 ${work.title}`}>↗</button></article>)}
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <SectionTitle number="04" kicker="SELECTED CASE STUDIES" title={<>Ideas with a<br /><em>destination.</em></>} />
        <div className="project-list">
          {projects.map((project, index) => <article key={project.title}><span>0{index + 1}</span><div><p>{project.tag}</p><h3>{project.title}</h3><p className="project-detail">{project.detail}</p></div><b>{project.result}</b><button>EXPLORE CASE ↗</button></article>)}
        </div>
      </section>

      <section id="experience" className="section route-section">
        <SectionTitle number="05" kicker="THE JOURNEY SO FAR" title={<>Every stop taught me<br /><em>something new.</em></>} />
        <div className="timeline">
          <div className="timeline-line"><Plane /></div>
          {[
            ["2019—23", "JOURNALISM · 浙大城市学院", "统筹 4 场校级春秋招宣传，并在电视台与文化行业开始内容、短视频和活动策划实践。"],
            ["2023—24", "MARKETING · UNIVERSITY OF SOUTHAMPTON", "在英国完成时尚市场营销与品牌硕士，用英文研究消费者洞察、数字营销与品牌传播。"],
            ["2025—26", "CUSTOMER MARKETING · 杭州银行", "围绕全年营销节点策划主题活动，搭建三层客户触达漏斗，并产出 40+ 篇营销与品牌内容。"],
            ["NOW", "NEXT DESTINATION", "寻找旅游、品牌、内容与真实用户体验相遇的下一站。"],
          ].map((item, index) => <article key={item[0]} className={index % 2 ? "right" : "left"}><i /><span>{item[0]}</span><div><p>{item[1]}</p><h3>{item[2]}</h3><button>VIEW CHAPTER ↗</button></div></article>)}
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <SectionTitle number="06" kicker="WHAT I CARRY WITH ME" title={<>A suitcase full of<br /><em>useful things.</em></>} />
        <div className="suitcase">
          <div className="suitcase-handle" /><div className="suitcase-inner">
            {["CAMPAIGN", "BRANDING", "CONTENT", "PHOTOSHOP", "PREMIERE", "AFTER EFFECTS", "CAPCUT", "CANVA", "ENGLISH", "IELTS 7.0", "DATA REVIEW", "PROJECT MGMT"].map((skill, index) => <span key={skill} className={`sticker sticker-${(index % 6) + 1}`}>{index % 3 === 0 ? "✦ " : ""}{skill}</span>)}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="postcard">
          <div className="postcard-left"><p className="eyebrow">DESTINATION 07 · SAY HELLO</p><h2>Let&apos;s make<br /><em>something<br />memorable.</em></h2><p>如果你也相信好故事能让人走得更远，<br />欢迎从这里寄出一封信。</p></div>
          <div className="postcard-right"><div className="stamp-box">AIR MAIL<br /><b>✈</b><small>HANGZHOU</small></div><p>TO: <b>THE NEXT ADVENTURE</b></p><a href="mailto:jnhfy6228@outlook.com">jnhfy6228@outlook.com ↗</a><a href="tel:+8613357097378">+86 133 5709 7378 ↗</a><a href={asset("/fay-huang-resume-travel-marketing.pdf")} download>Download Résumé ↓</a><div className="post-lines"><i /><i /><i /></div></div>
        </div>
        <footer><b>FH<span>✦</span></b><p>MADE WITH CURIOSITY & SUNSHINE<br /><small>© 2026 FAY HUANG · ALL STORIES RESERVED</small></p><button onClick={() => travelTo("home")}>BACK TO THE SKY ↑</button></footer>
      </section>
    </main>
  );
}

function SectionTitle({ number, kicker, title }: { number: string; kicker: string; title: React.ReactNode }) {
  return <div className="section-title"><span>{number}</span><div><p>{kicker}</p><h2>{title}</h2></div><i /></div>;
}
