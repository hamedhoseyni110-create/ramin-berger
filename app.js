/* ============================================================
   رامین برگر — منطق سایت (بدون هیچ درخواست خارجی)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- ابزار اعداد فارسی ---------- */
  const faNum = n => Number(n).toLocaleString("fa-IR");
  const faPrice = n => faNum(n) + " تومان";
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- اعمال برند از کانفیگ ---------- */
  document.title = CONFIG.brand.name + " | " + CONFIG.brand.tagline;
  document.querySelectorAll("[data-brand]").forEach(el => { el.textContent = CONFIG.brand.name; });
  document.querySelectorAll("[data-tagline]").forEach(el => { el.textContent = CONFIG.brand.tagline; });
  document.querySelectorAll("[data-phone]").forEach(el => { el.textContent = CONFIG.contact.phoneDisplay; });
  document.querySelectorAll("[data-address]").forEach(el => { el.textContent = CONFIG.contact.address; });
  document.querySelectorAll("[data-hours]").forEach(el => { el.textContent = CONFIG.contact.hours; });

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
  CONFIG.assets.ingredients.forEach(ing => {
    const card = document.createElement("div");
    card.className = "ing-card reveal";
    const floater = document.createElement("div");
    floater.className = "ing-float";
    const photo = document.createElement("div");
    photo.className = "ing-photo";
    const img = document.createElement("img");
    img.src = ing.src; img.alt = ing.name; img.loading = "lazy";
    photo.appendChild(img);
    const h3 = document.createElement("h3"); h3.textContent = ing.name;
    const p = document.createElement("p"); p.textContent = ing.desc;
    floater.append(photo, h3, p);
    card.appendChild(floater);
    ingStage.appendChild(card);
  });

  /* ---------- منو ---------- */
  const menuRoot = document.getElementById("menu-root");
  CONFIG.menu.forEach(cat => {
    const catEl = document.createElement("div");
    catEl.className = "menu-cat reveal";

    const photoWrap = document.createElement("div");
    photoWrap.className = "menu-cat-photo";
    const img = document.createElement("img");
    img.src = cat.photo; img.alt = cat.name; img.loading = "lazy";
    const name = document.createElement("div");
    name.className = "menu-cat-name"; name.textContent = cat.name;
    photoWrap.append(img, name);

    const itemsWrap = document.createElement("div");
    itemsWrap.className = "menu-items";
    cat.items.forEach(item => {
      const row = document.createElement("div");
      row.className = "menu-item";
      const info = document.createElement("div");
      info.className = "info";
      const nm = document.createElement("div"); nm.className = "name"; nm.textContent = item.name;
      info.appendChild(nm);
      const price = document.createElement("div"); price.className = "price"; price.textContent = faPrice(item.price);
      const add = document.createElement("button");
      add.className = "btn btn-primary btn-small"; add.textContent = "افزودن";
      add.addEventListener("click", () => {
        Cart.add({ id: item.id, name: item.name, price: item.price, extras: [] });
        toast("«" + item.name + "» به سبد اضافه شد");
      });
      row.append(info, price, add);
      itemsWrap.appendChild(row);
    });

    catEl.append(photoWrap, itemsWrap);
    menuRoot.appendChild(catEl);
  });

  /* ---------- برگرساز ---------- */
  const burgers = CONFIG.menu[0].items;
  const builderState = { base: burgers[0], extras: new Set() };
  const baseGrid = document.getElementById("base-grid");
  const extrasGrid = document.getElementById("extras-grid");
  const builderPriceEl = document.getElementById("builder-price");

  function builderTotal() {
    let t = builderState.base.price;
    builderState.extras.forEach(id => {
      const ex = CONFIG.builder.extras.find(e => e.id === id);
      if (ex) t += ex.price;
    });
    return t;
  }
  function renderBuilderPrice() {
    builderPriceEl.textContent = faPrice(builderTotal());
  }

  burgers.forEach((b, i) => {
    const btn = document.createElement("button");
    btn.className = "base-card" + (i === 0 ? " selected" : "");
    btn.type = "button";
    const nm = document.createElement("span"); nm.className = "b-name"; nm.textContent = b.name;
    const pr = document.createElement("span"); pr.className = "b-price"; pr.textContent = faPrice(b.price);
    btn.append(nm, pr);
    btn.addEventListener("click", () => {
      builderState.base = b;
      baseGrid.querySelectorAll(".base-card").forEach(c => c.classList.remove("selected"));
      btn.classList.add("selected");
      renderBuilderPrice();
    });
    baseGrid.appendChild(btn);
  });

  CONFIG.builder.extras.forEach(ex => {
    const chip = document.createElement("button");
    chip.className = "extra-chip"; chip.type = "button";
    const label = document.createElement("span"); label.textContent = ex.name;
    const pr = document.createElement("span"); pr.className = "ep"; pr.textContent = faPrice(ex.price);
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

  document.getElementById("builder-add").addEventListener("click", () => {
    const extraNames = [...builderState.extras].map(id => {
      const ex = CONFIG.builder.extras.find(e => e.id === id);
      return ex ? ex.name : "";
    }).filter(Boolean);
    const label = extraNames.length ? builderState.base.name + " (دست‌ساز)" : builderState.base.name;
    Cart.add({ id: "custom-" + Date.now(), name: label, price: builderTotal(), extras: extraNames });
    toast("برگر دست‌سازت به سبد اضافه شد");
  });

  /* ---------- سبد خرید ---------- */
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
    add(entry) {
      const key = entry.name + "|" + entry.extras.join("+") + "|" + entry.price;
      const found = this.items.find(i => i.key === key);
      if (found) found.qty += 1;
      else this.items.push({ key, name: entry.name, price: entry.price, extras: entry.extras.slice(), qty: 1 });
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
      countEl.textContent = faNum(n);
      countEl.classList.toggle("hidden", n === 0);

      if (this.items.length === 0) {
        const empty = document.createElement("div");
        empty.className = "cart-empty";
        empty.textContent = "سبدت خالیه — یه چیزی از منو انتخاب کن!";
        body.appendChild(empty);
        foot.style.display = "none";
        return;
      }
      foot.style.display = "";

      this.items.forEach(it => {
        const row = document.createElement("div");
        row.className = "cart-item";
        const info = document.createElement("div"); info.className = "ci-info";
        const nm = document.createElement("div"); nm.className = "ci-name"; nm.textContent = it.name;
        info.appendChild(nm);
        if (it.extras.length) {
          const ex = document.createElement("div"); ex.className = "ci-extras";
          ex.textContent = it.extras.join("، ");
          info.appendChild(ex);
        }
        const pr = document.createElement("div"); pr.className = "ci-price";
        pr.textContent = faPrice(it.price * it.qty);
        info.appendChild(pr);

        const ctl = document.createElement("div"); ctl.className = "qty-ctl";
        const minus = document.createElement("button"); minus.textContent = "−"; minus.setAttribute("aria-label", "کم کردن");
        minus.addEventListener("click", () => this.setQty(it.key, it.qty - 1));
        const q = document.createElement("span"); q.className = "q"; q.textContent = faNum(it.qty);
        const plus = document.createElement("button"); plus.textContent = "+"; plus.setAttribute("aria-label", "زیاد کردن");
        plus.addEventListener("click", () => this.setQty(it.key, it.qty + 1));
        ctl.append(minus, q, plus);

        const rm = document.createElement("button"); rm.className = "ci-remove"; rm.textContent = "×";
        rm.setAttribute("aria-label", "حذف");
        rm.addEventListener("click", () => this.remove(it.key));

        row.append(info, ctl, rm);
        body.appendChild(row);
      });

      document.getElementById("cart-total-val").textContent = faPrice(this.total());
    },
    checkout() {
      if (!this.items.length) return;
      const lines = ["سلام " + CONFIG.brand.name + "! سفارش من:"];
      this.items.forEach(it => {
        let line = "• " + it.name + " × " + faNum(it.qty) + " — " + faPrice(it.price * it.qty);
        if (it.extras.length) line += " (" + it.extras.join("، ") + ")";
        lines.push(line);
      });
      lines.push("جمع کل: " + faPrice(this.total()));
      const url = "https://wa.me/" + CONFIG.contact.whatsapp + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    }
  };
  Cart.load();
  Cart.render();

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
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- پارالاکس مواد ---------- */
  const ingCards = [...document.querySelectorAll(".ing-card")];
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
  // خنثی‌کردن هاور روی موبایل لمسی لازم نیست؛ ترنسفورم پارالاکس با هاور تداخل ندارد چون هاور فقط دسکتاپ است
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
  const STAGES = [
    { until: 0.18, text: "اول، نون تازه‌ی بریوش" },
    { until: 0.38, text: "بعد، گوشت گریل آتیشی" },
    { until: 0.56, text: "پنیر چدار آب‌شده" },
    { until: 0.76, text: "کاهو و گوجه‌ی تازه" },
    { until: 1.01, text: "و تمام — برگر آماده‌ست" }
  ];
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
    const st = STAGES.find(s => p < s.until) || STAGES[STAGES.length - 1];
    if (captionEl.textContent !== st.text) {
      captionEl.style.opacity = "0";
      setTimeout(() => { captionEl.textContent = st.text; captionEl.style.opacity = "1"; }, 160);
    }
    progressEl.style.width = (p * 100).toFixed(1) + "%";
  }
  function frameFor(p) { return Math.min(N - 1, Math.max(0, Math.round(p * (N - 1)))); }

  function updateLoadHint() {
    if (!loadHintEl) return;
    if (loaded >= N) loadHintEl.classList.add("done");
    else loadHintEl.textContent = "در حال بارگذاری فریم‌ها… " + faNum(loaded) + " از " + faNum(N);
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
})();
