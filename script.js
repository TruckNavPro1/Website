/**
 * TruckNavPro Landing Page - Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initCarousel();
  initFAQ();
  initEmailForm();
  initParallax();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.remove('active');
      }
    });
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all animatable elements
  const animateElements = document.querySelectorAll(
    '.section-badge, .section-title, .section-subtitle, ' +
    '.feature-card, .testimonial-card, .pricing-card, ' +
    '.problem-stat, .faq-item, .glass-card'
  );
  
  animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
    observer.observe(el);
  });
  
  // Add CSS for animated state
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Screenshots carousel
 */
function initCarousel() {
  const track = document.getElementById('screenshotsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  
  if (!track) return;
  
  const items = track.querySelectorAll('.screenshot-item');
  const itemCount = items.length;
  let currentIndex = 0;
  
  // Create dots
  items.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => scrollToIndex(i));
    dotsContainer.appendChild(dot);
  });
  
  const dots = dotsContainer.querySelectorAll('.dot');
  
  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  function scrollToIndex(index) {
    currentIndex = Math.max(0, Math.min(index, itemCount - 1));
    const item = items[currentIndex];
    const scrollLeft = item.offsetLeft - (track.offsetWidth - item.offsetWidth) / 2;
    track.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    updateDots();
  }
  
  prevBtn.addEventListener('click', () => {
    scrollToIndex(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    scrollToIndex(currentIndex + 1);
  });
  
  // Update dots on manual scroll
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollCenter = track.scrollLeft + track.offsetWidth / 2;
      items.forEach((item, i) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        if (Math.abs(scrollCenter - itemCenter) < item.offsetWidth / 2) {
          currentIndex = i;
          updateDots();
        }
      });
    }, 100);
  });
}

/**
 * FAQ accordion
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Email form submission
 */
function initEmailForm() {
  const form = document.getElementById('emailForm');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const input = form.querySelector('input[type="email"]');
    const email = input.value;
    
    if (email) {
      // Show success message
      const button = form.querySelector('button');
      const originalText = button.textContent;
      
      button.textContent = '✓ Request Sent!';
      button.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      
      // Reset after 3 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        input.value = '';
      }, 3000);
      
      // In production, send to backend
      console.log('Fleet pricing request for:', email);
    }
  });
}

/**
 * Parallax effects for orbs
 */
function initParallax() {
  const orbs = document.querySelectorAll('.gradient-orb');
  
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        orbs.forEach((orb, index) => {
          const speed = 0.1 + (index * 0.05);
          orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Video play button (placeholder - would connect to actual video)
 */
const playButton = document.getElementById('playButton');
if (playButton) {
  playButton.addEventListener('click', () => {
    // In production, replace with actual video player
    const placeholder = document.getElementById('videoPlaceholder');
    placeholder.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #0A1628;">
        <p style="color: #fff; font-size: 24px;">Video Player Would Load Here</p>
      </div>
    `;
  });
}

/**
 * Add typing effect to hero (optional enhancement)
 */
function initTypingEffect() {
  const taglines = [
    'Navigate Like a Pro.',
    'Never Hit a Low Bridge.',
    'Your Truck. Your Route.'
  ];
  
  let currentTagline = 0;
  const element = document.querySelector('.hero-subtitle');
  
  if (!element) return;
  
  // Could add typing animation here if desired
}

/**
 * Counter animation for stats
 */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number, .problem-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const match = text.match(/[\d.]+/);
        
        if (match) {
          const endValue = parseFloat(match[0]);
          const suffix = text.replace(match[0], '');
          const duration = 2000;
          const startTime = performance.now();
          
          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = endValue * easeProgress;
            
            if (text.includes('.')) {
              target.textContent = currentValue.toFixed(1) + suffix;
            } else if (text.includes('K') || text.includes('B')) {
              target.textContent = currentValue.toFixed(0) + suffix;
            } else {
              target.textContent = Math.floor(currentValue) + suffix;
            }
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }
          
          requestAnimationFrame(updateCounter);
        }
        
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// Initialize counter animation
animateCounters();

console.log('🚛 TruckNavPro landing page loaded successfully!');
