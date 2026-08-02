/* ==========================================================================
   STAR ENTERPRISE - Special Effects & Micro-Interactions JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Cursor Glow Follower ---
  const cursorFollower = document.getElementById('cursor-follower');
  
  if (cursorFollower && window.innerWidth > 992) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      // Smooth lerp movement
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursorFollower.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // --- 2. Mouse Parallax for Hero Graphics ---
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length > 0 && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (e.clientX - centerX) / centerX;
      const moveY = (e.clientY - centerY) / centerY;

      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax') || '15');
        const x = moveX * speed;
        const y = moveY * speed;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    });
  }

  // --- 3. Typing Animation Effect ---
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const phrases = JSON.parse(typingElement.getAttribute('data-phrases') || '["Digital Products", "Web Applications", "Android Apps", "UI/UX Experiences"]');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 120;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // --- 4. Interactive Tech Filter / Category Tabs ---
  const filterBtns = document.querySelectorAll('.tech-filter-btn');
  const filterItems = document.querySelectorAll('.tech-card-item');

  if (filterBtns.length > 0 && filterItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        filterItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.85)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --- 5. Magnetic Button Effect ---
  const magneticBtns = document.querySelectorAll('.btn-magnetic');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
});
