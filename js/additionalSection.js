const items = document.querySelectorAll("#additionalWork .media-item");
const prevBtn = document.querySelector("#additionalWork .prev");
const nextBtn = document.querySelector("#additionalWork .next");
const dotsContainer = document.querySelector("#additionalWork .dots");

let current = 0;
let slideTimeout;
let dots = [];

// Helper: lazy load a media element, returns a promise
function loadMedia(item) {
  return new Promise((resolve) => {
    const video = item.querySelector("video");
    const img = item.querySelector("img");

    if (video && video.dataset.src) {
      video.src = video.dataset.src;
      delete video.dataset.src;

      if (video.readyState >= 3) {
        // video already loaded enough
        resolve();
      } else {
        video.addEventListener("canplay", function handler() {
          video.removeEventListener("canplay", handler);
          resolve();
        });
      }
    } else if (img && img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;

      if (img.complete) {
        resolve();
      } else {
        img.addEventListener("load", function handler() {
          img.removeEventListener("load", handler);
          resolve();
        });
      }
    } else {
      // already loaded
      resolve();
    }
  });
}

// Show slide
async function showSlide(index, manual = false) {
  // Reset all
  items.forEach((item) => {
    item.classList.remove("active");
    const vid = item.querySelector("video");
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
      vid.removeEventListener("ended", handleVideoEnd);
    }
  });
  dots.forEach(dot => dot.classList.remove("active"));

  const activeItem = items[index];

  // Wait for the media to be ready before showing
  await loadMedia(activeItem);

  activeItem.classList.add("active");
  dots[index].classList.add("active");

  const video = activeItem.querySelector("video");

  clearTimeout(slideTimeout);

  if (video) {
    video.play().catch(() => {});
    video.addEventListener("ended", handleVideoEnd);
  } else if (!manual) {
    slideTimeout = setTimeout(() => {
      current = (index + 1) % items.length;
      showSlide(current);
    }, 6000);
  }

  function handleVideoEnd() {
    video.removeEventListener("ended", handleVideoEnd);
    current = (index + 1) % items.length;
    showSlide(current);
  }

  // Preload next slide in background (non-blocking)
  const nextIndex = (index + 1) % items.length;
  loadMedia(items[nextIndex]);
}

// Build dots
items.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.addEventListener("click", () => {
    current = i;
    showSlide(current, true);
  });
  dotsContainer.appendChild(dot);
});
dots = dotsContainer.querySelectorAll("button");

// Controls
prevBtn.addEventListener("click", () => {
  current = (current - 1 + items.length) % items.length;
  showSlide(current, true);
});
nextBtn.addEventListener("click", () => {
  current = (current + 1) % items.length;
  showSlide(current, true);
});

// Start with the first slide
showSlide(current);
