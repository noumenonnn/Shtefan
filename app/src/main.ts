import '../scss/main.scss';
import { animateMobileMenu, initAnimations, refreshAnimations } from './animations';

const wrapper = document.querySelector<HTMLElement>('.page-wrapper');
const panels = [...document.querySelectorAll<HTMLElement>('.screen')];
const menu = document.querySelector<HTMLElement>('.ui-menu');
const sidePoints = document.querySelector<HTMLElement>('.ui-side-points');
const menuButton = document.querySelector<HTMLButtonElement>('.ui-menu-button');
const mobileLogo = document.querySelector<HTMLAnchorElement>('.ui-mobile-logo');
const mobileMenuQuery = window.matchMedia('(max-width: 768px)');

let activePanel = panels[0];
let mobileMenuOpen = false;

const setVisibility = (
  element: HTMLElement | null,
  visible: boolean,
  enterClass: string,
  exitClass: string,
) => {
  if (!element) return;

  element.classList.toggle('hide', !visible);
  element.classList.toggle(enterClass, visible);
  element.classList.toggle(exitClass, !visible);
  element.setAttribute('aria-hidden', String(!visible));
};

const setMobileMenuOpen = (open: boolean, returnFocus = false) => {
  if (!wrapper || !menu || !menuButton || !mobileMenuQuery.matches) return;

  mobileMenuOpen = mobileMenuQuery.matches && open;
  wrapper.classList.toggle('menu-open', mobileMenuOpen);
  setVisibility(menu, mobileMenuOpen, 'fadeInDown', 'fadeOutUp');
  animateMobileMenu(mobileMenuOpen);
  menuButton.setAttribute('aria-expanded', String(mobileMenuOpen));
  menuButton.setAttribute('aria-label', mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню');

  if (mobileMenuOpen) {
    menu.querySelector<HTMLAnchorElement>('a')?.focus();
  } else if (returnFocus) {
    menuButton.focus();
  }
};

const activatePanel = (panel: HTMLElement) => {
  activePanel = panel;
  const panelName = panel.dataset.panel ?? '';
  const subpanel = panel.dataset.subpanel;
  const historyIsActive = subpanel !== undefined;

  if (!mobileMenuQuery.matches) {
    setVisibility(menu, historyIsActive, 'fadeInDown', 'fadeOutUp');
  } else if (!mobileMenuOpen) {
    setVisibility(menu, false, 'fadeInDown', 'fadeOutUp');
  }
  setVisibility(sidePoints, historyIsActive, 'fadeInRight', 'fadeOutRight');

  menuButton?.setAttribute('aria-expanded', String(mobileMenuQuery.matches ? mobileMenuOpen : historyIsActive));
  document.querySelectorAll<HTMLElement>('.ui-menu a').forEach((link) => {
    link.classList.toggle('active', link.dataset.panel === panelName);
  });
  document.querySelectorAll<HTMLElement>('.ui-side-points a').forEach((link, index) => {
    link.classList.toggle('active', index === Number(subpanel));
  });
};

const scrollToPanel = (panel: HTMLElement) => {
  wrapper?.scrollTo({ top: panel.offsetTop, behavior: 'smooth' });
};

const initPanelNavigation = () => {
  if (!wrapper || panels.length === 0) return;

  let frame = 0;
  const updateActivePanel = () => {
    frame = 0;
    wrapper.classList.toggle('is-scrolled', wrapper.scrollTop > 40);
    const viewportCenter = wrapper.scrollTop + wrapper.clientHeight / 2;
    const activePanel = panels.reduce((nearest, panel) => {
      const nearestCenter = nearest.offsetTop + nearest.offsetHeight / 2;
      const panelCenter = panel.offsetTop + panel.offsetHeight / 2;
      return Math.abs(panelCenter - viewportCenter) < Math.abs(nearestCenter - viewportCenter)
        ? panel
        : nearest;
    });
    activatePanel(activePanel);
  };

  wrapper.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(updateActivePanel);
  }, { passive: true });

  document.querySelectorAll<HTMLAnchorElement>('.ui-menu a').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!link.dataset.panel) return;
      event.preventDefault();

      const target = panels.find((panel) => panel.dataset.panel === link.dataset.panel);
      if (target) {
        if (mobileMenuQuery.matches) setMobileMenuOpen(false);
        scrollToPanel(target);
      }
    });
  });

  document.querySelectorAll<HTMLAnchorElement>('.ui-side-points a').forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = panels.find((panel) => Number(panel.dataset.subpanel) === index);
      if (target) scrollToPanel(target);
    });
  });

  menuButton?.addEventListener('click', () => {
    if (mobileMenuQuery.matches) {
      setMobileMenuOpen(!mobileMenuOpen);
      return;
    }

    const shouldOpen = menu?.classList.contains('hide') ?? true;
    setVisibility(menu, shouldOpen, 'fadeInDown', 'fadeOutUp');
    menuButton.setAttribute('aria-expanded', String(shouldOpen));
  });

  mobileLogo?.addEventListener('click', (event) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    scrollToPanel(panels[0]);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false, true);
  });

  mobileMenuQuery.addEventListener('change', () => {
    mobileMenuOpen = false;
    wrapper.classList.remove('menu-open');
    activatePanel(activePanel);
  });

  wrapper.classList.toggle('is-scrolled', wrapper.scrollTop > 40);
  activatePanel(panels[0]);
};

const initMasonry = () => {
  const grid = document.querySelector<HTMLElement>('.service-inner');
  if (!grid) return;

  const items = [...grid.querySelectorAll<HTMLElement>('.image')];
  const columnWidth = 430;
  const gutter = 85;

  const layout = () => {
    const columnCount = grid.clientWidth >= columnWidth * 2 + gutter ? 2 : 1;
    const columns = Array<number>(columnCount).fill(0);

    grid.style.position = 'relative';
    items.forEach((item) => {
      const column = columns.indexOf(Math.min(...columns));
      const marginTop = Number.parseFloat(getComputedStyle(item).marginTop) || 0;
      const marginBottom = Number.parseFloat(getComputedStyle(item).marginBottom) || 0;
      const itemWidth = Math.min(columnWidth, grid.clientWidth);
      const singleColumnOffset = Math.max((grid.clientWidth - itemWidth) / 2, 0);

      item.style.float = 'none';
      item.style.left = `${columnCount === 1 ? singleColumnOffset : column * (columnWidth + gutter)}px`;
      item.style.position = 'absolute';
      item.style.top = `${columns[column] + marginTop}px`;
      item.style.width = `${itemWidth}px`;
      columns[column] += item.offsetHeight + marginTop + marginBottom;
    });
    grid.style.height = `${Math.max(...columns)}px`;
  };

  const images = [...grid.querySelectorAll<HTMLImageElement>('img')];
  Promise.all(images.map((image) => image.decode().catch(() => undefined))).then(() => {
    layout();
    refreshAnimations();
  });

  let resizeFrame = 0;
  window.addEventListener('resize', () => {
    if (resizeFrame) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      layout();
    });
  }, { passive: true });
};

initPanelNavigation();
initMasonry();
if (wrapper) initAnimations(wrapper);
