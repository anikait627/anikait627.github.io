(() => {
  const nav = document.querySelector('.nav');
  const button = nav?.querySelector('.mobile-menu-toggle');
  const menu = nav?.querySelector('#menu');
  if (!button || !menu) return;
  const smallScreen = window.matchMedia('(max-width: 760px)');
  function setOpen(open) {
    nav.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
  nav.classList.add('nav-enhanced');
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', event => { if (!nav.contains(event.target)) setOpen(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });
  nav.addEventListener('focusout', event => { if (!nav.contains(event.relatedTarget)) setOpen(false); });
  menu.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  smallScreen.addEventListener('change', () => {
    if (smallScreen.matches && menu.contains(document.activeElement)) button.focus();
    setOpen(false);
  });
})();
