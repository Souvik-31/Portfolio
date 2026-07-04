document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOUSE GLOW EFFECT (CARD & BACKGROUND)
    // ==========================================================================
    const cursorGlow = document.getElementById('cursor-glow');
    const glassCards = document.querySelectorAll('.glass-card');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Update global background glow
        document.documentElement.style.setProperty('--glow-x', `${x}px`);
        document.documentElement.style.setProperty('--glow-y', `${y}px`);
    });

    // Individual card hover glow coordinates relative to the card
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cardX = e.clientX - rect.left;
            const cardY = e.clientY - rect.top;
            
            card.style.setProperty('--glow-x', `${cardX}px`);
            card.style.setProperty('--glow-y', `${cardY}px`);
        });
    });

    // ==========================================================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // ==========================================================================
    // SCROLL ACTIONS (HEADER GLOW & SCROLLSPY)
    // ==========================================================================
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header scroll styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Scrollspy
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust buffer offset for sticky navbar
            if (window.scrollY >= (sectionTop - 120)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // DYNAMIC TYPING ANIMATION
    // ==========================================================================
    const typingText = document.getElementById('typing-text');
    const roles = [
        "Software Developer",
        "Deep Learning Researcher",
        "GenAI Enthusiast",
        "Competitive Programmer"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove character
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50; // Deletes faster
        } else {
            // Add character
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 120; // Typing speed
        }

        // Handle word completion states
        if (!isDeleting && charIndex === currentRole.length) {
            typeDelay = 2000; // Pause at end of role
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeDelay = 500; // Pause before typing next word
        }

        setTimeout(type, typeDelay);
    }

    // Initialize typing
    if (typingText) {
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // INTERSECTION OBSERVER REVEAL ANIMATIONS
    // ==========================================================================
    const scrollRevealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Unobserve after revealing once
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, scrollRevealOptions);

    // Apply fade/slide class to elements
    const elementsToReveal = [
        ...document.querySelectorAll('.glass-card'),
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.skills-flex-container')
    ];

    // Inject initial fade states into styles programmatically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .glass-card, .section-title, .timeline-item, .skills-flex-container {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .timeline-item {
            transform: translateX(-30px);
        }
        .glass-card.revealed, .section-title.revealed, .timeline-item.revealed, .skills-flex-container.revealed {
            opacity: 1;
            transform: translate(0);
        }
    `;
    document.head.appendChild(styleSheet);

    elementsToReveal.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // CONTACT FORM INTERACTION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Mock submission for presentation
            e.preventDefault();
            
            const submitBtn = document.getElementById('form-submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✔';
                submitBtn.style.background = 'linear-gradient(135deg, #00f0ff 0%, #00ff88 100%)';
                formStatus.style.color = '#00ff88';
                formStatus.textContent = 'Thank you! Your message was sent successfully. (Demonstration Mode)';
                
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    formStatus.textContent = '';
                }, 5000);
            }, 1500);
        });
    }
});
