// List of Happy images
const happyImages = [
  'images/happy/happy-01.jpg',
  'images/happy/happy-05.jpg',
  'images/happy/happy-06.jpg',
  'images/happy/happy-07.jpg',
  'images/happy/happy-08.jpg',
  'images/happy/happy-09.jpg',
  'images/happy/happy-10.jpg',
  'images/happy/happy-11.jpg',
  'images/happy/happy-12.jpg',
  'images/happy/happy-13.jpg',
  'images/happy/happy-14.jpg',
  'images/happy/happy-15.jpg',
  'images/happy/happy-16.jpg',
  'images/happy/happy-17.jpg',
  'images/happy/happy-18.jpg',
  'images/happy/happy-19.jpg',
  'images/happy/happy-20.jpg',
  'images/happy/happy-21.jpg',
  'images/happy/happy-22.jpg',
  'images/happy/happy-23.jpg',
  'images/happy/happy-24.jpg'
];

let currentImage = 0;
const slideshow1 = document.querySelector('#happy .happy-slideshow:not(.next)');
const slideshow2 = document.querySelector('#happy .happy-slideshow.next');
let showingFirst = true;
let slideshowInterval = null;
let started = false; // flag to prevent re-init

// Preload helper
function preloadImage(src, callback) {
  const img = new Image();
  img.onload = callback;
  img.src = src;
}

// Crossfade logic
function crossfadeToNextImage() {
  const nextImage = (currentImage + 1) % happyImages.length;

  preloadImage(happyImages[nextImage], () => {
    if (showingFirst) {
      slideshow2.style.backgroundImage = `url('${happyImages[nextImage]}')`;
      slideshow2.style.opacity = 1;
      slideshow1.style.opacity = 0;
    } else {
      slideshow1.style.backgroundImage = `url('${happyImages[nextImage]}')`;
      slideshow1.style.opacity = 1;
      slideshow2.style.opacity = 0;
    }

    showingFirst = !showingFirst;
    currentImage = nextImage;
  });
}

// Init only once
function initHappySlideshow() {
  if (started) return; // already running
  started = true;

  // Set initial images
  slideshow1.style.backgroundImage = `url('${happyImages[0]}')`;
  slideshow2.style.backgroundImage = `url('${happyImages[1]}')`;
  currentImage = 1;

  // Start loop
  slideshowInterval = setInterval(crossfadeToNextImage, 4000);
}

// Observe section for first entry
const happySection = document.getElementById('happy');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initHappySlideshow();
      observer.disconnect(); // never observe again
    }
  });
}, { threshold: 0.2 });

observer.observe(happySection);
