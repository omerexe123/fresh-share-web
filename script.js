const scrollButtons = document.querySelectorAll('[data-scroll]');
const faqItems = document.querySelectorAll('.faq-item');
const chips = document.querySelectorAll('.chip');
const meals = document.querySelectorAll('.meal-row');

scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.scroll);
    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

faqItems.forEach((item) => {
  const button = item.querySelector('button');

  button.addEventListener('click', () => {
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove('open');
        otherItem.querySelector('span').textContent = '+';
      }
    });

    item.classList.toggle('open');
    item.querySelector('span').textContent = item.classList.contains('open') ? '−' : '+';
  });
});

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');

    const selected = chip.textContent.trim();

    meals.forEach((meal) => {
      const category = meal.dataset.category;
      const isFree = meal.textContent.includes('Ücretsiz');

      const visible =
        selected === 'En Yeniler' ||
        (selected === 'Ücretsiz' && isFree) ||
        selected === category;

      meal.style.display = visible ? 'grid' : 'none';
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.animate(
        [
          { opacity: 0, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: 520,
          easing: 'ease-out',
          fill: 'forwards'
        }
      );

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

document
  .querySelectorAll('.feature-card, .flow-grid article, .analysis-card, .stats-section div')
  .forEach((element) => {
    element.style.opacity = '0';
    observer.observe(element);
  });
