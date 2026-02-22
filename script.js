/* ==========================================
   PORTFOLIO — INTERACTIVITY
   Alaattin Burak Koçer
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* ---------- Hamburger Menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = navLinks.querySelectorAll('a');

  const highlightNav = () => {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Typing Animation ---------- */
  const typedTextEl = document.getElementById('typed-text');
  const titles = [
    'Electronics & Communication Engineering Student',
    'AI / ML Enthusiast',
    'IT Business Development',
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
      typedTextEl.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;

      if (charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
      }
    } else {
      typedTextEl.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;

      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before typing next
      }
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* ---------- Project Filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = card.dataset.category || '';

        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          // Re-trigger animation
          card.classList.remove('visible');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.add('visible');
            });
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Smooth Scroll for CTA buttons ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
