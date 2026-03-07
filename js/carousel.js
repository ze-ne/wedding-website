// js/carousel.js
(function () {
  const carousel = document.querySelector('.carousel');
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track || !carousel) return;

  // Collect original images declared in HTML
  const realSlides = Array.from(track.querySelectorAll('img'));
  if (realSlides.length === 0) return;

  const n = realSlides.length;

  if (n <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (dotsContainer) dotsContainer.style.display = 'none';
    if (realSlides[0]) realSlides[0].classList.add('carousel-active');
    return;
  }

  let centerRealIndex = 0;
  let isTransitioning = false;
  let lastDirection = 1;
  let timer;

  // Returns a fresh clone of the real image at logical index i (wraps around)
  function realImg(i) {
    const idx = ((i % n) + n) % n;
    return realSlides[idx].cloneNode(true);
  }

  function slideWidth() {
    return carousel.offsetWidth / 3;
  }

  function applyWidths() {
    const w = slideWidth() + 'px';
    const h = carousel.offsetHeight + 'px';
    Array.from(track.children).forEach(img => {
      img.style.width = w;
      img.style.height = h;
    });
  }

  // translateX that places DOM index `i` in the center slot
  function offsetFor(i) {
    return slideWidth() * (1 - i);
  }

  // Set transform, optionally bypassing CSS transition
  function setTransform(domIndex, animate) {
    if (!animate) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${offsetFor(domIndex)}px)`;
      track.offsetHeight; // force reflow so browser commits instantly
      track.style.transition = '';
    } else {
      track.style.transform = `translateX(${offsetFor(domIndex)}px)`;
    }
  }

  // Build initial DOM: [center-2, center-1, center, center+1, center+2]
  // With centerRealIndex=0: [real[n-2], real[n-1], real[0], real[1], real[2]]
  track.innerHTML = '';
  [-2, -1, 0, 1, 2].forEach((offset, i) => {
    const img = realImg(offset);
    if (i === 2) img.classList.add('carousel-active');
    track.appendChild(img);
  });
  applyWidths();
  setTransform(2, false);

  // Build dots for real slides
  realSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => {
      if (i !== centerRealIndex) {
        if (((i - centerRealIndex + n) % n) <= n / 2) goRight();
        else goLeft();
      }
    });
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === centerRealIndex);
    });
  }

  function goRight() {
    if (isTransitioning) return;
    isTransitioning = true;
    lastDirection = 1;

    centerRealIndex = (centerRealIndex + 1) % n;

    // Append slide that will appear at far right
    const newSlide = realImg(centerRealIndex + 2);
    newSlide.style.width = slideWidth() + 'px';
    newSlide.style.height = carousel.offsetHeight + 'px';
    track.appendChild(newSlide);

    // Outgoing center: DOM[2] → incoming center: DOM[3]
    track.children[2].classList.remove('carousel-active');
    track.children[3].classList.add('carousel-active');

    // Animate: shift center from DOM index 2 to 3
    setTransform(3, true);

    updateDots();
    resetTimer();
  }

  function goLeft() {
    if (isTransitioning) return;
    isTransitioning = true;
    lastDirection = -1;

    centerRealIndex = (centerRealIndex - 1 + n) % n;

    // Prepend slide that will appear at far left
    const newSlide = realImg(centerRealIndex - 2);
    newSlide.style.width = slideWidth() + 'px';
    newSlide.style.height = carousel.offsetHeight + 'px';
    track.prepend(newSlide);

    // After prepend, old center (was DOM[2]) is now DOM[3].
    // Instantly reposition so the visual center stays put.
    setTransform(3, false);

    // Outgoing center: DOM[3] → incoming center: DOM[2]
    track.children[3].classList.remove('carousel-active');
    track.children[2].classList.add('carousel-active');

    // Animate: shift center from DOM index 3 to 2
    setTransform(2, true);

    updateDots();
    resetTimer();
  }

  // After each slide transition: drop the offscreen image and reset position.
  track.addEventListener('transitionend', e => {
    if (e.propertyName !== 'transform' || !isTransitioning) return;

    if (lastDirection === 1) {
      track.removeChild(track.firstElementChild); // scrolled off left
    } else {
      track.removeChild(track.lastElementChild);  // scrolled off right
    }

    // Center is now at DOM index 2 — reset without animation
    setTransform(2, false);
    isTransitioning = false;
  });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(goRight, 10000); // auto-advance every 10s
  }

  window.addEventListener('resize', () => {
    applyWidths();
    setTransform(2, false);
  });

  // Start
  resetTimer();

  if (prevBtn) prevBtn.addEventListener('click', goLeft);
  if (nextBtn) nextBtn.addEventListener('click', goRight);
})();
