// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
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
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
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

window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
}, { passive: true });

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navbar Background Change on Scroll (fixed for dark theme)
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}, { passive: true });

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
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
}, { passive: true });

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-progress');
const animatedSkills = new Set();

const animateSkills = () => {
    skillBars.forEach(bar => {
        if (animatedSkills.has(bar)) return;

        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (barPosition < screenPosition) {
            const width = bar.getAttribute('data-width') || bar.style.width;
            bar.setAttribute('data-width', width);
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            
            animatedSkills.add(bar);
        }
    });
};

window.addEventListener('scroll', animateSkills, { passive: true });
window.addEventListener('load', animateSkills);

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

const animatedElements = document.querySelectorAll('.project-card, .education-card, .skill-category, .timeline-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== PROFILE PICTURE FLOATING PARTICLES =====
const createParticles = () => {
    const profilePic = document.querySelector('.profile-pic');
    if (!profilePic) return;

    // Get the parent (wrapper if it exists, otherwise the profile pic's parent)
    const wrapper = document.querySelector('.profile-pic-wrapper') || profilePic.parentElement;
    
    // Make sure the wrapper has relative positioning for particle placement
    wrapper.style.position = 'relative';

    const particleCount = 8;
    const colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#a29bfe', '#55efc4'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');

        // Random size between 4px and 10px
        const size = Math.random() * 6 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random color from palette
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random starting position around the profile pic
        const angle = (Math.PI * 2 * i) / particleCount;
        const radius = 100 + Math.random() * 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        particle.style.cssText += `
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: 3;
            top: 50%;
            left: 50%;
            margin-top: ${y}px;
            margin-left: ${x}px;
            opacity: 0;
            animation: particleOrbit${i % 3} ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite;
        `;

        wrapper.appendChild(particle);
    }

    // Inject particle keyframe animations dynamically
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleOrbit0 {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0;
                }
                10% { opacity: 0.8; }
                50% {
                    transform: translate(${20 + Math.random() * 20}px, ${-30 - Math.random() * 30}px) scale(1.3);
                    opacity: 1;
                }
                90% { opacity: 0.6; }
            }
            @keyframes particleOrbit1 {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0;
                }
                15% { opacity: 0.7; }
                50% {
                    transform: translate(${-25 - Math.random() * 15}px, ${-40 - Math.random() * 20}px) scale(0.8);
                    opacity: 0.9;
                }
                85% { opacity: 0.5; }
            }
            @keyframes particleOrbit2 {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0;
                }
                20% { opacity: 0.6; }
                50% {
                    transform: translate(${15 + Math.random() * 25}px, ${20 + Math.random() * 20}px) scale(1.5);
                    opacity: 1;
                }
                80% { opacity: 0.4; }
            }

            .floating-particle {
                filter: blur(1px);
                box-shadow: 0 0 6px currentColor;
            }
        `;
        document.head.appendChild(style);
    }
};

// ===== PROFILE PICTURE TILT ON MOUSE MOVE =====
const initProfileTilt = () => {
    const profilePic = document.querySelector('.profile-pic');
    if (!profilePic) return;

    const wrapper = document.querySelector('.profile-pic-wrapper') || profilePic;

    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        profilePic.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.05)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        profilePic.style.transform = '';
    });
};

// ===== PROFILE PICTURE RIPPLE ON CLICK =====
const initProfileRipple = () => {
    const profilePic = document.querySelector('.profile-pic');
    if (!profilePic) return;

    profilePic.addEventListener('click', (e) => {
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            border: 2px solid rgba(108, 92, 231, 0.6);
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 10;
            pointer-events: none;
            animation: profileRipple 1s ease-out forwards;
        `;

        const parent = profilePic.parentElement;
        parent.style.position = 'relative';
        parent.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 1000);
    });

    // Inject ripple keyframes
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes profileRipple {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scale(1.8);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// ===== PARALLAX EFFECT ON PROFILE PICTURE =====
const initProfileParallax = () => {
    const profilePic = document.querySelector('.profile-pic');
    const homeSection = document.querySelector('.home-section');
    if (!profilePic || !homeSection) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;

        // Only apply parallax when home section is visible
        if (scrolled < homeBottom) {
            const parallaxOffset = scrolled * 0.15;
            const wrapper = document.querySelector('.profile-pic-wrapper');
            if (wrapper) {
                wrapper.style.transform = `translateY(${parallaxOffset}px)`;
            }
        }
    }, { passive: true });
};

// ===== INITIALIZE ALL PROFILE ANIMATIONS =====
window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initProfileTilt();
    initProfileRipple();
    initProfileParallax();
});

// Typing Effect for Home Section
const typingText = document.querySelector('.home-content h2');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.borderRight = '2px solid var(--secondary)';
    typingText.style.display = 'inline-block';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Blinking cursor effect after typing is done
            let cursorVisible = true;
            setInterval(() => {
                typingText.style.borderRight = cursorVisible 
                    ? '2px solid transparent' 
                    : '2px solid var(--secondary)';
                cursorVisible = !cursorVisible;
            }, 500);
        }
    };

    setTimeout(typeWriter, 1000);
}

// Console Welcome Message
console.log('%c👋 Welcome to my resume!', 'color: #6c5ce7; font-size: 20px; font-weight: bold;');
console.log('%c💼 Interested in working together? Let\'s connect!', 'color: #00cec9; font-size: 14px;');