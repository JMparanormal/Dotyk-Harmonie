const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const fadeElements = document.querySelectorAll('.fade-in');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');
const dateInput = document.getElementById('date');

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('menu-open', isOpen);
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach((element) => observer.observe(element));

if (dateInput) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${year}-${month}-${day}`;
}

if (bookingForm && formMessage) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const service = formData.get('service')?.toString().trim();
    const date = formData.get('date')?.toString().trim();
    const time = formData.get('time')?.toString().trim();
    const consent = document.getElementById('consent');

    if (!name || !email || !phone || !service || !date || !time || !consent?.checked) {
      formMessage.textContent = 'Prosím, vyplňte všetky povinné polia a potvrďte súhlas.';
      formMessage.className = 'form-message error';
      return;
    }

    formMessage.textContent = `Ďakujeme, ${name}. Vaša rezervácia na službu „${service}“ bola pripravená. Toto je ukážkový formulár – na reálne odosielanie ho treba napojiť na e-mail alebo backend.`;
    formMessage.className = 'form-message success';

    bookingForm.reset();

    if (dateInput) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      dateInput.min = `${year}-${month}-${day}`;
    }
  });
}

function openLightbox(item) {
  const title = item.dataset.title || 'Fotografia';
  const desc = item.dataset.desc || '';
  const image = item.style.backgroundImage;

  lightboxImage.style.backgroundImage = image;
  lightboxTitle.textContent = title;
  lightboxDesc.textContent = desc;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => openLightbox(item));
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    const clickedBackdrop = event.target.classList.contains('lightbox') || event.target.classList.contains('lightbox-backdrop');
    if (clickedBackdrop) closeLightbox();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});

