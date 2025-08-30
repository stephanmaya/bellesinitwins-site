const heroVideo = document.getElementById('hero-video');
const twinVideos = document.querySelectorAll('#whoWeAre video');

// Listen for full download
heroVideo.addEventListener('loadeddata', () => {
  // Check if the entire video is fully buffered
  const checkFullLoad = () => {
    if (heroVideo.buffered.length && heroVideo.buffered.end(0) >= heroVideo.duration) {
      // Hero is fully downloaded, start loading twins
      twinVideos.forEach(video => {
        const srcEl = video.querySelector('source');
        if (srcEl) {
          video.src = srcEl.src;
          video.load();
        }
      });
    } else {
      // Not fully buffered yet, check again in 200ms
      setTimeout(checkFullLoad, 200);
    }
  };
  checkFullLoad();
});
