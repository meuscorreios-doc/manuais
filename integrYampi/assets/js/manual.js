(() => {
  const links = Array.from(document.querySelectorAll('.manual-sidebar a[href^="#"]'));
  const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let queued = false;
  function update() {
    queued = false;
    const offset = document.querySelector('.manual-navbar').getBoundingClientRect().height + 24;
    let selected = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top <= offset) selected = section;
    for (const link of links) {
      const active = selected && link.hash === '#' + selected.id;
      link.classList.toggle('is-active', Boolean(active));
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('hashchange', schedule);
  update();
})();