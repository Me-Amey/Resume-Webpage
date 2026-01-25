// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu on Enter or Space key
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (window.pageYOffset > 300) {
            scrollTopBtn?.classList.add('active');
        } else {
            scrollTopBtn?.classList.remove('active');
        }
    }, 100);
}, { passive: true });

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let navbarScrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(navbarScrollTimeout);
    navbarScrollTimeout = setTimeout(() => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = '#ffffff';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    }, 100);
}, { passive: true });

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
let activeNavTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(activeNavTimeout);
    activeNavTimeout = setTimeout(() => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100);
}, { passive: true });

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-progress');
const animatedSkills = new Set();

const animateSkills = () => {
    skillBars.forEach(bar => {
        // Skip if already animated
        if (animatedSkills.has(bar)) return;

        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (barPosition < screenPosition) {
            const width = bar.getAttribute('data-width') || bar.style.width;
            bar.setAttribute('data-width', width);
            bar.style.width = '0';
            
            // Trigger animation
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            
            // Mark as animated
            animatedSkills.add(bar);
        }
    });
};

window.addEventListener('scroll', animateSkills);

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.project-card, .education-card, .skill-category, .timeline-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Typing Effect for Home Section (Optional Enhancement)
const typingText = document.querySelector('.home-content h2');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 1000);
}

// Console Welcome Message
console.log('%c👋 Welcome to my resume!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%c💼 Interested in working together? Let\'s connect!', 'color: #10b981; font-size: 14px;');