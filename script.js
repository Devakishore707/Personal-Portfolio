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


  // --- Timeline Scroll Reveal Animation ---
  const timelineCards = document.querySelectorAll('.timeline-card-wrap');
  const revealObserverOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, revealObserverOptions);

  timelineCards.forEach(card => {
    revealObserver.observe(card);
  });


  // --- Projects Slideshow Slider ---
  const slider = document.getElementById('projects-slider');
  const prevBtn = document.getElementById('prev-project');
  const nextBtn = document.getElementById('next-project');
  const dotsContainer = document.getElementById('slideshow-dots');
  const projectCards = document.querySelectorAll('.project-card-minimal');
  
  let currentSlide = 0;
  
  function getVisibleCards() {
    return Array.from(projectCards).filter(card => card.style.display !== 'none');
  }

  function updateSlider() {
    const visibleCards = getVisibleCards();
    if (visibleCards.length === 0) return;

    if (currentSlide >= visibleCards.length) currentSlide = visibleCards.length - 1;
    if (currentSlide < 0) currentSlide = 0;

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots(visibleCards.length);
  }

  function updateDots(totalVisible) {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalVisible; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (i === currentSlide) dot.classList.add('active');
      dot.setAttribute('data-slide', i);
      dot.addEventListener('click', () => {
        currentSlide = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      const visibleCards = getVisibleCards();
      if (currentSlide > 0) {
        currentSlide--;
      } else {
        currentSlide = visibleCards.length - 1;
      }
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      const visibleCards = getVisibleCards();
      if (currentSlide < visibleCards.length - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateSlider();
    });
  }

  // Initialize Slider on Load
  updateSlider();


  // --- Projects Category Filtering ---
  const filterButtons = document.querySelectorAll('.tab-btn');

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

      // Reset slide and update layout when filtered
      setTimeout(() => {
        currentSlide = 0;
        updateSlider();
      }, 350); // wait for card fade transitions to complete
    });
  });


  // --- Contact Form Submission & Google Form Integration ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal');

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

      // Build url-encoded payload for Google Forms
      const formData = new URLSearchParams();
      formData.append('entry.1946717949', name);
      formData.append('entry.2098257983', email);
      formData.append('entry.36432900', message);

      fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSc5ZCj1E1xiPo6cRD_BHk_I5PsQcu9MtViCDVFPtLVzBH8n7A/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      })
      .then(() => {
        // Clear status text
        formStatus.style.display = 'none';
        
        // Show modal popup
        if (successModal) {
          successModal.classList.add('visible');
        }
        
        // Reset form inputs
        contactForm.reset();
      })
      .catch((err) => {
        console.error(err);
        showStatus('Failed to send message. Please check connection and try again.', 'error');
      });
    });
  }

  // Handle Modal Closing
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('visible');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('visible');
      }
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
