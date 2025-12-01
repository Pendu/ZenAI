/* ============================================
   ZenAI - Main JavaScript
   Handles navigation, animations, and interactions
   ============================================ */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initMobileMenu();
    initSessionSelector();
    initNewsletterForm();
});


/* ============================================
   Navigation - Scroll Effects
   ============================================ */
function initNavigation() {
    const nav = document.getElementById('nav');
    let lastScrollY = window.scrollY;
    
    // Add scrolled class to navigation when user scrolls down
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add 'scrolled' class when scrolled past threshold
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.getElementById('nav-links');
                navLinks.classList.remove('active');
                
                // Calculate offset for fixed navigation
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


/* ============================================
   Scroll-triggered Animations
   ============================================ */
function initScrollAnimations() {
    // Select all elements with animation class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Create Intersection Observer for efficient scroll detection
    const observerOptions = {
        root: null,              // Use viewport as root
        rootMargin: '0px',       // No margin
        threshold: 0.15          // Trigger when 15% visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add visible class when element enters viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation (performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each animated element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}


/* ============================================
   Mobile Menu Toggle
   ============================================ */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Toggle mobile menu visibility
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Toggle hamburger animation
        this.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Close menu on window resize (when switching to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}


/* ============================================
   Session Selector (Consultation)
   ============================================ */
function initSessionSelector() {
    const sessionOptions = document.querySelectorAll('input[name="session"]');
    const bookBtn = document.getElementById('book-btn');
    
    // Update button text based on selected session
    sessionOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Get the selected option's price
            const selectedOption = this.closest('.session-option');
            const sessionName = selectedOption.querySelector('.option-name').textContent;
            
            // Update button text (optional enhancement)
            if (this.value === 'discovery') {
                bookBtn.querySelector('span').textContent = 'Book Free Discovery Call';
            } else {
                bookBtn.querySelector('span').textContent = 'Choose Date & Time';
            }
        });
    });
}

/* ============================================
   Calendly Integration
   Opens Calendly popup based on selected session
   ============================================ */
function openCalendly(e) {
    e.preventDefault();
    
    // Get selected session type
    const selectedSession = document.querySelector('input[name="session"]:checked');
    const sessionType = selectedSession ? selectedSession.value : 'discovery';
    
    // ============================================
    // CONFIGURATION: Set your Calendly event URLs
    // Replace these with your actual Calendly event links
    // ============================================
    const calendlyUrls = {
        discovery: 'https://calendly.com/YOUR_USERNAME/discovery-call',
        standard: 'https://calendly.com/YOUR_USERNAME/deep-dive-session',
        package: 'https://calendly.com/YOUR_USERNAME/transformation-package'
    };
    
    const url = calendlyUrls[sessionType] || calendlyUrls.discovery;
    
    // Check if Calendly is loaded
    if (typeof Calendly !== 'undefined') {
        // Open Calendly popup widget
        Calendly.initPopupWidget({
            url: url,
            prefill: {},
            utm: {
                utmSource: 'website',
                utmMedium: 'consultation-section'
            }
        });
    } else {
        // Fallback: open in new tab if widget not loaded
        window.open(url, '_blank');
    }
    
    return false;
}

/* ============================================
   Stripe Payment Integration
   Handles bundle purchases via Stripe Checkout
   ============================================ */
function handleBundlePurchase(e) {
    e.preventDefault();
    
    // ============================================
    // CONFIGURATION: Stripe Payment Link
    // 
    // Option 1: Use Stripe Payment Links (easiest)
    // Create a payment link at https://dashboard.stripe.com/payment-links
    // Then replace the URL below with your payment link
    //
    // Option 2: Use Stripe Checkout (requires backend)
    // See setup instructions in README.md
    // ============================================
    
    const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID';
    
    // For demo purposes, show instructions
    // Remove this alert and uncomment the redirect when you have your payment link
    if (STRIPE_PAYMENT_LINK.includes('YOUR_PAYMENT_LINK_ID')) {
        showPaymentInstructions();
    } else {
        // Redirect to Stripe payment link
        window.location.href = STRIPE_PAYMENT_LINK;
    }
    
    return false;
}

/**
 * Show instructions for setting up payment
 * This is shown during development before Stripe is configured
 */
function showPaymentInstructions() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-content">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
            <h3>🎉 Almost There!</h3>
            <p>Your website is ready for payments. Here's how to set up Stripe:</p>
            <ol>
                <li>Create a free <a href="https://dashboard.stripe.com/register" target="_blank">Stripe account</a></li>
                <li>Go to <a href="https://dashboard.stripe.com/payment-links" target="_blank">Payment Links</a></li>
                <li>Create a new payment link for €97</li>
                <li>Copy the link and add it to <code>script.js</code></li>
            </ol>
            <p class="modal-note">Once configured, customers will be redirected to a secure Stripe checkout page.</p>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Got it!</button>
        </div>
    `;
    document.body.appendChild(modal);
}


/* ============================================
   Newsletter Form
   Handles form submission with Formspree integration
   ============================================ */
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get email input
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        // Simple email validation
        if (!isValidEmail(email)) {
            showFormFeedback(form, 'Please enter a valid email address.', 'error');
            return;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Subscribing...';
        
        // Check if Formspree is configured
        const formAction = form.getAttribute('action');
        const isFormspreeConfigured = formAction && !formAction.includes('YOUR_FORMSPREE_ID');
        
        if (isFormspreeConfigured) {
            // Submit to Formspree
            try {
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    emailInput.value = '';
                    showFormFeedback(form, 'Thank you! You\'re now subscribed to our newsletter.', 'success');
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showFormFeedback(form, 'Oops! Something went wrong. Please try again.', 'error');
            }
        } else {
            // Demo mode - show success after delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            emailInput.value = '';
            showFormFeedback(form, '✨ Demo mode: In production, this will save to your email list!', 'success');
        }
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = originalText;
    });
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show feedback message below form
 * @param {HTMLElement} form - The form element
 * @param {string} message - Message to display
 * @param {string} type - 'success' or 'error'
 */
function showFormFeedback(form, message, type) {
    // Remove existing feedback
    const existingFeedback = form.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback form-feedback-${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-size: 0.875rem;
        background: ${type === 'success' ? 'rgba(92, 138, 92, 0.1)' : 'rgba(184, 92, 92, 0.1)'};
        color: ${type === 'success' ? '#5C8A5C' : '#B85C5C'};
        border: 1px solid ${type === 'success' ? 'rgba(92, 138, 92, 0.2)' : 'rgba(184, 92, 92, 0.2)'};
    `;
    
    // Append to form
    form.appendChild(feedback);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transition = 'opacity 0.3s ease';
        setTimeout(() => feedback.remove(), 300);
    }, 5000);
}


/* ============================================
   Utility Functions
   ============================================ */

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
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

/**
 * Throttle function to limit execution to once per interval
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


/* ============================================
   Optional: Parallax Effect for Hero
   ============================================ */
(function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    // Only run on desktop for performance
    if (window.innerWidth <= 768) return;
    
    // Subtle parallax on mouse move
    document.addEventListener('mousemove', throttle((e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    }, 50));
})();

