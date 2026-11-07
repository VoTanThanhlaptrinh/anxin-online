(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Navbar shadow on scroll
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Count-up
  var pendingCounts = [];
  var amountLoaded = false;
  function fmt(n, decimals) {
    return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }
  function countUp(el) {
    if (el.hasAttribute('data-month-amount') && !amountLoaded) { pendingCounts.push(el); return; }
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    if (reduceMotion || target === 0) { el.textContent = fmt(target, decimals); return; }
    var duration = 1400, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased, decimals);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-visible');
        el.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) {
      el.classList.add('is-visible');
      el.querySelectorAll('[data-count]').forEach(countUp);
    });
  }


  // ===== Pip's mood, driven by this month's donations =====
  // Thresholds (USD per calendar month): < 500 sad | 500-1999 happy | >= 2000 ecstatic
  var HAPPY_AT = 500, ECSTATIC_AT = 2000;

  var MOODS = {
    sad: {
      title: 'Pip is a little sad',
      text: "It's been a quiet month\u2026 but you're here, and that counts.",
      status: '\u25cf sad but adorable',
      trend: '\uD83D\uDCC9',
      runway: '3 noodles',
      label: 'Pip is sad but adorable'
    },
    happy: {
      title: 'Pip is happy!',
      text: 'We passed $500! Noodles AND a vegetable this month. I am thriving.',
      status: '\u25cf happy',
      trend: '\uD83D\uDCC8',
      runway: '2 weeks of noodles',
      label: 'Pip is happy'
    },
    ecstatic: {
      title: 'Pip is ECSTATIC!!!',
      text: '$2,000?! I am buying a second noodle. Maybe a chair. I LOVE YOU ALL.',
      status: '\u25cf ecstatic',
      trend: '\uD83D\uDE80',
      runway: '\u221E noodles (+ a chair)',
      label: 'Pip is ecstatic'
    }
  };

  function moodFor(amount) {
    if (amount >= ECSTATIC_AT) return 'ecstatic';
    if (amount >= HAPPY_AT) return 'happy';
    return 'sad';
  }

  function hintFor(amount) {
    if (amount >= ECSTATIC_AT) return 'Maximum happiness reached \uD83C\uDF89';
    if (amount >= HAPPY_AT) return '$' + fmt(ECSTATIC_AT - amount, 0) + ' more and Pip loses it (in a good way).';
    return '$' + fmt(HAPPY_AT - amount, 0) + ' more to make Pip smile.';
  }

  function currentMonthKey() {
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2);
  }

  function monthLabel(key) {
    var parts = key.split('-');
    return new Date(+parts[0], +parts[1] - 1, 1).toLocaleString('en-US', { month: 'short', year: 'numeric' });
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function launchConfetti() {
    var hero = document.querySelector('.hero');
    if (!hero || reduceMotion || hero.querySelector('.confetti')) return;
    var box = document.createElement('div');
    box.className = 'confetti';
    box.setAttribute('aria-hidden', 'true');
    var bits = ['\uD83C\uDF89', '\u2728', '\uD83D\uDC9C', '\uD83C\uDF8A', '\uD83E\uDD9D'];
    for (var i = 0; i < 22; i++) {
      var span = document.createElement('span');
      span.textContent = bits[i % bits.length];
      span.style.left = Math.round(Math.random() * 100) + '%';
      span.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';
      span.style.animationDuration = (5 + Math.random() * 4).toFixed(2) + 's';
      span.style.fontSize = (14 + Math.random() * 14).toFixed(0) + 'px';
      box.appendChild(span);
    }
    hero.appendChild(box);
  }

  function applyMood(amount, monthKey) {
    var mood = moodFor(amount);
    var m = MOODS[mood];
    document.documentElement.setAttribute('data-mood', mood);
    setText('moodTitle', m.title);
    setText('moodText', m.text);
    setText('moodStatus', m.status);
    setText('trendIcon', m.trend);
    setText('runway', m.runway);
    setText('meterHint', hintFor(amount));
    setText('dashMonth', monthLabel(monthKey));
    setText('monthAmount', '$' + fmt(amount, 2));
    var mascot = document.getElementById('mascot');
    if (mascot) mascot.setAttribute('aria-label', m.label);
    var fill = document.getElementById('meterFill');
    if (fill) fill.style.width = Math.min(amount / ECSTATIC_AT, 1) * 100 + '%';
    if (mood === 'ecstatic') launchConfetti();

    // Feed the Traction counter, then release any count-ups that were waiting
    document.querySelectorAll('[data-month-amount]').forEach(function (el) {
      el.setAttribute('data-count', String(amount));
    });
    amountLoaded = true;
    pendingCounts.splice(0).forEach(countUp);
  }

  function loadDonations() {
    var month = currentMonthKey();
    // Dev/preview: index.html?amount=750 forces an amount (no data file needed)
    var forced = parseFloat(new URLSearchParams(location.search).get('amount'));
    if (!isNaN(forced) && forced >= 0) return Promise.resolve({ month: month, amount: forced });
    return fetch('data/donations.json', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        var amt = parseFloat(d.amount);
        // A stale month means a new month has started: tally restarts at $0
        if (d.month !== month || isNaN(amt) || amt < 0) amt = 0;
        return { month: month, amount: amt };
      })
      .catch(function () { return { month: month, amount: 0 }; });
  }

  loadDonations().then(function (d) { applyMood(d.amount, d.month); });

  // Toast
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-show'); }, 2200);
  }

  // Share / copy link
  var shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      var data = {
        title: 'Beggr - Disrupting the begging industry',
        text: 'One raccoon. One dream. Zero investors.',
        url: location.href.split('#')[0]
      };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(data.url).then(
          function () { showToast('Link copied!'); },
          function () { showToast('Copy this page URL from the address bar'); }
        );
      } else {
        showToast('Copy this page URL from the address bar');
      }
    });
  }
})();
