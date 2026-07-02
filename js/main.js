// main.js

// ─── FORM SUBMIT ──────────────────────────────────────────────────
// Must be global so the inline onsubmit="formSubmitted()" can find it
function formSubmitted() {
  setTimeout(() => {
    const success = document.getElementById('form-success');
    const form = document.getElementById('gform');
    if (success) success.style.display = 'block';
    if (form) form.reset();
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {

  // ─── MODAL SYSTEM ───────────────────────────────────────────────
  function openModal(id) {
    const modal = document.getElementById('modal-' + id);
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Open on click or Enter/Space
  document.querySelectorAll('[data-album]').forEach(el => {
    el.addEventListener('click', () => openModal(el.dataset.album));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(el.dataset.album);
      }
    });
  });

  // Close via × button
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
  });

  // Close via backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => closeModal(backdrop.closest('.modal')));
  });

  // Close via Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.is-open').forEach(closeModal);
    }
  });

  // ─── SCROLL REVEAL ──────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

// Photo gallery lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const lightbox = document.getElementById('gallery-lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = item.dataset.full;
    img.alt = item.querySelector('img').alt;
    lightbox.classList.add('is-open');
  });
});

document.getElementById('gallery-lightbox').addEventListener('click', () => {
  document.getElementById('gallery-lightbox').classList.remove('is-open');
});
  
  // ─── ACTIVE NAV ─────────────────────────────────────────────────
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

  sections.forEach(s => navObserver.observe(s));

});
