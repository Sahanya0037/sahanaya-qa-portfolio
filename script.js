const menu = document.getElementById('menu');
const links = document.getElementById('links');
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

menu.addEventListener('click', () => {
  const isOpen = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#links a').forEach(link => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  });
});

themeToggle.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', nextTheme);
  themeToggle.textContent = nextTheme === 'dark' ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', `Switch to ${nextTheme === 'dark' ? 'light' : 'dark'} mode`);
});

document.getElementById('year').textContent = new Date().getFullYear();

const phrases = ['I test. I learn. I improve.', 'Quality is my career goal.', 'Finding bugs before users do.'];
const typewriter = document.getElementById('typewriter');
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeEffect() {
  const phrase = phrases[phraseIndex];
  typewriter.textContent = deleting ? phrase.substring(0, charIndex--) : phrase.substring(0, charIndex++);
  let speed = deleting ? 45 : 85;
  if (!deleting && charIndex > phrase.length) { deleting = true; speed = 1400; }
  if (deleting && charIndex < 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; charIndex = 0; speed = 350; }
  setTimeout(typeEffect, speed);
}
typeEffect();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(section => revealObserver.observe(section));

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar span').forEach(bar => { bar.style.width = bar.dataset.width; });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => { topBtn.style.display = window.scrollY > 500 ? 'block' : 'none'; });
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
