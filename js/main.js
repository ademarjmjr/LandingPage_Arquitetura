/* ============================================================
   FORMA & ESPAÇO ARQUITETURA — MAIN.JS
   ============================================================ */

'use strict';

/* ---------- UTILITÁRIOS ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ============================================================
   1. NAVBAR — Efeito ao rolar
   ============================================================ */
(function initNavbar() {
  const navbar = $('#navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Estado inicial
})();

/* ============================================================
   2. MENU MOBILE
   ============================================================ */
(function initMobileMenu() {
  const toggle     = $('#menuToggle');
  const menu       = $('#mobileMenu');
  const mobileLinks = $$('.mobile-link');
  if (!toggle || !menu) return;

  const openMenu  = () => {
    menu.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
})();

/* ============================================================
   3. SCROLL REVEAL — IntersectionObserver
   ============================================================ */
(function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(item => observer.observe(item));
})();

/* ============================================================
   4. HERO — Ken Burns / Loaded state
   ============================================================ */
(function initHero() {
  const hero = $('.hero');
  const img  = hero ? hero.querySelector('.hero__img') : null;
  if (!hero || !img) return;

  const activate = () => hero.classList.add('loaded');

  if (img.complete) {
    activate();
  } else {
    img.addEventListener('load', activate);
  }
})();

/* ============================================================
   5. FILTROS DO PORTFÓLIO
   ============================================================ */
(function initPortfolioFilter() {
  const buttons = $$('.filter-btn');
  const items   = $$('.portfolio-item');
  if (!buttons.length || !items.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Atualizar botão ativo
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filtrar itens com animação
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        if (match) {
          item.classList.remove('portfolio-item--hidden');
          // Reativar reveal se necessário
          requestAnimationFrame(() => {
            item.classList.remove('visible');
            requestAnimationFrame(() => item.classList.add('visible'));
          });
        } else {
          item.classList.add('portfolio-item--hidden');
        }
      });
    });
  });
})();

/* ============================================================
   6. MODAL DO PORTFÓLIO
   ============================================================ */
(function initPortfolioModal() {
  const modal    = $('#portfolioModal');
  const backdrop = $('#modalBackdrop');
  const closeBtn = $('#modalClose');
  const modalImg   = $('#modalImg');
  const modalCat   = $('#modalCat');
  const modalTitle = $('#modalTitle');
  const modalDesc  = $('#modalDesc');
  const modalCta   = $('#modalCta');

  if (!modal) return;

  const portfolioData = {
    'Residência Amazonas':    { cat: 'Residencial', desc: 'Residência de alto padrão na zona sul de Porto Velho. Projeto com ênfase em ventilação natural e integração com a paisagem amazônica. 420 m² construídos em 14 meses.' },
    'Sala Sereno':            { cat: 'Interiores',  desc: 'Living minimalista com paleta neutra e mobiliário de grife italiana. Projeto de iluminação cênica com automação residencial integrada.' },
    'Escritório Bravo':       { cat: 'Comercial',   desc: 'Sede corporativa com ambientes colaborativos, salas de reunião acústicas e espaços de convivência. Projeto de eficiência energética Nível A.' },
    'Casa Madeira Nobre':     { cat: 'Residencial', desc: 'Residência com uso de madeiras nobres certificadas da Amazônia. Integração entre arquitetura contemporânea e materiais regionais de identidade.' },
    'Suíte Master Vista Rio': { cat: 'Interiores',  desc: 'Suíte com orientação para o Rio Madeira. Revestimentos em pedras naturais, closet planejado e banheiro spa com ofurô embutido.' },
    'Villa Solarium':         { cat: 'Residencial', desc: 'Villa de alto padrão com área de lazer completa: piscina infinita, home theater, adegas climatizada e jardim paisagístico.' },
  };

  const openModal = (item) => {
    const img   = item.querySelector('img');
    const title = item.querySelector('h3')?.textContent || '';
    const data  = portfolioData[title] || {};

    modalImg.src = img?.src || '';
    modalImg.alt = img?.alt || '';
    modalCat.textContent   = data.cat   || item.dataset.category || '';
    modalTitle.textContent = title;
    modalDesc.textContent  = data.desc  || 'Projeto de alto padrão desenvolvido pelo escritório Forma & Espaço.';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Abrir modal ao clicar em item ou botão +
  $$('.portfolio-item').forEach(item => {
    const btn = item.querySelector('.portfolio-item__btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(item);
      });
    }
    item.addEventListener('click', () => openModal(item));
  });

  // Fechar
  if (closeBtn)  closeBtn.addEventListener('click', closeModal);
  if (backdrop)  backdrop.addEventListener('click', closeModal);
  if (modalCta)  modalCta.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();

/* ============================================================
   7. ANIMAÇÃO DE CONTADORES (Métricas)
   ============================================================ */
(function initCounters() {
  const cards = $$('.metrica-card');
  if (!cards.length) return;

  const animateCounter = (el, target, duration = 1800) => {
    const start = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: easeOutExpo
      const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current  = Math.round(eased * target);

      el.textContent = current.toLocaleString('pt-BR');

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numEl  = entry.target.querySelector('.metrica-number');
          const target = parseInt(numEl?.dataset.target || '0', 10);
          if (numEl && target) animateCounter(numEl, target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  cards.forEach(card => observer.observe(card));
})();

/* ============================================================
   8. FORMULÁRIO DE CONTATO
   ============================================================ */
(function initContactForm() {
  const form       = $('#contactForm');
  const submitBtn  = $('#submitBtn');
  const successMsg = $('#formSuccess');

  if (!form) return;

  const validate = () => {
    const name  = $('#name')?.value.trim();
    const phone = $('#phone')?.value.trim();
    const email = $('#email')?.value.trim();

    if (!name || name.length < 3) {
      showError('name', 'Informe seu nome completo.');
      return false;
    }
    if (!phone || phone.length < 8) {
      showError('phone', 'Informe um WhatsApp válido.');
      return false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Informe um e-mail válido.');
      return false;
    }
    return true;
  };

  const showError = (fieldId, msg) => {
    const field = $(`#${fieldId}`);
    if (!field) return;

    field.style.borderColor = '#e74c3c';
    field.focus();

    // Remover erro após input
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    }, { once: true });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simular envio
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    await new Promise(resolve => setTimeout(resolve, 1500));

    form.reset();
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
    successMsg.classList.add('visible');

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
      submitBtn.disabled = false;
    }, 3000);

    // Scroll para sucesso
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();

/* ============================================================
   9. SMOOTH SCROLL para links âncora
   ============================================================ */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;

      const target = $(id);
      if (!target) return;

      e.preventDefault();

      const navbarH = $('#navbar')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   10. ATIVO NA NAVBAR — Seção atual em destaque
   ============================================================ */
(function initActiveSection() {
  const sections = $$('section[id]');
  const navLinks = $$('.navbar__menu a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.style.color = 'var(--gold-light)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   11. LAZY LOAD com fade-in para imagens
   ============================================================ */
(function initImageFadeIn() {
  const images = $$('img[loading="lazy"]');

  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';

    const fadeIn = () => { img.style.opacity = '1'; };

    if (img.complete) {
      fadeIn();
    } else {
      img.addEventListener('load', fadeIn);
    }
  });
})();

/* ============================================================
   12. MÁSCARA DE TELEFONE
   ============================================================ */
(function initPhoneMask() {
  const phoneInput = $('#phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', () => {
    let val = phoneInput.value.replace(/\D/g, '').slice(0, 11);

    if (val.length <= 2) {
      val = val.replace(/^(\d{0,2})/, '($1');
    } else if (val.length <= 6) {
      val = val.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
    } else if (val.length <= 10) {
      val = val.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      val = val.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    phoneInput.value = val;
  });
})();

console.log('%c✦ Forma & Espaço Arquitetura', 'color:#C9A84C;font-size:16px;font-weight:bold;font-family:serif;');
console.log('%cSite desenvolvido com excelência técnica.', 'color:#8A8580;font-size:11px;');
