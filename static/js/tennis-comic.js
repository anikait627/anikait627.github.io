(() => {
  const button = document.querySelector('.comic-toggle');
  const court = document.querySelector('.tennis');
  if (!button || !court) return;
  const picture = court.querySelector('svg');
  const pairs = [
    { id: 'calvin-hobbes', near: 'Calvin', far: 'Hobbes' },
    { id: 'scooby-shaggy', near: 'Shaggy', far: 'Scooby' }
  ];
  button.addEventListener('click', () => {
    const choices = pairs.filter(pair => pair.id !== court.dataset.characters);
    const pair = choices[Math.floor(Math.random() * choices.length)];
    court.dataset.characters = pair.id;
    court.dataset.nearName = pair.near;
    court.dataset.farName = pair.far;
    court.classList.add('tennis-comic');
    court.dispatchEvent(new Event('tennis-characters-change'));
    button.classList.add('comic-selected');
    button.setAttribute('aria-label', `Choose another cartoon pair. Currently ${pair.near} and ${pair.far}`);
    picture.setAttribute('aria-label', `${pair.near} and ${pair.far} playing tennis`);
  });
})();
