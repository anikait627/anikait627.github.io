(() => {
  document.querySelectorAll('.tennis').forEach(court => {
    const svg = court.querySelector('svg');
    const scoreboard = court.querySelector('.tennis-score');
    const result = court.querySelector('.tennis-result');
    const points = [0, 0];
    const games = [0, 0];
    let botMiss = false;
    let lastPoint = null;
    function renderResult() {
      const names = [court.dataset.nearName || 'You', court.dataset.farName || 'Anikait'];
      names.forEach((name, player) => { court.querySelector(`[data-player="${player}"]`).textContent = name; });
      if (!lastPoint) return;
      const { winner, wonGame } = lastPoint;
      const deuce = points[0] >= 3 && points[1] >= 3;
      result.textContent = wonGame ? `Game, ${names[winner]}!` :
        deuce && points[0] === points[1] ? 'Deuce' :
        deuce ? `Advantage ${names[points[0] > points[1] ? 0 : 1]}` :
        `${names[1 - winner]} missed. Point to ${names[winner]}!`;
    }
    court.addEventListener('tennis-characters-change', renderResult);
    function scorePoint(winner) {
      points[winner]++;
      const loser = 1 - winner;
      const wonGame = points[winner] >= 4 && points[winner] - points[loser] >= 2;
      if (wonGame) {
        games[winner]++;
        points.fill(0);
      }
      const deuce = points[0] >= 3 && points[1] >= 3;
      points.forEach((value, player) => {
        const label = deuce ? (value > points[1 - player] ? 'AD' : '40') : ['0', '15', '30', '40'][value];
        court.querySelector(`[data-points="${player}"]`).textContent = label;
        court.querySelector(`[data-games="${player}"]`).textContent = games[player];
      });
      lastPoint = { winner, wonGame };
      renderResult();
    }
    let hovering = false;
    let pointerX = 190;
    let restartIn = 0;
    let lastPointerX = pointerX;
    const ball = court.querySelector('.tennis-ball');
    const shadow = court.querySelector('.tennis-shadow');
    const arms = court.querySelectorAll('.racket-arm');
    const players = [court.querySelector('.player-near'), court.querySelector('.player-far')];
    const contactX = [227, 442, 427, 202];
    const xAt = hit => contactX[((hit % 4) + 4) % 4];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let playing = !reducedMotion.matches;
    let elapsed = 0;
    let previous = null;
    let frame;
    function draw() {
      const leg = elapsed / 1500;
      const phase = leg % 1;
      const hit = Math.floor(leg);
      const x = xAt(hit) + (xAt(hit + 1) - xAt(hit)) * phase;
      const ground = hit % 2 ? 16 + 198 * phase : 214 - 198 * phase;
      players.forEach((player, side) => {
        const lastHit = Math.floor((leg - side) / 2) * 2 + side;
        const travel = Math.max(0, Math.min(1, (leg - lastHit - .3) / 1.5));
        const eased = travel * travel * (3 - 2 * travel);
        let playerX = xAt(lastHit) + (xAt(lastHit + 2) - xAt(lastHit)) * eased;
        if (side === 1 && botMiss) playerX += 50;
        if (side === 0 && hovering) playerX = pointerX + 37;
        const running = side === 0 && hovering
          ? Math.abs(pointerX - lastPointerX) > .3
          : travel > 0 && travel < 1;
        const stride = running ? Math.sin(elapsed / 85) * 9 : 0;
        const bob = running ? Math.sin(elapsed / 42.5) * 1.5 : 0;
        player.setAttribute('transform', `translate(${playerX - (side ? 32 : 37)} ${side ? 6 + bob : 205 + bob})`);
        player.querySelector('.legs').setAttribute('d', `M0 16L${-12 + stride} 34M0 16L${12 - stride} 34`);
      });
      lastPointerX = pointerX;
      // The ball dips to the court late in each flight, then rises to the racket.
      const height = phase < .76
        ? 19 * (1 - phase / .76) + 44 * Math.sin(Math.PI * phase / .76)
        : 19 * (phase - .76) / .24;
      ball.setAttribute('cx', x);
      ball.setAttribute('cy', ground - height);
      shadow.setAttribute('cx', x);
      shadow.setAttribute('cy', ground);
      arms.forEach((arm, i) => {
        const hit = (leg + i) % 2;
        const angle = hit < .2 ? -35 * Math.sin(hit / .2 * Math.PI) : 0;
        arm.style.transform = `rotate(${angle}deg)`;
      });
    }
    function tick(now) {
      const delta = previous === null ? 0 : Math.min(now - previous, 50);
      if (restartIn > 0) {
        restartIn -= delta;
        if (restartIn <= 0) {
          // Restart with a serve from the far player, giving the visitor time to react.
          elapsed = 1500;
          botMiss = false;
          ball.style.opacity = '1';
          shadow.style.opacity = '';
        }
      } else {
        const next = elapsed + delta;
        const nextHit = Math.floor(next / 1500);
        const reachedPlayer = nextHit > Math.floor(elapsed / 1500);
        const reachedNearPlayer = reachedPlayer && nextHit % 2 === 0;
        const missedNear = hovering && reachedNearPlayer && Math.abs(pointerX + 37 - xAt(nextHit)) > 28;
        const missedFar = hovering && reachedPlayer && nextHit % 2 === 1 && Math.random() < .18;
        if (missedNear || missedFar) {
          botMiss = missedFar;
          scorePoint(missedFar ? 0 : 1);
          elapsed = nextHit * 1500 - .01;
          restartIn = 1000;
          ball.style.opacity = '.25';
          shadow.style.opacity = '0';
        } else {
          elapsed = next;
        }
      }
      previous = now;
      draw();
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      previous = null;
      if (playing && !document.hidden) frame = requestAnimationFrame(tick);
    }
    function followPointer(event) {
      if (event.pointerType === 'touch') return;
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      hovering = true;
      scoreboard.hidden = false;
      pointerX = Math.max(70, Math.min(490, point.matrixTransform(matrix.inverse()).x));
      if (!playing) draw();
    }
    svg.addEventListener('pointerenter', followPointer);
    svg.addEventListener('pointermove', followPointer);
    svg.addEventListener('pointerleave', () => { hovering = false; scoreboard.hidden = true; if (!playing) draw(); });
    svg.addEventListener('pointercancel', () => { hovering = false; scoreboard.hidden = true; });
    reducedMotion.addEventListener('change', () => { playing = !reducedMotion.matches; sync(); });
    document.addEventListener('visibilitychange', sync);
    draw();
    sync();
  });
})();
