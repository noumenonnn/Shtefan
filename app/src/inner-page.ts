import '../scss/main.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const body = document.body;
const menuButton = document.querySelector<HTMLButtonElement>('.page-menu-button');
const siteNav = document.querySelector<HTMLElement>('.site-nav');

const setMenuOpen = (open: boolean, returnFocus = false) => {
  body.classList.toggle('page-nav-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  menuButton?.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');

  if (open) {
    siteNav?.querySelector<HTMLAnchorElement>('a')?.focus();
  } else if (returnFocus) {
    menuButton?.focus();
  }
};

menuButton?.addEventListener('click', () => {
  setMenuOpen(!body.classList.contains('page-nav-open'));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && body.classList.contains('page-nav-open')) {
    setMenuOpen(false, true);
  }
});

window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
  if (event.matches) setMenuOpen(false);
});

const media = gsap.matchMedia();

media.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.site-header', {
      autoAlpha: 0,
      clearProps: 'opacity,transform,visibility',
      duration: .7,
      y: -28,
    })
    .from('.inner-hero .inner-kicker', { autoAlpha: 0, duration: .55, x: -30 }, '-=.2')
    .from('.inner-hero h1', { autoAlpha: 0, duration: .9, y: 52 }, '-=.35')
    .from('.inner-hero p, .inner-hero .category-links', {
      autoAlpha: 0,
      duration: .75,
      stagger: .12,
      y: 28,
    }, '-=.52');

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element, index) => {
    gsap.from(element, {
      autoAlpha: 0,
      duration: .85,
      ease: 'power3.out',
      scrollTrigger: {
        once: true,
        start: 'top 88%',
        trigger: element,
      },
      y: 42 + index % 3 * 8,
    });
  });
});

window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
