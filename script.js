// NAVBAR SCROLL
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// MOBILE MENU TOGGLE
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  menu.classList.toggle('open');
  hamburger.classList.toggle('active');
}

// TYPEWRITER EFFECT
const phrases = [
  'Aspiring Cloud & DevOps Engineer',
  'Web Developer · Python + Flask',
  'ML Security Builder',
  'BCA 2026 · Actively Job Seeking',
];
let pIdx = 0, cIdx = 0, del = false;
const el = document.getElementById('typed-text');
function type() {
  const phrase = phrases[pIdx];
  if (!del) {
    el.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) { del = true; setTimeout(type, 2000); return; }
  } else {
    el.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) { del = false; pIdx = (pIdx + 1) % phrases.length; }
  }
  setTimeout(type, del ? 38 : 62);
}
type();

// SCROLL ANIMATIONS
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// PROJECT FILTER
function filterProjects(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    const tags = card.dataset.tags || '';
    const show = tag === 'all' || tags.includes(tag);
    card.dataset.hidden = show ? 'false' : 'true';
  });
}

// CONTACT FORM - MAILTO
function sendMail() {
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMsg').value.trim();
  if (!name || !email || !msg) { alert('Please fill in all fields.'); return; }
  const subject = encodeURIComponent('Portfolio Contact from ' + name);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg);
  window.location.href = 'mailto:balsureabhishek@gmail.com?subject=' + subject + '&body=' + body;
  const status = document.getElementById('formStatus');
  status.style.display = 'block';
  setTimeout(() => { status.style.display = 'none'; }, 4000);
}