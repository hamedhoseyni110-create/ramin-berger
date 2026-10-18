/* ============================================================
   رامین برگر — منطق سایت (بدون هیچ درخواست خارجی)
   سه‌زبانه: فارسی / انگلیسی / عربی — با سوییچر زبان
   ============================================================ */
(function () {
  "use strict";

  /* ---------- زبان فعلی ---------- */
  const LANGS = ["fa", "en", "ar"];
  let LANG = "fa";
  try {
    const qp = new URLSearchParams(location.search).get("lang");
    const saved = localStorage.getItem("ramin-burger-lang");
    if (qp && LANGS.includes(qp)) LANG = qp;
    else if (saved && LANGS.includes(saved)) LANG = saved;
  } catch (e) {}
  const L = () => I18N[LANG] || I18N.fa;
  const ui = k => (L().ui[k] !== undefined ? L().ui[k] : I18N.fa.ui[k]);

  /* ---------- ابزار اعداد و قیمت محلی ---------- */
  const locNum = n => Number(n).toLocaleString(L().locale);
  const locPrice = n => L().currencyAfter ? locNum(n) + " " + L().currency : L().currency + locNum(n);
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- نام‌های محلی از روی شناسه ---------- */
  function catName(id) {
    const c = CONFIG.menu.find(c => c.id === id);
    return (L().categories && L().categories[id]) || (c && c.name) || id;
  }
  function itemName(id) {
    let fb = null;
    for (const c of CONFIG.menu) { const it = c.items.find(i => i.id === id); if (it) { fb = it.name; break; } }
    return (L().items && L().items[id]) || fb || id;
  }
  function itemPrice(id) {
    for (const c of CONFIG.menu) { const it = c.items.find(i => i.id === id); if (it) return it.price; }
    return 0;
  }
  function extraName(id) {
    const ex = CONFIG.builder.extras.find(e => e.id === id);
    return (L().extras && L().extras[id]) || (ex && ex.name) || id;
  }
  function extraPrice(id) {
    const ex = CONFIG.builder.extras.find(e => e.id === id);
    return ex ? ex.price : 0;
  }
  function ingName(id) {
    const ing = CONFIG.assets.ingredients.find(i => i.id === id);
    return (L().ingredients && L().ingredients[id] && L().ingredients[id][0]) || (ing && ing.name) || id;
  }
  function ingDesc(id) {
    const ing = CONFIG.assets.ingredients.find(i => i.id === id);
    return (L().ingredients && L().ingredients[id] && L().ingredients[id][1]) || (ing && ing.desc) || "";
  }

  /* ---------- اعمال متن‌های ثابت ---------- */
  function renderStatic() {
    document.documentElement.lang = LANG;
    document.documentElement.dir = L().dir;
    document.title = L().brand.name + " | " + L().brand.tagline;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", L().brand.description);

    document.querySelectorAll("[data-brand]").forEach(el => { el.textContent = L().brand.name; });
    document.querySelectorAll("[data-phone]").forEach(el => { el.textContent = CONFIG.contact.phoneDisplay; });

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n");
      let v;
      if (k === "tagline") v = L().brand.tagline;
      else if (k === "address") v = L().contact.address;
      else if (k === "hours") v = L().contact.hours;
      else v = ui(k);
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => {
      el.setAttribute("aria-label", ui(el.getAttribute("data-i18n-aria")));
    });
    // عنوان‌های سه‌تکه با accent
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
      const segs = L().titles[el.getAttribute("data-i18n-title")] || I18N.fa.titles[el.getAttribute("data-i18n-title")];
      if (!segs) return;
      el.textContent = "";
      el.append(document.createTextNode(segs[0]));
      const ac = document.createElement("span");
      ac.className = "accent";
      ac.textContent = segs[1];
      el.append(ac, document.createTextNode(segs[2]));
    });
    // وضعیت فعال سوییچر
    document.querySelectorAll(".lang-switch [data-lang]").forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-lang") === LANG);
    });
  }

  /* ---------- پیام شناور ---------- */
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function toast(msg) {
    toastEl.querySelector("span").textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  /* ---------- مواد اولیه ---------- */
  const ingStage = document.getElementById("ing-stage");
  function renderIngredients() {
    ingStage.innerHTML = "";
    CONFIG.assets.ingredients.forEach(ing => {
      const card = document.createElement("div");
      card.className = "ing-card reveal visible";
      const floater = document.createElement("div");
      floater.className = "ing-float";
      const photo = document.createElement("div");
      photo.className = "ing-photo";
      const img = document.createElement("img");
      img.src = ing.src; img.alt = ingName(ing.id); img.loading = "lazy";
      photo.appendChild(img);
      const h3 = document.createElement("h3"); h3.textContent = ingName(ing.id);
      const p = document.createElement("p"); p.textContent = ingDesc(ing.id);
      floater.append(photo, h3, p);
      card.appendChild(floater);
      ingStage.appendChild(card);
    });
    // اتصال دوباره‌ی پارالاکس به کارت‌های تازه
    ingCards = [...document.querySelectorAll(".ing-card")];
  }

  /* ---------- منو ---------- */
  const menuRoot = document.getElementById("menu-root");
  function renderMenu() {
    menuRoot.innerHTML = "";
    CONFIG.menu.forEach(cat => {
      const catEl = document.createElement("div");
      catEl.className = "menu-cat reveal visible";

      const photoWrap = document.createElement("div");
      photoWrap.className = "menu-cat-photo";
      const img = document.createElement("img");
      img.src = cat.photo; img.alt = catName(cat.id); img.loading = "lazy";
      const name = document.createElement("div");
      name.className = "menu-cat-name"; name.textContent = catName(cat.id);
      photoWrap.append(img, name);

      const itemsWrap = document.createElement("div");
      itemsWrap.className = "menu-items";
      cat.items.forEach(item => {
        const row = document.createElement("div");
        row.className = "menu-item";
        const info = document.createElement("div");
        info.className = "info";
        const nm = document.createElement("div"); nm.className = "name"; nm.textContent = itemName(item.id);
        info.appendChild(nm);
        const price = document.createElement("div"); price.className = "price"; price.textContent = locPrice(item.price);
        const add = document.createElement("button");
        add.className = "btn btn-primary btn-small"; add.textContent = ui("add");
        add.addEventListener("click", () => {
          Cart.addMenu(item.id);
          toast(ui("addedToCart").replace("{name}", itemName(item.id)));
        });
        row.append(info, price, add);
        itemsWrap.appendChild(row);
      });

      catEl.append(photoWrap, itemsWrap);
      menuRoot.appendChild(catEl);
    });
  }

  /* ---------- برگرساز ---------- */
  const burgers = CONFIG.menu[0].items;
  const builderState = { baseId: burgers[0].id, extras: new Set() };
  const baseGrid = document.getElementById("base-grid");
  const extrasGrid = document.getElementById("extras-grid");
  const builderPriceEl = document.getElementById("builder-price");

  function builderTotal() {
    let t = itemPrice(builderState.baseId);
    builderState.extras.forEach(id => { t += extraPrice(id); });
    return t;
  }
  function renderBuilderPrice() {
    builderPriceEl.textContent = locPrice(builderTotal());
  }
  function renderBuilder() {
    baseGrid.innerHTML = "";
    burgers.forEach(b => {
      const btn = document.createElement("button");
      btn.className = "base-card" + (b.id === builderState.baseId ? " selected" : "");
      btn.type = "button";
      const nm = document.createElement("span"); nm.className = "b-name"; nm.textContent = itemName(b.id);
      const pr = document.createElement("span"); pr.className = "b-price"; pr.textContent = locPrice(b.price);
      btn.append(nm, pr);
      btn.addEventListener("click", () => {
        builderState.baseId = b.id;
        baseGrid.querySelectorAll(".base-card").forEach(c => c.classList.remove("selected"));
        btn.classList.add("selected");
        renderBuilderPrice();
      });
      baseGrid.appendChild(btn);
    });

    extrasGrid.innerHTML = "";
    CONFIG.builder.extras.forEach(ex => {
      const chip = document.createElement("button");
      chip.className = "extra-chip" + (builderState.extras.has(ex.id) ? " selected" : "");
      chip.type = "button";
      const label = document.createElement("span"); label.textContent = extraName(ex.id);
      const pr = document.createElement("span"); pr.className = "ep"; pr.textContent = locPrice(ex.price);
      chip.append(label, pr);
      chip.addEventListener("click", () => {
        if (builderState.extras.has(ex.id)) {
          builderState.extras.delete(ex.id);
          chip.classList.remove("selected");
        } else {
          builderState.extras.add(ex.id);
          chip.classList.add("selected");
        }
        renderBuilderPrice();
      });
      extrasGrid.appendChild(chip);
    });
    renderBuilderPrice();
  }

  document.getElementById("builder-add").addEventListener("click", () => {
    Cart.addCustom(builderState.baseId, [...builderState.extras]);
    toast(ui("customAdded"));
  });

  /* ---------- سبد خرید ---------- */
  function displayName(it) {
    if (it.kind === "custom") return itemName(it.ref) + " " + ui("customSuffix");
    return itemName(it.ref) || it.nameFa || "";
  }
  function displayExtras(it) {
    return (it.extras || []).map(extraName);
  }
  const Cart = {
    items: [],
    load() {
      try {
        const raw = localStorage.getItem("ramin-burger-cart");
        if (raw) this.items = JSON.parse(raw) || [];
      } catch (e) { this.items = []; }
    },
    save() {
      try { localStorage.setItem("ramin-burger-cart", JSON.stringify(this.items)); } catch (e) {}
    },
    addMenu(menuId) {
      const price = itemPrice(menuId);
      const key = "menu|" + menuId + "|" + price;
      const found = this.items.find(i => i.key === key);
      if (found) found.qty += 1;
      else this.items.push({ key, kind: "menu", ref: menuId, nameFa: I18N.fa.items[menuId] || "", extras: [], price, qty: 1 });
      this.save(); this.render();
    },
    addCustom(baseId, extras) {
      const price = builderTotal();
      const key = "custom|" + baseId + "|" + extras.slice().sort().join("+") + "|" + price;
      const found = this.items.find(i => i.key === key);
      if (found) found.qty += 1;
      else this.items.push({ key, kind: "custom", ref: baseId, nameFa: "", extras: extras.slice(), price, qty: 1 });
      this.save(); this.render();
    },
    setQty(key, qty) {
      const it = this.items.find(i => i.key === key);
      if (!it) return;
      it.qty = qty;
      if (it.qty <= 0) this.items = this.items.filter(i => i.key !== key);
      this.save(); this.render();
    },
    remove(key) {
      this.items = this.items.filter(i => i.key !== key);
      this.save(); this.render();
    },
    count() { return this.items.reduce((s, i) => s + i.qty, 0); },
    total() { return this.items.reduce((s, i) => s + i.qty * i.price, 0); },
    render() {
      const body = document.getElementById("cart-body");
      const foot = document.getElementById("cart-foot");
      const countEl = document.getElementById("cart-count");
      body.innerHTML = "";
      const n = this.count();
      countEl.textContent = locNum(n);
      countEl.classList.toggle("hidden", n === 0);

      if (this.items.length === 0) {
        const empty = document.createElement("div");
        empty.className = "cart-empty";
        empty.textContent = ui("cartEmpty");
        body.appendChild(empty);
        foot.style.display = "none";
        return;
      }
      foot.style.display = "";

      this.items.forEach(it => {
        const row = document.createElement("div");
        row.className = "cart-item";
        const info = document.createElement("div"); info.className = "ci-info";
        const nm = document.createElement("div"); nm.className = "ci-name"; nm.textContent = displayName(it);
        info.appendChild(nm);
        const exNames = displayExtras(it);
        if (exNames.length) {
          const ex = document.createElement("div"); ex.className = "ci-extras";
          ex.textContent = exNames.join(L().listSep);
          info.appendChild(ex);
        }
        const pr = document.createElement("div"); pr.className = "ci-price";
        pr.textContent = locPrice(it.price * it.qty);
        info.appendChild(pr);

        const ctl = document.createElement("div"); ctl.className = "qty-ctl";
        const minus = document.createElement("button"); minus.textContent = "−"; minus.setAttribute("aria-label", ui("decQty"));
        minus.addEventListener("click", () => this.setQty(it.key, it.qty - 1));
        const q = document.createElement("span"); q.className = "q"; q.textContent = locNum(it.qty);
        const plus = document.createElement("button"); plus.textContent = "+"; plus.setAttribute("aria-label", ui("incQty"));
        plus.addEventListener("click", () => this.setQty(it.key, it.qty + 1));
        ctl.append(minus, q, plus);

        const rm = document.createElement("button"); rm.className = "ci-remove"; rm.textContent = "×";
        rm.setAttribute("aria-label", ui("removeItem"));
        rm.addEventListener("click", () => this.remove(it.key));

        row.append(info, ctl, rm);
        body.appendChild(row);
      });

      document.getElementById("cart-total-val").textContent = locPrice(this.total());
    },
    checkout() {
      if (!this.items.length) return;
      const lines = [ui("orderGreeting").replace("{brand}", L().brand.name)];
      this.items.forEach(it => {
        let line = "• " + displayName(it) + " × " + locNum(it.qty) + " — " + locPrice(it.price * it.qty);
        const exNames = displayExtras(it);
        if (exNames.length) line += " (" + exNames.join(L().listSep) + ")";
        lines.push(line);
      });
      lines.push(ui("orderTotal") + " " + locPrice(this.total()));
      const url = "https://wa.me/" + CONFIG.contact.whatsapp + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    }
  };
  Cart.load();

  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  function openCart() { drawer.classList.add("open"); overlay.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeCart() { drawer.classList.remove("open"); overlay.classList.remove("open"); document.body.style.overflow = ""; }
  document.getElementById("cart-fab").addEventListener("click", openCart);
  document.getElementById("cart-close").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });
  document.getElementById("checkout-btn").addEventListener("click", () => Cart.checkout());

  /* ---------- ظاهرشدن با اسکرول ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  function observeReveals() {
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => io.observe(el));
  }

  /* ---------- پارالاکس مواد ---------- */
  let ingCards = [];
  const speeds = [0.06, -0.05, 0.08, -0.06];
  let ticking = false;
  function parallax() {
    ticking = false;
    if (REDUCED) return;
    const vh = window.innerHeight;
    ingCards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const off = (r.top + r.height / 2 - vh / 2) * speeds[i % speeds.length];
      card.style.transform = "translateY(" + off.toFixed(1) + "px)";
    });
  }
  function onScrollParallax() {
    if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
  }
  window.addEventListener("scroll", onScrollParallax, { passive: true });
  window.addEventListener("resize", onScrollParallax);

  /* ---------- ویدیوی هیرو: توقف وقتی خارج از دید است ---------- */
  const heroVideo = document.getElementById("hero-video");
  const heroEl = document.getElementById("top");
  if (heroVideo && heroEl) {
    if (REDUCED) {
      heroVideo.removeAttribute("autoplay");
      heroVideo.pause();
    } else {
      const tryPlay = () => { heroVideo.play().catch(() => {}); };
      new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) tryPlay(); else heroVideo.pause(); });
      }, { threshold: 0.12 }).observe(heroEl);
    }
  }

  /* ---------- مونتاژ اسکرول‌محور (فریم‌سکانس آرگون) ---------- */
  const STAGE_UNTIL = [0.18, 0.38, 0.56, 0.76, 1.01];
  const canvas = document.getElementById("assembly-canvas");
  const ctx = canvas.getContext("2d");
  const captionEl = document.getElementById("stage-caption").querySelector("span");
  const progressEl = document.getElementById("assembly-progress").querySelector("i");
  const loadHintEl = document.getElementById("load-hint");
  const wrap = document.getElementById("assembly");
  const N = CONFIG.assets.assemblyFrames;
  const frames = new Array(N).fill(null);
  let loaded = 0, target = 0, current = 0, drawnFrame = -1, rafStarted = false;
  const FW = 768, FH = 432;
  canvas.width = FW; canvas.height = FH;

  function drawCover(img) {
    const s = Math.max(FW / img.width, FH / img.height);
    const w = img.width * s, h = img.height * s;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, FW, FH);
    ctx.drawImage(img, (FW - w) / 2, (FH - h) / 2, w, h);
  }
  function setCaption(p) {
    const stages = L().stages;
    let idx = stages.length - 1;
    for (let i = 0; i < STAGE_UNTIL.length; i++) {
      if (p < STAGE_UNTIL[i]) { idx = i; break; }
    }
    if (captionEl.textContent !== stages[idx]) {
      captionEl.style.opacity = "0";
      setTimeout(() => { captionEl.textContent = stages[idx]; captionEl.style.opacity = "1"; }, 160);
    }
    progressEl.style.width = (p * 100).toFixed(1) + "%";
  }
  function frameFor(p) { return Math.min(N - 1, Math.max(0, Math.round(p * (N - 1)))); }

  function updateLoadHint() {
    if (!loadHintEl) return;
    if (loaded >= N) { loadHintEl.classList.add("done"); return; }
    loadHintEl.textContent = ui("loadHint")
      .replace("{loaded}", locNum(loaded))
      .replace("{total}", locNum(N));
  }
  function loadFrame(i) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => { frames[i] = img; loaded++; updateLoadHint(); resolve(); };
      img.onerror = () => { resolve(); };
      img.src = CONFIG.assets.assemblyPath(i);
    });
  }
  function startRaf() {
    if (rafStarted) return;
    rafStarted = true;
    if (!REDUCED) raf();
  }

  function assemblyProgress() {
    const r = wrap.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    if (total <= 0) return 0;
    return Math.min(1, Math.max(0, -r.top / total));
  }
  function raf() {
    const p = assemblyProgress();
    target = frameFor(p);
    if (Math.abs(target - current) > 0.01) {
      current += (target - current) * 0.14;
      const f = Math.round(current);
      if (f !== drawnFrame && frames[f]) {
        drawnFrame = f;
        drawCover(frames[f]);
      }
    } else if (drawnFrame !== target && frames[target]) {
      drawnFrame = target;
      drawCover(frames[target]);
    }
    setCaption(p);
    requestAnimationFrame(raf);
  }
  // فریم اول فوری، بقیه دسته‌ای در زمان بیکاری
  loadFrame(0).then(() => {
    if (frames[0]) { drawCover(frames[0]); setCaption(0); }
    startRaf();
    const queue = [];
    for (let i = 1; i < N; i++) queue.push(i);
    const pump = () => {
      const batch = queue.splice(0, 6);
      if (!batch.length) return;
      Promise.all(batch.map(loadFrame)).then(() => {
        if (REDUCED && !queue.length && frames[N - 1]) { drawCover(frames[N - 1]); setCaption(1); }
        if (queue.length) {
          if ("requestIdleCallback" in window) requestIdleCallback(pump, { timeout: 1500 });
          else setTimeout(pump, 0);
        }
      });
    };
    if ("requestIdleCallback" in window) requestIdleCallback(pump, { timeout: 2000 });
    else setTimeout(pump, 0);
  });

  /* ---------- سوییچر زبان ---------- */
  function setLang(next, save) {
    if (!LANGS.includes(next)) return;
    LANG = next;
    try {
      if (save !== false) localStorage.setItem("ramin-burger-lang", LANG);
    } catch (e) {}
    try {
      const u = new URL(location.href);
      u.searchParams.set("lang", LANG);
      history.replaceState(null, "", u.toString());
    } catch (e) {}
    renderStatic();
    renderIngredients();
    renderMenu();
    renderBuilder();
    Cart.render();
    updateLoadHint();
    captionEl.textContent = ""; // وادار کردن به‌روزرسانی کپشن مرحله
    // پاک کردن تست باقی‌مانده از زبان قبلی
    clearTimeout(toastTimer);
    toastEl.classList.remove("show");
  }
  document.querySelectorAll(".lang-switch [data-lang]").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });

  /* ---------- رندر اولیه ---------- */
  setLang(LANG, false);
  observeReveals();
})();
