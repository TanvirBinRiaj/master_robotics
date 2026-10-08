/* ==========================================================================
   Master Robotics — book.js
   Renders shared chrome (top bar, sidebar, search, pager, index) from data.js.
   Requires: data.js loaded first.
   ========================================================================== */
(function () {
  "use strict";

  var ICON = {
    search: "bi-search",
    book: "bi-journal-bookmark-fill",
    home: "bi-house-door",
    list: "bi-list",
    sun: "bi-sun",
    moon: "bi-moon",
    prev: "bi-arrow-left",
    next: "bi-arrow-right",
    menu: "bi-list"
  };

  var THEME_KEY = "mr-theme";

  /* file:// pages often block localStorage, so persist in two places:
     localStorage first, cookie as fallback. */
  function readStored() {
    try {
      var v = localStorage.getItem(THEME_KEY);
      if (v === "dark" || v === "light") return v;
    } catch (e) {}
    try {
      var m = document.cookie.match(/(?:^|;\s*)mr-theme=(dark|light)/);
      if (m) return m[1];
    } catch (e) {}
    return null;
  }
  function writeStored(t) {
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    try { document.cookie = THEME_KEY + "=" + t + "; max-age=31536000; path=/; SameSite=Lax"; } catch (e) {}
  }
  function systemTheme() {
    try {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    } catch (e) {}
    return null;
  }
  /* Same-tab relay: window.name travels with the tab across page loads even
     when storage is partitioned (file://). Other name content is preserved. */
  function readRelay() {
    try {
      var rm = String(window.name || "").match(/mr-theme=(dark|light)/);
      if (rm) return rm[1];
    } catch (e) {}
    return null;
  }
  function writeRelay(t) {
    try {
      var rest = String(window.name || "").replace(/(^|;)mr-theme=(dark|light)(?=$|;)/g, "").replace(/^;+|;+$/g, "");
      window.name = "mr-theme=" + t + (rest ? ";" + rest : "");
    } catch (e) {}
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function getTheme() {
    return readStored() || readRelay() || systemTheme() || "light";
  }
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    writeStored(t);
    writeRelay(t);
    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.innerHTML = '<i class="bi ' + (t === "dark" ? ICON.sun : ICON.moon) + '"></i>';
      btn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
      btn.title = btn.getAttribute("aria-label");
    }
  }

  /* --------------------------- Top bar ----------------------------------- */
  function currentIcon() {
    return getTheme() === "dark" ? ICON.sun : ICON.moon;
  }
  function buildTopbar() {
    var header = document.getElementById("topbar");
    if (!header) return;
    header.innerHTML =
      '<button class="topbar__menu" id="navToggle" aria-label="Open navigation" aria-expanded="false"><i class="bi ' + ICON.menu + '"></i></button>' +
      '<a class="topbar__brand" href="index.html">' +
        '<span class="topbar__mark"><i class="bi ' + ICON.book + '"></i></span>' +
        '<span class="topbar__title"><span>' + BOOK.title + '</span><small>' + BOOK.subtitle + '</small></span>' +
      '</a>' +
      '<span class="topbar__spacer"></span>' +
      '<div class="topbar__search">' +
        '<i class="bi ' + ICON.search + '"></i>' +
        '<input id="searchInput" type="search" placeholder="Search the book..." autocomplete="off" aria-label="Search the book" />' +
        '<div class="search-results" id="searchResults" role="listbox"></div>' +
      '</div>' +
      '<button class="icon-btn" id="themeToggle" aria-label="Switch theme" title="Switch theme"><i class="bi ' + currentIcon() + '"></i></button>';
  }

  /* ---------------------------- Sidebar ---------------------------------- */
  function buildSidebar() {
    var side = document.getElementById("sidebar");
    if (!side) return;
    var active = document.body.getAttribute("data-file") || "";
    var html = '<a class="sidebar__home" href="index.html"><i class="bi ' + ICON.home + '"></i> Book home</a>';

    PARTS.forEach(function (part) {
      html += '<div class="sidebar__part"><i class="bi ' + part.icon + '"></i> ' + BOOK.partLabel + ' ' + part.num + ' &middot; ' + part.title + '</div>';
      html += '<ol>';
      part.chapters.forEach(function (ch) {
        var isActive = ch.file === active;
        html += '<li><a href="' + ch.file + '"' + (isActive ? ' class="active" aria-current="page"' : '') + '>' +
          '<span class="num">' + ch.num + '</span><span>' + ch.title + '</span></a></li>';
      });
      html += '</ol>';
    });

    html += '<div class="sidebar__part"><i class="bi bi-collection"></i> Appendices</div><ol>';
    APPENDICES.forEach(function (a) {
      var isActive = a.file === active;
      html += '<li><a href="' + a.file + '"' + (isActive ? ' class="active" aria-current="page"' : '') + '>' +
        '<span class="num">' + a.num + '</span><span>' + a.title + '</span></a></li>';
    });
    html += '</ol>';

    side.innerHTML = html;
  }

  /* Give each part a display number (1..6). */
  PARTS.forEach(function (p, i) { p.num = i + 1; });

  /* ----------------------------- Search ---------------------------------- */
  var SEARCH_INDEX = null;
  function buildSearchIndex() {
    if (SEARCH_INDEX) return SEARCH_INDEX;
    SEARCH_INDEX = [];
    PARTS.forEach(function (part) {
      part.chapters.forEach(function (ch) {
        SEARCH_INDEX.push({
          title: ch.title, desc: ch.desc, file: ch.file,
          part: BOOK.partLabel + " " + part.num + " — " + part.title,
          kind: "Chapter " + ch.num
        });
      });
    });
    APPENDICES.forEach(function (a) {
      SEARCH_INDEX.push({ title: a.title, desc: a.desc, file: a.file, part: "Appendix " + a.num, kind: "Appendix" });
    });
    return SEARCH_INDEX;
  }

  function initSearch() {
    var input = document.getElementById("searchInput");
    var box = document.getElementById("searchResults");
    if (!input || !box) return;
    var idx = buildSearchIndex();

    function render(q) {
      q = q.trim().toLowerCase();
      if (!q) { box.classList.remove("open"); box.innerHTML = ""; return; }
      var hits = idx.filter(function (r) {
        return (r.title + " " + r.desc + " " + r.part).toLowerCase().indexOf(q) !== -1;
      }).slice(0, 12);
      if (!hits.length) {
        box.innerHTML = '<div class="sr-empty">No match for &ldquo;' + q.replace(/</g, "&lt;") + '&rdquo;. Try another word.</div>';
      } else {
        box.innerHTML = hits.map(function (r) {
          return '<a href="' + r.file + '">' +
            '<div class="sr-title">' + r.title + '</div>' +
            '<div class="sr-part">' + r.part + ' &middot; ' + r.kind + '</div></a>';
        }).join("");
      }
      box.classList.add("open");
    }

    input.addEventListener("input", function () { render(input.value); });
    input.addEventListener("focus", function () { if (input.value) render(input.value); });
    document.addEventListener("click", function (e) {
      if (!box.contains(e.target) && e.target !== input) box.classList.remove("open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { box.classList.remove("open"); input.blur(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); input.focus(); }
    });
  }

  /* --------------------------- Nav toggle -------------------------------- */
  function initNav() {
    var btn = document.getElementById("navToggle");
    var backdrop = document.getElementById("navBackdrop");
    function close() { document.body.classList.remove("nav-open"); if (btn) btn.setAttribute("aria-expanded", "false"); }
    if (btn) btn.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    if (backdrop) backdrop.addEventListener("click", close);
    var side = document.getElementById("sidebar");
    if (side) side.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });
  }

  /* ------------------------ Reading progress ----------------------------- */
  function initProgress() {
    var bar = document.getElementById("progressBar");
    if (!bar) return;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
    }
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* --------------------------- Copy buttons ------------------------------ */
  function initCopy() {
    document.querySelectorAll(".code__copy").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var code = btn.closest(".code").querySelector("pre code");
        if (!code) return;
        var text = code.innerText;
        var done = function () {
          var old = btn.innerHTML;
          btn.innerHTML = '<i class="bi bi-check2"></i> Copied';
          setTimeout(function () { btn.innerHTML = old; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done);
        } else {
          var ta = document.createElement("textarea");
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(ta); done();
        }
      });
    });
  }

  /* ------------------------------ Pager ---------------------------------- */
  function initPager() {
    var host = document.getElementById("pager");
    if (!host) return;
    var file = document.body.getAttribute("data-file") || "";
    var all = FLAT.map(function (x) { return x.ch; }).concat(APPENDICES);
    var i = -1;
    for (var k = 0; k < all.length; k++) if (all[k].file === file) { i = k; break; }
    if (i === -1) return;
    var prev = all[i - 1], next = all[i + 1];
    var html = "";
    html += prev
      ? '<a class="prev" href="' + prev.file + '"><span class="dir"><i class="bi ' + ICON.prev + '"></i> Previous</span><span class="ttl">' + prev.title + '</span></a>'
      : '<a class="prev" href="index.html"><span class="dir"><i class="bi ' + ICON.prev + '"></i> Back</span><span class="ttl">Table of Contents</span></a>';
    html += next
      ? '<a class="next" href="' + next.file + '"><span class="dir">Next <i class="bi ' + ICON.next + '"></i></span><span class="ttl">' + next.title + '</span></a>'
      : '<a class="next" href="index.html"><span class="dir">Finish <i class="bi ' + ICON.next + '"></i></span><span class="ttl">Back to Table of Contents</span></a>';
    host.innerHTML = html;
  }

  /* --------------------------- Index page -------------------------------- */
  function renderIndex() {
    var host = document.getElementById("toc");
    if (!host) return;
    var html = "";
    PARTS.forEach(function (part) {
      html += '<section class="part-block" id="' + part.id + '">';
      html += '<div class="part-block__head">' +
        '<span class="part-icon"><i class="bi ' + part.icon + '"></i></span>' +
        '<div><h2>' + BOOK.partLabel + ' ' + part.num + ' &middot; ' + part.title + '</h2>' +
        '<p>' + part.blurb + '</p></div></div>';
      html += '<div class="chapter-grid">';
      part.chapters.forEach(function (ch) {
        html += '<a class="chapter-card" href="' + ch.file + '">' +
          '<span class="cc-num">' + String(ch.num).padStart(2, "0") + '</span>' +
          '<span class="cc-body"><span class="cc-title">' + ch.title + '</span>' +
          '<span class="cc-desc">' + ch.desc + '</span>' +
          '<span class="cc-desc" style="margin-top:6px;display:inline-flex;gap:14px;align-items:center;">' +
            '<span><i class="bi bi-clock"></i> ' + ch.minutes + ' min</span>' +
            '<span><i class="bi bi-bar-chart"></i> ' + ch.level + '</span></span>' +
          '</span>' +
          '<i class="bi bi-arrow-right cc-go"></i></a>';
      });
      html += '</div></section>';
    });
    html += '<section class="part-block"><div class="part-block__head">' +
      '<span class="part-icon"><i class="bi bi-collection"></i></span>' +
      '<div><h2>Appendices</h2><p>Reference material to keep beside you.</p></div></div>' +
      '<div class="chapter-grid">';
    APPENDICES.forEach(function (a) {
      html += '<a class="chapter-card" href="' + a.file + '">' +
        '<span class="cc-num">' + a.num + '</span>' +
        '<span class="cc-body"><span class="cc-title">' + a.title + '</span>' +
        '<span class="cc-desc">' + a.desc + '</span></span>' +
        '<i class="bi bi-arrow-right cc-go"></i></a>';
    });
    html += "</div></section>";
    host.innerHTML = html;
  }

  /* ------------------------------ Init ----------------------------------- */
  function init() {
    buildTopbar();
    setTheme(getTheme());
    buildSidebar();
    renderIndex();
    initSearch();
    initNav();
    initProgress();
    initCopy();
    initPager();
    var tt = document.getElementById("themeToggle");
    if (tt) tt.addEventListener("click", function () {
      setTheme(getTheme() === "dark" ? "light" : "dark");
    });
  }

  window.Book = { init: init, setTheme: setTheme, getTheme: getTheme };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();