'use strict';

const CONTACT_EMAIL = 'rivets.bright_84@icloud.com';

/* ---------- rok w stopce ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- animacja wjazdu sekcji ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* ---------- język ---------- */
I18N.init();

/* ---------- formularz kontaktowy ---------- */
document.getElementById('contactForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(`${I18N.t('mail.subject')} — ${name}`);
  const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
