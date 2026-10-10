(function () {
  const footer = document.querySelector('[data-golf-footer]');
  if (!footer) return;

  const scene = footer.querySelector('.golf-scene');
  const ball = footer.querySelector('.golf-ball');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let inView = false;
  let shot = null;

  function synchronize() {
    const suspended = !inView || document.hidden;
    footer.classList.toggle('golf-running', !suspended && !reducedMotion.matches);
    if (shot) {
      if (suspended) shot.pause();
      else if (shot.playState === 'paused') shot.play();
    }
  }

  scene.disabled = false;

  scene.addEventListener('click', function () {
    if (shot) return;
    const frames = reducedMotion.matches
      ? [
        { transform: 'translate(382px, 159px)', opacity: 0 },
        { transform: 'translate(382px, 159px)', opacity: 1, offset: 0.4 },
        { transform: 'translate(382px, 159px)', opacity: 0 }
      ]
      : [
        { transform: 'translate(70px, 12px)', opacity: 0 },
        { transform: 'translate(100px, 20px)', opacity: 1, offset: 0.06 },
        { transform: 'translate(190px, 65px)', opacity: 1, offset: 0.22 },
        { transform: 'translate(290px, 157px)', opacity: 1, offset: 0.42 },
        { transform: 'translate(310px, 143px)', opacity: 1, offset: 0.5 },
        { transform: 'translate(330px, 157px)', opacity: 1, offset: 0.6 },
        { transform: 'translate(360px, 158px)', opacity: 1, offset: 0.77 },
        { transform: 'translate(382px, 159px)', opacity: 1, offset: 0.94 },
        { transform: 'translate(382px, 162px)', opacity: 0 }
      ];
    shot = ball.animate(frames, {
      duration: reducedMotion.matches ? 240 : 2400,
      easing: 'linear'
    });
    shot.onfinish = function () {
      shot.cancel();
      shot = null;
    };
    synchronize();
  });

  new IntersectionObserver(function (entries) {
    inView = entries[0].isIntersecting;
    synchronize();
  }).observe(footer);
  document.addEventListener('visibilitychange', synchronize);
  reducedMotion.addEventListener('change', function () {
    if (shot) {
      shot.cancel();
      shot = null;
    }
    synchronize();
  });
  synchronize();
}());
