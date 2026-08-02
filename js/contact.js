/* ==========================================================================
   STAR ENTERPRISE - Formspree Contact Form Integration & Validation Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('starContactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic field checks
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const message = document.getElementById('contactMessage')?.value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!name || !email || !message) {
        showFormAlert('danger', 'Please complete all required fields (Name, Email, and Message).');
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormAlert('danger', 'Please enter a valid email address.');
        return;
      }

      // Loading state on button
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Transmitting to STAR ENTERPRISE...`;
      }

      try {
        const formData = new FormData(contactForm);
        const actionUrl = contactForm.getAttribute('action') || 'https://formspree.io/f/mkodpjpj';

        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.reset();
          showFormAlert('success', `Thank you, ${name}! Your message has been sent successfully to STAR ENTERPRISE. Our software team will respond shortly.`);
        } else {
          const data = await response.json();
          if (data && data.errors) {
            showFormAlert('danger', data.errors.map(err => err.message).join(', '));
          } else {
            showFormAlert('danger', 'Oops! There was a problem submitting your form. Please try again.');
          }
        }
      } catch (error) {
        showFormAlert('danger', 'Network error. Please check your internet connection and try submitting again.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  }

  function showFormAlert(type, message) {
    if (!formAlert) return;
    formAlert.className = `alert alert-${type} alert-dismissible fade show mt-4 shadow-sm border-0`;
    formAlert.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill'} fs-5"></i>
        <div>${message}</div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    formAlert.style.display = 'block';

    setTimeout(() => {
      if (formAlert) {
        formAlert.style.display = 'none';
      }
    }, 10000);
  }
});
