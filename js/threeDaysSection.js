const playBtn = document.getElementById('threeDays-play');
const videoWrapper = document.getElementById('threeDays-video');
const poster = document.getElementById('threeDays-poster');
const threeDaysSection = document.getElementById('threeDays');

// YouTube video ID
const ytVideoId = 'hrifn3EiOs0';

// Flag to know if video is playing
let isPlaying = false;

// Play video on click
playBtn.addEventListener('click', () => {
  poster.style.display = 'none';
  playBtn.style.display = 'none';
  videoWrapper.style.display = 'block';

  videoWrapper.innerHTML = `
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/${ytVideoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
    ></iframe>
  `;

  isPlaying = true;
});

// Scroll-based fade effect + reset video when not visible
window.addEventListener('scroll', () => {
  const rect = threeDaysSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let opacity = 0;

  if (rect.top < windowHeight && rect.bottom > 0) {
    const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
    const sectionHeight = rect.height;

    const fadeInStart = windowHeight * 0.6;
    const fadeInProgress = Math.min(1, Math.max(0, visibleHeight / fadeInStart));

    const fadeOutStart = sectionHeight * 0.3;
    const fadeOutProgress = Math.min(1, Math.max(0, (rect.bottom - fadeOutStart) / (sectionHeight - fadeOutStart)));

    opacity = Math.min(fadeInProgress, fadeOutProgress);
  }

  threeDaysSection.style.opacity = opacity;

  // Reset video if fully scrolled out and was playing
  if (opacity <= 0 && isPlaying) {
    videoWrapper.innerHTML = '';
    videoWrapper.style.display = 'none';
    poster.style.display = 'block';
    playBtn.style.display = 'block';
    isPlaying = false;
  }
});
