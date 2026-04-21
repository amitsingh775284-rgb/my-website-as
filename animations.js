/* ============================================
   AYODHYA TRAVEL - SCROLL ANIMATIONS
   ============================================ */

class ScrollAnimations {
  constructor() {
    this.reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    this.counters = document.querySelectorAll('[data-counter]');
    this.countersAnimated = new Set();

    this.init();
  }

  init() {
    // Intersection Observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    this.reveals.forEach(el => revealObserver.observe(el));

    // Counter animation observer
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.countersAnimated.has(entry.target)) {
          this.countersAnimated.add(entry.target);
          this.animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(el => counterObserver.observe(el));

    // Parallax effect
    window.addEventListener('scroll', () => this.handleParallax());
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      element.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  handleParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const scrollY = window.scrollY;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const offset = (scrollY - elementTop) * speed;

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${offset}px)`;
      }
    });
  }
}

// Back to top button
class BackToTop {
  constructor() {
    this.btn = document.querySelector('.back-to-top');
    if (this.btn) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        this.btn.classList.add('visible');
      } else {
        this.btn.classList.remove('visible');
      }
    });

    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
  new BackToTop();
});
