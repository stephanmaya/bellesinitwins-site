document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById('loader');
  const heroVideo = document.getElementById('hero-video');

  // Ensure loader is visible immediately
  loader.style.display = 'flex';
  loader.style.opacity = 1;

  // Wait until heroBanner.mp4 is ready to play through
  heroVideo.addEventListener('canplaythrough', () => {
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = 'none';
    }, 600); // match CSS transition
  });
});
