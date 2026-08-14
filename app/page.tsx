"use client";

import { useEffect, useRef, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const destinations = [
  { id: "about", no: "01", icon: "♙", title: "About Me", sub: "一本关于我的护照" },
  { id: "map", no: "02", icon: "◎", title: "World Map", sub: "我的旅行地图" },
  { id: "works", no: "03", icon: "✦", title: "Creative Works", sub: "灵感与创作收藏" },
  { id: "projects", no: "04", icon: "↗", title: "Projects", sub: "我做过的有趣事情" },
  { id: "experience", no: "05", icon: "⌁", title: "Experience", sub: "沿途留下的足迹" },
  { id: "skills", no: "06", icon: "◇", title: "Skills", sub: "旅行箱里的能力" },
  { id: "contact", no: "07", icon: "✉", title: "Contact", sub: "从这里寄出一封信" },
];

type TravelPhoto = [number, string];
type TravelStop = { code: string; country: string; left: string; top: string; cities: string[]; note: string; photos: TravelPhoto[] };

const travelStops: TravelStop[] = [
  { code: "UK", country: "英国", left: "51%", top: "29%", cities: ["南安普顿", "巴斯", "伯恩茅斯", "约克", "伦敦", "怀特岛", "剑桥", "朴茨茅斯"], note: "在这里完成硕士学习，也第一次真正把生活放进另一种文化里。", photos: [[89,"南安普顿"],[64,"Durdle Door"],[65,"伦敦"],[66,"伦敦"],[67,"伯恩茅斯"],[68,"剑桥"],[69,"巴斯"],[70,"怀特岛"],[71,"朴茨茅斯"]] },
  { code: "FR", country: "法国", left: "52%", top: "34%", cities: ["巴黎"], note: "巴黎让我记住：一座城市的品牌，藏在无数日常细节里。", photos: [[51,"巴黎"],[52,"巴黎"]] },
  { code: "IT", country: "意大利", left: "54%", top: "39%", cities: ["佛罗伦萨", "罗马", "多洛米蒂 · Bolzano"], note: "从文艺复兴城市到多洛米蒂，风景本身就是最有力量的叙事。", photos: [[26,"佛罗伦萨"],[27,"多洛米蒂"],[28,"Bolzano"],[29,"罗马"],[30,"罗马"]] },
  { code: "AT", country: "奥地利", left: "55%", top: "32%", cities: ["维也纳", "哈尔施塔特", "圣沃尔夫冈", "Salzburg"], note: "湖区、山谷与古典城市共同组成一段安静的欧洲夏天。", photos: [[15,"Salzburg"],[16,"阿尔卑斯山区"],[17,"阿尔卑斯山区"],[18,"奥地利湖区"],[19,"奥地利湖区"],[20,"奥地利湖区"]] },
  { code: "TR", country: "土耳其", left: "61%", top: "39%", cities: ["伊斯坦布尔", "卡帕多奇亚", "安塔利亚", "费特希耶", "安卡拉", "伊兹密尔"], note: "横跨大陆的旅程，让历史、海岸和生活方式在同一条路线上相遇。", photos: [[6,"伊兹密尔"],[7,"伊斯坦布尔"],[8,"卡帕多奇亚"],[9,"卡帕多奇亚"],[10,"安卡拉"],[11,"安塔利亚"],[12,"棉花堡"],[13,"费特希耶"],[14,"鸽子谷"],[21,"安塔利亚"]] },
  { code: "MT", country: "马耳他", left: "54%", top: "43%", cities: ["Malta"], note: "被地中海包围的岛屿，颜色像一卷被阳光晒过的胶片。", photos: [[81,"马耳他"],[82,"马耳他"],[83,"马耳他"]] },
  { code: "MA", country: "摩洛哥", left: "48%", top: "43%", cities: ["卡萨布兰卡", "马拉喀什", "拉巴特", "阿加迪尔"], note: "这里的颜色、纹样和市场气味，让旅行变成一种感官记忆。", photos: [[31,"卡萨布兰卡"],[32,"卡萨布兰卡"],[33,"拉巴特"],[34,"阿加迪尔"],[35,"阿加迪尔"],[36,"马拉喀什"]] },
  { code: "GR", country: "希腊", left: "58%", top: "40%", cities: ["扎金索斯", "雅典"], note: "古老遗迹与透明海水之间，是希腊最迷人的反差。", photos: [[22,"扎金索斯"],[23,"扎金索斯"],[84,"扎金索斯"],[24,"雅典"],[25,"雅典"]] },
  { code: "IS", country: "冰岛", left: "44%", top: "23%", cities: ["Iceland"], note: "风、黑色土地和辽阔天际，让人重新理解自然的尺度。", photos: [[2,"冰岛"],[3,"冰岛"]] },
  { code: "AU", country: "澳大利亚", left: "84%", top: "75%", cities: ["悉尼"], note: "南半球的阳光、海风和城市天际线，被收进了我关于自由的一页。", photos: [[57,"悉尼"],[58,"悉尼"],[59,"悉尼"]] },
  { code: "NZ", country: "新西兰", left: "93%", top: "81%", cities: ["北岛", "南岛", "皇后镇"], note: "从北岛到南岛，公路把雪山、湖泊与旷野连成一封很长的信。", photos: [[41,"北岛"],[42,"北岛"],[43,"南岛"],[44,"南岛"],[45,"皇后镇"]] },
  { code: "TH", country: "泰国", left: "77%", top: "55%", cities: ["清迈", "普吉"], note: "第一次更确定：我喜欢独自旅行，也喜欢在陌生城市里重新认识自己。", photos: [[53,"普吉"],[54,"清迈"]] },
  { code: "JP", country: "日本", left: "88%", top: "38%", cities: ["京都", "宇治", "大阪", "奈良", "东京", "镰仓", "横滨"], note: "传统与当代之间细腻的秩序感，是我对日本最深的观察。", photos: [[46,"京都"],[47,"大阪"],[48,"大阪"],[49,"宇治"],[50,"宇治"]] },
];

const chinaStops: TravelStop[] = [
  { code:"XJ", country:"新疆", left:"26%", top:"30%", cities:["阿勒泰"], note:"雪山、草原与很长的公路，让目的地之外的过程也成为旅行。", photos:[[37,"阿勒泰"],[38,"阿勒泰"],[39,"阿勒泰"],[40,"阿勒泰"]] },
  { code:"XZ", country:"西藏", left:"31%", top:"58%", cities:["拉萨", "珠峰大本营", "羊卓雍措"], note:"在高原上，距离和时间都拥有了与城市完全不同的意义。", photos:[[73,"拉萨"],[74,"拉萨"],[75,"珠峰大本营"],[76,"羊卓雍措"]] },
  { code:"QH", country:"青海", left:"42%", top:"49%", cities:["青海"], note:"湖泊、荒原和公路构成了一种宽阔、安静的自由。", photos:[[78,"青海"],[79,"青海"]] },
  { code:"GS", country:"甘肃", left:"49%", top:"45%", cities:["张掖", "敦煌 · 莫高窟"], note:"自然地貌与千年文化在这里彼此照亮。", photos:[[61,"张掖"],[62,"张掖"],[63,"莫高窟"]] },
  { code:"JL", country:"吉林", left:"80%", top:"28%", cities:["吉林", "延边"], note:"北方的冬天和边境城市，让熟悉的国内旅行拥有另一种气质。", photos:[[4,"吉林"],[5,"延边"]] },
  { code:"ZJ", country:"浙江", left:"71%", top:"57%", cities:["温岭"], note:"从这里出发，也一次次回到这里。", photos:[[55,"温岭"]] },
  { code:"SN", country:"陕西", left:"57%", top:"51%", cities:["西安"], note:"历史不是遥远的背景，而是仍然参与城市生活的一部分。", photos:[[72,"西安"],[85,"西安美食"],[86,"西安美食"]] },
  { code:"HN", country:"湖南", left:"61.5%", top:"66.5%", cities:["长沙"], note:"鲜活、热烈、有自己的城市节奏。", photos:[[77,"长沙"],[87,"长沙"],[88,"湖南美食"]] },
  { code:"HI", country:"海南", left:"54.5%", top:"85%", cities:["三亚"], note:"海风、热带阳光和漫长夏天。", photos:[[1,"三亚"],[56,"三亚"]] },
  { code:"HK", country:"香港", left:"65%", top:"76%", cities:["香港"], note:"密度、速度与电影感叠在同一座城市。", photos:[[80,"香港"]] },
  { code:"MO", country:"澳门", left:"63.5%", top:"76.5%", cities:["澳门"], note:"在很小的尺度里，旧建筑与旅行记忆交错出现。", photos:[[60,"澳门"]] },
];

const visitedChina = ["吉林", "内蒙古", "北京", "江苏", "西藏", "青海", "浙江", "安徽", "陕西", "上海", "江西", "福建", "云南", "湖南", "新疆", "广东", "海南", "甘肃", "宁夏", "香港", "澳门"];

const works = [
  {
    id: "community", type: "CREATIVE COMMUNITY", title: "从创作到社群", mark: "200+ WORKS",
    image: "/works/creative-community.jpg", imagePosition: "center 42%", selected: "12 selected works", cases: "2 case studies",
    intro: "从持续创作到社群协作，记录个人视觉语言如何在反馈、共创与长期更新中逐渐成形。",
    highlights: ["原创插画与角色视觉", "社群内容与互动", "创作过程与迭代", "作品反馈与复盘"],
  },
  {
    id: "social", type: "SOCIAL MEDIA", title: "三账号内容矩阵", mark: "5K+ FANS",
    image: "/works/social-media.jpg", imagePosition: "center 45%", selected: "18 selected posts", cases: "3 platform studies",
    intro: "独立运营小红书、抖音等内容账号，通过选题、用户画像与平台反馈持续迭代内容方向。",
    highlights: ["三平台内容矩阵", "用户与流量洞察", "选题、发布与复盘", "5K+ 累计粉丝"],
  },
  {
    id: "video", type: "SHORT VIDEO", title: "百万播放内容策划", mark: "1M+ VIEWS",
    image: "/works/short-video.jpg", imagePosition: "center 42%", selected: "9 selected videos", cases: "2 viral case studies",
    intro: "从热点判断、脚本结构到剪辑发布，用真实播放与互动反馈验证短视频内容策略。",
    highlights: ["脚本与叙事节奏", "热点内容策划", "剪辑与包装", "百万级累计播放"],
  },
  {
    id: "commerce", type: "CREATIVE COMMERCE", title: "从创意到交付：同人周边项目", mark: "100 PCS",
    image: "/works/creative-commerce.jpg", imagePosition: "center 43%", selected: "1 complete journey", cases: "7-step SOP",
    intro: "以同人亚克力立牌为例，完整呈现一个创意如何经过设计、供应链、营销与履约，最终成为被用户收到的产品。",
    highlights: ["原创视觉与产品设计", "供应商与打样管理", "社媒营销与代理合作", "订单履约与售后"],
  },
];

const commerceJourney = [
  ["01", "INSIGHT / IDEA", "确定 IP、角色与产品概念", "从受众偏好与同人语境出发，明确角色、使用场景和产品定位。"],
  ["02", "CREATION", "原创插画 / 视觉设计", "完成角色表达、构图与视觉语言，让创意具有清晰而可识别的情绪。"],
  ["03", "PRODUCT DESIGN", "尺寸、版式、材质、工艺、包装", "将平面作品转换为可生产文件，同时确定结构、材料与最终呈现。"],
  ["04", "PRODUCTION", "寻找供应商 → 比价 → 打样 → 修改 → 批量生产", "比较报价与工艺，检查样品并多轮修正，控制质量与生产节奏。"],
  ["05", "MARKETING", "产品图 → 宣传物料 → 社媒内容 → 上架", "搭建完整的产品表达，让创作被看见、理解并产生购买兴趣。"],
  ["06", "DISTRIBUTION", "代理合作 / 渠道推广", "连接代理与垂直社群，根据渠道特点调整传播方式与合作机制。"],
  ["07", "FULFILLMENT", "订单 → 包装 → 发货 → 售后", "完成订单管理、包装、物流和售后，让创意真正抵达用户手中。"],
];

const bankCampaigns = ["银发暖心堂", "螺钿绮梦，杭银相伴", "贵宾客户尊享会", "小小银行家"];
const bankProcess = [
  ["01", "CONCEPT", "基于总行营销要求与支行客群，确定月度主题与活动切入点。"],
  ["02", "PLAN", "撰写活动方案、PPT、主持稿与人员分工，明确现场流程。"],
  ["03", "CREATE", "制作海报、宣传稿及现场物料，并协调理财、柜面等条线。"],
  ["04", "EXECUTE", "参与邀约、布置、主持与现场执行，记录客户反馈与意向。"],
  ["05", "REVIEW", "整理照片、数据与活动总结，为下一轮主题活动沉淀经验。"],
];

const teaJourney = [
  ["01", "DISCOVER", "Market & Cultural Research", "调研主流小罐茶产品、年轻消费者偏好及景宁畲族文化与相关品牌案例。"],
  ["02", "DEFINE", "Brand Positioning", "聚焦“景宁地域文化 × 畲族元素 × 年轻化小罐茶”，以年轻上班族及学生为主要参考人群。"],
  ["03", "DESIGN", "Visual Direction", "参与 Logo、字体、品牌色彩与包装的早期概念探索；最终视觉由专业设计师基于团队方向深化。"],
  ["04", "PRODUCT", "From Tea to Product", "参与传统炒青绿茶选品、包装规格及竞品产品形态讨论，探索更便携的商品形式。"],
  ["05", "COMMUNICATE", "Brand Story & Content", "从年轻消费者视角参与内容调整，并完成部分 Slogan、品牌及社交媒体文案初稿。"],
  ["06", "LAUNCH", "First Offline Market Test", "参与杭州天目里首场线下测试的摊位陈列、宣传物料、现场销售与消费者沟通。"],
];

function Plane() {
  return <span className="plane" aria-hidden="true">✈</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("UK");
  const [selectedChina, setSelectedChina] = useState("XJ");
  const [mapMode, setMapMode] = useState<"world" | "china">("world");
  const [openWork, setOpenWork] = useState<string | null>(null);
  const [openCase, setOpenCase] = useState<string>("bank");
  const [transitioning, setTransitioning] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const selectedStop = mapMode === "world"
    ? travelStops.find((stop) => stop.code === selectedCountry) ?? travelStops[0]
    : chinaStops.find((stop) => stop.code === selectedChina) ?? chinaStops[0];

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const renderLight = () => {
      currentX += (targetX - currentX) * 0.065;
      currentY += (targetY - currentY) * 0.065;
      hero.style.setProperty("--sky-x", `${(-currentX * 18).toFixed(2)}px`);
      hero.style.setProperty("--sky-y", `${(-currentY * 11).toFixed(2)}px`);
      hero.style.setProperty("--ray-x", `${(currentX * 18).toFixed(2)}px`);
      hero.style.setProperty("--ray-y", `${(currentY * 9).toFixed(2)}px`);
      hero.style.setProperty("--ray-rotate", `${(currentX * 1.35).toFixed(3)}deg`);
      hero.style.setProperty("--glow-x", `${(currentX * 1.8).toFixed(3)}%`);
      hero.style.setProperty("--glow-y", `${(currentY * 1.1).toFixed(3)}%`);
      hero.style.setProperty("--copy-x", `${(currentX * 5).toFixed(2)}px`);
      hero.style.setProperty("--copy-y", `${(currentY * 3).toFixed(2)}px`);
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

  useEffect(() => {
    let frame = 0;
    const updateScrollScenes = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>("[data-flight-divider]").forEach((departure) => {
        const rect = departure.getBoundingClientRect();
        const distance = Math.max(1, rect.height - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / distance));
        departure.style.setProperty("--plane-y", `${91 - progress * 132}vh`);
        departure.style.setProperty("--trail-height", `${6 + progress * 122}vh`);
        departure.style.setProperty("--reveal-top", `${102 - progress * 108}%`);
        departure.style.setProperty("--departure-copy", `${Math.max(0, Math.min(1, 1 - progress * 1.7))}`);
      });
      const gallery = galleryRef.current;
      if (gallery) {
        const rect = gallery.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height * .45)));
        gallery.style.setProperty("--title-scale", (.72 + progress * .28).toFixed(3));
        gallery.style.setProperty("--title-opacity", Math.max(0, Math.min(1, progress * 1.7)).toFixed(3));
        gallery.style.setProperty("--title-blur", `${Math.max(0, 8 - progress * 11).toFixed(2)}px`);
        gallery.classList.toggle("is-scattered", progress > .22);
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollScenes);
    };
    updateScrollScenes();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
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
        <div className="edition">THE TRAVEL ARCHIVE<br /><span>A JOURNEY IN PROGRESS · VOL. 01</span></div>
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
        <div className="hero-cloud-drift" style={{ backgroundImage: `url(${asset("/hero-sky-v2.jpg")})` }} aria-hidden="true" />
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

      <FlightDivider number="01" label={<>SOAR THROUGH<br />THE SKY</>} title="ABOUT FAY" subtitle="open the passport" first />

      <section id="about" className="section paper-section">
        <SectionTitle number="01" kicker="MEET THE TRAVELLER" title={<>More than a résumé.<br /><em>This is my passport.</em></>} />
        <div className="about-desk">
          <figure className="interest-object phone-player" tabIndex={0} aria-label="音乐：Lana Del Rey">
            <div className="phone-shell"><img src={asset("/about/lana-player.png")} alt="Lana Del Rey 音乐播放界面" /></div>
            <figcaption>MUSIC · LANA DEL REY</figcaption>
          </figure>
          <figure className="interest-object camera-object" tabIndex={0} aria-label="摄影">
            <img src={asset("/about/camera-transparent.png")} alt="Fujifilm 相机" /><figcaption>PHOTOGRAPHY · 摄影</figcaption>
          </figure>
          <figure className="interest-object game-sticker" tabIndex={0} aria-label="游戏：塞尔达传说">
            <img src={asset("/about/zelda.jpg")} alt="塞尔达传说" /><figcaption>GAMES · ZELDA</figcaption>
          </figure>
          <figure className="interest-object switch-sticker" tabIndex={0} aria-label="Nintendo Switch">
            <img src={asset("/about/nintendo-switch.jpg")} alt="Nintendo Switch" /><figcaption>PLAY</figcaption>
          </figure>
          <figure className="interest-object headphones-object" tabIndex={0} aria-label="音乐与耳机">
            <img src={asset("/about/headphones-transparent.png")} alt="耳机" /><figcaption>ALWAYS LISTENING · 音乐</figcaption>
          </figure>
          <figure className="interest-object cinema-sticker" tabIndex={0} aria-label="最喜欢的系列电影：指环王">
            <img src={asset("/about/lord-of-the-rings.png")} alt="指环王：护戒使者电影海报" /><figcaption>THE LORD OF THE RINGS · 指环王</figcaption>
          </figure>
          <figure className="interest-object art-sticker" tabIndex={0} aria-label="画画与视觉创作">
            <img src={asset("/about/art-palette.png")} alt="画板与画笔" /><figcaption>DRAWING · 画画</figcaption>
          </figure>

          <div className="desk-pencil pencil-one" aria-hidden="true" />
          <div className="desk-pencil pencil-two" aria-hidden="true" />
          <div className="paperclip clip-one" aria-hidden="true" />
          <div className="paperclip clip-two" aria-hidden="true" />
          <div className="coffee-ring" aria-hidden="true" />
          <div className="ticket-stub" aria-hidden="true"><small>BOARDING</small><b>HGH → ANYWHERE</b><span>FAY · 01</span></div>
          <div className="torn-note" aria-hidden="true">remember to<br /><b>stay curious</b> ✦</div>

          <article className="passport-book" aria-label="Fay Huang 的个人档案护照">
            <div className="passport-spine" aria-hidden="true" />
            <section className="passport-page passport-notes">
              <p className="passport-page-label">PERSONAL <span>· 关于我</span></p>
              <div className="passport-route" aria-hidden="true"><span>HANGZHOU</span><i>✈ · · · · · · · · · · · · ·</i><span>EVERYWHERE</span></div>
              <div className="passport-intro">
                <small>THE TRAVEL ARCHIVE · ABOUT</small>
                <h3>A traveller who collects<br /><em>places, stories & ideas.</em></h3>
                <p>I observe the world through a journalist&apos;s eyes, then turn those observations into stories, ideas and experiences through marketing. Travel keeps me curious about people, culture and the small details that make a place unforgettable.</p>
                <p className="passport-cn">我用新闻人的眼睛观察世界，也用营销与创作把观察变成故事、想法与体验。旅行让我始终对人、文化和那些让一座城市难忘的细节保持好奇。</p>
              </div>
              <div className="passport-collections">
                <span><small>I COLLECT · 我收藏</small>Places · Photographs · Stories · Little observations</span>
                <span><small>I CREATE · 我创造</small>Campaigns · Content · Visuals · Digital Experiments</span>
                <span><small>I&apos;M CURIOUS ABOUT · 我好奇</small>People · Culture · Brands · The way stories travel</span>
              </div>
              <div className="north-star-note">
                <p>MY NORTH STAR</p>
                <strong>Stay curious. Keep moving.</strong>
              </div>
              <div className="passport-numbers">
                <small>BY THE NUMBERS · 数字里的我</small>
                <p><b>10+</b> Places <i>/</i> <b>5K+</b> Followers <i>/</i> <b>100K+</b> Views <i>/</i> <b>7.0</b> IELTS</p>
              </div>
            </section>

            <section className="passport-page passport-id">
              <p className="passport-page-label">PROFESSIONAL <span>· 职业档案</span></p>
              <div className="professional-head">
                <div><h3>FAY<br /><em>HUANG</em></h3><p>MARKETING · CONTENT · CREATIVE</p></div>
                <div className="passport-photo"><img src={asset("/resume-profile-source.png")} alt="黄菲洋" /></div>
              </div>
              <div className="professional-fields">
                <span><small>BASED IN · 常驻</small>Hangzhou, China</span>
                <span><small>EDUCATION · 教育</small>MA Fashion Marketing &amp; Branding<br />BA Journalism</span>
                <span><small>EXPERIENCE · 经历</small>Marketing Campaigns · Content · Customer Engagement</span>
                <span><small>LANGUAGES · 语言</small>Chinese · English (IELTS 7.0)</span>
                <span><small>TOOLS · 工具</small>Photoshop · Premiere · CapCut · Figma · AI Tools</span>
                <span><small>INTERESTS · 兴趣</small>Travel · Photography · Visual Culture · Games</span>
              </div>
              <div className="passport-resume-cta">
                <p>Want the professional version?<small>想看看更职业的我？</small></p>
                <a href={asset("/fay-huang-resume-travel-marketing.pdf")} download>VIEW RESUME <span>→</span></a>
              </div>
            </section>
          </article>
        </div>
      </section>

      <FlightDivider number="02" label={<>FOLLOW THE<br />ROUTE</>} title="THE WORLD" subtitle="according to Fay" />

      <section id="map" className="section map-section">
        <SectionTitle number="02" kicker="THE PLACES THAT SHAPED ME" title={<>My world is made of<br /><em>places & stories.</em></>} />
        <div className="atlas-tabs" role="tablist" aria-label="切换世界地图与中国地图">
          <button className={mapMode === "world" ? "active" : ""} onClick={() => setMapMode("world")} role="tab" aria-selected={mapMode === "world"}><span>01</span> WORLD · 14 COUNTRIES</button>
          <button className={mapMode === "china" ? "active" : ""} onClick={() => setMapMode("china")} role="tab" aria-selected={mapMode === "china"}><span>02</span> CHINA · 21 REGIONS</button>
        </div>
        <div className="map-layout">
          <div className={`map-board ${mapMode === "china" ? "china-board" : ""}`}>
            <img className="illustrated-map" src={asset(mapMode === "world" ? "/travel-map.jpg" : "/china-travel-map-v2.jpg")} alt={mapMode === "world" ? "Fay 去过的国家手绘世界地图" : "Fay 去过的中国省份复古手绘地图"} />
            <div className="map-grid" />
            {(mapMode === "world" ? travelStops : chinaStops).map((stop) => (
              <button key={stop.code} className={`map-pin ${(mapMode === "world" ? selectedCountry : selectedChina) === stop.code ? "active" : ""}`} style={{ left: stop.left, top: stop.top }} onClick={() => mapMode === "world" ? setSelectedCountry(stop.code) : setSelectedChina(stop.code)} aria-label={`查看${stop.country}旅行故事`}>
                <i /><span>{stop.code}</span>
              </button>
            ))}
            {mapMode === "world" && <div className="map-plane"><Plane /></div>}
            <div className="map-caption"><small>TRAVEL LOG</small><b>{mapMode === "world" ? "14" : "21"}</b><span>{mapMode === "world" ? <>COUNTRIES<br />AND COUNTING</> : <>REGIONS<br />ACROSS CHINA</>}</span></div>
            {mapMode === "china" && <small className="map-credit">ILLUSTRATED FOR FAY&apos;S ARCHIVE</small>}
          </div>
          <aside className="story-card">
            <div className="story-photo"><img src={asset(`/travel/travel-${String(selectedStop.photos[0][0]).padStart(3,"0")}.jpg`)} alt={`${selectedStop.country}旅行照片`} /><small>{selectedStop.photos[0][1]} · FAY&apos;S ARCHIVE</small></div>
            <p className="stamp">PASSPORT<br /><b>FAY ARCHIVE</b></p>
            <div className="story-copy">
              <p className="eyebrow">CURRENT DESTINATION · {selectedStop.country}</p>
              <h3>{selectedStop.country}<br />{selectedStop.cities[0] || "Travel Archive"}</h3>
              <p>“{selectedStop.note}”</p>
              <div className="city-tags">{selectedStop.cities.map((city) => <span key={city}>{city}</span>)}</div>
              <button onClick={() => galleryRef.current?.scrollIntoView({behavior:"smooth", block:"center"})}>OPEN PHOTO JOURNAL <span>↓</span></button>
            </div>
          </aside>
        </div>
        <div className="atlas-index">
          {(mapMode === "world" ? travelStops : chinaStops).map((stop) => <button key={stop.code} className={(mapMode === "world" ? selectedCountry : selectedChina) === stop.code ? "active" : ""} onClick={() => mapMode === "world" ? setSelectedCountry(stop.code) : setSelectedChina(stop.code)}>{stop.country}<small>{stop.code}</small></button>)}
        </div>
        {mapMode === "china" && <div className="visited-tape"><b>ALSO VISITED</b>{visitedChina.map((place) => <span key={place}>{place}</span>)}</div>}
        <div className="travel-gallery" ref={galleryRef} key={`${mapMode}-${selectedStop.code}`}>
          <div className="gallery-depth-copy"><small>PHOTO LOG · {selectedStop.code}</small><strong>{selectedStop.country}</strong><em>{selectedStop.photos.length} memories from the road</em></div>
          <div className="photo-scatter">
            {selectedStop.photos.map((photo, index) => {
              const angles = [-18, 9, -6, 19, -11, 5, 14, -3, 11, -14];
              const x = [-34, 22, -10, 36, -25, 14, -38, 29, -17, 8][index % 10];
              const y = [12, -18, 25, 6, -26, 18, -6, 29, -20, 8][index % 10];
              return <figure className="scatter-card" key={`${photo[0]}-${photo[1]}`} style={{"--angle":`${angles[index % 10]}deg`,"--scatter-x":`${x}vw`,"--scatter-y":`${y}px`,"--delay":`${index * 35}ms`} as React.CSSProperties}>
                <img loading="lazy" src={asset(`/travel/travel-${String(photo[0]).padStart(3,"0")}.jpg`)} alt={`${selectedStop.country} · ${photo[1]}`} />
                <figcaption><span>{String(index + 1).padStart(2,"0")}</span>{photo[1]}<small>{selectedStop.country}</small></figcaption>
              </figure>;
            })}
          </div>
        </div>
      </section>

      <FlightDivider number="03" label={<>COLLECT THE<br />IDEAS</>} title="CREATE" subtitle="things I've made" />

      <section id="works" className="section works-section">
        <SectionTitle number="03" kicker="THINGS I HAVE MADE" title={<>A cabinet of<br /><em>creative curiosities.</em></>} />
        <div className="works-grid">
          {works.map((work, index) => <article className={`work-card ${openWork === work.id ? "is-open" : ""}`} key={work.id} style={{ "--card-tilt": `${index % 2 ? 1.2 : -1.1}deg` } as React.CSSProperties}>
            <button className="work-cover-button" aria-expanded={openWork === work.id} aria-controls={`work-drawer-${work.id}`} onClick={() => setOpenWork(openWork === work.id ? null : work.id)}>
              <div className="work-visual">
                <img src={asset(work.image)} alt={`${work.title}作品封面`} style={{ objectPosition: work.imagePosition }} />
                <span className="work-number">0{index + 1}</span>
                <span className="work-postmark">{work.mark}</span>
                <div className="work-hover-copy">
                  <small>WHAT&apos;S INSIDE</small>
                  <b>{work.selected}</b>
                  <b>{work.cases}</b>
                  <b>Visual process</b>
                  <b>Results &amp; reflections</b>
                  <strong>OPEN DRAWER <i>→</i></strong>
                </div>
              </div>
              <span className="work-meta"><small>{work.type}</small><strong>{work.title}</strong><i>{openWork === work.id ? "−" : "↗"}</i></span>
            </button>
          </article>)}
        </div>
        <div className={`work-drawer-panel ${openWork ? "is-open" : ""}`} id={openWork ? `work-drawer-${openWork}` : undefined} aria-live="polite">
          {openWork && (() => {
            const work = works.find((item) => item.id === openWork) ?? works[0];
            return <div className="work-drawer-inner">
              <div className="drawer-heading">
                <div><p>DRAWER {String(works.findIndex((item) => item.id === work.id) + 1).padStart(2, "0")} · {work.type}</p><h3>{work.title}</h3><p className="drawer-intro">{work.intro}</p></div>
                <button onClick={() => setOpenWork(null)} aria-label="关闭作品抽屉">CLOSE ×</button>
              </div>
              {work.id === "commerce" ? <>
                <div className="commerce-lead">
                  <figure><img src={asset(work.image)} alt="同人亚克力立牌项目，从设计到实物交付" /></figure>
                  <div><small>FEATURED CASE · 同人亚克力立牌</small><h4>One idea.<br /><em>Seven real steps.</em></h4><p>它不只是一次视觉设计，而是一段从用户洞察、创作和产品化，到生产、营销、渠道与履约的完整实践。</p><span>CREATIVE × PRODUCT × OPERATIONS</span></div>
                </div>
                <div className="sop-heading"><span>SOP JOURNEY</span><p>从创意到交付 / FROM IDEA TO DELIVERY</p></div>
                <ol className="sop-journey">
                  {commerceJourney.map((step) => <li key={step[0]}><span>{step[0]}</span><div><small>{step[1]}</small><h5>{step[2]}</h5><p>{step[3]}</p></div><i aria-hidden="true">↓</i></li>)}
                </ol>
              </> : <div className="standard-work-detail">
                <figure><img src={asset(work.image)} alt={`${work.title}精选内容`} /></figure>
                <div><small>SELECTED ARCHIVE</small><h4>{work.mark}</h4><p>{work.intro}</p><ul>{work.highlights.map((item) => <li key={item}>{item}</li>)}</ul><p className="drawer-note">更多作品图片、过程稿与数据复盘将在下一轮素材整理后继续补充。</p></div>
              </div>}
            </div>;
          })()}
        </div>
      </section>

      <FlightDivider number="04" label={<>TURN IDEAS<br />INTO ACTION</>} title="PROJECTS" subtitle="ideas in motion" />

      <section id="projects" className="section projects-section">
        <SectionTitle number="04" kicker="SELECTED MARKETING, CONTENT & EVENT WORK" title={<>Selected Cases.<br /><em>Ideas, put into motion.</em></>} />
        <div className="cases-intro"><p>不是一份经历清单，而是一组关于我如何观察、构思、协作并让想法落地的真实工作档案。</p><span>DEPTH OF INVOLVEMENT<br />参与深度决定展示层级</span></div>

        <div className="case-index" aria-label="Selected Cases 项目目录">
          <button className={openCase === "bank" ? "active" : ""} onClick={() => setOpenCase(openCase === "bank" ? "" : "bank")} aria-expanded={openCase === "bank"}>
            <span>FEATURED 01</span><div><small>CAMPAIGN PLANNING / CUSTOMER ENGAGEMENT</small><strong>厅堂主题营销系列</strong><p>支行层面的主题策划、内容物料、协同执行与活动复盘。</p></div><b>CORE OWNER<br /><em>支行执行层面</em></b><i>{openCase === "bank" ? "−" : "↘"}</i>
          </button>
          <button className={openCase === "tea" ? "active" : ""} onClick={() => setOpenCase(openCase === "tea" ? "" : "tea")} aria-expanded={openCase === "tea"}>
            <span>FEATURED 02</span><div><small>EARLY-STAGE BRAND PROJECT</small><strong>畲族特色茶品牌 0→1</strong><p>从文化研究、品牌方向到第一次线下市场测试。</p></div><b>CORE MEMBER<br /><em>Brand & Marketing Support</em></b><i>{openCase === "tea" ? "−" : "↘"}</i>
          </button>
          <button className={openCase === "theatre" ? "active" : ""} onClick={() => setOpenCase(openCase === "theatre" ? "" : "theatre")} aria-expanded={openCase === "theatre"}>
            <span>FEATURED 03</span><div><small>THEATRE CONTENT / SOCIAL MEDIA</small><strong>从舞台到屏幕：剧目内容宣发</strong><p>参与《敦煌奇妙夜》《无人生还》的内容发布与现场记录。</p></div><b>CONTRIBUTOR<br /><em>参与执行</em></b><i>{openCase === "theatre" ? "−" : "↘"}</i>
          </button>
          <button className={openCase === "art" ? "active" : ""} onClick={() => setOpenCase(openCase === "art" ? "" : "art")} aria-expanded={openCase === "art"}>
            <span>MINI CASE</span><div><small>EVENT CONTENT / ON-SITE EXECUTION</small><strong>“同绘童梦”少年艺术大展</strong><p>作品整理、展陈协助、现场执行与官方总结推送。</p></div><b>SUPPORT ROLE<br /><em>现场与内容执行</em></b><i>{openCase === "art" ? "−" : "↘"}</i>
          </button>
        </div>

        <div className={`selected-case-body ${openCase ? "is-open" : ""}`} aria-live="polite">
          {openCase === "bank" && <article className="case-study bank-case">
            <header className="case-hero">
              <div><p>FEATURED CASE 01 · CAMPAIGN PLANNING</p><h3>厅堂主题营销系列</h3><blockquote>把总行营销要求，转化为支行现场真正能执行、能与客户发生联系的主题活动。</blockquote></div>
              <div className="case-role-stamp"><small>MY ROLE</small><b>支行活动策划<br />与执行负责人</b><span>PLANNING · CONTENT<br />COORDINATION · REVIEW</span></div>
            </header>
            <section className="case-overview"><h4>Overview</h4><p>基于总行营销要求，我在支行层面负责主题构思、活动方案、PPT、海报、主持稿、宣传稿、跨部门协调、现场执行及活动复盘。项目不是单次活动，而是一组围绕不同客群与营销节点持续展开的厅堂主题系列。</p></section>
            <div className="campaign-tickets">{bankCampaigns.map((name, index) => <span key={name}><small>CAMPAIGN {String(index + 1).padStart(2, "0")}</small>{name}</span>)}</div>
            <section className="case-process"><div className="case-section-heading"><small>PROCESS</small><h4>From brief to branch floor.</h4></div><ol>{bankProcess.map((step) => <li key={step[0]}><span>{step[0]}</span><div><small>{step[1]}</small><p>{step[2]}</p></div></li>)}</ol></section>
            <section className="featured-campaign">
              <div className="little-banker-visual"><span>FEATURED<br />CAMPAIGN</span><strong>小小<br /><em>银行家</em></strong><i>SUMMER · FAMILY · FINANCIAL LITERACY</i></div>
              <div><small>SELECTED OUTPUT / 深入展示</small><h4>从亲子洞察到客户沟通</h4><p>暑期观察到客户常带孩子到店，因此将金融知识、点钞与模拟柜台体验设计成亲子活动。活动结束后，再由团队结合家长实际需求进行产品沟通和后续跟进。</p><ul><li><b>10+</b><span>到场儿童</span></li><li><b>20+</b><span>到场家长</span></li><li><b>5–6 组</b><span>活动后表达意向的客户</span></li></ul></div>
            </section>
            <section className="case-results"><div><small>RESULTS / CONTEXT</small><strong>1,000+</strong><p>全年累计客户触达人次</p><em>包括面销、电销、商户拜访、企业微信及主题活动等多种渠道，不作为任何单场活动数据。</em></div><div><small>LEARNING</small><p>活动策划不仅需要创意，还要同时处理合规信息、现场流程、团队协作与后续业务承接。重要对外材料也需要建立交叉审核机制。</p></div></section>
          </article>}

          {openCase === "tea" && <article className="case-study tea-case">
            <header className="tea-hero"><div className="tea-title-card"><p>FEATURED CASE 02 · EARLY-STAGE BRAND PROJECT</p><h3>From Concept<br />to First Market.</h3><strong>从概念到第一次市场测试：<br />一个畲族特色茶品牌的 0→1 实践</strong></div><div className="tea-moodboard" aria-label="品牌前期视觉方向探索"><span className="tea-swatch clay">CULTURE</span><span className="tea-swatch leaf">TEA</span><span className="tea-swatch indigo">SHE</span><i>景宁</i><b>炒青<br />绿茶</b><small>DIRECTION STUDY<br />NOT FINAL VI</small></div></header>
            <section className="case-overview split"><div><h4>Overview</h4><p>约 5 人小团队共同参与的早期品牌项目。项目以浙江景宁畲族文化为地域基础，将当地传统炒青绿茶与年轻、便携的小罐茶形态结合，探索面向年轻消费者的特色茶品牌。</p></div><div><h4>My Role</h4><p><b>Core Project Member / Brand &amp; Marketing Support</b><br />从早期参与定位讨论、竞品及视觉研究、Logo/字体/色彩/包装方向探索、产品及包装讨论和部分文案初稿，到第一次线下测试的摊位陈列、宣传与现场销售。</p></div></section>
            <div className="brand-evidence-board"><div className="evidence culture-study"><small>01 · CULTURAL RESEARCH</small><strong>畲族文化<br />与地域视觉</strong><span>Pattern · Colour · Place</span></div><div className="evidence type-study"><small>02 · VISUAL EXPLORATION</small><strong>字形 / 色彩<br />包装方向</strong><span>Early team study</span></div><div className="evidence product-study"><small>03 · PRODUCT FORM</small><strong>小罐茶</strong><span>Portable · Young · Local</span></div><div className="evidence market-study"><small>04 · FIRST MARKET</small><strong>天目里</strong><span>Offline test · Hangzhou</span></div></div>
            <section className="tea-path"><div className="case-section-heading"><small>BRAND GROWTH PATH</small><h4>Concept → Market</h4></div><ol>{teaJourney.map((step) => <li key={step[0]}><span>{step[0]}</span><div><small>{step[1]}</small><h5>{step[2]}</h5><p>{step[3]}</p></div></li>)}</ol></section>
            <section className="case-results tea-outcome"><div><small>OUTCOME</small><h4>Brand Concept → Visual Direction → Physical Product → First Offline Market Test</h4><p>项目完成了从品牌概念到首次线下市场测试的完整早期闭环。首次测试后，我因返校而结束持续参与。</p></div><div><small>REFLECTION</small><p>这是我第一次完整接触消费品牌从概念到真实市场的早期过程，也让我开始理解：品牌不仅是视觉和故事，还需要产品、渠道、消费者反馈与持续运营共同支撑。</p></div></section>
          </article>}

          {openCase === "theatre" && <article className="case-study theatre-case">
            <header className="case-hero"><div><p>FEATURED CASE 03 · THEATRE CONTENT</p><h3>从舞台到屏幕</h3><blockquote>参与《敦煌奇妙夜》《无人生还》的内容宣发，让剧场内外的故事拥有连续的传播节奏。</blockquote></div><div className="theatre-bill"><small>PROGRAMME</small><strong>敦煌奇妙夜</strong><i>×</i><strong>无人生还</strong><span>CONTENT · PHOTO · DATA</span></div></header>
            <section className="case-overview split"><div><h4>Overview</h4><p>参与剧目宣传推送、公众号发布、图片处理、后台数据整理、现场摄影和演后总结内容。</p></div><div><h4>My Role</h4><p><b>Content &amp; Social Media Contributor</b><br />以参与执行为主，在既有传播节奏中完成内容、图片与现场记录工作，不将该项目包装为个人主导。</p></div></section>
            <div className="theatre-workflow"><article><span>BEFORE</span><h4>演前内容</h4><p>宣传推送、素材整理、公众号发布与图片处理。</p></article><article><span>DURING</span><h4>现场记录</h4><p>现场摄影、演出节点记录与内容素材补充。</p></article><article><span>AFTER</span><h4>演后总结</h4><p>后台数据整理、总结推送与内容归档。</p></article></div>
            <section className="theatre-spotlight"><span>PROACTIVE CONTENT TRY</span><div><small>《敦煌奇妙夜》</small><h4>把镜头转向演员幕后故事</h4><p>在常规剧目宣传之外，主动增加“演员幕后故事”内容，以人物视角补充舞台之外的情绪和细节。这次尝试让我开始思考：文化内容的传播不只依赖演出信息，也来自观众愿意靠近的人与故事。</p></div></section>
            <section className="case-results"><div><small>SELECTED OUTPUTS</small><p>公众号推送 · 图片处理 · 现场摄影 · 后台数据整理 · 演后总结内容</p></div><div><small>LEARNING</small><p>理解一场剧目的内容宣发如何沿着演前、演中、演后的时间线展开，也学习在团队流程中主动寻找更有人物感的内容角度。</p></div></section>
          </article>}

          {openCase === "art" && <article className="case-study mini-art-case">
            <header><p>MINI CASE · EVENT CONTENT / ON-SITE EXECUTION</p><h3>“同绘童梦”少年艺术大展</h3></header><div className="mini-case-grid"><div className="art-number"><strong>≈300</strong><span>幅少年艺术作品<br />分类整理与展陈准备</span></div><div><h4>Overview</h4><p>参与作品分类整理、展陈准备、现场摄影、嘉宾引导及颁奖协助。</p><h4>Selected Output</h4><p>活动结束后独立完成总结推送，包括文案撰写、图片选择与页面排版，最终由官方渠道发布。</p><h4>Learning</h4><p>大型线下活动中，细致的现场支持与及时的内容沉淀同样重要。</p></div></div>
          </article>}
        </div>
      </section>

      <FlightDivider number="05" label={<>TRACE THE<br />JOURNEY</>} title="THE ROUTE" subtitle="journey so far" />

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

      <FlightDivider number="06" label={<>PACK WHAT<br />MATTERS</>} title="SKILLS" subtitle="what I carry" />

      <section id="skills" className="section skills-section">
        <SectionTitle number="06" kicker="WHAT I CARRY WITH ME" title={<>A suitcase full of<br /><em>useful things.</em></>} />
        <div className="suitcase">
          <div className="suitcase-handle" /><div className="suitcase-inner">
            {["CAMPAIGN", "BRANDING", "CONTENT", "PHOTOSHOP", "PREMIERE", "AFTER EFFECTS", "CAPCUT", "CANVA", "ENGLISH", "IELTS 7.0", "DATA REVIEW", "PROJECT MGMT"].map((skill, index) => <span key={skill} className={`sticker sticker-${(index % 6) + 1}`}>{index % 3 === 0 ? "✦ " : ""}{skill}</span>)}
          </div>
        </div>
      </section>

      <FlightDivider number="07" label={<>SEND A NOTE<br />FROM HERE</>} title="POSTCARD" subtitle="say hello" />

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

function FlightDivider({ number, label, title, subtitle, first = false }: { number: string; label: React.ReactNode; title: string; subtitle: string; first?: boolean }) {
  return <section className={`departure-sequence ${first ? "departure-first" : "departure-compact"}`} data-flight-divider aria-label={`飞往第 ${number} 站 ${title}`}>
    <div className="departure-sticky">
      <div className="departure-grid" aria-hidden="true" />
      <div className="vertical-flight" aria-hidden="true"><span>✈</span><i /></div>
      <div className="departure-copy"><small>NEXT DESTINATION · {number}</small><strong>{label}</strong></div>
      <div className="map-curtain" aria-hidden="true"><p>{title}<br /><span>{subtitle}</span></p></div>
    </div>
  </section>;
}
