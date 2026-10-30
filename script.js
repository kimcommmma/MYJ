const P = PHONE, $ = s => document.querySelector(s);
const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const hue = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360; return `hsl(${h} 45% 62%)`; };
const YEAR = P.year || new Date().getFullYear();
const now = () => { const d = new Date(); d.setFullYear(YEAR); return d; };
const person = h => P.contacts.find(c => c.handle === h) || (h === P.owner.handle ? P.owner : { name: h, handle: h, photo: "" });
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
(P.posts || []).forEach(x => { if (x.likedByRandom) x.likedBy = shuffle(P.contacts.filter(c => !c.hideStory && c.handle !== x.user).map(c => c.handle)).slice(0, x.likedByRandom); if (x.fixedComments || x.randomComments) { const pl = [...(x.commentPool || P.commentPool || []), ...(x.noFan ? [] : (P.fanPool || []))]; const n = x.randomComments || 0, k = n >= 4 ? 1 + Math.floor(Math.random() * 2) : 0, en = shuffle([...(x.enPool || P.enPool || [])]).slice(0, k); x.commentsList = [...(x.fixedComments || []), ...shuffle([...shuffle(pl).slice(0, n - en.length), ...en])]; } });
const rich = t => esc(t).replace(/@[\w.]+/g, m => { const h = m.slice(1), ok = h === P.owner.handle || P.contacts.some(c => c.handle === h); return `<span class="tag"${ok ? ` data-go="profile:${h}" style="cursor:pointer"` : ""}>${m}</span>`; });
const nm = p => p.phoneName || p.name;
const av = (p, cls = "") => `<span class="av ${cls}" style="background:${hue(p.name || p.handle)}">${p.photo ? `<img src="${esc(p.photo)}" alt="" onerror="this.remove()">` : ""}<b>${esc((p.name || p.handle)[0])}</b></span>`;
const pic = src => src ? `<img class="pic" loading="lazy" decoding="async" src="${esc(src)}" alt="" onerror="this.removeAttribute('src')">` : `<div class="pic"></div>`;

const app = $("#app"), body = $("#appbody");
const bind = (sel, fn) => body.querySelectorAll(sel).forEach(el => el.onclick = () => fn(el));

/* 카카오톡 */
function kakao() {
  let tab = "chats", sort = "ga";
  const ik = d => `<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="#111" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const SEARCH = '<circle cx="11" cy="11" r="7"/><path d="M16.500 16.500L21 21"/>';
  const kav = p => p.photo ? av(p) : `<span class="av kdef c${(nm(p).charCodeAt(0) || 0) % 3}"><svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><circle cx="12" cy="8.500" r="4"/><path d="M4 21c0-4.400 3.500-6.500 8-6.500s8 2.100 8 6.500z"/></svg></span>`;
  const tabs = () => {
    const t = (k, d, on) => `<button class="k-tab${on ? " on" : ""}" ${k ? `data-t="${k}"` : "disabled"}><svg viewBox="0 0 24 24" width="28" height="28" fill="${on ? "#111" : "#c4c4c4"}">${d}</svg></button>`;
    return `<div class="k-tabs">${t("friends", '<circle cx="12" cy="7.500" r="4.500"/><path d="M3.500 21c0-5 3.500-7.500 8.500-7.500s8.500 2.500 8.500 7.500z"/>', tab === "friends")}${t("chats", '<path d="M12 3C6.500 3 2.500 6.500 2.500 11c0 2.600 1.400 4.900 3.600 6.400L5 21l4.200-2.300c.9.200 1.800.3 2.800.3 5.500 0 9.500-3.500 9.500-8S17.500 3 12 3z"/>', tab === "chats")}${t("", '<circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>', false)}</div>`;
  };
  const list = () => {
    let main;
    if (tab === "friends") {
      const fr = P.contacts.slice().sort(sort === "ga" ? (x, y) => nm(x).localeCompare(nm(y), "ko") : (x, y) => P.contacts.indexOf(y) - P.contacts.indexOf(x));
      main = `<div class="top k-mt"><h1>친구</h1><div class="k-ic2">${ik(SEARCH)}${ik('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6"/>')}${ik('<circle cx="12" cy="12" r="3"/><path d="M19.400 15a1.700 1.700 0 0 0 .3 1.800l.1.1a2 2 0 1 1-2.800 2.800l-.1-.1a1.700 1.700 0 0 0-1.800-.3 1.700 1.700 0 0 0-1 1.500V21a2 2 0 1 1-4 0v-.1a1.700 1.700 0 0 0-1.100-1.500 1.700 1.700 0 0 0-1.800.3l-.1.1a2 2 0 1 1-2.800-2.800l.1-.1a1.700 1.700 0 0 0 .3-1.800 1.700 1.700 0 0 0-1.500-1H3a2 2 0 1 1 0-4h.1a1.700 1.700 0 0 0 1.500-1.100 1.700 1.700 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.1a1.700 1.700 0 0 0 1.800.3H9a1.700 1.700 0 0 0 1-1.500V3a2 2 0 1 1 4 0v.1a1.700 1.700 0 0 0 1 1.500 1.700 1.700 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.1a1.700 1.700 0 0 0-.3 1.800V9a1.700 1.700 0 0 0 1.500 1H21a2 2 0 1 1 0 4h-.1a1.700 1.700 0 0 0-1.500 1z"/>')}</div></div>
        <div class="scroll"><div class="k-me">${kav(P.owner)}<strong>${esc(P.owner.name)}</strong></div>
        <div class="k-fh"><b>친구 ${fr.length}</b><div class="k-pill"><span data-s="ga" class="${sort === "ga" ? "on" : ""}">가나다순</span><span data-s="add" class="${sort === "add" ? "on" : ""}">친구추가순</span></div><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg></div>
        <ul class="k-list">${fr.map(c => `<li>${kav(c)}<div><strong>${esc(nm(c))}</strong></div></li>`).join("")}</ul></div>`;
    } else {
      main = `<div class="top k-mt"><h1>채팅</h1><div class="k-ic2">${ik(SEARCH)}${ik('<path d="M12 20h9M16.500 3.500a2.100 2.100 0 0 1 3 3L7 19l-4 1 1-4z"/>')}${ik('<circle cx="12" cy="12" r="3"/><path d="M19.400 15a1.700 1.700 0 0 0 .3 1.800l.1.1a2 2 0 1 1-2.800 2.800l-.1-.1a1.700 1.700 0 0 0-1.800-.3 1.700 1.700 0 0 0-1 1.500V21a2 2 0 1 1-4 0v-.1a1.700 1.700 0 0 0-1.100-1.500 1.700 1.700 0 0 0-1.800.3l-.1.1a2 2 0 1 1-2.800-2.800l.1-.1a1.700 1.700 0 0 0 .3-1.800 1.700 1.700 0 0 0-1.500-1H3a2 2 0 1 1 0-4h.1a1.700 1.700 0 0 0 1.500-1.100 1.700 1.700 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.1a1.700 1.700 0 0 0 1.800.3H9a1.700 1.700 0 0 0 1-1.500V3a2 2 0 1 1 4 0v.1a1.700 1.700 0 0 0 1 1.500 1.700 1.700 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.1a1.700 1.700 0 0 0-.3 1.800V9a1.700 1.700 0 0 0 1.500 1H21a2 2 0 1 1 0 4h-.1a1.700 1.700 0 0 0-1.500 1z"/>')}</div></div><div class="scroll"><ul class="k-list">${P.chats.map((c, i) => {
        const p = person(c.with), m = c.messages[c.messages.length - 1] || {};
        return `<li data-i="${i}">${kav(p)}<div><strong>${esc(nm(p))}</strong><p>${esc(m.text || (m.images ? "사진" : ""))}</p></div><time>${esc(m.time)}</time></li>`;
      }).join("")}</ul></div>`;
    }
    body.innerHTML = main + tabs();
    bind("li[data-i]", el => room(+el.dataset.i));
    bind(".k-tab[data-t]", el => { tab = el.dataset.t; list(); });
    bind(".k-pill span", el => { sort = el.dataset.s; list(); });
  };
  const room = i => {
    const c = P.chats[i], p = person(c.with);
    const ms = c.messages, ic = d => `<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
    const html = ms.map((m, j) => {
      if (m.date) return `<div class="k-date"><span>${esc(m.date)} ›</span></div>`;
      const pv = ms[j - 1], nx = ms[j + 1];
      const first = !pv || pv.date || pv.from !== m.from, last = !nx || nx.date || nx.from !== m.from || nx.time !== m.time;
      const ph = m.images ? `<div class="k-ph n${Math.min(m.images.length, 4)}">${m.images.map(u => `<img src="${esc(u)}" alt="" loading="eager">`).join("")}</div>` : "";
      const tx = m.text ? `<span class="b${first ? " tail" : ""}">${esc(m.text)}</span>` : "";
      const tm = last ? `<time>${esc(m.time)}</time>` : "";
      if (m.from === "me") return `<div class="m me${first ? " f" : ""}">${tm}<div class="k-col">${ph}${tx}</div></div>`;
      return `<div class="m them${first ? " f" : ""}">${first ? av(p, "s") : `<span class="av-sp"></span>`}<div class="k-col">${first ? `<small>${esc(nm(p))}</small>` : ""}${ph}${tx}</div>${tm}</div>`;
    }).join("");
    body.innerHTML = `<div class="room" style="display:contents"><div class="top k-top"><button class="back">${ic('<path d="M15 4l-8 8 8 8"/>')}</button><h1>${esc(nm(p))}</h1><div class="k-ic">${ic('<circle cx="11" cy="11" r="7"/><path d="M16.500 16.500L21 21"/>')}${ic('<path d="M5 3h4l2 5-2.500 1.500a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>')}${ic('<path d="M3 6h18M3 12h18M3 18h18"/>')}</div></div><div class="scroll" style="background:#abc1d6"><div class="msgs">${html}</div></div><div class="k-barw"><div class="k-bar"><span class="k-plus">+</span><span class="k-inp">메시지 입력</span><span class="k-sm">☺</span><span class="k-sm k-hash">#</span></div></div></div>`;
    bind(".back", list);
    const s = body.querySelector(".scroll"); s.scrollTop = s.scrollHeight;
  };
  list();
}

/* 인스타그램 */
body.addEventListener("scroll", e => {
  const t = e.target; if (!t.classList || !t.classList.contains("ig-track")) return;
  const k = Math.round(t.scrollLeft / t.clientWidth), n = t.children.length, car = t.parentElement;
  const bd = car.querySelector(".ig-badge"); if (bd) bd.textContent = `${k + 1}/${n}`;
  const dt = car.nextElementSibling;
  if (dt && dt.classList.contains("ig-dots")) [...dt.children].forEach((c, j) => c.classList.toggle("on", j === k));
}, true);

const svg = (p, cls = "") => `<svg viewBox="0 0 24 24" class="${cls}">${p}</svg>`;
const I = {
  heart: svg('<path d="M12 21C6 16.500 2 12.800 2 8.600 2 5.900 4 4 6.600 4c1.900 0 3.700 1 5.400 3 1.700-2 3.500-3 5.400-3C20 4 22 5.900 22 8.600c0 4.200-4 7.900-10 12.400z"/>'),
  comment: svg('<path d="M20.500 11.500a8.500 8.500 0 0 1-12.300 7.600L3 20.500l1.500-4.800A8.500 8.500 0 1 1 20.500 11.500z"/>'),
  repost: svg('<path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>'),
  send: svg('<path d="M22 3L9.218 10.083"/><path d="M11.698 20.334L22 3.001H2L9.218 10.083L11.698 20.334Z"/>'),
  save: svg('<path d="M6 3h12v18l-6-4.500L6 21V3z"/>'),
  menu: svg('<path d="M3 8h18M3 16h12"/>'),
  back: svg('<path d="M15 4l-8 8 8 8"/>'),
  bell: svg('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.700 21a2 2 0 0 1-3.400 0"/>'),
  dots: svg('<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'),
  link: svg('<path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1"/>'),
  addp: svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6"/>'),
  chev: svg('<path d="M6 9l6 6 6-6"/>'),
  grid: svg('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'),
  reels: svg('<rect x="2.500" y="2.500" width="19" height="19" rx="5.500"/><path d="M10 8.300l5.600 3.700L10 15.700z"/>'),
  tag: svg('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="10" r="3"/><path d="M6.500 19c.7-3 3-4 5.500-4s4.800 1 5.500 4"/>'),
  home: svg('<path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"/>'),
  homeF: svg('<path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"/>', "fc"),
  search: svg('<circle cx="11" cy="11" r="7.500"/><path d="M16.500 16.500L21 21"/>'),
  vid: svg('<path fill-rule="evenodd" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm3 5v8l7-4z"/>', "f"),
  multi: svg('<rect x="8" y="3" width="13" height="13" rx="3"/><path d="M5 7a3 3 0 0 0-2 2.800V17a4 4 0 0 0 4 4h7.200A3 3 0 0 0 16 19H7a2 2 0 0 1-2-2V7z"/>', "f")
};


/* 사진 지연 로딩: 화면 근처 사진만 불러오고, 멀어지면 메모리에서 내림 (인스타 피드가 사진 수백 장이라 폰에서 튕기는 문제 방지) */
const lazyLoad = (root, scroller) => {
  const imgs = root.querySelectorAll("img[data-src]");
  const load = i => { const s = i.getAttribute("data-src"); if (!s) return; i.removeAttribute("data-src"); i.src = s; };
  if (!("IntersectionObserver" in window)) { imgs.forEach(load); return; }
  const sc = scroller || root.querySelector(".scroll") || null;
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const t = e.target; load(t);
    const sl = t.closest(".ig-slide"), nx = sl && sl.nextElementSibling && sl.nextElementSibling.querySelector("img[data-src]");
    if (nx) load(nx);
    io.unobserve(t);
  }), { root: sc, rootMargin: "500px 0px" });
  imgs.forEach(i => io.observe(i));
  const ar = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) return;
    e.target.querySelectorAll("img").forEach(i => { const s = i.getAttribute("src"); if (s && !i.hasAttribute("data-src")) { i.setAttribute("data-src", s); i.removeAttribute("src"); io.observe(i); } });
  }), { root: sc, rootMargin: "2500px 0px" });
  root.querySelectorAll(".ig-post").forEach(a => ar.observe(a));
};

function insta() {
  const o = P.owner;
  let stack = [{ v: "feed" }], tab = "grid";
  const top = () => stack[stack.length - 1];
  const imgs = x => (x.images && x.images.length ? x.images : x.image ? [x.image] : [""]);
  const num = v => v ?? 0;
  const slide = (src, k) => src ? `<img class="pic" decoding="async" data-src="${esc(src)}" alt="" onerror="this.removeAttribute('src')">` : `<div class="pic ph">${k}</div>`;
  const prof = h => { const p = person(h); return { ...p, display: p.display || p.name, mine: h === o.handle, posts: P.posts.filter(x => x.user === h) }; };

  const post = (x, k) => {
    const p = person(x.user), im = imgs(x), n = im.length;
    return `<article class="ig-post"><div class="ig-ph"><div class="ig-who" data-go="profile:${esc(p.handle)}">${av(p, "round s")}<div><b>${esc(p.handle)}</b>${x.music ? `<small>♫ ${esc(x.music)}</small>` : ""}</div></div>${I.menu}</div>
      <div class="ig-car"><div class="ig-track">${im.map((s, j) => `<div class="ig-slide">${slide(s, j + 1)}</div>`).join("")}</div>${n > 1 ? `<span class="ig-badge">1/${n}</span><button class="ig-arrow l" data-arrow="-1">‹</button><button class="ig-arrow r" data-arrow="1">›</button>` : ""}</div>
      ${n > 1 ? `<div class="ig-dots">${im.map((_, j) => `<i class="${j ? "" : "on"}"></i>`).join("")}</div>` : ""}
      <div class="ig-act"><span data-like>${I.heart}<b>${esc(num(x.likes))}</b></span><span data-go="comments:${P.posts.indexOf(x)}">${I.comment}<b>${esc(num(x.comments))}</b></span><span>${I.repost}<b>${esc(num(x.reposts))}</b></span><span>${I.send}<b>${esc(num(x.shares))}</b></span><span class="sv" data-save>${I.save}</span></div>
      ${x.likedBy && x.likedBy.length ? `<div class="ig-lb"><span class="stk">${x.likedBy.slice(0, 2).map(h => av(person(h), "round xs")).join("")}</span><span><b>${esc(x.likedBy[0])}</b>님 외 <b>${esc(num(x.likes))}명</b>이 좋아합니다</span></div>` : ""}
      <div class="ig-cap"><b>${esc(p.handle)}</b> ${esc(x.caption)}${(x.commentsList || []).length ? `<a class="ig-cm" data-go="comments:${P.posts.indexOf(x)}">댓글 ${esc(num(x.comments))}개 모두 보기</a><div><b>${esc(x.commentsList[0].user)}</b> ${rich(x.commentsList[0].text)}</div>` : ""}<time>${esc(x.date)}</time></div></article>`;
  };

  let feedN = 4;
  const feedList = () => P.posts.map((x, i) => [x, i]).sort((a, b) => { const k = p => { const m = /(\d+)년\s*(\d+)월\s*(\d+)일/.exec(p.date || ""); return m ? +m[1] * 10000 + +m[2] * 100 + +m[3] : 0; }; return k(b[0]) - k(a[0]) || a[1] - b[1]; }).map(([x]) => x);
  const feed = () => `<div class="top"><span class="i-logo">Instagram</span></div>
    <div class="stories">${P.contacts.filter(c => !c.hideStory).map(c => `<div data-go="profile:${esc(c.handle)}">${av(c, "round")}<span class="n">${esc(c.handle)}</span></div>`).join("")}</div>
    ${feedList().slice(0, feedN).map(x => post(x)).join("")}`;

  const profile = h => {
    const p = prof(h), list = p.posts, hl = p.highlights || [];
    const shown = tab === "grid" ? list : tab === "reels" ? list.filter(x => x.video) : [];
    const fl = p.followingList || (p.mine ? P.contacts.filter(c => !c.noIg).map(c => c.handle) : null);
    const mutual = p => {
      const ov = p.mutuals;
      const fl = P.contacts.filter(c => c.handle !== p.handle && (c.followingList || []).includes(p.handle));
      const names = ov && ov.names ? ov.names.map(person) : fl.slice(0, 2);
      const more = ov && ov.more != null ? ov.more : Math.max(0, fl.length - names.length);
      if (!names.length) return "";
      const pics = [...names, ...fl.filter(c => !names.includes(c))].slice(0, 3);
      return `<div class="ig-mf"><span class="stk">${pics.map(c => av(c, "round xs")).join("")}</span><span>${names.map(c => `<b>${esc(c.handle)}</b>님`).join(", ")}${more ? ` 외 ${esc(more)}명이` : "이"} 팔로우합니다</span></div>`;
    };
    const stat = (n, l, go) => `<div ${go ? `data-go="${go}" style="cursor:pointer"` : ""}><b>${esc(n)}</b>${l}</div>`;
    return `<div class="ig-top">${p.mine ? "" : `<button data-act="back">${I.back}</button>`}<h1>${esc(p.handle)}</h1><span class="r">${p.mine ? I.menu : I.bell + I.dots}</span></div>
      <div class="ig-prof"><div class="ig-row">${av(p, "round big")}<div class="ig-meta"><strong>${esc(p.display)}</strong><div class="ig-stats">${stat(num(p.postsCount ?? list.length), "게시물")}${stat(num(p.followers), "팔로워")}${stat(num(p.following), "팔로잉", fl ? `follows:${esc(h)}` : "")}</div></div></div>
      ${p.category ? `<div class="cat">${esc(p.category)}</div>` : ""}${p.bio ? `<div class="bio">${rich(p.bio)}</div>` : ""}${p.link ? `<div class="lnk">${I.link}${esc(p.link)}</div>` : ""}
      ${p.mine ? "" : mutual(p)}
      <div class="ig-btns">${p.mine ? "<span>프로필 편집</span><span>프로필 공유</span>" : `<span>팔로잉 ${I.chev}</span><span data-go="dm:${esc(h)}">메시지</span><span class="sq">${I.addp}</span>`}</div></div>
      ${hl.length ? `<div class="ig-hl">${hl.map(x => `<div><span class="ring">${x.image ? `<img src="${esc(x.image)}" alt="" onerror="this.remove()">` : "<b></b>"}</span>${esc(x.title)}</div>`).join("")}</div>` : ""}
      <div class="ig-tabs">${[["grid", I.grid], ["reels", I.reels], ["tagged", I.tag]].map(([k, ic]) => `<button data-tab="${k}" class="${tab === k ? "on" : ""}">${ic}</button>`).join("")}</div>
      <div class="ig-grid">${shown.map(x => `<div data-go="post:${esc(h)}:${list.indexOf(x)}">${slide(imgs(x)[0], 1)}${x.video ? `<span class="ic">${I.vid}</span>` : imgs(x).length > 1 ? `<span class="ic">${I.multi}</span>` : ""}</div>`).join("") || `<p class="ig-empty">게시물 없음</p>`}</div>`;
  };

  const postList = h => `<div class="ig-top c"><button data-act="back">${I.back}</button><div><h1>게시물</h1><small>${esc(h)}</small></div></div>${prof(h).posts.map(post).join("")}`;

  const follows = h => {
    const p = prof(h), list = p.followingList || (p.mine ? P.contacts.filter(c => !c.noIg).map(c => c.handle) : []);
    return `<div class="ig-top c"><button data-act="back">${I.back}</button><div><h1>${esc(p.handle)}</h1><small>팔로잉</small></div></div>
      <div class="ig-fl">${list.map(x => { const q = prof(x); return `<div class="ig-fr" data-go="profile:${esc(q.handle)}">${av(q, "round")}<div><b>${esc(q.handle)}</b><small>${esc(q.display)}</small></div><span>팔로잉</span></div>`; }).join("")}</div>`;
  };

  const dm = h => {
    const p = prof(h), th = (P.dms || []).find(x => x.with === h) || (() => { const n = { with: h, messages: [] }; (P.dms = P.dms || []).push(n); return n; })();
    const msgs = th.messages.map(m => `<div class="dm-m ${m.from === "me" ? "me" : "them"}">${m.from === "me" ? "" : av(p, "round xs")}<span class="dm-b">${esc(m.text)}</span></div>`).join("");
    const intro = `<div class="dm-intro" data-go="profile:${esc(h)}">${av(p, "round big")}<b>${esc(p.display)}</b><small>${esc(p.handle)} · Instagram</small><span>프로필 보기</span></div>`;
    return `<div class="ig-top c"><button data-act="back">${I.back}</button><div class="dm-head" data-go="profile:${esc(h)}">${av(p, "round xs")}<div><h1>${esc(p.display)}</h1><small>${esc(p.handle)}</small></div></div></div>
      <div class="dm-body">${intro}${msgs}</div>`;
  };

  const comments = idx => {
    const x = P.posts[+idx], p = person(x.user), list = x.commentsList = x.commentsList || [];
    const m = /(\d+)년\s*(\d+)월\s*(\d+)일/.exec(x.date || ""), t0 = m ? new Date(+m[1], +m[2] - 1, +m[3], 12).getTime() : now().getTime();
    const ago = i => { const mins = Math.max(1, Math.floor((now().getTime() - (t0 + (i + 1) * 47 * 60000)) / 60000)); return mins < 60 ? `${mins}분` : mins < 1440 ? `${Math.floor(mins / 60)}시간` : mins < 10080 ? `${Math.floor(mins / 1440)}일` : `${Math.floor(mins / 10080)}주`; };
    const row = (u, t, cap, rp, i) => { const q = person(u); return `<div class="cm-row${rp ? " rp" : ""}" data-go="profile:${esc(q.handle)}">${av(q, rp ? "round xs" : "round s")}<div class="cm-b"><div class="cm-u"><b>${esc(q.handle)}</b><span>${ago(cap ? -1 : i)}${u === x.user ? " · 작성자" : ""}</span></div><div class="cm-x">${rich(t)}</div>${cap ? "" : `<div class="cm-r">답글 달기</div>`}</div>${cap ? "" : `<span class="cm-h">${I.heart}</span>`}</div>`; };
    return `<div class="ig-top c"><button data-act="back">${I.back}</button><div><h1>댓글</h1></div></div>
      <div class="cm-list">${row(x.user, x.caption, true)}<hr class="cm-hr">${list.map((c, i) => row(c.user, c.text, false, c.reply, i)).join("") || `<p class="ig-empty">첫 댓글을 남겨보세요</p>`}</div>`;
  };

  const inbox = () => {
    const th = (P.dms || []).filter(t => t.messages.length);
    return `<div class="ig-top"><h1>${esc(o.handle)}</h1><span class="r">${I.addp}</span></div>
      <div class="ig-inb"><div class="ig-sh">${I.search}<span>검색</span></div>${th.map(t => { const p = prof(t.with), m = t.messages[t.messages.length - 1]; return `<div class="ig-fr" data-go="dm:${esc(p.handle)}">${av(p, "round")}<div><b>${esc(p.display)}</b><small>${m.from === "me" ? "나: " : ""}${esc(m.text)} · ${esc(m.time)}</small></div></div>`; }).join("") || `<p class="ig-empty">메시지 없음</p>`}</div>`;
  };

  const draw = () => {
    const s = top();
    const html = s.v === "feed" ? feed() : s.v === "profile" ? profile(s.h) : s.v === "follows" ? follows(s.h) : s.v === "dm" ? dm(s.h) : s.v === "inbox" ? inbox() : s.v === "comments" ? comments(s.h) : postList(s.h);
    const meOn = s.h === o.handle && (s.v === "profile" || s.v === "follows");
    const dmOn = s.v === "dm" || s.v === "inbox";
    const homeOn = !meOn && !dmOn;
    const bottom = s.v === "comments"
      ? `<div class="dm-bar">${av(o, "round xs")}<input id="cmi" placeholder="댓글 달기..." autocomplete="off"><button data-csend>게시</button></div>`
      : s.v === "dm"
      ? `<div class="dm-bar"><input id="dmi" placeholder="메시지 보내기..." autocomplete="off"><button data-send>보내기</button></div>`
      : `<nav class="ig-nav"><button data-nav="home" class="${homeOn ? "on" : ""}">${homeOn ? I.homeF : I.home}</button><button class="off">${I.reels}</button><button data-nav="dm" class="${dmOn ? "on" : ""}">${I.send}</button><button class="off">${I.search}</button><button data-nav="me" class="${meOn ? "on" : ""}">${av(o, "round xs")}</button></nav>`;
    body.innerHTML = `<div class="ig"><div class="scroll ${s.v === "dm" || s.v === "comments" ? "" : "igpad"}" id="igs">${html}</div>${bottom}</div>`;
    lazyLoad(body);
    if (s.v === "feed") {
      const sc = $("#igs");
      if (sc) sc.addEventListener("scroll", () => {
        const all = feedList();
        if (feedN >= all.length || sc.scrollTop + sc.clientHeight < sc.scrollHeight - 2500) return;
        const add = all.slice(feedN, feedN + 8); feedN += add.length;
        const box = document.createElement("div"); box.style.display = "contents"; box.innerHTML = add.map(x => post(x)).join("");
        sc.appendChild(box); lazyLoad(box, sc);
      }, { passive: true });
    }
    if (s.v === "dm") { const sc = $("#igs"); sc.scrollTop = sc.scrollHeight; }
    else if (s.sy) { const sc = $("#igs"); if (sc) sc.scrollTop = s.sy; }
    if (s.v === "post") {
      const el = body.querySelectorAll(".ig-post")[s.i], sc = $("#igs");
      if (el) sc.scrollTop = s.sy != null ? s.sy : el.offsetTop - 52;
    }
  };

  const send = () => {
    const i = $("#dmi"), v = i && i.value.trim(); if (!v) return;
    const s = top(), th = P.dms.find(x => x.with === s.h), n = now();
    th.messages.push({ from: "me", text: v, time: `${n.getHours() < 12 ? "오전" : "오후"} ${n.getHours() % 12 || 12}:${String(n.getMinutes()).padStart(2, "0")}` });
    draw(); const ni = $("#dmi"); if (ni) ni.focus();
  };
  const csend = () => {
    const i = $("#cmi"), v = i && i.value.trim(); if (!v) return;
    const x = P.posts[+top().h]; (x.commentsList = x.commentsList || []).push({ user: o.handle, text: v });
    draw(); const ni = $("#cmi"); if (ni) ni.focus();
  };
  body.onkeydown = e => { if (e.key === "Enter" && !e.isComposing && (e.target.id === "dmi" || e.target.id === "cmi")) { e.preventDefault(); e.target.id === "dmi" ? send() : csend(); } };
  body.onclick = e => {
    const t = e.target.closest("[data-go],[data-act],[data-like],[data-save],[data-arrow],[data-tab],[data-nav],[data-send],[data-csend]");
    if (!t) return;
    const d = t.dataset;
    if (d.csend !== undefined) csend();
    else if (d.send !== undefined) send();
    else if (d.go) { const [v, h, i] = d.go.split(":"); const sc = $("#igs"); if (sc) top().sy = sc.scrollTop; stack.push({ v, h, i: +i || 0 }); tab = "grid"; draw(); }
    else if (d.act === "back") { if (stack.length > 1) stack.pop(); draw(); }
    else if (d.like !== undefined || d.save !== undefined) t.classList.toggle("on");
    else if (d.arrow) { const tr = t.parentElement.querySelector(".ig-track"); tr.scrollBy({ left: +d.arrow * tr.clientWidth, behavior: "smooth" }); }
    else if (d.tab) { const sc = $("#igs"); if (sc) top().sy = sc.scrollTop; tab = d.tab; draw(); }
    else if (d.nav) { stack = d.nav === "me" ? [{ v: "profile", h: o.handle }] : d.nav === "dm" ? [{ v: "inbox" }] : [{ v: "feed" }]; tab = "grid"; draw(); }
  };
  onClose = () => { body.onclick = null; body.onkeydown = null; };
  draw();
}

/* 메모 */
function memo() {
  const dl = n => n.date || "";
  const pv = n => { const l = String(n.body || "").split("\n").find(x => x.trim()) || "추가 텍스트 없음"; return l.replace(/^\[( |x)\] ?/i, ""); };
  const list = () => {
    const pin = P.notes.map((n, i) => [n, i]).filter(([n]) => n.pinned), rest = P.notes.map((n, i) => [n, i]).filter(([n]) => !n.pinned);
    const sec = (t, a) => a.length ? `<h3 class="nt-h">${t}${t === "고정된 메모" ? '<i>⌄</i>' : ""}</h3><ul class="nt-card">${a.map(([n, i]) => `<li data-i="${i}"><b>${esc(n.title)}</b><small><span>${esc(dl(n))}</span>${esc(pv(n))}</small></li>`).join("")}</ul>` : "";
    body.innerHTML = `<div class="nt"><div class="nt-top"><button class="ph-round"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px"><path d="M15 5l-7 7 7 7"/></svg></button><div><b>메모</b><small>저장 공간이 가득 참</small></div><button class="ph-round">···</button></div>
      <div class="scroll nt-sc">${sec("고정된 메모", pin)}${sec(pin.length ? "이전 30일" : "메모", rest)}</div>
      <div class="nt-bar"><div class="nt-s"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.200"><circle cx="11" cy="11" r="7"/><path d="M16.500 16.500L21 21"/></svg>검색<svg viewBox="0 0 24 24" fill="currentColor" style="margin-left:auto"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" stroke-width="2" fill="none"/></svg></div><button class="nt-n">✎</button></div></div>`;
    bind(".nt-card li", el => note(+el.dataset.i));
  };
  const note = i => {
    const n = P.notes[i];
    const lk = t => esc(t).replace(/(https?:\/\/[^\s<]+)/g, '<a class="nt-a" href="$1" target="_blank" rel="noopener">$1</a>');
    const ln = String(n.body||"").split("\n").map(l => { const m = l.match(/^\[( |x)\] ?(.*)$/i); return m ? `<div class="nt-ck${m[1].toLowerCase() === "x" ? " on" : ""}"><i></i><span>${lk(m[2])}</span></div>` : (l.trim() ? `<div class="nt-ln">${lk(l)}</div>` : `<div class="nt-gap"></div>`); }).join("");
    body.innerHTML = `<div class="nt nt-view"><div class="nt-top"><button class="ph-round back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px"><path d="M15 5l-7 7 7 7"/></svg></button><span class="nt-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M8 7l4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg><b>···</b></span></div><div class="scroll nt-sc"><h2 class="nt-t${n.plainTitle ? " plain" : ""}">${esc(n.title)}</h2><div class="note nt-body">${ln}</div></div>
      <div class="nt-bar nt-tools"><div class="nt-pill2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="7" r="2.600" fill="currentColor"/><path d="M12 7h8"/><circle cx="6" cy="17" r="2.600"/><path d="M12 17h8"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11l-8.500 8.500a5 5 0 0 1-7-7l9-9a3.400 3.400 0 0 1 5 5l-9 9a1.800 1.800 0 0 1-2.500-2.500l8-8"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.500 16l3.500-9 3.500 9M9.800 13h4.400"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="9" ry="3.800" transform="rotate(35 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.800" transform="rotate(-35 12 12)"/><path d="M15 20l5-5"/></svg></div><button class="nt-n"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px"><path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M18.500 3.500a2.100 2.100 0 0 1 3 3L12 16l-4 1 1-4z"/></svg></button></div></div>`;
    bind(".back", list);
  };
  list();
}

/* X */
function xapp() {
  const X = P.x || { tweets: [] };
  let tab = "for";
  const ic = {
    rep: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    rt: '<svg viewBox="0 0 24 24"><path d="M4 12V9a3 3 0 0 1 3-3h11l-3-3M20 12v3a3 3 0 0 1-3 3H6l3 3"/></svg>',
    lk: '<svg viewBox="0 0 24 24"><path d="M12 20.500S3 15 3 8.800A4.800 4.800 0 0 1 12 6.500a4.800 4.800 0 0 1 9 2.300C21 15 12 20.500 12 20.500z"/></svg>',
    vw: '<svg viewBox="0 0 24 24"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>',
    bm: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4.500L6 21z"/></svg>',
    up: '<svg viewBox="0 0 24 24"><path d="M12 15V3M7 8l5-5 5 5M5 13v7h14v-7"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.500l9 7V21h-6v-6.500H9V21H3V9.500z"/></svg>',
    se: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M16.500 16.500L21 21"/></svg>',
    cp: '<svg viewBox="0 0 24 24"><path d="M4 20l3-1 12-12-2-2L5 17zM14 6l4 4"/></svg>',
    bl: '<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/></svg>',
    ml: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    ck: '<svg viewBox="0 0 24 24" class="vf"><circle cx="12" cy="12" r="10" fill="#1d9bf0"/><path d="M7.500 12.500l3 3 6-6.500" stroke="#fff" stroke-width="2.200" fill="none"/></svg>',
    logo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.800 3h3.100l-6.800 7.700L22 21h-6.200l-4.900-6.400L5.300 21H2.200l7.200-8.300L1.800 3h6.400l4.400 5.800zm-1.100 16.200h1.700L7.300 4.700H5.500z"/></svg>'
  };
  const imgs = a => a && a.length ? `<div class="x-im n${Math.min(a.length, 4)}">${a.map(s => `<img src="${esc(s)}" alt="" onerror="this.parentNode.classList.add('empty');this.remove()">`).join("")}</div>` : "";
  const num = v => v === undefined || v === "" ? "" : v;
  const card = t => {
    const p = t.photo ? { ...person(t.user), name: t.name || t.user, photo: t.photo } : person(t.user), q = t.quote;
    return `<article class="x-t">${av(p, "round")}<div class="x-b">
      <div class="x-h"><b>${esc(t.name || p.name)}</b>${t.verified === false ? "" : ic.ck}<span>@${esc(t.user)} · ${esc(t.time || "")}</span><i class="x-lg">${ic.logo}</i></div>
      <div class="x-x">${rich(t.text || "")}</div>${imgs(t.images)}
      ${q ? `<div class="x-q"><div class="x-qh">${av(person(q.user), "round xs")}<b>${esc(q.name || person(q.user).name)}</b><span>@${esc(q.user)} · ${esc(q.time || "")}</span></div><div class="x-x">${rich(q.text || "")}</div>${imgs(q.images)}</div>` : ""}
      <div class="x-a"><span>${ic.rep}${num(t.replies)}</span><span>${ic.rt}${num(t.reposts)}</span><span>${ic.lk}${num(t.likes)}</span><span>${ic.vw}${num(t.views)}</span><span class="r">${ic.bm}${ic.up}</span></div></div></article>`;
  };
  const draw = () => {
    const ts = (X.tweets || []).filter(t => t.tab === "both" || (t.tab || "for") === tab);
    body.innerHTML = `<div class="x"><div class="x-top"><span class="x-me">${av({ ...P.owner, name: "X", photo: (P.x && P.x.avatar) || P.owner.photo }, "round")}</span><span class="x-logo">${ic.logo}</span></div>
      <div class="x-tabs"><button data-t="for" class="${tab === "for" ? "on" : ""}"><span>추천</span></button><button data-t="fol" class="${tab === "fol" ? "on" : ""}"><span>팔로우 중</span></button></div>
      <div class="scroll x-feed">${ts.map(card).join("") || '<p class="x-em">게시물이 없습니다</p>'}</div>
      <button class="x-fab">+</button>
      <nav class="x-nav">${[ic.home, ic.se, ic.cp, ic.bl, ic.ml].map((i, k) => `<span class="${k ? "" : "on"}">${i}${k === 2 ? "<em>1</em>" : ""}</span>`).join("")}</nav></div>`;
    bind(".x-tabs button", el => { tab = el.dataset.t; draw(); });
  };
  draw();
}

/* 사진첩 */
function photos() {
  const IC = {"filter": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M4 7h16M7 12h10M10 17h4\"/></svg>", "photos": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M6 3h12a2 2 0 0 1 2 2v1H4V5a2 2 0 0 1 2-2zm-2.500 5h17A1.500 1.500 0 0 1 22 9.500v9A2.500 2.500 0 0 1 19.500 21h-15A2.500 2.500 0 0 1 2 18.500v-9A1.500 1.500 0 0 1 3.500 8zM6 18h12l-4-5-3 3.500L9 14z\"/></svg>", "stack": "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><rect x=\"5\" y=\"3\" width=\"14\" height=\"2.600\" rx=\"1.300\"/><rect x=\"3.500\" y=\"7\" width=\"17\" height=\"2.600\" rx=\"1.300\"/><rect x=\"2\" y=\"11\" width=\"20\" height=\"10\" rx=\"2.600\"/></svg>", "search": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.400\" stroke-linecap=\"round\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M16.500 16.500L21 21\"/></svg>", "chev": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.600\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 5l-7 7 7 7\"/></svg>", "share": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 15V3M8 7l4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1\"/></svg>", "heart": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linejoin=\"round\"><path d=\"M12 20.500s-8-4.800-8-11A4.500 4.500 0 0 1 12 7a4.500 4.500 0 0 1 8 2.500c0 6.200-8 11-8 11z\"/></svg>", "info": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9.500\"/><path d=\"M12 11v6\"/><circle cx=\"12\" cy=\"7.500\" r=\".6\" fill=\"currentColor\"/></svg>", "adj": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M3 7h18M3 17h18\"/><circle cx=\"9\" cy=\"7\" r=\"2.500\" fill=\"#fff\"/><circle cx=\"15\" cy=\"17\" r=\"2.500\" fill=\"#fff\"/></svg>", "trash": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5\"/></svg>"};
  const L = P.photos;
  const R = L.map((x, i) => i).reverse(); /* 보이는 순서: 최신 → 오래된 */
  const grid = () => {
    body.innerHTML = `<div class="ph2"><div class="ph2-sc"><div class="ph2-head"><h1>보관함</h1><small>${L.length.toLocaleString()}개의 항목</small></div><div class="ph2-grid">${R.map(i => `<div data-i="${i}">${pic(L[i].image)}</div>`).join("")}</div><div class="ph2-end"></div></div>
      <div class="ph2-fade"></div><div class="ph2-btns"><span class="ph2-c">${IC.filter}</span><span class="ph2-c ph2-sel">선택</span></div>
      <div class="ph2-tabs"><div class="ph2-tp"><span class="on">${IC.photos}<i>보관함</i></span><span>${IC.stack}<i>모음</i></span></div><span class="ph2-sr">${IC.search}</span></div></div>`;
    bind(".ph2-grid [data-i]", el => view(R.indexOf(+el.dataset.i)));
  };
  const view = k0 => {
    let cur = k0;
    body.innerHTML = `<div class="ph2 ph2v"><div class="pv-top"><button class="pv-b back">${IC.chev}</button><div class="pv-pill"><b class="pv-d"></b><small class="pv-tm"></small></div><span class="pv-b">···</span></div>
      <div class="pv">${R.map((i, k) => `<div class="pv-s">${L[i].image ? `<img loading="${Math.abs(k - k0) <= 1 ? "eager" : "lazy"}" decoding="async" src="${esc(L[i].image)}" alt="">` : ""}</div>`).join("")}</div>
      <div class="pv-strip"></div>
      <div class="pv-bar"><span class="pv-b">${IC.share}</span><div class="pv-pill2"><span class="pv-h">${IC.heart}</span><span>${IC.info}</span><span>${IC.adj}</span></div><span class="pv-b">${IC.trash}</span></div></div>`;
    const pv = body.querySelector(".pv"), d = body.querySelector(".pv-d"), tm = body.querySelector(".pv-tm"), st = body.querySelector(".pv-strip");
    const strip = () => {
      const from = Math.max(0, cur - 7), to = Math.min(R.length - 1, cur + 7);
      let h = "";
      for (let k = from; k <= to; k++) { const x = L[R[k]]; h += `<i data-k="${k}" class="${k === cur ? "on" : ""}">${x.image ? `<img src="${esc(x.image)}" alt="">` : ""}</i>`; }
      st.innerHTML = h;
      st.querySelectorAll("i").forEach(el => el.addEventListener("click", () => pv.scrollTo({ left: +el.dataset.k * pv.clientWidth, behavior: "smooth" })));
    };
    const imgs = [...pv.querySelectorAll("img")];
    const warm = () => { for (let k = cur - 2; k <= cur + 2; k++) if (imgs[k]) imgs[k].loading = "eager"; };
    let stT = 0;
    const upd = () => { const x = L[R[cur]] || {}; d.textContent = x.date || "사진"; tm.textContent = x.time || ""; tm.style.display = x.time ? "" : "none"; warm(); clearTimeout(stT); stT = setTimeout(strip, 120); };
    const go = () => { pv.scrollLeft = k0 * pv.clientWidth; };
    go(); requestAnimationFrame(go); upd();
    pv.addEventListener("scroll", () => { const k = Math.round(pv.scrollLeft / (pv.clientWidth || 1)); if (R[k] !== undefined && k !== cur) { cur = k; upd(); } });
    body.querySelector(".pv-h").addEventListener("click", e => e.currentTarget.classList.toggle("on"));
    bind(".back", grid);
  };
  grid();
}

/* 캘린더 */
// events: date "2026-10-30"(하루) 또는 "02-14"(매년 반복), 선택 항목: end "2026-11-02"(여러 날), time "오전 10:00"
function calendar() {
  const d = now(); d.setDate(1); let sel = null;
  const draw = () => {
    const y = d.getFullYear(), m = d.getMonth(), first = d.getDay(), n = new Date(y, m + 1, 0).getDate(), t = now();
    const key = x => `${y}-${String(m + 1).padStart(2, "0")}-${String(x).padStart(2, "0")}`;
    const range = e => { const st = e.date.length === 5 ? `${y}-${e.date}` : e.date; return [st, e.end || st]; };
    const on = (e, k) => { const [a, b] = range(e); return a <= k && k <= b; };
    const ev = x => P.events.filter(e => on(e, key(x)));
    const hs = (P.holidays || []).map(h => ({ ...h, hol: true }));
    const isH = x => hs.some(e => on(e, key(x)));
    let cells = "<span></span>".repeat(first);
    for (let x = 1; x <= n; x++) {
      const isT = t.getFullYear() === y && t.getMonth() === m && t.getDate() === x;
      cells += `<button class="day ${isT ? "today" : ""} ${sel === x ? "sel" : ""} ${isH(x) ? "hol" : ""}" data-k="${x}"><b>${x}</b>${ev(x).length ? "<i></i>" : ""}</button>`;
    }
    const mins = tm => { const r = /(오전|오후)\s*(\d+):(\d+)/.exec(tm || ""); return r ? ((+r[2] % 12) + (r[1] === "오후" ? 12 : 0)) * 60 + +r[3] : -1; };
    const label = e => {
      const [a, b] = range(e), [, m1, d1] = a.split("-").map(Number), [, m2, d2] = b.split("-").map(Number);
      return a === b ? `${d1}일` : m1 === m2 ? `${d1}~${d2}일` : `${m1}/${d1}~${m2}/${d2}`;
    };
    const shown = [...hs, ...P.events].filter(e => { const [a, b] = range(e); return sel ? on(e, key(sel)) : a <= key(n) && b >= key(1); })
      .sort((p, q) => range(p)[0].localeCompare(range(q)[0]) || mins(p.time) - mins(q.time));
    body.innerHTML = `<div class="cal-h"><button data-m="-1">‹</button><h1>${y}년 ${m + 1}월</h1><button data-m="1">›</button></div>
      <div class="dows">${"일월화수목금토".split("").map(w => `<span>${w}</span>`).join("")}</div><div class="days">${cells}</div>
      <ul class="ev scroll">${shown.map(e => `<li class="${e.hol ? "hol" : ""}"><time>${label(e)}</time><span>${esc(e.title)}${e.time ? `<small class="tm">${esc(e.time)}</small>` : ""}</span></li>`).join("") || "<li>일정 없음</li>"}</ul>`;
    bind("[data-m]", el => { d.setMonth(m + +el.dataset.m); sel = null; draw(); });
    bind(".day", el => { sel = sel === +el.dataset.k ? null : +el.dataset.k; draw(); });
  };
  draw();
}

/* 전화 */
function phone() {
  let tab = "recent", flt = "all", num = "", det = null;
  const I = {
    star: '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.2 6.8.8-5 4.700 1.300 6.700L12 17.500 6 20.900l1.300-6.700-5-4.700 6.800-.8z" fill="currentColor"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 6.500V12h4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><circle cx="12" cy="9.500" r="3.300" fill="#fff"/><path d="M5.500 19c1.500-3 4-4 6.500-4s5 1 6.500 4" fill="#fff"/></svg>',
    pad: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="4" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="19" cy="4" r="2"/><circle cx="5" cy="10" r="2"/><circle cx="12" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><circle cx="5" cy="16" r="2"/><circle cx="12" cy="16" r="2"/><circle cx="19" cy="16" r="2"/><circle cx="12" cy="22" r="2"/></svg>',
    vm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.200"><circle cx="6.500" cy="12" r="4.500"/><circle cx="17.500" cy="12" r="4.500"/><path d="M6.500 16.500h11"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4l-8 8 8 8"/></svg>',
    filt: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.200" stroke-linecap="round"><path d="M3 6h18M6 12h12M10 18h4"/></svg>'
  };
  const arrow = t => t === "out" ? "↗" : t === "missed" ? "↙" : "↙";
  const detail = p => {
    document.body.classList.add("dk");
    const cs = P.calls.filter(c => c.with === p.handle), c = cs[0];
    const kind = { out: "발신 통화", in: "수신 통화", missed: "부재중 전화" };
    const ic = d => `<svg viewBox="0 0 24 24" fill="currentColor">${d}</svg>`;
    const row = c ? `<div class="pd-row"><div><b>${kind[c.type] || "발신 통화"}</b><small>${esc(c.status || (c.type === "missed" ? "부재중" : "연결됨"))}</small></div><span>${esc(c.time)}</span></div>` : `<div class="pd-row"><div><b>발신 통화</b><small>기록 없음</small></div></div>`;
    body.innerHTML = `<div class="ph pd-wrap"><div class="pd"><div class="pd-top"><button class="pd-g pd-back">${I.back}</button><button class="pd-g pd-edit">편집</button></div>
      <div class="pd-av">${p.photo ? `<img src="${esc(p.photo)}" alt="">` : `<b>${esc(nm(p)[0])}</b>`}</div>
      ${p.emergency ? `<span class="pd-em">긴급 연락처</span>` : ""}<h2>${esc(nm(p))}</h2>
      <div class="pd-acts"><i>${ic('<path d="M12 3C6.500 3 2.500 6.600 2.500 11c0 2.400 1.200 4.500 3.100 6L4.800 21l4-1.900c1 .3 2.100.4 3.200.4 5.500 0 9.500-3.600 9.500-8.500S17.500 3 12 3z"/>')}</i><i>${ic('<path d="M6.600 10.800a15 15 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.2c1.100.4 2.300.6 3.600.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.300.2 2.500.6 3.600a1 1 0 0 1-.3 1z"/>')}</i><i>${ic('<rect x="2" y="6" width="14" height="12" rx="3"/><path d="M17 10l5-3v10l-5-3z"/>')}</i><i>${ic('<path d="M3 6h18v12H3z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="2"/>')}</i></div>
      <div class="pd-card"><div class="pd-h">통화 기록</div>${row}</div>
      ${p.phone ? `<div class="pd-card"><div class="pd-l">VOICE</div><div class="pd-n">${esc(p.phone)}</div></div>` : ""}
      <div class="pd-card"><div class="pd-a">연락처 공유</div><div class="pd-a">즐겨찾기에 추가</div></div></div>
      <nav class="ph-nav">${[["fav", "즐겨찾기", I.star], ["recent", "최근 통화", I.clock], ["con", "연락처", I.user], ["pad", "키패드", I.pad], ["vm", "음성 사서함", I.vm]].map(([k, n, i]) => `<button data-t="${k}" class="${k === "con" ? "on" : ""}">${i}<span>${n}</span></button>`).join("")}</nav></div>`;
    const out = () => { det = null; document.body.classList.remove("dk"); draw(); };
    bind(".pd-back", out);
    bind(".ph-nav button", el => { if (el.dataset.t === "recent" || el.dataset.t === "con") { tab = el.dataset.t; out(); } });
  };
  const draw = () => {
    if (det) return detail(person(det));
    const rows = P.calls.filter(c => flt === "all" || c.type === "missed");
    const recent = `<div class="ph-top"><button class="ph-pill">편집</button><div class="ph-seg"><button data-f="all" class="${flt === "all" ? "on" : ""}">모두</button><button data-f="missed" class="${flt === "missed" ? "on" : ""}">부재중 전화</button></div><button class="ph-round">${I.filt}</button></div>
      <div class="scroll"><ul class="ph-list">${rows.map(c => { const p = person(c.with); const label = c.label || "음성 통화";
      return `<li class="${c.type}">${av(p, "round")}<div class="ph-m"><b>${esc(nm(p))}</b><small>${arrow(c.type)} ${esc(label)}</small></div><time>${esc(c.time)}</time><i class="ph-i">i</i></li>`; }).join("")}</ul></div>`;
    const cs = P.contacts.slice().sort((a, b) => nm(a).localeCompare(nm(b), "ko"));
    const con = `<div class="ph-top"><b class="ph-ht">연락처</b></div><div class="scroll"><ul class="ph-list">${cs.map(p => `<li data-h="${esc(p.handle)}">${av(p, "round")}<div class="ph-m"><b>${esc(nm(p))}</b>${p.phone ? `<small>${esc(p.phone)}</small>` : ""}</div></li>`).join("")}</ul></div>`;
    const pad = `<div class="scroll"><div class="disp">${esc(num)}</div><div class="pad">${[..."123456789*0#"].map(k => `<button data-k="${k}">${k}</button>`).join("")}<button class="call">📞</button></div></div>`;
    const tabs = [["fav", "즐겨찾기", I.star], ["recent", "최근 통화", I.clock], ["con", "연락처", I.user], ["pad", "키패드", I.pad], ["vm", "음성 사서함", I.vm]];
    body.innerHTML = `<div class="ph">${tab === "con" ? con : recent}<nav class="ph-nav">${tabs.map(([k, n, i]) => `<button data-t="${k}" class="${tab === k ? "on" : ""}">${i}<span>${n}</span></button>`).join("")}</nav></div>`;
    bind(".ph-nav button", el => { if (el.dataset.t === "recent" || el.dataset.t === "con") { tab = el.dataset.t; draw(); } });
    bind(".ph-list li[data-h]", el => { det = el.dataset.h; draw(); });
    bind(".ph-seg button", el => { flt = el.dataset.f; draw(); });
    bind(".pad [data-k]", el => { num += el.dataset.k; draw(); });
  };
  draw();
}

/* 메시지 */
function sms() {
  const list = () => {
    body.innerHTML = `<div class="top"><h1>메시지</h1></div><div class="scroll"><ul class="k-list">${P.sms.map((c, i) => {
      const p = person(c.with), m = c.messages[c.messages.length - 1] || {};
      return `<li data-i="${i}">${av(p, "round")}<div><strong>${esc(nm(p))}</strong><p>${esc(m.text)}</p></div><time>${esc(m.time)}</time></li>`;
    }).join("")}</ul></div>`;
    bind("li", el => room(+el.dataset.i));
  };
  const room = i => {
    const c = P.sms[i], p = person(c.with);
    body.innerHTML = `<div class="sms" style="display:contents"><div class="top"><button class="back">‹</button><h1>${esc(nm(p))}</h1></div><div class="scroll"><div class="msgs">${c.messages.map(m => m.from === "me"
      ? `<div class="m me"><span class="b">${esc(m.text)}</span></div>`
      : `<div class="m them">${av(p, "s round")}<span class="b">${esc(m.text)}</span></div>`).join("")}</div></div></div>`;
    bind(".back", list);
    const s = body.querySelector(".scroll"); s.scrollTop = s.scrollHeight;
  };
  list();
}

/* 사파리 */
function safari() {
  const S = P.safari, N = S.news || [];
  const start = () => {
    document.body.classList.remove("dk");
    body.innerHTML = `<div class="scroll nw"><div class="nw-mast"><b>${esc(S.paper || "뉴스")}</b></div><div class="nw-tabs"><span class="on">종합</span><span>국제</span><span>화제</span><span>생활</span><span>연예·문화</span></div>
      <ul class="nw-list">${N.map((n, i) => `<li data-n="${i}" class="${n.image ? "big" : ""}">${n.image ? `<img src="${esc(n.image)}" alt="">` : ""}<div class="nw-t"><em>${esc(n.section || "")}</em><h3>${esc(n.title)}</h3><small>${esc(n.source)} · ${esc(n.time)}</small></div></li>`).join("")}</ul></div>
      <div class="sf-bar"><span class="pill">🔒 ${esc(S.domain || "news")}</span></div>`;
    bind("[data-n]", el => page(N[+el.dataset.n]));
  };
  const page = x => {
    body.innerHTML = `<div class="scroll nw"><div class="nw-mast"><b>${esc(S.paper || "뉴스")}</b></div><article class="nw-art"><em>${esc(x.section || "")}</em><h2>${esc(x.title)}</h2><div class="nw-meta">${esc(x.source)} · 입력 ${esc(x.time)}</div>${x.image ? `<img src="${esc(x.image)}" alt="">` : ""}${(x.body || []).map(t => `<p>${esc(t)}</p>`).join("")}</article></div><div class="sf-bar"><button class="back" style="padding:0">‹</button><span class="pill">🔒 ${esc(S.domain || "news")}</span></div>`;
    bind(".back", start);
  };
  start();
}

/* 유튜브 뮤직 */
function music() {
  const M = P.music || [], NP = P.nowPlaying || { title: "재생 중인 곡", artist: "", cover: "", duration: 200 };
  const hh = x => { let h = 0; for (const c of x) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
  const f = x => `${Math.floor(x / 60)}:${String(Math.floor(x % 60)).padStart(2, "0")}`;
  const sv = (p, c = "") => `<svg viewBox="0 0 24 24" class="${c}">${p}</svg>`;
  const Y = {
    logo: `<svg viewBox="0 0 24 24" class="yl"><circle cx="12" cy="12" r="12" fill="#f03"/><circle cx="12" cy="12" r="9" fill="none" stroke="#fff" stroke-width="1.200"/><path d="M9.600 7.800v8.400l7-4.200z" fill="#fff"/></svg>`,
    bell: sv('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.700 21a2 2 0 0 1-3.400 0"/>'),
    cast: sv('<path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8M2 16a5 5 0 0 1 4 4"/><circle cx="2.500" cy="20" r="1" fill="currentColor"/>'),
    play: sv('<path d="M7 4.500v15l13-7.500z" fill="currentColor" stroke="none"/>'),
    pause: sv('<path d="M6 4.500h4v15H6zM14 4.500h4v15h-4z" fill="currentColor" stroke="none"/>'),
    prev: sv('<path d="M6 5v14M19 5.500v13L9 12z" fill="currentColor"/>'),
    next: sv('<path d="M18 5v14M5 5.500v13L15 12z" fill="currentColor"/>'),
    down: sv('<path d="M5 9l7 7 7-7"/>'),
    dots: sv('<circle cx="12" cy="5" r="1.500" fill="currentColor"/><circle cx="12" cy="12" r="1.500" fill="currentColor"/><circle cx="12" cy="19" r="1.500" fill="currentColor"/>'),
    chev: sv('<path d="M9 5l7 7-7 7"/>'),
    head: sv('<path d="M4 17v-5a8 8 0 0 1 16 0v5M4 15h3v6H4zM17 15h3v6h-3z"/>'),
    yt: sv('<rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" stroke="none"/><path d="M9.500 7.500v9l7-4.500z" fill="#000" stroke="none"/>'),
    shuf: sv('<path d="M3 6h3c5 0 7 12 12 12h3M3 18h3c1.500 0 2.800-1 3.800-2.500M14 8c1-1.200 2.300-2 4-2h3M18 3l3 3-3 3M18 15l3 3-3 3"/>'),
    rep: sv('<path d="M4 11V9a3 3 0 0 1 3-3h13M17 3l3 3-3 3M20 13v2a3 3 0 0 1-3 3H4M7 21l-3-3 3-3"/>'),
    like: sv('<path d="M7 11v9H3v-9h4zM7 11l4-8c1.500 0 2.500 1.200 2 3l-.7 3H19a2 2 0 0 1 2 2.400l-1.300 6A2 2 0 0 1 17.700 20H7"/>'),
    dis: sv('<path d="M17 13V4h4v9h-4zM17 13l-4 8c-1.500 0-2.500-1.200-2-3l.7-3H5a2 2 0 0 1-2-2.400l1.300-6A2 2 0 0 1 6.300 4H17"/>'),
    cmt: sv('<path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1zM8 9h8M8 13h5"/>'),
    save: sv('<path d="M3 6h14M3 11h14M3 16h8M17 15v6M14 18h6"/>'),
    share: sv('<path d="M21 11l-7-7v4C7 8 3 12 3 20c2-4 5-5.500 11-5.500V19z"/>'),
    home: sv('<path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z" fill="currentColor" stroke="none"/>'),
    sample: sv('<path d="M5 5l7 7-7 7M12 5l7 7-7 7"/>'),
    search: sv('<circle cx="11" cy="11" r="7.500"/><path d="M16.500 16.500L21 21"/>'),
    lib: sv('<path d="M6 3h12v18l-6-4.500L6 21V3z" fill="currentColor" stroke="none"/>')
  };
  const art = x => `<span class="ym-a" style="background:linear-gradient(135deg,hsl(${hh(x.title)} 40% 38%),hsl(${(hh(x.title) + 50) % 360} 45% 22%))">${x.cover ? `<img src="${esc(x.cover)}" alt="" onerror="this.remove()">` : ""}</span>`;
  let got = false, cur = NP, on = false, el = 0, du = 0, t = null, mode = P.musicMode || "audio", full = false;
  const dur = () => du || cur.duration || 200;

  const T = M.map((x, i) => `<button class="ym-t" data-tile="${i}">${art(x)}<b>${esc(x.title)}</b></button>`);
  if (P.musicMore) T.push(`<button class="ym-t more"><span class="ym-a"><img src="${esc(P.musicMore)}" alt=""></span></button>`);
  const np = Math.max(1, Math.ceil(T.length / 9));
  const pg = Array.from({ length: np }, (_, k) => `<div class="ym-pg">${T.slice(k * 9, k * 9 + 9).join("")}</div>`).join("");
  const homeHtml = `<div class="ym-scroll">
      <div class="ym-hd">${Y.logo}<span class="ym-lg">Music</span><span class="ym-r"><i class="ym-bell">${Y.bell}<em>9+</em></i><span class="ym-me">M</span></span></div>
      <div class="ym-chips">${["팟캐스트", "행복한 기분", "운동", "에너지 충전", "휴식", "출퇴근", "집중"].map(c => `<span>${c}</span>`).join("")}</div>
      <div class="ym-sec"><span class="ym-me big">M</span><div><small>${esc(P.owner.name)}</small><h2>빠른 선곡</h2></div></div>
      <div class="ym-pages">${pg}</div>
      ${np > 1 ? `<div class="ym-dots">${Array.from({ length: np }, (_, k) => `<i class="${k ? "" : "on"}"></i>`).join("")}</div>` : ""}
      <div class="ym-sec2"><h2>빠른 선곡</h2><button data-all>모두 재생</button></div>
      <div class="ym-list">${M.map((x, i) => `<div class="ym-row" data-tile="${i}">${art(x)}<div><b>${esc(x.title)}</b><span>${esc(x.artist)}</span></div><i class="ym-dt">${Y.dots}</i></div>`).join("")}</div>
    </div>
    <div class="ym-mini" data-open></div>
    <nav class="ym-nav">${[["홈", Y.home, 1], ["샘플", Y.sample], ["검색", Y.search], ["보관함", Y.lib]].map(([n, i, a]) => `<span class="${a ? "on" : ""}">${i}${n}</span>`).join("")}</nav>`;
  body.innerHTML = `<div class="ym"><div class="ym-homew">${homeHtml}</div><div class="ym-full" hidden></div></div>`;
  const $f = body.querySelector(".ym-full"), $h = body.querySelector(".ym-homew"), $m = body.querySelector(".ym-mini");

  const mini = () => { $m.innerHTML = `${art(cur)}<div><b>${esc(cur.title)}</b><span>${esc(cur.artist)}</span></div><i class="ym-cast">${Y.cast}</i><button data-pp class="ym-pp">${on ? Y.pause : Y.play}</button>`; };
  const icons = () => body.querySelectorAll("[data-pp]").forEach(b => b.innerHTML = on ? Y.pause : Y.play);
  const cmd = fn => { const fr = $f.querySelector("iframe"); if (fr && fr.contentWindow) fr.contentWindow.postMessage(JSON.stringify({ event: "command", func: fn, args: "" }), "*"); };
  const bar = () => { const b = $f.querySelector("#ymb"); if (b) { b.style.width = Math.min(100, el / dur() * 100) + "%"; $f.querySelector("#yme").textContent = f(el); $f.querySelector("#ymd").textContent = f(dur()); } };
  const chip = (i, l, c = "") => `<span class="ym-ch ${c}">${i}${l ? `<em>${esc(l)}</em>` : ""}</span>`;
  const fullHtml = () => {
    let v = "";
    if (cur.video) {
      const o = location.protocol.startsWith("http") ? `&origin=${encodeURIComponent(location.origin)}` : "";
      v = `<iframe src="https://www.youtube.com/embed/${esc(cur.video)}?enablejsapi=1&playsinline=1&rel=0&autoplay=1&controls=1&modestbranding=1${o}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    }
    return `<div class="ym-ft"><button data-close>${Y.down}</button>
      <div class="ym-sw"><button data-mode="audio" class="${mode === "audio" ? "on" : ""}">${Y.head}</button><button data-mode="video" class="${mode === "video" ? "on" : ""}">${Y.yt}</button></div>
      <i>${Y.cast}</i><i>${Y.dots}</i></div>
      <div class="ym-media ${/debug/.test(location.search) ? "vid" : ""}">${v}<div class="ym-cv">${art(cur)}</div></div>
      <div class="ym-ti"><h2>${esc(cur.title)}${Y.chev}</h2><p>${esc(cur.artist)}</p></div>
      <div class="ym-chs">${chip(Y.like, cur.likes || "좋아요", "two")}${chip(Y.cmt, cur.comments || "댓글")}${chip(Y.save, "저장")}${chip(Y.share, "공유")}</div>
      <div class="ym-bar"><i id="ymb"></i></div><div class="ym-tm"><span id="yme">${f(el)}</span><span id="ymd">${f(dur())}</span></div>
      <div class="ym-ctl"><button>${Y.shuf}</button><button data-prev>${Y.prev}</button><button data-pp class="ym-pp big">${on ? Y.pause : Y.play}</button><button data-next>${Y.next}</button><button>${Y.rep}</button></div>
      <div class="ym-mx"><i></i><span>${esc(cur.artist || "믹스")} 믹스</span></div>`;
  };
  const renderFull = () => { $f.innerHTML = fullHtml(); bar(); const fr = $f.querySelector("iframe"); if (fr) { fr.onload = () => { const l = () => fr.contentWindow && fr.contentWindow.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*"); l(); setTimeout(l, 600); setTimeout(l, 1500); }; } };
  const show = v => { full = v; $f.hidden = !v; $h.hidden = v; };
  const setTrack = x => { cur = x; el = 0; du = 0; got = false; on = true; mini(); renderFull(); if (cur.video) { const c = cur; setTimeout(() => { if (cur === c && on && !got) { on = false; icons(); } }, 3000); } };
  const go = d => { if (!M.length) return; const i = M.indexOf(cur); setTrack(M[(((i < 0 ? 0 : i) + d) % M.length + M.length) % M.length]); };
  mini(); renderFull();

  t = setInterval(() => { if (on && !cur.video) { el = Math.min(dur(), el + 1); bar(); } }, 1000);
  const msg = e => {
    if (typeof e.data !== "string" || e.data[0] !== "{") return;
    let d; try { d = JSON.parse(e.data); } catch (x) { return; }
    const i = d.info; if (!i) return; got = true;
    if (typeof i.currentTime === "number") el = i.currentTime;
    if (i.duration) du = i.duration;
    if (i.playerState === 1 || i.playerState === 2) { const n = i.playerState === 1; if (n !== on) { on = n; icons(); } }
    bar();
  };
  window.addEventListener("message", msg);
  body.onclick = e => {
    const x = e.target.closest("[data-tile],[data-open],[data-pp],[data-close],[data-prev],[data-next],[data-all],[data-mode]"); if (!x) return;
    const d = x.dataset;
    if (d.pp !== undefined) { on = !on; if (cur.video) cmd(on ? "playVideo" : "pauseVideo"); icons(); }
    else if (d.tile !== undefined) { setTrack(M[+d.tile]); show(true); }
    else if (d.all !== undefined) { if (M.length) setTrack(M[0]); }
    else if (d.open !== undefined) show(true);
    else if (d.close !== undefined) show(false);
    else if (d.prev !== undefined) go(-1);
    else if (d.next !== undefined) go(1);
    else if (d.mode !== undefined) { mode = d.mode; $f.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("on", b.dataset.mode === mode)); }
  };
  onClose = () => { clearInterval(t); window.removeEventListener("message", msg); body.onclick = null; };
}

/* 홈 화면 */
let onClose = null;
const IC = n => `images/icons/${n}.png`;
const APPS = [
  { name: "카카오톡", icon: "kakao", run: kakao },
  { name: "Instagram", icon: "insta", run: insta },
  { name: "메모", icon: "memo", run: memo },
  { name: "사진", icon: "photos", run: photos },
  { name: "캘린더", icon: "calendar", run: calendar },
  { name: "YouTube", icon: "youtube" },
  { name: "X", icon: "x", run: xapp }
];
const DOCK = [
  { icon: "phone", run: phone },
  { icon: "messages", run: sms },
  { icon: "safari", run: safari },
  { icon: "youtubemusic", run: music, dark: true }
];
const bd = n => n ? `<em class="bd">${n}</em>` : "";
const tile = a => `<i><img src="${IC(a.icon)}" alt="">${bd(a.badge)}</i>`;
$("#grid").innerHTML = APPS.map((a, i) => `<button class="ico ${a.run ? "" : "dead"}" data-a="${i}">${tile(a)}${a.name}</button>`).join("")
  + `<div class="ico folder dead"><i><u><img src="${IC("settings")}" alt=""></u><u style="background:#4f9bf0">⛅</u><u><img src="${IC("camera")}" alt=""></u></i>유틸리티</div>`;
document.querySelectorAll(".folder").forEach(f => f.onclick = () => { const b = f.querySelector(".bd"); if (b) b.remove(); });
$("#dock").innerHTML = DOCK.map((a, i) => `<button class="ico" data-d="${i}">${tile(a)}</button>`).join("");
if (P.wallpaper) $("#home").style.setProperty("--wp", `url("${P.wallpaper}")`);

const openApp = (a, el) => {
  const b = el.querySelector(".bd"); if (b) b.remove();
  if (!a.run) return;
  const r = el.getBoundingClientRect(), s = $("#screen").getBoundingClientRect(), k = s.width / 368;
  app.style.transformOrigin = `${(r.left + r.width / 2 - s.left) / k}px ${(r.top + r.height / 2 - s.top) / k}px`;
  app.classList.toggle("dark", !!a.dark); document.body.classList.toggle("dk", !!a.dark);
  app.hidden = false; a.run(); void app.offsetWidth;
  app.classList.add("on"); document.body.classList.add("in");
};
document.querySelectorAll("#grid [data-a]").forEach(el => el.onclick = () => openApp(APPS[+el.dataset.a], el));
document.querySelectorAll("#dock [data-d]").forEach(el => el.onclick = () => openApp(DOCK[+el.dataset.d], el));
$("#homebar").onclick = () => {
  if (app.hidden) return;
  if (onClose) { onClose(); onClose = null; }
  app.classList.remove("on"); document.body.classList.remove("in");
  setTimeout(() => { app.hidden = true; body.innerHTML = ""; document.body.classList.remove("dk"); }, 320);
};

/* 배터리 */
{ const v = Math.max(0, Math.min(100, +(P.battery ?? 95))); $("#batn").textContent = v; $(".bat i").style.width = v + "%"; }

/* 시계 + 화면 크기 맞춤 */
const tick = () => { const d = new Date(); $("#clock").textContent = `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}`; };
tick(); setInterval(tick, 20000);
const fit = () => {
  const ph = $("#phone"), full = innerWidth <= 600;
  document.body.classList.toggle("full", full);
  if (full) { const k = innerWidth / 368; ph.style.height = (innerHeight / k) + "px"; ph.style.transform = `scale(${k})`; }
  else { ph.style.height = ""; ph.style.transform = `scale(${Math.min(1.2, innerHeight / 822, innerWidth / 368)})`; }
};
fit(); addEventListener("resize", fit);

/* 사진 여러 장: 화살표 없이 마우스 드래그로도 넘기기 (터치/트랙패드는 기본 스크롤) */
(() => {
  let tr = null, x0 = 0, s0 = 0, moved = false, k = 1;
  document.addEventListener("pointerdown", e => {
    if (e.pointerType !== "mouse") return;
    const t = e.target.closest(".ig-track, .pv"); if (!t) return;
    tr = t; x0 = e.clientX; s0 = t.scrollLeft; moved = false; k = t.getBoundingClientRect().width / t.offsetWidth || 1;
  });
  document.addEventListener("pointermove", e => {
    if (!tr) return;
    const dx = e.clientX - x0;
    if (Math.abs(dx) > 4) { moved = true; tr.style.scrollSnapType = "none"; tr.style.scrollBehavior = "auto"; tr.scrollLeft = s0 - dx / k; }
  });
  const end = () => {
    if (!tr) return;
    const t = tr; tr = null;
    if (moved) { const w = t.clientWidth, i = Math.round(t.scrollLeft / w); t.style.scrollSnapType = ""; t.style.scrollBehavior = ""; t.scrollTo({ left: i * w, behavior: "smooth" }); }
  };
  document.addEventListener("pointerup", end); document.addEventListener("pointercancel", end);
})();
