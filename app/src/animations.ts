import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const motionAllowed = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const animateMobileMenu = (open: boolean) => {
  const items = [...document.querySelectorAll<HTMLElement>('.ui-menu li')];
  gsap.killTweensOf(items);

  if (!open || !motionAllowed()) {
    gsap.set(items, { clearProps: 'opacity,transform,visibility' });
    return;
  }

  gsap.fromTo(
    items,
    { autoAlpha: 0, y: 36 },
    {
      autoAlpha: 1,
      clearProps: 'opacity,transform,visibility',
      duration: .72,
      ease: 'power3.out',
      stagger: .08,
    },
  );
};

export const refreshAnimations = () => ScrollTrigger.refresh();

export const initAnimations = (scroller: HTMLElement) => {
  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const heroTimeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    heroTimeline
      .from('.shtefan-cover', {
        autoAlpha: 0,
        duration: 1.15,
        scale: .96,
        y: 56,
      })
      .from('.cover-inner > *', {
        autoAlpha: 0,
        duration: .75,
        stagger: .1,
        y: 22,
      }, '-=.72')
      .from('.ui-menu-button, .ui-social a', {
        autoAlpha: 0,
        duration: .55,
        stagger: .06,
        y: 16,
      }, '-=.5');

    gsap.from('.restaurants-heading > *', {
      autoAlpha: 0,
      duration: .85,
      ease: 'power3.out',
      stagger: .1,
      scrollTrigger: {
        once: true,
        scroller,
        start: 'top 82%',
        trigger: '.restaurants-heading',
      },
      y: 34,
    });

    gsap.from('.restaurant-card', {
      autoAlpha: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: .16,
      scrollTrigger: {
        once: true,
        scroller,
        start: 'top 84%',
        trigger: '.restaurants-grid',
      },
      y: 56,
    });

    gsap.from('.who-is-shtefan-heading > *, .who-is-shtefan-description > *', {
      autoAlpha: 0,
      duration: .95,
      ease: 'power3.out',
      stagger: .12,
      x: -46,
      scrollTrigger: {
        once: true,
        scroller,
        start: 'top 78%',
        trigger: '.who-is-shtefan-inner',
      },
    });

    document.querySelectorAll<HTMLElement>('.old-days-inner .item').forEach((item, index) => {
      const direction = index % 2 === 0 ? -1 : 1;
      const image = item.querySelector('.image');
      const description = item.querySelector('.description');

      gsap.from([image, description], {
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: .12,
        x: (_index, target) => target === image ? direction * 64 : direction * -42,
        scrollTrigger: {
          once: true,
          scroller,
          start: 'top 82%',
          trigger: item,
        },
      });
    });

    gsap.from('.today-inner .image', {
      autoAlpha: 0,
      duration: 1.1,
      ease: 'power3.out',
      scale: 1.06,
      scrollTrigger: {
        once: true,
        scroller,
        start: 'top 80%',
        trigger: '.today-inner',
      },
      x: -56,
    });

    gsap.from('.today-inner .description > *', {
      autoAlpha: 0,
      duration: .9,
      ease: 'power3.out',
      stagger: .12,
      scrollTrigger: {
        once: true,
        scroller,
        start: 'top 76%',
        trigger: '.today-inner .description',
      },
      x: 44,
    });

    gsap.from('.service h1', {
      autoAlpha: 0,
      duration: .9,
      ease: 'power3.out',
      scrollTrigger: {
        once: true,
        scroller,
        start: 'top 84%',
        trigger: '.service h1',
      },
      y: 40,
    });

    document.querySelectorAll<HTMLElement>('.service-inner .image').forEach((item, index) => {
      gsap.from(item, {
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        rotate: index % 2 === 0 ? -1.5 : 1.5,
        scrollTrigger: {
          once: true,
          scroller,
          start: 'top 88%',
          trigger: item,
        },
        y: 64,
      });
    });

  }, scroller);

  media.add('(min-width: 769px) and (hover: hover) and (prefers-reduced-motion: no-preference)', () => {
    const button = document.querySelector<HTMLElement>('.shtefan-cover .scotch-button');
    if (!button) return;

    const moveButton = (event: PointerEvent) => {
      const bounds = button.getBoundingClientRect();
      gsap.to(button, {
        duration: .35,
        ease: 'power2.out',
        x: (event.clientX - bounds.left - bounds.width / 2) * .18,
        y: (event.clientY - bounds.top - bounds.height / 2) * .24,
      });
    };
    const resetButton = () => gsap.to(button, {
      duration: .6,
      ease: 'elastic.out(1, .4)',
      x: 0,
      y: 0,
    });

    button.addEventListener('pointermove', moveButton);
    button.addEventListener('pointerleave', resetButton);

    return () => {
      button.removeEventListener('pointermove', moveButton);
      button.removeEventListener('pointerleave', resetButton);
    };
  });

  document.fonts.ready.then(refreshAnimations);
  window.addEventListener('load', refreshAnimations, { once: true });

  return () => media.revert();
};
