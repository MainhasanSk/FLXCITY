// Mobile Menu Toggle Functionality
const mobileMenu = document.getElementById('mobileMenu');
const mobileNav = document.getElementById('mobileNav');

mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !mobileNav.contains(event.target)) {
        mobileMenu.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation active state management
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    // Update desktop navigation
    document.querySelectorAll('.nav-center a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Update mobile navigation
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply observer to all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Contact form submission handler
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !phone || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Simulate form submission (replace with actual form submission logic)
    alert('Thank you for your message! We will get back to you within 24 hours.');
    this.reset();
    
    // Here you would typically send the data to your server
    // Example:
    // fetch('/submit-form', {
    //     method: 'POST',
    //     body: formData
    // }).then(response => {
    //     // Handle response
    // });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Button click tracking and analytics
document.querySelectorAll('.whatsapp-btn, .floating-whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // Add analytics tracking here
        // gtag('event', 'click', { 'event_category': 'contact', 'event_label': 'whatsapp' });
    });
});

document.querySelectorAll('.call-btn, .floating-call-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('Call button clicked');
        // Add analytics tracking here
        // gtag('event', 'click', { 'event_category': 'contact', 'event_label': 'phone' });
    });
});

// CTA button tracking
document.querySelector('.cta-button').addEventListener('click', function() {
    console.log('CTA button clicked');
    // Add analytics tracking here
    // gtag('event', 'click', { 'event_category': 'cta', 'event_label': 'consultation' });
});

// Logo hover effect enhancement
document.querySelector('.logo').addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.02)';
});

document.querySelector('.logo').addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// Floating buttons visibility based on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const floatingButtons = document.querySelector('.bottom-floating-buttons');
    
    if (st > lastScrollTop) {
        // Scrolling down
        floatingButtons.style.transform = 'translateX(-50%) translateY(10px)';
        floatingButtons.style.opacity = '0.8';
    } else {
        // Scrolling up
        floatingButtons.style.transform = 'translateX(-50%) translateY(0)';
        floatingButtons.style.opacity = '1';
    }
    
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('FLXCITY website loaded successfully');
    
    // Add loading animation end
    document.body.style.opacity = '1';
    
    // Initialize any third-party plugins here
    // Example: AOS.init() for animate on scroll
});

// Keyboard navigation accessibility
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        mobileMenu.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Performance optimization - lazy load images if needed
// const lazyImages = document.querySelectorAll('img[data-src]');
// const imageObserver = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const img = entry.target;
//             img.src = img.dataset.src;
//             img.classList.remove('lazy');
//             observer.unobserve(img);
//         }
//     });
// });
// lazyImages.forEach(img => imageObserver.observe(img));
