// js/gallery.js
// Progressive enhancement: turn the .gallery-item links into a single-image
// full-screen carousel that spans every photo on the page. Section title and
// per-section counter update when navigation crosses a section boundary.
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  if (items.length === 0) return;

  // Flat model, in DOM order (which equals data-index order).
  var photos = items.map(function (el) {
    return {
      href: el.getAttribute('href'),
      section: el.getAttribute('data-section') || ''
    };
  });

  // Per-section total, and each photo's 1-based position within its section.
  var sectionTotal = {};
  var posInSection = [];
  photos.forEach(function (p) {
    sectionTotal[p.section] = (sectionTotal[p.section] || 0) + 1;
    posInSection.push(sectionTotal[p.section]);
  });

  var current = 0;
  var overlay, imgEl, titleEl, counterEl, lastFocus;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Photo viewer');
    overlay.innerHTML =
      '<div class="lightbox-header">' +
        '<span class="lightbox-title"></span>' +
        '<span class="lightbox-counter"></span>' +
      '</div>' +
      '<button class="lightbox-close carousel-btn" type="button" aria-label="Close">&times;</button>' +
      '<button class="lightbox-btn lightbox-btn--prev carousel-btn" type="button" aria-label="Previous photo">&#8249;</button>' +
      '<img class="lightbox-img" alt="">' +
      '<button class="lightbox-btn lightbox-btn--next carousel-btn" type="button" aria-label="Next photo">&#8250;</button>';
    document.body.appendChild(overlay);

    imgEl = overlay.querySelector('.lightbox-img');
    titleEl = overlay.querySelector('.lightbox-title');
    counterEl = overlay.querySelector('.lightbox-counter');

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-btn--prev').addEventListener('click', function (e) {
      e.stopPropagation();
      go(-1);
    });
    overlay.querySelector('.lightbox-btn--next').addEventListener('click', function (e) {
      e.stopPropagation();
      go(1);
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    var startX = null;
    overlay.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    // Block single-finger page scroll / iOS rubber-band behind the overlay,
    // while leaving pinch-zoom (2+ touches) on the photo alone.
    overlay.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1) e.preventDefault();
    }, { passive: false });
    overlay.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      startX = null;
    });
  }

  function preload(i) {
    var im = new Image();
    im.src = photos[i].href;
  }

  function render() {
    var p = photos[current];
    imgEl.src = p.href;
    imgEl.alt = 'Zené & Noah wedding — ' + p.section;
    titleEl.textContent = p.section;
    counterEl.textContent = posInSection[current] + ' / ' + sectionTotal[p.section];
    preload((current + 1) % photos.length);
    preload((current - 1 + photos.length) % photos.length);
  }

  function openAt(i) {
    if (!overlay) build();
    lastFocus = document.activeElement;
    current = i;
    render();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    document.addEventListener('keydown', onKey);
    overlay.querySelector('.lightbox-close').focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function go(delta) {
    current = (current + delta + photos.length) % photos.length;
    render();
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  }

  items.forEach(function (el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openAt(i);
    });
  });
})();
