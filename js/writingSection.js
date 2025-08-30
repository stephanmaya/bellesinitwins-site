const books = document.querySelectorAll('.book');
const caption = document.getElementById('book-caption');
const captionTitle = document.getElementById('caption-title');
const captionLogline = document.getElementById('caption-logline');

books.forEach(book => {
  // Show caption on hover
  book.addEventListener('mouseenter', () => {
    captionTitle.textContent = book.dataset.title;
    captionLogline.textContent = book.dataset.logline;
    caption.style.opacity = 1;
  });

  // Hide caption when leaving
  book.addEventListener('mouseleave', () => {
    caption.style.opacity = 0;
  });

  // Click → Amazon
  book.addEventListener('click', () => {
    window.open(book.dataset.link, '_blank');
  });
});
