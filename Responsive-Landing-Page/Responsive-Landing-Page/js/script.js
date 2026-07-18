/* ==========================================================================
   Studio Lumen — script.js
   Handles: sticky navbar background swap, mobile hamburger menu,
   button ripple effect, and contact form client-side validation.
   (Scroll-progress bar, back-to-top button and reveal animations
   live in scroll.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* -------------------- Navbar background on scroll -------------------- */
  const navbar = document.getElementById('navbar');
  const SCROLL_THRESHOLD = 80;

  function updateNavbarState() {
    if (!navbar) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  updateNavbarState();
  window.addEventListener('scroll', updateNavbarState, { passive: true });

  /* -------------------- Mobile hamburger menu -------------------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMenu() {
    hamburger.classList.add('open');
    navMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('active');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMenu);
  }

  /* Close mobile menu automatically after clicking any nav link */
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  });

  /* Close menu on Escape key for accessibility */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  /* -------------------- Button ripple / glow effect -------------------- */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      btn.appendChild(ripple);
      window.setTimeout(function () {
        ripple.remove();
      }, 650);
    });
  });

  /* -------------------- Contact form validation -------------------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message')
    };
    const successBox = document.getElementById('formSuccess');

    function setError(fieldKey, message) {
      const field = fields[fieldKey];
      const group = field.closest('.form-group');
      const errorEl = group.querySelector('.error-message');
      group.classList.add('error');
      errorEl.textContent = message;
    }

    function clearError(fieldKey) {
      const field = fields[fieldKey];
      const group = field.closest('.form-group');
      group.classList.remove('error');
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validateForm() {
      let isValid = true;

      // Name: required, minimum 3 characters
      const nameVal = fields.name.value.trim();
      if (nameVal.length === 0) {
        setError('name', 'Please enter your name.');
        isValid = false;
      } else if (nameVal.length < 3) {
        setError('name', 'Name must be at least 3 characters.');
        isValid = false;
      } else {
        clearError('name');
      }

      // Email: required, valid format
      const emailVal = fields.email.value.trim();
      if (emailVal.length === 0) {
        setError('email', 'Please enter your email.');
        isValid = false;
      } else if (!isValidEmail(emailVal)) {
        setError('email', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError('email');
      }

      // Subject: required
      const subjectVal = fields.subject.value.trim();
      if (subjectVal.length === 0) {
        setError('subject', 'Please enter a subject.');
        isValid = false;
      } else {
        clearError('subject');
      }

      // Message: required, minimum 10 characters
      const messageVal = fields.message.value.trim();
      if (messageVal.length === 0) {
        setError('message', 'Please enter a message.');
        isValid = false;
      } else if (messageVal.length < 10) {
        setError('message', 'Message should be at least 10 characters.');
        isValid = false;
      } else {
        clearError('message');
      }

      return isValid;
    }

    /* Live-clear errors as the user types */
    Object.keys(fields).forEach(function (key) {
      fields[key].addEventListener('input', function () {
        if (fields[key].closest('.form-group').classList.contains('error')) {
          clearError(key);
        }
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent page refresh

      if (successBox) successBox.classList.remove('show');

      const valid = validateForm();

      if (valid) {
        successBox.classList.add('show');
        contactForm.reset();
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

        window.setTimeout(function () {
          successBox.classList.remove('show');
        }, 6000);
      }
    });
  }

});
