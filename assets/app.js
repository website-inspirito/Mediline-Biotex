/* =========================================================
   MEDILINE BIOTEX — interaction layer
   Progressive enhancement: html.fx is what makes the reveal
   animations hide content in the first place. It is added only
   once jQuery is confirmed and this file has parsed, and removed
   again if anything throws — so a failure degrades to a plain,
   fully readable page rather than a blank one.
   ========================================================= */
(function () {
  /* Opened straight from a folder (file://): clean links like "about" have no file behind
     them, so point them at about.html. On the live site this does nothing. */
  if (location.protocol === 'file:') {
    var map = { './': 'index.html', 'about': 'about.html', 'products': 'products.html',
                'team': 'team.html', 'gallery': 'gallery.html', 'contact': 'contact.html' };
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var h = links[i].getAttribute('href'), m = h.match(/^(\.\/|about|products|team|gallery|contact)(#.*)?$/);
      if (m) links[i].setAttribute('href', map[m[1]] + (m[2] || ''));
    }
  }
})();
(function () {
  var docEl = document.documentElement;
  if (!window.jQuery) { if (window.console) console.warn('Mediline: jQuery unavailable — animations disabled.'); return; }
  docEl.classList.add('fx');
  try {

/* =========================================================
   MEDILINE BIOTEX — interaction layer (jQuery)
   ========================================================= */
(function ($) {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  /* ---------- 2. Headline word split ---------- */
  $('[data-split]').each(function () {
    var $el = $(this), out = '', d = 0;
    $el.contents().each(function () {
      if (this.nodeType === 3) {
        $.each(this.nodeValue.split(/\s+/), function (i, w) {
          if (!w) return;
          out += '<span class="word"><i style="transition-delay:' + d + 'ms">' + w + '</i></span> ';
          d += 68;
        });
      } else {
        var $n = $(this);
        out += '<span class="word"><i class="' + ($n.attr('class') || '') +
               '" style="transition-delay:' + d + 'ms">' + $n.text() + '</i></span> ';
        d += 68;
      }
    });
    $el.html(out);
  });
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { $('body').addClass('ready'); });
  });

  /* ---------- 3. Hero: animated supply network ----------
     Manufacturers -> Bangalore warehouse -> hospitals -> patient.
     Consignments travel the routes; nodes pulse on arrival.        */
  (function () {
    var c = document.getElementById('net');
    if (!c) return;
    var ctx = c.getContext('2d'), raf, w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);

    // relative layout (0-1 of canvas box)
    var NODES = [
      { x:.055, y:.20, t:'plant', label:'PRINCIPAL' },
      { x:.030, y:.50, t:'plant', label:'PRINCIPAL' },
      { x:.115, y:.79, t:'plant', label:'PRINCIPAL' },
      { x:.400, y:.46, t:'hub',   label:'BANGALORE' },
      { x:.700, y:.19, t:'hosp',  label:'HOSPITAL' },
      { x:.795, y:.60, t:'hosp',  label:'HOSPITAL' },
      { x:.610, y:.85, t:'hosp',  label:'HOSPITAL' },
      { x:.940, y:.36, t:'pat',   label:'PATIENT' }
    ];
    var EDGES = [
      { a:0, b:3, bow:-.16 }, { a:1, b:3, bow:.10 }, { a:2, b:3, bow:.16 },
      { a:3, b:4, bow:-.14 }, { a:3, b:5, bow:.12 }, { a:3, b:6, bow:.16 },
      { a:5, b:7, bow:-.18 }
    ];
    var TEAL = '15,168,168', BLUE = '46,123,196', ORANGE = '242,101,34';

    var packets = [], rings = [], dash = 0, reducedRun = reduced;

    function pos(n) { return { x: n.x * w, y: n.y * h }; }
    function ctrl(e) {
      var A = pos(NODES[e.a]), B = pos(NODES[e.b]),
          mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2,
          dx = B.x - A.x, dy = B.y - A.y;
      return { x: mx - dy * e.bow, y: my + dx * e.bow };
    }
    function pt(e, t) {
      var A = pos(NODES[e.a]), B = pos(NODES[e.b]), C = ctrl(e), u = 1 - t;
      return { x: u*u*A.x + 2*u*t*C.x + t*t*B.x, y: u*u*A.y + 2*u*t*C.y + t*t*B.y };
    }

    function spawn() {
      var i = Math.floor(Math.random() * EDGES.length), e = EDGES[i];
      var col = NODES[e.b].t === 'hub' ? BLUE : (NODES[e.b].t === 'pat' ? ORANGE : TEAL);
      packets.push({ e:e, t:0, sp:.0022 + Math.random() * .0022, col:col, cold: Math.random() < .55 });
    }
    for (var s = 0; s < 7; s++) { spawn(); packets[s].t = Math.random(); }

    function size() {
      var r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawNode(n) {
      var p = pos(n), big = n.t === 'hub';
      var col = n.t === 'hub' ? ORANGE : (n.t === 'pat' ? ORANGE : (n.t === 'plant' ? BLUE : TEAL));
      var R = big ? 9 : 5.5;
      // soft halo
      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, big ? 46 : 26);
      g.addColorStop(0, 'rgba(' + col + ',.20)');
      g.addColorStop(1, 'rgba(' + col + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, big ? 46 : 26, 0, 6.283); ctx.fill();
      // body
      if (n.t === 'plant' || n.t === 'hub') {
        var s2 = R * 1.7;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(p.x - s2/2, p.y - s2/2, s2, s2, 3);
        else ctx.rect(p.x - s2/2, p.y - s2/2, s2, s2);
        ctx.fillStyle = 'rgba(' + col + ',.85)'; ctx.fill();
      } else {
        ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, 6.283);
        ctx.fillStyle = 'rgba(' + col + ',.8)'; ctx.fill();
      }
      // label
      ctx.font = '500 8.5px "IBM Plex Mono", monospace';
      ctx.fillStyle = 'rgba(66,97,108,.55)';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, p.x, p.y + (big ? 26 : 20));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      dash = (dash + .5) % 14;

      // routes
      EDGES.forEach(function (e) {
        var A = pos(NODES[e.a]), B = pos(NODES[e.b]), C = ctrl(e);
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.quadraticCurveTo(C.x, C.y, B.x, B.y);
        ctx.setLineDash([5, 9]);
        ctx.lineDashOffset = -dash;
        ctx.strokeStyle = 'rgba(46,123,196,.22)';
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // consignments
      for (var i = packets.length - 1; i >= 0; i--) {
        var k = packets[i];
        if (!reducedRun) k.t += k.sp;
        if (k.t >= 1) {
          rings.push({ n: k.e.b, r: 6, a: .55 });
          packets.splice(i, 1);
          spawn();
          continue;
        }
        var p = pt(k.e, k.t), tail = pt(k.e, Math.max(0, k.t - .05));
        // trail
        var lg = ctx.createLinearGradient(tail.x, tail.y, p.x, p.y);
        lg.addColorStop(0, 'rgba(' + k.col + ',0)');
        lg.addColorStop(1, 'rgba(' + k.col + ',.55)');
        ctx.beginPath(); ctx.moveTo(tail.x, tail.y); ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = lg; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.stroke();
        // parcel
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = 'rgba(' + k.col + ',.95)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-3.4, -3.4, 6.8, 6.8, 1.6);
        else ctx.rect(-3.4, -3.4, 6.8, 6.8);
        ctx.fill();
        if (k.cold) { // cold-chain marker
          ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(0, -2); ctx.lineTo(0, 2);
          ctx.moveTo(-1.7, -1); ctx.lineTo(1.7, 1);
          ctx.moveTo(1.7, -1); ctx.lineTo(-1.7, 1);
          ctx.stroke();
        }
        ctx.restore();
      }

      // arrival pulses
      for (var r = rings.length - 1; r >= 0; r--) {
        var ring = rings[r], np = pos(NODES[ring.n]);
        ring.r += 1.1; ring.a -= .014;
        if (ring.a <= 0) { rings.splice(r, 1); continue; }
        ctx.beginPath(); ctx.arc(np.x, np.y, ring.r, 0, 6.283);
        ctx.strokeStyle = 'rgba(15,168,168,' + ring.a + ')';
        ctx.lineWidth = 1.4; ctx.stroke();
      }

      NODES.forEach(drawNode);
      raf = (document.hidden || c.getBoundingClientRect().bottom < 0) ? 0 : requestAnimationFrame(frame);
    }

    size(); frame();
    $(window).on('resize', function () { cancelAnimationFrame(raf); size(); frame(); });
    function wake() { if (!raf && !document.hidden && c.getBoundingClientRect().bottom >= 0) frame(); }
    $(window).on('scroll', wake); $(document).on('visibilitychange', wake);
  })();

  /* ---------- 4. Rotating word ---------- */
  $('[data-rotate]').each(function () {
    var $b = $(this), list = $b.data('rotate').split('|'), i = 0;
    if (reduced) return;
    setInterval(function () {
      i = (i + 1) % list.length;
      $b.fadeTo(220, 0, function () { $b.text(list[i]).fadeTo(260, 1); });
    }, 2400);
  });

  /* ---------- 5. Reveal on scroll ---------- */
  $('.state').addClass('rv-f');
  var $rv = $('.rv, .rv-l, .rv-r, .rv-s, .rv-f');
  $rv.each(function () {
    var p = this.parentNode.className || '';
    if (/ther-grid|cl-grid|cfa-grid|stat-grid|rings/.test(p)) {
      $(this).css('transition-delay', ($(this).index() % 8) * 65 + 'ms');
    }
  });
  function scan() {
    var t = $(window).scrollTop(), h = $(window).height();
    $rv.not('.in').each(function () {
      if ($(this).offset().top < t + h * 0.88) $(this).addClass('in');
    });
  }

  /* ---------- 6. Count-up ---------- */
  if (!reduced) $('.count').text('0');
  function countUp($el) {
    if ($el.data('done')) return;
    $el.data('done', true);
    var target = parseFloat($el.data('target') || $el.data('to')),
        dec = parseInt($el.data('decimals') || 0, 10),
        suf = $el.data('suffix') || '', dur = 1700, start = null;
    if (reduced) { $el.text(target.toFixed(dec) + suf); return; }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      $el.text((target * e).toFixed(dec) + suf);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function scanCounts() {
    var t = $(window).scrollTop(), h = $(window).height();
    $('.count').each(function () {
      if ($(this).offset().top < t + h * 0.9) countUp($(this));
    });
  }

  /* ---------- 7. Gauge + rings + therapy bars ---------- */
  var fired = {};
  function once(key, fn) { if (fired[key]) return; fired[key] = true; fn(); }
  function inView($el, f) {
    if (!$el.length) return false;
    return $el.offset().top < $(window).scrollTop() + $(window).height() * (f || 0.88);
  }
  function scanArcs() {
    var $g = $('#gaugeArc');
    if (inView($g, 0.92)) once('gauge', function () {
      var c = 2 * Math.PI * 85;
      $g.css('stroke-dashoffset', c - c * 0.994);
    });
    $('.ring .rf').each(function (i) {
      var $r = $(this);
      if (inView($r, 0.9)) once('ring' + i, function () {
        var c = 2 * Math.PI * 53;
        $r.css('stroke-dashoffset', c - c * (parseInt($r.data('pct'), 10) / 100));
      });
    });
    $('.ther .lvl b').each(function (i) {
      var $b = $(this);
      if (inView($b, 0.92)) once('lvl' + i, function () { $b.css('width', $b.data('lvl') + '%'); });
    });
  }

  /* ---------- 8. Pinned horizontal flow ---------- */
  function scanFlow() {
    var $f = $('#flow'), $in = $('#flowInner');
    if (!$f.length || $(window).width() <= 940) { $in.css('transform', ''); return; }
    var top = $f.offset().top, hgt = $f.outerHeight(), vh = $(window).height(),
        y = $(window).scrollTop(),
        p = Math.max(0, Math.min(1, (y - top) / (hgt - vh)));
    var dist = $f.data('dist') || 0;
    $in.css('transform', 'translateX(' + (-p * dist) + 'px)');
    $('#flowFill').css('width', (p * 100) + '%');
    var idx = Math.min(3, Math.floor(p * 3.999));
    $('.stage').removeClass('hot').eq(idx).addClass('hot');
  }
  function sizeFlow() {
    if ($(window).width() <= 940) { $('#flow').css('height', ''); $('#flowInner').css('transform',''); return; }
    var track = $('#flowInner')[0];
    if (!track) return;
    var gut = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gut')) || 40;
    var extra = track.scrollWidth - $(window).width() + gut;
    $('#flow').data('dist', Math.max(extra, 0));
    $('#flow').css('height', ($(window).height() + Math.max(extra, 0) * 1.1) + 'px');
  }

  /* ---------- 9. Timeline spine ---------- */
  function scanTL() {
    var $tl = $('.tl'); if (!$tl.length) return;
    var top = $tl.offset().top, h = $tl.outerHeight(), vh = $(window).height(),
        p = Math.max(0, Math.min(1, ($(window).scrollTop() + vh * 0.62 - top) / (h * 0.86)));
    $('#tlFill').css('height', (p * 100) + '%');
    var items = $('.tl-item');
    items.each(function (i) { $(this).toggleClass('lit', p >= (i + 0.2) / items.length); });
  }

  /* ---------- 10. Chrome: header, progress, parallax, nav highlight ---------- */
  function scanChrome() {
    var y = $(window).scrollTop(), dh = $(document).height() - $(window).height();
    var p = dh > 0 ? y / dh : 0;
    $('#hdr').toggleClass('stuck', y > 40);
    $('#prog').css('width', p * 100 + '%');
    $('#toTop').toggleClass('show', y > 800);
    $('#topRing').css('stroke-dashoffset', 151 - 151 * p);
    if (!reduced) {
      $('.blob').each(function () {
        $(this).css('transform', 'translateY(' + (y * parseFloat($(this).data('par'))) + 'px)');
      });
    }
    var cur = '';
    $('section[id]').each(function () {
      if ($(this).offset().top - 130 <= y) cur = $(this).attr('id');
    });
    var $spy = $('.nav a[href^="#"]');
    if ($spy.length) $spy.removeClass('active').filter('[href="#' + cur + '"]').addClass('active');
  }

  /* ---------- 11. Master scroll loop ---------- */

  /* ---------- parallax bands ---------- */
  var pxAmp = $(window).width() > 940 ? 88 : 44;
  function scanPx() {
    if (reduced) return;
    var y = $(window).scrollTop(), vh = $(window).height();
    $('.px').each(function () {
      var $s = $(this), top = $s.offset().top, h = $s.outerHeight();
      if (top + h < y - 300 || top > y + vh + 300) return;
      var prog = (y + vh - top) / (vh + h) - 0.5;
      $s.find('.px-bg').css('transform', 'translate3d(0,' + (prog * pxAmp).toFixed(1) + 'px,0)');
    });
    var $hp = $('#hero .hero-photo');
    if ($hp.length) $hp.css('transform', 'translate3d(0,' + (y * 0.18).toFixed(1) + 'px,0)');
  }
  $(window).on('resize', function () { pxAmp = $(window).width() > 940 ? 88 : 44; });

  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      scan(); scanCounts(); scanArcs(); scanFlow(); scanTL(); scanChrome(); scanPx();
      if (window.__mbExtra) window.__mbExtra();
      ticking = false;
    });
  }
  $(window).on('scroll', onScroll);
  $(window).on('resize', function () { sizeFlow(); onScroll(); });
  $(function () { sizeFlow(); onScroll(); scan(); });

  /* ---------- 12. Tabs ---------- */
  $('.tab').on('click', function () {
    var id = $(this).data('pane');
    $('.tab').removeClass('on'); $(this).addClass('on');
    $('.pane.on').stop(true, true).fadeOut(170, function () {
      $(this).removeClass('on');
      $('#' + id).addClass('on').hide().fadeIn(300);
    });
  });

  /* ---------- 13. Accordion ---------- */
  $('.acc-hd').on('click', function () {
    var $i = $(this).closest('.acc-item');
    if ($i.hasClass('open')) {
      $i.removeClass('open').find('.acc-bd').stop(true, true).slideUp(250);
    } else {
      $('.acc-item.open').removeClass('open').find('.acc-bd').stop(true, true).slideUp(250);
      $i.addClass('open').find('.acc-bd').stop(true, true).slideDown(320);
    }
  });

  /* ---------- 14. Cold chain simulator ---------- */
  (function () {
    var $bands = $('.band'), series = [], cur = 0, timer;
    function cfg() { return $bands.eq(cur); }
    function seed() {
      var b = cfg(), lo = +b.data('lo'), hi = +b.data('hi'), mid = (lo + hi) / 2;
      series = [];
      for (var i = 0; i < 40; i++) series.push(mid + (Math.random() - .5) * (hi - lo) * .42);
    }
    function draw() {
      var b = cfg(), lo = +b.data('lo'), hi = +b.data('hi'),
          pad = (hi - lo) * .55, min = lo - pad, max = hi + pad,
          W = 600, H = 150;
      function ty(v) { return H - ((v - min) / (max - min)) * H; }
      var d = '', a = '';
      series.forEach(function (v, i) {
        var x = (i / (series.length - 1)) * W, y = ty(v);
        d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
      });
      a = d + 'L' + W + ' ' + H + ' L0 ' + H + ' Z';
      $('#chartLine').attr('d', d.trim());
      $('#chartArea').attr('d', a.trim());
      $('#limHi').attr('y1', ty(hi)).attr('y2', ty(hi));
      $('#limLo').attr('y1', ty(lo)).attr('y2', ty(lo));
      var now = series[series.length - 1];
      $('#roNow').text(now.toFixed(1));
      $('#roState').text(now >= lo && now <= hi ? 'IN RANGE' : 'CHECK');
    }
    function apply(i) {
      cur = i;
      var b = cfg();
      $bands.removeClass('on'); b.addClass('on');
      $('#roTitle').text(b.data('title'));
      $('#roUse').text(b.data('use'));
      $('#roBand').text(b.data('lo') + '–' + b.data('hi') + '°C');
      $('#roPack').text(b.data('pack'));
      $('#roShip').text(b.data('ship'));
      $('#roHold').text(b.data('hold'));
      seed(); draw();
    }
    $bands.on('click', function () { apply($bands.index(this)); });
    apply(0);
    if (!reduced) {
      timer = setInterval(function () {
        var b = cfg(), lo = +b.data('lo'), hi = +b.data('hi'), mid = (lo + hi) / 2;
        var next = series[series.length - 1] + (Math.random() - .5) * (hi - lo) * .16;
        next += (mid - next) * .12;
        series.push(next); series.shift(); draw();
      }, 1500);
    }
  })();

  /* ---------- 15. Radar ↔ territory link ---------- */
  $('.terr-row, .mk').on('mouseenter', function () {
    var t = $(this).data('terr');
    $('.terr-row, .mk').removeClass('on').filter('[data-terr="' + t + '"]').addClass('on');
  }).on('mouseleave', function () {
    $('.terr-row, .mk').removeClass('on');
  });

  /* ---------- 16. Therapy filter ---------- */
  $('.filt').on('click', function () {
    var f = $(this).data('f');
    $('.filt').removeClass('on'); $(this).addClass('on');
    $('#therGrid .ther').each(function () {
      var $c = $(this), match = f === 'all' || ($c.data('cat') || '').indexOf(f) > -1;
      if (match) $c.stop(true, true).fadeIn(300).css('display', '');
      else $c.stop(true, true).fadeOut(220);
    });
  });

  /* ---------- 17. FAQ carousel ---------- */
  (function () {
    var faqs = [
      ['Do you hold the drug licences for our territory?',
       'Yes. Mediline Biotex operates under wholesale drug licences issued by the Karnataka Drugs Control Department, and licence copies are shared as part of onboarding rather than on request. For territories outside Karnataka we work through the appropriate registrations for that state.'],
      ['How is our stock kept separate from everyone else\'s?',
       'Principal stock is held on dedicated racked pallet positions, segregated by temperature band and identified in the warehouse management system by batch and expiry. Physical segregation and system segregation are both in place, not one standing in for the other.'],
      ['What happens if a consignment goes out of temperature?',
       'It is reported. Where a data logger travels with the shipment, the record is reviewed on arrival and any excursion is closed back to the principal with the batch details. We do not absorb excursions quietly to protect a service metric.'],
      ['How quickly can you confirm availability?',
       'Same working day for stocked lines. Our operations desk confirms availability, batch, expiry and the delivery window — not just a yes or no — so hospital pharmacies can plan against a date rather than a promise.'],
      ['What does onboarding a new principal actually involve?',
       'A territory and volume discussion, a warehouse walkthrough, documentation exchange in both directions, system mapping for reporting, then the first stock transfer. In practice this is usually a few weeks from agreement to first despatch.']
    ];
    var i = 0, $q = $('#faqQ'), $a = $('#faqA'), $d = $('#faqDots');
    faqs.forEach(function (_, n) { $d.append('<i data-n="' + n + '"></i>'); });
    function show(n) {
      i = (n + faqs.length) % faqs.length;
      $('.faq-stage').find('#faqQ, #faqA').stop(true, true).fadeTo(150, 0, function () {
        $q.text(faqs[i][0]); $a.text(faqs[i][1]);
        $('#faqQ, #faqA').fadeTo(280, 1);
      });
      $('#faqI').text(i + 1);
      $d.children().removeClass('on').eq(i).addClass('on');
    }
    $q.text(faqs[0][0]); $a.text(faqs[0][1]); $d.children().eq(0).addClass('on');
    $('#faqNext').on('click', function () { show(i + 1); });
    $('#faqPrev').on('click', function () { show(i - 1); });
    $d.on('click', 'i', function () { show(+$(this).data('n')); });
  })();

  /* ---------- 17b. Gallery lightbox ---------- */
  $('.gal figure').on('click', function () {
    var $i = $(this).find('img');
    $('#lbImg').attr('src', $i.attr('src')).attr('alt', $i.attr('alt') || '');
    $('#lbCap').text($(this).find('figcaption').text());
    $('#lightbox').css('display', 'flex').hide().fadeIn(220);
    $('body').css('overflow', 'hidden');
  });
  function closeLb() { $('#lightbox').fadeOut(180); $('body').css('overflow', ''); }
  $('#lbClose').on('click', closeLb);
  $('#lightbox').on('click', function (e) { if (e.target === this) closeLb(); });
  $(document).on('keyup', function (e) { if (e.key === 'Escape') closeLb(); });

  /* ---------- 18. Marquee duplication ---------- */
  $('[data-marq]').each(function () { $(this).append($(this).children().clone().attr('aria-hidden', 'true')); });

  /* ---------- drawer ---------- */
  function openDrawer(){ $('#burger').addClass('x').attr('aria-expanded','true');
    $('#drawer').addClass('open'); $('#navScrim').addClass('on'); $('body').css('overflow','hidden'); }
  function closeDrawer(){ $('#burger').removeClass('x').attr('aria-expanded','false');
    $('#drawer').removeClass('open'); $('#navScrim').removeClass('on'); $('body').css('overflow',''); }
  $('#burger').on('click', function () {
    $('#drawer').hasClass('open') ? closeDrawer() : openDrawer(); });
  $('#navScrim').on('click', closeDrawer);
  $('#drawer a').on('click', closeDrawer);
  $(document).on('keyup', function (e) { if (e.key === 'Escape') closeDrawer(); });
  $(window).on('resize', function () { if ($(window).width() > 940) closeDrawer(); });

  /* ---------- 20. Smooth scroll ---------- */
  $('a[href^="#"]').on('click', function (e) {
    var t = $(this).attr('href');
    if (t === '#' || !$(t).length) return;
    e.preventDefault();
    $('html,body').animate({ scrollTop: $(t).offset().top - 70 }, reduced ? 0 : 720, 'swing');
  });
  $('#toTop').on('click', function () { $('html,body').animate({ scrollTop: 0 }, reduced ? 0 : 780); });

  /* ---------- 21. Form ---------- */
  $('.field input, .field textarea').on('input blur', function () {
    $(this).toggleClass('has', $(this).val().length > 0);
  });


  /* ---------- 22. Ripple ---------- */
  $(document).on('click', '.btn', function (e) {
    var $b = $(this), o = $b.offset(), s = Math.max($b.outerWidth(), $b.outerHeight());
    $('<span class="ripple">').css({
      width: s, height: s, left: e.pageX - o.left - s / 2, top: e.pageY - o.top - s / 2
    }).appendTo($b).on('animationend', function () { $(this).remove(); });
  });

  /* ---------- 23. Cursor glow + tilt ---------- */
  if (!touch && !reduced) {
    $('body').addClass('has-cursor');
    $(document).on('mousemove', function (e) {
      $('#glow').css({ left: e.clientX, top: e.clientY });
    });
    $('[data-tilt]').on('mousemove', function (e) {
      var r = this.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - .5,
          y = (e.clientY - r.top) / r.height - .5;
      $(this).css('transform', 'rotateY(' + (x * 7).toFixed(2) + 'deg) rotateX(' +
        (-y * 7).toFixed(2) + 'deg) translateY(-4px)');
    }).on('mouseleave', function () { $(this).css('transform', ''); });
  }

})(jQuery);

/* ===================================================================
   PAGE-SPECIFIC MODULES
   Products: therapy explorer, storage matrix, ordering steps, picker.
   Shared pages: certificate viewer, gallery filtering.
   Everything these pages share with the home page (reveals, counters,
   accordion, drawer, parallax, ripple, forms) is already bound above —
   re-binding it here would make the accordion open and close on one
   click and cancel the burger menu out.
   =================================================================== */
(function ($) {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;



  /* ---------- therapy data ---------- */
  if ($('#expList').length) {
  var ICONS = {
    onc:'<path d="M12 21s-7-4.6-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.4-7 10-7 10z"/>',
    crit:'<path d="M3 12h4l2-6 4 12 2-6h6"/>',
    tx:'<path d="M12 3c3 4 6 6.5 6 10a6 6 0 01-12 0c0-3.5 3-6 6-10z"/>',
    neph:'<path d="M8 4h8l2 6a6 6 0 01-12 0z"/><path d="M12 16v4"/>',
    diab:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    derm:'<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9 15c1.5-3 4.5-3 6-6"/>',
    gen:'<path d="M10 3h4v5h5v4h-5v9h-4v-9H5V8h5z"/>',
    dev:'<rect x="3" y="8" width="18" height="10" rx="2"/><path d="M7 8V5h10v3"/>',
    san:'<path d="M12 3v6M8 9h8l1 10H7z"/>'
  };

  var T = [
    { k:'onc', name:'Oncology', kicker:'Anti-cancer', tone:'ic-teal', band:'cold',
      bandTxt:'2–8°C and 15–25°C', depth:95,
      body:'Generic and speciality anti-cancer medicines, including cytotoxics, supportive therapy and targeted agents. This is the deepest part of our portfolio and the reason the direct-to-patient operation exists — a delayed cycle is a clinical event, not a service metric.',
      buyers:'Oncology centres, corporate hospital groups, and named patients supplied against a verified prescription.',
      handling:'Validated shippers with conditioned coolant, data logger as standard, and cold chain maintained to the door on patient deliveries.' },
    { k:'crit', name:'Critical care', kicker:'Emergency &amp; ICU', tone:'ic-orange', band:'cool',
      bandTxt:'15–25°C', depth:92,
      body:'Emergency and intensive care formulations held for immediate release — the lines a hospital cannot wait forty-eight hours for. Stock levels on this group are set against consumption patterns rather than order history.',
      buyers:'Hospital ICUs, emergency departments, medical college hospitals and critical care pharmacies.',
      handling:'Insulated cartons matched to transit duration, with a logger where the client SOP requires it. Prioritised in the picking sequence.' },
    { k:'tx', name:'Transplant', kicker:'Immunosuppression', tone:'ic-blue', band:'cold',
      bandTxt:'2–8°C', depth:88,
      body:'Immunosuppressants and supportive therapy for solid organ and marrow transplant patients. Continuity matters more here than almost anywhere else — these are lifelong regimens where a gap in supply carries a rejection risk.',
      buyers:'Transplant centres, tertiary hospitals, and long-term patients on maintenance therapy.',
      handling:'Full cold chain with validated shippers and data logger as standard. Repeat schedules planned in advance rather than reordered ad hoc.' },
    { k:'neph', name:'Nephrology', kicker:'Renal &amp; dialysis', tone:'ic-teal', band:'cool',
      bandTxt:'15–25°C', depth:78,
      body:'Dialysis support, phosphate binders, erythropoiesis agents and renal therapy for both hospital and home care settings. Increasingly ordered on a standing schedule as home dialysis grows.',
      buyers:'Dialysis centres, nephrology departments, and home-care patients through hospital coordination.',
      handling:'Insulated cartons; logger on request. Cold chain lines within the group are segregated and packed to the 2–8°C configuration.' },
    { k:'diab', name:'Anti-diabetic', kicker:'Orals &amp; insulins', tone:'ic-orange', band:'cold',
      bandTxt:'2–8°C insulins · below 30°C orals', depth:82,
      body:'A split group: oral agents move as ambient stock, while insulins and GLP-1 analogues sit in the cold room throughout. Freezing is the failure mode buyers underestimate, so coolants are conditioned rather than used straight from the freezer.',
      buyers:'Hospital pharmacies, retail chemist groups, diabetes clinics and chronic-care patients.',
      handling:'Insulins in validated shippers with conditioned coolant and a data logger. Orals in standard secondary packaging.' },
    { k:'derm', name:'Dermatology', kicker:'Topical &amp; systemic', tone:'ic-blue', band:'amb',
      bandTxt:'Below 30°C', depth:70,
      body:'Topical and systemic derma brands for clinics, hospital outpatient pharmacy and retail. Heat rather than cold is the risk here — tubes and creams are stored away from heat sources and shipped in ambient-controlled configurations.',
      buyers:'Dermatology clinics, aesthetic practices, retail pharmacy chains and hospital OPD pharmacies.',
      handling:'Standard secondary packaging with heat-source separation in storage. No logger required.' },
    { k:'gen', name:'General medicine', kicker:'Everyday formulations', tone:'ic-teal', band:'amb',
      bandTxt:'Below 30°C', depth:86,
      body:'The everyday formulations that keep a hospital pharmacy shelf full — antibiotics, analgesics, cardiovascular and gastro lines. Low drama, high volume, and the group where near-expiry discipline earns its keep.',
      buyers:'Hospital pharmacies, medical colleges, chemist and druggist groups, institutional buyers.',
      handling:'Standard secondary packaging, picked to batch with near-expiry stock flagged before it reaches an order.' },
    { k:'dev', name:'Devices &amp; diagnostics', kicker:'Consumables &amp; IVD', tone:'ic-orange', band:'amb',
      bandTxt:'Below 30°C · kit-dependent', depth:74,
      body:'Ostomy and wound care, surgical consumables and in-vitro diagnostic kits. Some kits carry component-level storage requirements independent of the outer carton, so these are checked against the insert rather than the box.',
      buyers:'Surgical departments, hospital labs, diagnostic centres and wound care units.',
      handling:'Protective packaging sized to the item. Storage follows the component with the tightest requirement, not the carton label.' },
    { k:'san', name:'Sanitisation', kicker:'Hospital hygiene', tone:'ic-blue', band:'amb',
      bandTxt:'Below 30°C', depth:65,
      body:'Hospital-grade disinfection and hygiene supply — surface and instrument disinfectants, hand hygiene and sanitiser lines. Mostly bulk and palletised, ordered on a standing schedule by infection control teams.',
      buyers:'Infection control departments, hospital housekeeping, laboratories and institutional facilities.',
      handling:'Bulk and palletised movement. Flammable and corrosive lines segregated in storage per their own handling requirement.' }
  ];

  var BANDLBL = { cold:'Cold chain', cool:'Cool room', amb:'Ambient' };

  /* build list */
  var $list = $('#expList');
  T.forEach(function (t, i) {
    $list.append(
      '<button type="button" class="exp-item' + (i === 0 ? ' on' : '') + '" data-i="' + i + '">' +
        '<span class="ico ' + t.tone + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + ICONS[t.k] + '</svg></span>' +
        '<span><b>' + t.name + '</b><span>' + t.kicker + '</span></span>' +
        '<span class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
      '</button>');
  });

  function render(i) {
    var t = T[i];
    var html =
      '<div class="exp-top">' +
        '<span class="big ' + t.tone + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + ICONS[t.k] + '</svg></span>' +
        '<div><h3 class="exp-title">' + t.name + '</h3>' +
        '<span class="band-chip ' + t.band + '"><u></u>' + BANDLBL[t.band] + ' — ' + t.bandTxt + '</span></div>' +
      '</div>' +
      '<p class="exp-body">' + t.body + '</p>' +
      '<div class="exp-cols">' +
        '<div><h5>Who buys it</h5><p>' + t.buyers + '</p></div>' +
        '<div><h5>How we handle it</h5><p>' + t.handling + '</p></div>' +
      '</div>' +
      '<p class="supp-cta"><a href="#enquire">Ask which brands we carry in ' + t.name.toLowerCase() +
        ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></p>';

    var $p = $('#expPanel');
    $p.stop(true, true).fadeTo(140, 0, function () {
      $p.html(html).fadeTo(300, 1);
    });
  }
  render(0);

  $list.on('click', '.exp-item', function () {
    $('.exp-item').removeClass('on');
    $(this).addClass('on');
    render(+$(this).data('i'));
  });
  } /* /explorer */




  /* ---------- matrix row stagger ---------- */
  $('.mx-row').not('.head').each(function (i) {
    $(this).css({ opacity: 0, transform: 'translateY(14px)',
      transition: 'opacity .6s var(--ease) ' + (i * 55) + 'ms, transform .6s var(--ease) ' + (i * 55) + 'ms' });
  });
  var mxDone = false;
  function scanMatrix() {
    if (mxDone) return;
    var $m = $('.matrix'); if (!$m.length) return;
    if ($m.offset().top < $(window).scrollTop() + $(window).height() * 0.85) {
      mxDone = true;
      $('.mx-row').not('.head').css({ opacity: 1, transform: 'none' });
    }
  }

  /* ---------- ordering steps ---------- */
  function scanSteps() {
    var $s = $('.steps'); if (!$s.length) return;
    var top = $s.offset().top, vh = $(window).height(),
        p = Math.max(0, Math.min(1, ($(window).scrollTop() + vh * 0.72 - top) / (vh * 0.5)));
    $('.step').each(function (i) { $(this).toggleClass('lit', p >= (i + 0.15) / 4); });
  }



  /* ---------- therapy picker ---------- */
  $('#pick button').on('click', function () {
    $(this).toggleClass('on');
    var picked = $('#pick button.on').map(function () { return $(this).data('p'); }).get();
    $('#pickHint').html(picked.length ? 'Selected: <strong>' + picked.join(', ') + '</strong>' : 'No area selected');
  });

  /* ---------- turnover bars ---------- */
  var turnDone = false;
  function scanTurn() {
    if (turnDone) return;
    var $b = $('#turnBars');
    if (!$b.length) return;
    if ($b.offset().top < $(window).scrollTop() + $(window).height() * 0.88) {
      turnDone = true;
      $b.addClass('in').find('.col').each(function (i) {
        var $c = $(this);
        setTimeout(function () { $c.css('height', $c.data('h') + '%'); }, i * 90);
      });
    }
  }
  $('#turnToggle').on('click', function () {
    var $t = $('#turnTable'), open = !$t.prop('hidden');
    $t.prop('hidden', open);
    $(this).attr('aria-expanded', !open)
           .text(open ? 'Show the figures as a table' : 'Hide the table');
  });

  /* ---------- join the home page's throttled scroll loop ---------- */
  window.__mbExtra = function () { scanMatrix(); scanSteps(); scanTurn(); };
  $(function () { scanMatrix(); scanSteps(); scanTurn(); });

  /* ---------- certificate viewer ---------- */
  $('.shotwrap[data-full]').on('click', function () {
    var $f = $(this);
    $('#lbImg').attr('src', $f.data('full')).attr('alt', $f.find('img').attr('alt') || '');
    $('#lbCap').text($f.data('cap') || '');
    $('#lightbox').css('display', 'flex').hide().fadeIn(220);
    $('body').css('overflow', 'hidden');
  });

  /* ---------- enquiry forms -> WhatsApp (primary) / email (alternative) ---------- */
  var WA_NO = '919686575835';
  function enqCollect($send) {
    var $box = $send.parents().filter(function () { return $(this).find('.form-grid').length; }).first();
    var d = { lines: [], missing: [], emailBad: false, first: null, name: '', org: '', topic: '' };
    $box.find('.field').removeClass('bad');
    var $pick = $box.find('.pick');
    if ($pick.length) {
      var picked = $pick.find('button.on').map(function () { return $(this).data('p'); }).get();
      if (picked.length) { d.topic = picked.join(', '); d.lines.push([$pick.data('label') || 'Topic', d.topic]); }
    }
    $box.find('.field').each(function () {
      var $f = $(this), $in = $f.find('input, textarea'), v = $.trim($in.val() || ''),
          lbl = $.trim($f.find('label').clone().children('.req').remove().end().text());
      var bad = false;
      if ($in.prop('required') && !v) { d.missing.push(lbl); bad = true; }
      if (v && $in.attr('type') === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { d.emailBad = true; bad = true; }
      if (bad) { $f.addClass('bad'); if (!d.first) d.first = $in; }
      if (v) { d.lines.push([lbl.replace(/\?$/, ''), v]); if (/^name$/i.test(lbl)) d.name = v; if (/organisation/i.test(lbl)) d.org = v; }
    });
    return d;
  }
  $('.send #sendBtn, .send .mail-alt').on('click', function (e) {
    var $a = $(this), $send = $a.closest('.send'), d = enqCollect($send), src = $send.data('src');
    var $err = $send.find('.form-err'), $msg = $send.find('#formMsg');
    if (d.missing.length || d.emailBad) {
      e.preventDefault();
      var need = d.missing.join(', ');
      $err.text(d.missing.length ? 'Please fill in: ' + need + (/[?.]$/.test(need) ? '' : '.') : 'Please check the email address.').prop('hidden', false);
      $msg.text('');
      d.first.trigger('focus');
      return;
    }
    $err.prop('hidden', true).text('');
    if ($a.hasClass('mail-alt')) {
      var to = /CFA|partnership|Super distribution/i.test(d.topic) ? 'pramod@medilinebiotex.com' : $send.data('mail');
      var subj = 'Website enquiry' + (d.topic ? ' — ' + d.topic : '') + ((d.name || d.org) ? ' — ' + (d.name || d.org) : '');
      var body = 'Hello Mediline Biotex,\r\n\r\nI would like to make an enquiry.\r\n\r\n' +
        $.map(d.lines, function (l) { return l[0] + ': ' + l[1]; }).join('\r\n') +
        '\r\n\r\nRegards,' + ((d.name || d.org) ? '\r\n' + (d.name || d.org) : '') + '\r\n\r\n(Sent from the ' + src + ', medilinebiotex.com)';
      $a.attr('href', 'mailto:' + to + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body));
      $msg.html('Your email app is opening with the details filled in. If nothing opens, write to <a href="mailto:' + to + '">' + to + '</a>.');
    } else {
      var text = 'Hello Mediline Biotex, I would like to make an enquiry.\n\n' +
        $.map(d.lines, function (l) { return '*' + l[0] + ':* ' + l[1]; }).join('\n') +
        '\n\n_Sent from the ' + src + ', medilinebiotex.com_';
      $a.attr('href', 'https://wa.me/' + WA_NO + '?text=' + encodeURIComponent(text));
      $msg.text('WhatsApp is opening with your enquiry — press send there to reach our team.');
    }
  });
  $('.field input, .field textarea').on('input', function () { $(this).closest('.field').removeClass('bad'); });

  /* ---------- keyboard + state for clickable non-buttons (Oct 21) ---------- */
  $(document).on('keydown', '[role="button"][tabindex]', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $(this).trigger('click'); }
  });
  $('.acc-hd').on('click', function () {
    $('.acc-hd').each(function () { $(this).attr('aria-expanded', String($(this).closest('.acc-item').hasClass('open'))); });
  });
  $('.band').on('click', function () {
    $('.band').attr('aria-pressed', 'false'); $(this).attr('aria-pressed', 'true');
  });
  var lbReturn = null;
  $('.gal figure, .shotwrap[data-full]').on('click', function () {
    lbReturn = this; setTimeout(function () { $('#lbClose').trigger('focus'); }, 60);
  });
  $('#lbClose').on('click', function () { if (lbReturn) $(lbReturn).trigger('focus'); });

  /* ---------- gallery filtering ---------- */
  $('.galf').on('click', function () {
    var g = $(this).data('g');
    $('.galf').removeClass('on');
    $(this).addClass('on');
    $('#galGrid figure').each(function () {
      var $c = $(this);
      if (g === 'all' || $c.data('g') === g) $c.stop(true, true).fadeIn(280).css('display', '');
      else $c.stop(true, true).fadeOut(200);
    });
  });

})(jQuery);

  } catch (err) {
    docEl.classList.remove('fx');
    if (window.console) console.error('Mediline: interaction layer failed — page shown without animation.', err);
  }
})();
