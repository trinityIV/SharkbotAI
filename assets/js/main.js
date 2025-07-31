// 🦈 Shark Bot Website - Main JavaScript
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initGlassEffects();
    initSharkCursor();
    initAOS();
    initSmoothScroll();
    initMobileMenu();
    initParallax();
    
    console.log('🦈 Shark Bot Website Loaded Successfully!');
});

// Navigation Effects
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Glass Effects Enhancement
function initGlassEffects() {
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        // Add interactive glass effect
        card.classList.add('glass-interactive');
        
        // Mouse move effect for glass cards
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Shark Cursor Effect
function initSharkCursor() {
    const sharkCursor = document.createElement('div');
    sharkCursor.className = 'shark-cursor';
    sharkCursor.innerHTML = '🦈';
    document.body.appendChild(sharkCursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor following
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        sharkCursor.style.left = cursorX + 'px';
        sharkCursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Show shark cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .feature-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            sharkCursor.classList.add('active');
            document.body.style.cursor = 'none';
        });
        
        element.addEventListener('mouseleave', () => {
            sharkCursor.classList.remove('active');
            document.body.style.cursor = 'default';
        });
    });
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Shark Trail Effect
function createSharkTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'shark-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
}

// Add shark trail on mouse move (throttled)
let trailTimeout;
document.addEventListener('mousemove', (e) => {
    if (!trailTimeout) {
        trailTimeout = setTimeout(() => {
            createSharkTrail(e.clientX, e.clientY);
            trailTimeout = null;
        }, 100);
    }
});

// Loading Animation
function showLoadingShark() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
        <div class="loading-content">
            <div class="loading-shark">🦈</div>
            <p>Le requin charge...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }, 2000);
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all feature cards and command cards
    const animatedElements = document.querySelectorAll('.feature-card, .cmd-card, .step');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize intersection observer
document.addEventListener('DOMContentLoaded', initIntersectionObserver);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Press 'S' to trigger shark attack animation
    if (e.key.toLowerCase() === 's') {
        const sharkLarge = document.querySelector('.shark-large');
        if (sharkLarge) {
            sharkLarge.classList.add('shark-attack');
            setTimeout(() => {
                sharkLarge.classList.remove('shark-attack');
            }, 800);
        }
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor frame rate
    let lastTime = performance.now();
    let frameCount = 0;
    
    function checkFrameRate() {
        const currentTime = performance.now();
        frameCount++;
        
        if (currentTime - lastTime >= 1000) {
            const fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
            
            // If FPS is too low, reduce animations
            if (fps < 30) {
                document.body.classList.add('low-performance');
            } else {
                document.body.classList.remove('low-performance');
            }
        }
        
        requestAnimationFrame(checkFrameRate);
    }
    
    checkFrameRate();
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Easter Eggs
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate shark feeding frenzy
        const sharks = document.querySelectorAll('.shark');
        sharks.forEach((shark, index) => {
            setTimeout(() => {
                shark.classList.add('shark-feeding');
            }, index * 200);
        });
        
        // Show easter egg message
        const message = document.createElement('div');
        message.className = 'easter-egg-message';
        message.innerHTML = '🦈 SHARK FEEDING FRENZY ACTIVATED! 🦈';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(78, 205, 196, 0.9);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 10000;
            animation: fadeInOut 3s ease-in-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            sharks.forEach(shark => {
                shark.classList.remove('shark-feeding');
            });
        }, 5000);
        
        konamiCode = [];
    }
});

// CSS Animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .low-performance .shark,
    .low-performance .wave,
    .low-performance .bubble {
        animation-duration: 20s !important;
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 22, 40, 0.95);
        backdrop-filter: blur(20px);
        padding: 2rem;
        border-radius: 0 0 20px 20px;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Export functions for external use
window.SharkBot = {
    showLoadingShark,
    createSharkTrail,
    initGlassEffects,
    initSharkCursor
};
