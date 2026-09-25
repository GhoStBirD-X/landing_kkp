// Sticky navbar background on scroll
const navbar = document.getElementById('navbar');
const onScroll = () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Animated counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (target % 1 === 0 ? Math.floor(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// Lightbox for gallery images, grouped by data-gallery so Next/Prev stays within the same set
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

const galleries = {};
document.querySelectorAll('[data-lightbox]').forEach(item => {
  const group = item.dataset.gallery || 'default';
  (galleries[group] = galleries[group] || []).push(item);
});

let activeGroup = null;
let activeIndex = 0;

const renderLightbox = () => {
  const items = galleries[activeGroup];
  const img = items[activeIndex].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.alt;
  const multi = items.length > 1;
  lightboxCounter.textContent = multi ? `${activeIndex + 1} / ${items.length}` : '';
  lightboxPrev.classList.toggle('hidden', !multi);
  lightboxNext.classList.toggle('hidden', !multi);
};

const openLightbox = (group, index) => {
  activeGroup = group;
  activeIndex = index;
  renderLightbox();
  lightbox.classList.remove('hidden-lb');
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

document.querySelectorAll('[data-lightbox]').forEach(item => {
  const openThis = () => {
    const group = item.dataset.gallery || 'default';
    openLightbox(group, galleries[group].indexOf(item));
  };
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  const label = item.querySelector('img')?.alt;
  if (label) item.setAttribute('aria-label', `Lihat foto: ${label}`);
  item.addEventListener('click', openThis);
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openThis();
    }
  });
});

const showNext = () => {
  const items = galleries[activeGroup];
  activeIndex = (activeIndex + 1) % items.length;
  renderLightbox();
};
const showPrev = () => {
  const items = galleries[activeGroup];
  activeIndex = (activeIndex - 1 + items.length) % items.length;
  renderLightbox();
};

const closeLightbox = () => {
  lightbox.classList.add('hidden-lb');
  document.body.style.overflow = '';
  setTimeout(() => lightbox.classList.add('hidden'), 250);
};

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
