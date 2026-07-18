/* ==========================================================================
   Studio Lumen — scroll.js
   Handles: scroll progress bar, back-to-top button, active nav-link
   highlighting on scroll, and reveal-on-scroll animations via
   IntersectionObserver.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* -------------------- Scroll progress bar -------------------- */
  const progressBar = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);

  /* -------------------- Back to top button -------------------- */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------- Smooth scroll for in-page anchor links -------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const navHeight = document.getElementById('navbar')
            ? document.getElementById('navbar').offsetHeight
            : 84;
          const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight + 1;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    });
  });

  /* -------------------- Active nav-link highlighting on scroll (index page sections) -------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"], .nav-link[href*="index.html#"]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            const href = link.getAttribute('href') || '';
            const matches = href === '#' + id || href.endsWith('#' + id);
            link.classList.toggle('active', matches);
          });
        }
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* -------------------- Reveal-on-scroll animations -------------------- */
  const revealTargets = document.querySelectorAll('.reveal, .reveal-zoom, .reveal-left, .reveal-right');

  if (revealTargets.length) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealTargets.forEach(function (target, index) {
      // Stagger children within the same grid slightly for a natural cascade
      target.style.setProperty('--d', (index % 3) * 0.12 + 's');
      revealObserver.observe(target);
    });
  }

});
