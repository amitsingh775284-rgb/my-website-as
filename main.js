/* ============================================
   AYODHYA TRAVEL - MAIN APPLICATION SCRIPTS
   ============================================ */

// Page Loader
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }, 800);
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// FAQ Accordion
class FAQ {
  constructor() {
    this.items = document.querySelectorAll('.faq-item');
    if (this.items.length > 0) {
      this.init();
    }
  }

  init() {
    this.items.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        this.items.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-answer').style.maxHeight = '0';
        });

        // Open clicked one if it wasn't active
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }
}

// Contact Form Handler
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Show success message
    const btn = this.form.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #2E7D32, #1B5E20)';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      this.form.reset();
    }, 3000);
  }
}

// Image lazy loading enhancement
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    if (this.images.length > 0) {
      this.init();
    }
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          img.addEventListener('load', () => {
            img.style.opacity = '1';
          });
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    this.images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      observer.observe(img);
    });
  }
}

// Cursor glow effect (desktop only)
class CursorGlow {
  constructor() {
    if (window.matchMedia('(pointer: fine)').matches) {
      this.init();
    }
  }

  init() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      transition: transform 0.2s ease;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
  new FAQ();
  new ContactForm();
  new LazyLoader();
  new CursorGlow();
});
