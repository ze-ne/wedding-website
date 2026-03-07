// js/carousel.js
(function () {
  const carousel = document.querySelector('.carousel');
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track || !carousel) return;

  const slides = Array.from(track.querySelectorAll('img'));
  if (slides.length === 0) return;

  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (dotsContainer) dotsContainer.style.display = 'none';
    if (slides[0]) slides[0].classList.add('carousel-active');
    return;
  }

  let current = 0;
  let timer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function getOffset() {
    const containerWidth = carousel.offsetWidth;
    const slideWidth = slides[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    return containerWidth / 2 - slideWidth / 2 - current * (slideWidth + gap);
  }

  function updateSlides() {
    slides.forEach((slide, i) => {
      const isActive = i === current;
      slide.classList.toggle('carousel-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    track.style.transform = `translateX(${getOffset()}px)`;
  }

  function updateDots() {
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    updateSlides();
    updateDots();
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  // Recalculate position on resize without animation
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    track.style.transform = `translateX(${getOffset()}px)`;
    requestAnimationFrame(() => { track.style.transition = ''; });
  });

  // Initialize
  updateSlides();
  updateDots();
  resetTimer();

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
})();
