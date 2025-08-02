// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const navbar = document.querySelector('.navbar');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeMobileMenu();
    initializeNavbarScroll();
    initializeFormValidation();
    initializeSmoothScrolling();
    initializeCounterAnimations();
    initializeParallax();
});

// Initialize AOS (Animate On Scroll) library
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
            disable: window.innerWidth < 768 ? true : false
        });
    }
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !navMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Navbar scroll effect
function initializeNavbarScroll() {
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation
function initializeFormValidation() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            clearFormErrors();
            
            // Validate form
            if (validateForm()) {
                submitForm();
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Form validation functions
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const company = document.getElementById('company');
    const phone = document.getElementById('phone');
    
    let isValid = true;
    
    // Validate name
    if (!name.value.trim()) {
        showFieldError(name, 'Nome é obrigatório');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showFieldError(name, 'Nome deve ter pelo menos 2 caracteres');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showFieldError(email, 'Email é obrigatório');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Email inválido');
        isValid = false;
    }
    
    // Validate company
    if (!company.value.trim()) {
        showFieldError(company, 'Empresa é obrigatória');
        isValid = false;
    }
    
    // Validate phone
    if (!phone.value.trim()) {
        showFieldError(phone, 'Telefone é obrigatório');
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        showFieldError(phone, 'Telefone inválido');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    switch(field.id) {
        case 'name':
            if (!value) {
                showFieldError(field, 'Nome é obrigatório');
                return false;
            } else if (value.length < 2) {
                showFieldError(field, 'Nome deve ter pelo menos 2 caracteres');
                return false;
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(field, 'Email é obrigatório');
                return false;
            } else if (!isValidEmail(value)) {
                showFieldError(field, 'Email inválido');
                return false;
            }
            break;
            
        case 'company':
            if (!value) {
                showFieldError(field, 'Empresa é obrigatória');
                return false;
            }
            break;
            
        case 'phone':
            if (!value) {
                showFieldError(field, 'Telefone é obrigatório');
                return false;
            } else if (!isValidPhone(value)) {
                showFieldError(field, 'Telefone inválido');
                return false;
            }
            break;
    }
    
    showFieldSuccess(field);
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    errorElement.textContent = message;
}

function showFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    formGroup.classList.remove('error', 'success');
    errorElement.textContent = '';
}

function clearFormErrors() {
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorElement = group.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Brazilian phone number validation (10 or 11 digits)
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

// Form submission
function submitForm() {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.btn-text');
    const buttonLoading = submitButton.querySelector('.btn-loading');
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        clearFormErrors();
        
        // Hide loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        
        // Show success modal
        showModal();
        
        // Track conversion (for analytics)
        trackConversion();
        
    }, 2000);
}

// Modal functions
function showModal() {
    if (successModal) {
        successModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Auto close after 5 seconds
        setTimeout(() => {
            closeModal();
        }, 5000);
    }
}

function closeModal() {
    if (successModal) {
        successModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Global functions for button clicks
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function playDemo() {
    // Simulate demo video/modal (replace with actual demo implementation)
    alert('Demo em breve! Entre em contato para uma demonstração personalizada.');
}

// Counter animations for statistics
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[\d,]+/, '');
    const prefix = text.substring(0, text.indexOf(number.toString()));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        const formattedNumber = Math.floor(current).toLocaleString('pt-BR');
        element.textContent = prefix + formattedNumber + suffix;
    }, 16);
}

// Parallax effect for hero section
function initializeParallax() {
    const hero = document.querySelector('.hero');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            floatingCards.forEach((card, index) => {
                const speed = 0.5 + (index * 0.1);
                card.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Intersection Observer for navbar active states
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current nav link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize active navigation
document.addEventListener('DOMContentLoaded', function() {
    initializeActiveNavigation();
});

// Performance optimization: Debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Analytics tracking
function trackConversion() {
    // Google Analytics tracking (replace with your tracking ID)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
            'event_category': 'Lead',
            'event_label': 'Contact Form Submission'
        });
    }
    
    // Facebook Pixel tracking (replace with your pixel ID)
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
    }
    
    console.log('Conversion tracked: Contact form submission');
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // You can send errors to your monitoring service here
});

// Page visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations or heavy processes
        console.log('Page hidden - pausing animations');
    } else {
        // Resume animations
        console.log('Page visible - resuming animations');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Close modal with Escape key
    if (event.key === 'Escape' && successModal && successModal.classList.contains('show')) {
        closeModal();
    }
    
    // Toggle mobile menu with Enter/Space on mobile menu button
    if ((event.key === 'Enter' || event.key === ' ') && event.target === mobileMenu) {
        event.preventDefault();
        mobileMenu.click();
    }
});

// Touch gestures for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(event) {
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up
            console.log('Swipe up detected');
        } else {
            // Swipe down
            console.log('Swipe down detected');
        }
    }
}

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadResources);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}