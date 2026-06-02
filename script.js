document.addEventListener('DOMContentLoaded', () => {

  // --- Dynamic Typing Effect ---
  const typingElement = document.getElementById('typing-text');
  const words = [
    "BCA Generative AI Student",
    "Speech Assistant Developer",
    "IoT & Embedded Tinkerer",
    "SRMIST Tech Innovator"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at complete word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  if (typingElement) {
    type();
  }


  // --- Mobile Navigation Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
      });
    });
  }


  // --- Navbar Scroll Styles ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // --- Intersection Observer for Active Link Tracking ---
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });


  // --- Projects Category Filtering ---
  const filterButtons = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card-minimal');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // --- Contact Form Submission ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showStatus('Please fill in all fields before sending.', 'error');
        return;
      }

      showStatus('Sending message...', 'info');

      setTimeout(() => {
        showStatus('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      }, 1500);
    });
  }

  function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = 'status-box-minimal'; // clear class list
    
    if (type === 'success') {
      formStatus.classList.add('success');
    } else if (type === 'error') {
      formStatus.classList.add('error');
    } else {
      // Info style
      formStatus.style.display = 'block';
      formStatus.style.background = 'rgba(255, 255, 255, 0.04)';
      formStatus.style.border = '1px solid var(--border-color)';
      formStatus.style.color = 'var(--color-text-sub)';
    }
  }

});
