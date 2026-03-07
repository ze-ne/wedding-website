// js/carousel.js
(function () {
  const carousel = document.querySelector('.carousel');
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track || !carousel) return;

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

  // Clone first and last slides for seamless wrapping.
  // DOM order: [lastClone, real0, real1, ..., real(n-1), firstClone]
  // Index:          0        1     2          n           n+1
  const firstClone = realSlides[0].cloneNode(true);
  const lastClone = realSlides[n - 1].cloneNode(true);
  track.prepend(lastClone);
  track.append(firstClone);

  const allSlides = Array.from(track.querySelectorAll('img'));

  let current = 1; // start at first real slide
  let isTransitioning = false;
  let timer;

  function slideWidth() {
    return carousel.offsetWidth / 3;
  }

  function setSlideWidths() {
    const w = slideWidth() + 'px';
    allSlides.forEach(s => { s.style.width = w; });
  }

  // Offset so that allSlides[current] sits in the center third.
  // Center slot left edge = slideWidth(). Slide i left edge = i * slideWidth().
  // translateX = slideWidth() * (1 - current)
  function getOffset() {
    return slideWidth() * (1 - current);
  }

  function updateSlides(animate) {
    if (!animate) track.style.transition = 'none';
    allSlides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('carousel-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    track.style.transform = `translateX(${getOffset()}px)`;
    if (!animate) {
      // Re-enable transition after paint
      requestAnimationFrame(() => { track.style.transition = ''; });
    }
  }

  function updateDots() {
    // Real slides are at allSlides indices 1..n; dot i maps to index i+1
    const realIndex = current - 1;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === realIndex);
    });
  }

  function goTo(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    current = index;
    updateSlides(true);
    updateDots();
    resetTimer();
  }

  // After each slide transition, jump from clone to real counterpart instantly.
  track.addEventListener('transitionend', e => {
    if (e.propertyName !== 'transform') return;
    isTransitioning = false;
    if (current === 0) {
      // Was on lastClone — jump to real last
      current = n;
      updateSlides(false);
      updateDots();
    } else if (current === n + 1) {
      // Was on firstClone — jump to real first
      current = 1;
      updateSlides(false);
      updateDots();
    }
  });

  // Build dots for real slides only
  realSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i + 1));
    dotsContainer.appendChild(dot);
  });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  window.addEventListener('resize', () => {
    setSlideWidths();
    updateSlides(false);
  });

  // Initialize
  setSlideWidths();
  updateSlides(false);
  updateDots();
  resetTimer();

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
})();
