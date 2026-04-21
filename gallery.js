/* ============================================
   AYODHYA TRAVEL - GALLERY CONTROLLER
   ============================================ */

class Gallery {
  constructor() {
    this.items = document.querySelectorAll('.gallery-item');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.currentIndex = 0;
    this.images = [];

    if (this.items.length > 0) {
      this.init();
    }
  }

  init() {
    // Collect all images
    this.items.forEach((item, index) => {
      const img = item.querySelector('img');
      this.images.push({
        src: img.src,
        caption: item.getAttribute('data-caption') || '',
        category: item.getAttribute('data-category') || 'all'
      });

      item.addEventListener('click', () => this.openLightbox(index));
    });

    // Lightbox controls
    document.getElementById('lightbox-close')?.addEventListener('click', () => this.closeLightbox());
    document.getElementById('lightbox-prev')?.addEventListener('click', () => this.prevImage());
    document.getElementById('lightbox-next')?.addEventListener('click', () => this.nextImage());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox?.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'ArrowRight') this.nextImage();
    });

    // Close on backdrop click
    this.lightbox?.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });

    // Filter functionality
    this.initFilters();
  }

  initFilters() {
    const filterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        this.items.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.style.display = '';
            item.style.animation = 'fadeIn 0.5s ease';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.updateLightbox();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateLightbox();
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateLightbox();
  }

  updateLightbox() {
    const image = this.images[this.currentIndex];
    if (this.lightboxImg) this.lightboxImg.src = image.src;
    if (this.lightboxCaption) this.lightboxCaption.textContent = image.caption;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Gallery();
});
