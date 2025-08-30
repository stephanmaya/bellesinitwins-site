// Select all index items
const indexItems = document.querySelectorAll("#sectionIndex li");

// Map each dot to its corresponding section
const sections = Array.from(indexItems).map(li => document.getElementById(li.dataset.target));

// Function to activate the correct dot based on scroll
function activateIndex() {
  const scrollPos = window.scrollY + window.innerHeight * 0.1; // small offset from top

  sections.forEach((sec, i) => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      indexItems.forEach(li => li.classList.remove("active"));
      indexItems[i].classList.add("active");
    }
  });
}

// Smooth scroll when clicking a dot
indexItems.forEach((li, i) => {
  li.addEventListener("click", () => {
    if (i === 0) {
      // First dot scrolls to very top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      sections[i].scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Update active dot on scroll
window.addEventListener("scroll", activateIndex);

// Activate on initial load
activateIndex();
