const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { mobileNav.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); mobileNav.hidden = !open; });
mobileNav.addEventListener('click', event => { const link = event.target.closest('a'); if (!link) return; closeMenu(); const section = document.querySelector(link.getAttribute('href')); section.setAttribute('tabindex', '-1'); section.focus({preventScroll: true}); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.addEventListener('resize', () => { if (innerWidth >= 1100) closeMenu(); });
const sections = [...document.querySelectorAll('main > section[id]')];
const links = [...document.querySelectorAll('[data-section]')];
const topLink = document.querySelector('.back-top');
let scheduled = false;
function updateNavigation() {
  let active = sections[0];
  for (const section of sections) { if (section.getBoundingClientRect().top <= 170) active = section; }
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 5) active = sections.at(-1);
  for (const link of links) { if (link.dataset.section === active.id) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }
  topLink.hidden = scrollY < 500;
  scheduled = false;
}
window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); } }, {passive: true});
window.addEventListener('resize', updateNavigation);
window.addEventListener('load', updateNavigation);
updateNavigation();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reveal-in'); observer.unobserve(entry.target); } }); }, {threshold: .08});
  document.querySelectorAll('.job, .project').forEach(element => observer.observe(element));
}
