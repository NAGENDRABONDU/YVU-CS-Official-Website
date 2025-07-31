// Function to animate each counter
function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 2000; // Total animation duration in ms
  const frameRate = 60;
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let frame = 0;

  const counterAnimation = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const value = Math.floor(target * progress);
    counter.innerText = value;

    if (frame === totalFrames) {
      clearInterval(counterAnimation);
      counter.innerText = target;
    }
  }, 1000 / frameRate);
}

// Function to check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight && rect.bottom >= 0
  );
}

// Animate counters when in viewport (only once)
let hasAnimated = false;
function handleScrollAnimation() {
  if (!hasAnimated) {
    const counters = document.querySelectorAll('.count');
    const container = document.querySelector('.container');

    if (isElementInViewport(container)) {
      counters.forEach(counter => animateCounter(counter));
      hasAnimated = true;
    }
  }
}

// Attach scroll listener
window.addEventListener('scroll', handleScrollAnimation);

// Also trigger if already visible on load
window.addEventListener('load', handleScrollAnimation);
