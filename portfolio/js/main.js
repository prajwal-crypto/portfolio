// ===== TERMINAL TYPEWRITER =====
const lines = [
  { text: '$ whoami', cls: 'cmd', delay: 300 },
  { text: 'prajwal-gowda-hr', cls: 'out', delay: 700 },
  { text: '$ cat skills.txt', cls: 'cmd', delay: 1200 },
  { text: '→ AWS EC2 / S3 / Lambda / CloudWatch', cls: 'out', delay: 1600 },
  { text: '→ Docker · Kubernetes · Jenkins', cls: 'out', delay: 2000 },
  { text: '→ GitHub Actions · CI/CD Pipelines', cls: 'out', delay: 2400 },
  { text: '→ Python · Linux · Git', cls: 'out', delay: 2800 },
  { text: '$ docker ps', cls: 'cmd', delay: 3300 },
  { text: 'flipkart-clone    running   ✓', cls: 'out', delay: 3700 },
  { text: 'yolo-detector     running   ✓', cls: 'out', delay: 4000 },
  { text: '$ kubectl get nodes', cls: 'cmd', delay: 4500 },
  { text: 'node-1   Ready   <3m', cls: 'out', delay: 4900 },
  { text: '# open to work — let\'s build something!', cls: 'comment', delay: 5400 },
];

const body = document.getElementById('terminal-body');

function typeLine(text, cls) {
  return new Promise(resolve => {
    const span = document.createElement('span');
    span.className = 'line ' + cls;
    body.appendChild(span);
    let i = 0;
    const speed = cls === 'cmd' ? 40 : 15;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    span.appendChild(cursor);
    const iv = setInterval(() => {
      cursor.remove();
      span.textContent = text.slice(0, ++i);
      span.appendChild(cursor);
      if (i === text.length) {
        clearInterval(iv);
        cursor.remove();
        body.appendChild(document.createElement('br'));
        resolve();
      }
    }, speed);
  });
}

async function runTerminal() {
  for (const l of lines) {
    await new Promise(r => setTimeout(r, l.delay - (lines[lines.indexOf(l) - 1]?.delay || 0)));
    await typeLine(l.text, l.cls);
    body.scrollTop = body.scrollHeight;
  }
  // blinking cursor at end
  const cur = document.createElement('span');
  cur.className = 'cursor';
  body.appendChild(cur);
}

window.addEventListener('load', () => {
  setTimeout(runTerminal, 600);
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.stat-card, .skill-group, .timeline-item, .project-card, .cert-card, .contact-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navItems.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});
