// Shared behaviour: mobile menu, reading progress, table of contents highlight, era tabs
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-btn');
  const list = document.querySelector('.nav ul');
  if (btn && list) {
    btn.addEventListener('click', () => {
      const open = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  const bar = document.querySelector('.progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    }, { passive: true });
  }

  const links = document.querySelectorAll('.toc a');
  if (links.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('section.lesson').forEach(s => obs.observe(s));
  }

  const tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }));
});
