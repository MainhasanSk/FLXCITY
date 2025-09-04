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

// Navigation active state
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

    // Update desktop nav
    document.querySelectorAll('.nav-center a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Update mobile nav
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
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

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// FORMSPREE FORM SUBMISSION - Updated Code
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    if (form) {
        // Create status message element
        const statusDiv = document.createElement('div');
        statusDiv.className = 'form-status';
        statusDiv.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 5px;
            font-weight: 500;
            text-align: center;
            display: none;
        `;
        form.appendChild(statusDiv);

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            statusDiv.style.display = 'none';
            
            // Submit to Formspree
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    statusDiv.textContent = 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.';
                    statusDiv.style.backgroundColor = '#d4edda';
                    statusDiv.style.color = '#155724';
                    statusDiv.style.border = '1px solid #c3e6cb';
                    statusDiv.style.display = 'block';
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusDiv.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
                statusDiv.style.backgroundColor = '#f8d7da';
                statusDiv.style.color = '#721c24';
                statusDiv.style.border = '1px solid #f5c6cb';
                statusDiv.style.display = 'block';
            })
            .finally(() => {
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
        });
    }
});

// Button click tracking
document.querySelectorAll('.whatsapp-btn, .floating-whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
    });
});

document.querySelectorAll('.call-btn, .floating-call-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('Call button clicked');
    });
});
