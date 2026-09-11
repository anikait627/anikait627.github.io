(() => {
  const button = document.querySelector('.comic-toggle');
  const court = document.querySelector('.tennis');
  if (!button || !court) return;
  const picture = court.querySelector('svg');
  const originalLabel = picture.getAttribute('aria-label');
  button.addEventListener('click', () => {
    const enabled = court.classList.toggle('tennis-comic');
    court.dispatchEvent(new Event('tennis-characters-change'));
    button.setAttribute('aria-pressed', String(enabled));
    button.setAttribute('aria-label', enabled ? 'Restore the original tennis players' : 'Play tennis with Calvin and Hobbes');
    picture.setAttribute('aria-label', enabled ? 'Calvin and Hobbes playing tennis' : originalLabel);
  });
})();
