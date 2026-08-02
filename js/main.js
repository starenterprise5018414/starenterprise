/* ==========================================================================
   STAR ENTERPRISE - Main JavaScript Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Preloader Hide ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }, 400);
    });
  }

  // --- 2. Scroll Progress Bar & Sticky Header Controller ---
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar-star');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  // --- 3. Back to Top Button Click ---
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 4. Scroll Reveal via Intersection Observer ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-zoom');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- 5. Animated Number Counter ---
  const counterElements = document.querySelectorAll('.counter-value');
  
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const targetNum = parseInt(counter.getAttribute('data-target') || '0', 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800; // ms
          const stepTime = Math.abs(Math.floor(duration / targetNum));
          
          const timer = setInterval(() => {
            count += 1;
            counter.innerText = count + suffix;
            if (count >= targetNum) {
              counter.innerText = targetNum + suffix;
              clearInterval(timer);
            }
          }, Math.max(stepTime, 20));

          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => counterObserver.observe(counter));
  }

  // --- 6. Active Navigation Dynamic Switcher ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-custom');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- 7. Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
