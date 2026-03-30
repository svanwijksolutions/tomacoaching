document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Componenten laden ──────────────────────────────
  const loadComponents = async () => {
    try {
      const [h, f] = await Promise.all([
        fetch('components/header.html').then(r => r.text()),
        fetch('components/footer.html').then(r => r.text())
      ]);
      const hp = document.getElementById('header-placeholder');
      const fp = document.getElementById('footer-placeholder');
      if (hp) hp.innerHTML = h;
      if (fp) fp.innerHTML = f;

      initMobileNav();
      initHeaderScroll();
      initActiveNav();
    } catch (err) {
      console.error('Components failed to load:', err);
    }

    // Animaties starten na laden (of meteen als geen components nodig)
    initAnimations();
  };

  // ── 2. Mobiele Navigatie ─────────────────────────────
  const initMobileNav = () => {
    const toggle = document.getElementById('menuToggle');
    const menu   = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('active');
      toggle.classList.toggle('active');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  };

  // ── 3. Header scroll-effect ──────────────────────────
  const initHeaderScroll = () => {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  // ── 4. Actieve navigatie-link markeren ───────────────
  const initActiveNav = () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  };

  // ── 5. Scroll-reveal animaties ───────────────────────
  const initAnimations = () => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // eenmalig
        }
      });
    }, { threshold: 0.08 });

    els.forEach(el => observer.observe(el));
  };

  loadComponents();
});