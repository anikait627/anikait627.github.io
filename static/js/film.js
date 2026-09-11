(() => {
  const grid = document.querySelector('.film-grid');
  const lightbox = document.querySelector('.film-lightbox');
  if (!grid || !lightbox) return;

  const items = Array.from(grid.querySelectorAll('.film-grid-item'));
  if (!items.length) return;

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  function columnCount() {
    const width = grid.getBoundingClientRect().width || window.innerWidth;
    return Math.min(4, Math.max(2, Math.floor(width / 226)));
  }

  function layout() {
    const count = columnCount();
    if (grid.dataset.columns === String(count)) return;
    grid.dataset.columns = String(count);
    const columns = Array.from({ length: count }, () => {
      const col = document.createElement('div');
      col.className = 'film-grid-col';
      return col;
    });
    items.forEach((item, i) => columns[i % count].appendChild(item));
    grid.replaceChildren(...columns);
  }

  layout();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 150);
  });

  const img = lightbox.querySelector('.film-lightbox-img');
  const closeBtn = lightbox.querySelector('.film-lightbox-close');
  const prevBtn = lightbox.querySelector('.film-lightbox-prev');
  const nextBtn = lightbox.querySelector('.film-lightbox-next');
  let current = 0;
  let trigger = null;

  function show(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    img.src = item.getAttribute('href');
    img.alt = item.querySelector('img').alt;
  }

  function open(index, from) {
    trigger = from;
    show(index);
    lightbox.hidden = false;
    document.body.classList.add('film-lightbox-open');
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    img.src = '';
    document.body.classList.remove('film-lightbox-open');
    if (trigger) trigger.focus();
  }

  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      open(index, item);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn.addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });
})();
