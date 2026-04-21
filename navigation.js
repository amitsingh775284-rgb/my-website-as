/* ============================================
   AYODHYA TRAVEL - NAVIGATION CONTROLLER
   ============================================ */

class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navLinks = document.querySelector('.nav-links');
    this.navItems = document.querySelectorAll('.nav-links a');
    this.lastScroll = 0;

    this.init();
  }

  init() {
    // Scroll handler
    window.addEventListener('scroll', () => this.handleScroll());

    // Mobile toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMobile());
    }

    // Close mobile menu on link click
    this.navItems.forEach(item => {
      item.addEventListener('click', () => {
        this.navLinks.classList.remove('open');
        this.navToggle?.classList.remove('active');
      });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        this.navLinks?.classList.remove('open');
        this.navToggle?.classList.remove('active');
      }
    });

    // Set active link
    this.setActiveLink();
  }

  handleScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class
    if (scrollY > 50) {
      this.navbar?.classList.add('scrolled');
    } else {
      this.navbar?.classList.remove('scrolled');
    }

    this.lastScroll = scrollY;
  }

  toggleMobile() {
    this.navLinks?.classList.toggle('open');
    this.navToggle?.classList.toggle('active');
  }

  setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    this.navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage) {
        item.classList.add('active');
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});
