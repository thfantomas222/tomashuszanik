// Rovina 7 — main.js

document.addEventListener('DOMContentLoaded', () => {

    // ─── MODAL SYSTEM ─────────────────────────────────────────────────
  function openModal(id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    // focus close button for accessibility
    modal.querySelector('.modal-close').focus();
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Open on album cover click or Enter/Space key
  document.querySelectorAll('[data-album]').forEach(cover => {
    cover.addEventListener('click', () => openModal(cover.dataset.album));
    cover.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(cover.dataset.album);
      }
    });
  });

  // Close via × button
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
  });

  // Close via backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => closeModal(backdrop.closest('.modal')));
  });

  // Close via Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.is-open').forEach(closeModal);
    }
  });

  // ─── SCROLL FADE-IN ───────────────────────────────────────────────
  // Elements to animate. Add the class 'reveal' to anything you want
  // to drift up and fade in as it enters the viewport.
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // animate once only
      }
    });
  }, {
    threshold: 0.12,      // trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px' // slight offset so it fires just before fully in view
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── ACTIVE NAV HIGHLIGHTING ──────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.opacity = link.getAttribute('href') === `#${entry.target.id}` ? '1' : '0.6';
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => navObserver.observe(section));

  // ─── SMOOTH SCROLL TO CONTACT ────────────────────────────────────
  document.querySelectorAll('a[href="#contact"], .contact-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.getElementById('contact');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── ALBUM CLICK FEEDBACK ────────────────────────────────────────
  document.querySelectorAll('[data-album]').forEach(cover => {
    cover.addEventListener('click', () => {
      cover.style.transform = 'scale(0.97)';
      setTimeout(() => { cover.style.transform = ''; }, 150);
    });
  });

});

document.querySelectorAll('[data-album]').forEach(el => {
  el.addEventListener('click', () => {
    const id = el.dataset.album;
    document.getElementById('modal-' + id)?.classList.add('is-open');
  });
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.click();
    }
  });
});
