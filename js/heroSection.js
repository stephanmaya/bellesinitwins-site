const heroVideo = document.getElementById('hero-video');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.2}px)) scale(1.05)`;
});

// Smooth scroll from hero arrow to Three Days
const scrollCue = document.querySelector('.scroll-cue');
const threeDays = document.getElementById('threeDays');

scrollCue.addEventListener('click', () => {
  const offset = 50; // pixels above the section
  const topPos = threeDays.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: topPos, behavior: 'smooth' });
});
