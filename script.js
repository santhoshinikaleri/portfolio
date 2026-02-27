/* ========================================
   PREMIUM PORTFOLIO - INTERACTIVE FEATURES
   ======================================== */

// ===== DARK MODE TOGGLE =====
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.html = document.documentElement;
    this.currentTheme = localStorage.getItem('theme') || 'light';
    
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  applyTheme(theme) {
    if (theme === 'dark') {
      this.html.setAttribute('data-theme', 'dark');
      this.themeToggle.textContent = '☀️';
    } else {
      this.html.removeAttribute('data-theme');
      this.themeToggle.textContent = '🌙';
    }
  }
}

// ===== NAVBAR ACTIVE LINK MANAGER =====
class NavbarManager {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navLinksContainer = document.querySelector('.nav-links');
    this.sections = document.querySelectorAll('section[id]');
    
    this.init();
  }

  init() {
    this.menuToggle.addEventListener('click', () => this.toggleMenu());
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    window.addEventListener('scroll', () => {
      this.handleScroll();
      this.updateActiveLink();
    });
  }

  toggleMenu() {
    this.navLinksContainer.classList.toggle('active');
    this.menuToggle.classList.toggle('active');
  }

  closeMenu() {
    this.navLinksContainer.classList.remove('active');
    this.menuToggle.classList.remove('active');
  }

  handleScroll() {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
      this.navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
      this.navbar.style.boxShadow = 'var(--shadow-md)';
    }
  }

  updateActiveLink() {
    let current = '';
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  }
}

// ===== SCROLL REVEAL ANIMATIONS =====
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('[data-reveal]');
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    this.elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }
}

// ===== BACK TO TOP BUTTON =====
class BackToTopButton {
  constructor() {
    this.button = this.createButton();
    document.body.appendChild(this.button);
    
    this.init();
  }

  createButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    return button;
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  handleScroll() {
    if (window.scrollY > 300) {
      this.button.classList.add('show');
    } else {
      this.button.classList.remove('show');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// ===== TYPING EFFECT FOR HERO SECTION - ENHANCED ===== 
class TypingEffect {
  constructor() {
    this.typingElement = document.querySelector('.typing-text');
    this.subtitleElement = document.querySelector('.hero-subtitle');
    this.titles = [
      'Full-Stack Developer',
      'React Specialist',
      'AI Enthusiast',
      'Problem Solver',
      'Web Developer'
    ];
    this.currentIndex = 0;
    this.isDeleting = false;
    this.typingSpeed = 60;
    this.deletingSpeed = 40;
    this.pauseTime = 2500;
    
    if (this.typingElement) {
      this.init();
    }
  }

  init() {
    this.typeText();
  }

  typeText() {
    const currentTitle = this.titles[this.currentIndex];
    const displayText = this.typingElement.textContent.slice(0, -1); // Remove cursor
    const fullText = currentTitle;

    if (!this.isDeleting) {
      // Typing
      if (displayText.length < fullText.length) {
        this.typingElement.textContent = fullText.slice(0, displayText.length + 1) + '|';
        setTimeout(() => this.typeText(), this.typingSpeed);
      } else {
        // Pause before deleting
        setTimeout(() => {
          this.isDeleting = true;
          this.typeText();
        }, this.pauseTime);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        this.typingElement.textContent = fullText.slice(0, displayText.length - 1) + '|';
        setTimeout(() => this.typeText(), this.deletingSpeed);
      } else {
        // Move to next title
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.titles.length;
        setTimeout(() => this.typeText(), 500);
      }
    }
  }
}

// ===== CONTACT FORM HANDLER =====
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.nameInput = document.getElementById('name');
    this.emailInput = document.getElementById('email');
    this.subjectInput = document.getElementById('subject');
    this.messageInput = document.getElementById('message');
    this.formMessage = document.getElementById('formMessage');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    
    // Configuration
    this.apiEndpoint = 'http://localhost:5000/api/contact/send';
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.form.addEventListener('input', () => this.clearErrors());
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.validate()) {
      this.submitForm();
    }
  }

  validate() {
    let isValid = true;

    // Name validation
    if (this.nameInput.value.trim().length < 2) {
      this.showError('name', 'Please enter a valid name');
      isValid = false;
    }

    // Email validation
    if (!this.isValidEmail(this.emailInput.value)) {
      this.showError('email', 'Please enter a valid email address');
      isValid = false;
    }

    // Subject validation
    if (this.subjectInput.value.trim().length < 5) {
      this.showError('subject', 'Subject must be at least 5 characters');
      isValid = false;
    }

    // Message validation
    if (this.messageInput.value.trim().length < 10) {
      this.showError('message', 'Message must be at least 10 characters');
      isValid = false;
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    field.parentElement.parentElement.classList.add('error');
    errorElement.textContent = message;
  }

  clearErrors() {
    const errorFields = this.form.querySelectorAll('.form-group.error');
    errorFields.forEach(field => {
      field.classList.remove('error');
      const errorElement = field.querySelector('.error-message');
      if (errorElement) errorElement.textContent = '';
    });
  }

  async submitForm() {
    const originalButtonText = this.submitButton.innerHTML;
    
    try {
      // Disable button and show loading state
      this.submitButton.disabled = true;
      this.submitButton.innerHTML = '<span>Sending...</span><i data-lucide="loader" class="icon"></i>';
      this.clearFormMessage();

      // Prepare form data
      const formData = {
        name: this.nameInput.value.trim(),
        email: this.emailInput.value.trim(),
        subject: this.subjectInput.value.trim(),
        message: this.messageInput.value.trim()
      };

      console.log('📤 Sending contact form data:', formData);

      // Send request to backend
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Parse response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      console.log('✅ Success response:', data);
      
      // Show success message
      this.showSuccessMessage(data.message || 'Message sent successfully! I\'ll get back to you soon.');
      
      // Reset form
      this.form.reset();

    } catch (error) {
      console.error('❌ Error sending contact form:', error);
      this.showErrorMessage(error.message || 'Failed to send message. Please try again.');
    } finally {
      // Re-enable button and restore original text
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = originalButtonText;
    }
  }

  showSuccessMessage(message) {
    this.formMessage.textContent = '✓ ' + message;
    this.formMessage.className = 'form-message success';
    
    setTimeout(() => {
      this.formMessage.className = 'form-message';
      this.formMessage.textContent = '';
    }, 5000);
  }

  showErrorMessage(message) {
    this.formMessage.textContent = '✗ ' + message;
    this.formMessage.className = 'form-message error';
    
    setTimeout(() => {
      this.formMessage.className = 'form-message';
      this.formMessage.textContent = '';
    }, 5000);
  }

  clearFormMessage() {
    this.formMessage.className = 'form-message';
    this.formMessage.textContent = '';
  }
}

// ===== SMOOTH SCROLL FOR LINKS =====
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    if (href === '#') {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    
    target.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

// ===== PROJECT CARD INTERACTION =====
class ProjectCards {
  constructor() {
    this.cards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }
}

// ===== MOBILE EVENT HANDLER ===== 
class MobileOptimization {
  constructor() {
    this.isMobile = this.detectMobile();
    this.isTablet = this.detectTablet();
    this.init();
  }

  detectMobile() {
    return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  detectTablet() {
    return /iPad/i.test(navigator.userAgent) || (this.detectMobile() && window.innerWidth > 600);
  }

  init() {
    if (this.isMobile) {
      this.optimizeForMobile();
    }
    
    // Add touch event listeners
    this.addTouchSupport();
    
    // Handle viewport changes
    window.addEventListener('orientationchange', () => this.handleOrientationChange());
    window.addEventListener('resize', () => this.handleResize());
  }

  optimizeForMobile() {
    document.documentElement.classList.add('is-mobile');
    
    // Disable hover effects on mobile
    const style = document.createElement('style');
    style.textContent = `
      @media (hover: none) and (pointer: coarse) {
        .project-card:hover,
        .skill-card:hover,
        .timeline-item:hover {
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  addTouchSupport() {
    // Add touch feedback to buttons
    document.querySelectorAll('button, a[role="button"], .btn-gradient').forEach(element => {
      element.addEventListener('touchstart', () => {
        element.style.opacity = '0.9';
      });
      
      element.addEventListener('touchend', () => {
        element.style.opacity = '1';
      });
    });
  }

  handleOrientationChange() {
    // Close mobile menu on orientation change
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  }

  handleResize() {
    // Recalculate touch target sizes on resize
    const width = window.innerWidth;
    
    if (width > 768) {
      // Hide mobile menu on desktop
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
      }
    }
  }
}

// ===== VIEWPORT HEIGHT FIX (FOR MOBILE BROWSERS) =====
function fixViewportHeight() {
  const updateHeight = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  
  updateHeight();
  window.addEventListener('resize', updateHeight);
  window.addEventListener('orientationchange', updateHeight);
}

// ===== INITIALIZE ALL ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  fixViewportHeight();
  new MobileOptimization();
  new ThemeManager();
  new NavbarManager();
  new BackToTopButton();
  new TypingEffect();
  new ContactForm();
  new SmoothScroll();
  new ProjectCards();
  
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
  
  // Add reveal attribute to elements for scroll animations
  const revealElements = [
    '.project-card',
    '.experience-item',
    '.skill-category',
    '.contact-item'
  ];
  
  revealElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.setAttribute('data-reveal', 'true');
    });
  });
  
  // Initialize scroll reveal
  new ScrollReveal();
  
  // ===== JOURNEY SECTION ANIMATIONS =====
  // Timeline block and education card scroll animations
  initializeJourneyAnimations();
  
  // Log initialization
  console.log('🎨 Premium Portfolio loaded successfully!');
});

// ===== JOURNEY ANIMATIONS ===== 
function initializeJourneyAnimations() {
  // Intersection Observer for timeline blocks and education cards
  const timelineBlocks = document.querySelectorAll('.timeline-block');
  const educationCards = document.querySelectorAll('.floating-education-card');
  const projectCards = document.querySelectorAll('.premium-project-card');
  const achievementCards = document.querySelectorAll('.premium-achievement-card');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = getAnimationName(entry.target) + ' 0.8s ease forwards';
        elementObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Animate timeline blocks
  timelineBlocks.forEach((block, index) => {
    const delay = 0.3 + (index * 0.2);
    block.style.animationDelay = delay + 's';
    elementObserver.observe(block);
  });
  
  // Animate education cards with floating effect
  educationCards.forEach((card, index) => {
    const delay = 0.4 + (index * 0.2);
    card.style.animationDelay = delay + 's';
    elementObserver.observe(card);
    
    // Add floating animation on hover
    card.addEventListener('mouseenter', () => {
      card.style.animation = 'none';
      setTimeout(() => {
        card.style.animation = '';
      }, 10);
    });
  });

  // Animate premium project cards
  projectCards.forEach((card, index) => {
    const delay = 0.1 + (index * 0.2);
    card.style.animationDelay = delay + 's';
    elementObserver.observe(card);
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', () => {
      const techPills = card.querySelectorAll('.floating-tech-pill');
      techPills.forEach((pill, pillIndex) => {
        pill.style.animation = 'none';
        setTimeout(() => {
          pill.style.transform = `translateY(-${(pillIndex + 1) * 4}px)`;
        }, 10);
      });
    });
    
    card.addEventListener('mouseleave', () => {
      const techPills = card.querySelectorAll('.floating-tech-pill');
      techPills.forEach((pill) => {
        pill.style.transform = 'translateY(0)';
      });
    });
  });

  // Animate premium achievement cards
  achievementCards.forEach((card, index) => {
    const delay = 0.1 + (index * 0.2);
    card.style.animationDelay = delay + 's';
    elementObserver.observe(card);
    
    // Pulse effect on hover
    card.addEventListener('mouseenter', () => {
      const iconRing = card.querySelector('.achievement-icon-ring');
      if (iconRing) {
        iconRing.style.animation = 'none';
        setTimeout(() => {
          iconRing.style.animation = 'iconBounce4 2.5s ease-in-out infinite';
        }, 10);
      }
    });
  });
  
  // Add parallax effect to floating shapes
  const floatingShapes = document.querySelectorAll('.floating-shape');
  if (floatingShapes.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      floatingShapes.forEach((shape, index) => {
        shape.style.transform = `translateY(${(scrollY * (0.3 + index * 0.1))}px)`;
      });
    });
  }
  
  // Interactive timeline node hover effect
  const timelineNodes = document.querySelectorAll('.timeline-node');
  timelineNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      node.style.transform = 'translateX(-50%) scale(1.2)';
      const pulse = node.querySelector('.node-pulse');
      if (pulse) {
        pulse.style.animation = 'nodePulseAnim 0.8s ease-out';
      }
    });
    
    node.addEventListener('mouseleave', () => {
      node.style.transform = 'translateX(-50%) scale(1)';
    });
  });
}

function getAnimationName(element) {
  if (element.classList.contains('timeline-block')) {
    return 'fadeInUp';
  } else if (element.classList.contains('floating-education-card')) {
    return 'floatingCard';
  } else if (element.classList.contains('premium-project-card')) {
    return 'projectCardEntry';
  } else if (element.classList.contains('premium-achievement-card')) {
    return 'achievementCardEntry';
  }
  return 'fadeInUp';
}

// ===== ENHANCED CARD HOVER EFFECTS =====
function initializeCardHoverEffects() {
  const experienceCards = document.querySelectorAll('.experience-journey-card');
  const educationCards = document.querySelectorAll('.floating-education-card');
  
  // Experience card tilt effect
  experienceCards.forEach(card => {
    const parent = card.closest('.timeline-block');
    if (!parent) return;
    
    parent.addEventListener('mousemove', (e) => {
      const rect = parent.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const tiltX = (y - 0.5) * 5;
      const tiltY = (x - 0.5) * -5;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    parent.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
  
  // Education card enhanced hover
  educationCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const glowX = x * 100;
      const glowY = y * 100;
      
      const glowEffect = card.querySelector('.glass-glow');
      if (glowEffect) {
        glowEffect.style.left = glowX + 'px';
        glowEffect.style.top = glowY + 'px';
      }
    });
  });
}

// Initialize enhanced effects when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCardHoverEffects);
} else {
  initializeCardHoverEffects();
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images if they were added
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// Handle visibility change to pause animations
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden, pause animations if needed
  } else {
    // Page is visible, resume animations
  }
});
