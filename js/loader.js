// js/loader.js
(function () {
  var loader = document.getElementById('page-loader');
  if (!loader) return;

  var startTime = Date.now();
  var MIN_MS = 500;

  function doHide() {
    loader.classList.add('fade-out');
    loader.addEventListener('transitionend', function () {
      loader.style.display = 'none';
    }, { once: true });
  }

  function hideLoader() {
    var delay = Math.max(0, MIN_MS - (Date.now() - startTime));
    if (delay > 0) {
      setTimeout(doHide, delay);
    } else {
      doHide();
    }
  }

  // Collect above-fold critical images:
  // - Any element with [data-critical] (e.g. first our-story photo)
  // - The active carousel image, if present
  var criticals = Array.from(document.querySelectorAll('[data-critical]'));
  var carouselActive = document.querySelector('.carousel-active');
  if (carouselActive) criticals.push(carouselActive);

  if (criticals.length === 0) {
    // No critical images — hide after minimum display time
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', hideLoader);
    } else {
      hideLoader();
    }
    return;
  }

  var count = 0;
  function onLoad() {
    count++;
    if (count >= criticals.length) hideLoader();
  }

  criticals.forEach(function (img) {
    if (img.complete) {
      onLoad();
    } else {
      img.addEventListener('load', onLoad, { once: true });
      img.addEventListener('error', onLoad, { once: true });
    }
  });

  // Hard fallback: never block the page for more than 5s
  setTimeout(doHide, 5000);
})();
