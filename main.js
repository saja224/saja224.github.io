/* Saja Ahmed Saeed — Portfolio: small, dependency-free enhancements */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');

  /* Gentle reveal on scroll (skipped when the visitor prefers reduced motion) */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Dashboard screenshots: open full size in a dialog */
  var box = document.getElementById('lightbox');
  if (box && typeof box.showModal === 'function') {
    var img = box.querySelector('img');
    var cap = box.querySelector('.lb-caption');
    var opener = null;
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        img.src = btn.getAttribute('data-full');
        img.alt = btn.getAttribute('data-alt') || '';
        cap.textContent = btn.getAttribute('data-caption') || '';
        box.showModal();
      });
    });
    box.querySelector('.lb-close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('close', function () { if (opener) opener.focus(); });
  } else if (box) {
    /* Very old browsers: fall back to opening the image directly */
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () { window.open(btn.getAttribute('data-full'), '_blank', 'noopener'); });
    });
  }

  /* Footer year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
