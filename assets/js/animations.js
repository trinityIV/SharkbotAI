// 🦈 Shark Bot Advanced Animations - JavaScript
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    initAdvancedAnimations();
    initParticleSystem();
    initSharkSchool();
    initOceanEffects();
    initInteractiveElements();
    
    console.log('🦈 Advanced Animations Loaded!');
});

// Advanced Animations System
function initAdvancedAnimations() {
    createFloatingElements();
    initScrollAnimations();
    initHoverEffects();
    initClickEffects();
}

// Particle System
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -8;
        pointer-events: none;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `rgba(78, 205, 196, ${this.opacity})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, index) => {
            particles.slice(index + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(78, 205, 196, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Shark School Animation
function initSharkSchool() {
    const schoolContainer = document.createElement('div');
    schoolContainer.className = 'shark-school-container';
    schoolContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -6;
        pointer-events: none;
        overflow: hidden;
    `;
    document.body.appendChild(schoolContainer);
    
    // Create shark school
    const schoolSizes = [15, 20, 25]; // Different school sizes
    
    schoolSizes.forEach((size, index) => {
        setTimeout(() => {
            createSharkSchool(schoolContainer, size, index);
        }, index * 10000); // Stagger school appearances
    });
}

function createSharkSchool(container, schoolSize, schoolIndex) {
    const school = [];
    const startY = 20 + (schoolIndex * 30); // Different depths
    
    for (let i = 0; i < schoolSize; i++) {
        const shark = document.createElement('div');
        shark.innerHTML = '🦈';
        shark.style.cssText = `
            position: absolute;
            font-size: ${1.5 + Math.random() * 1}rem;
            opacity: 0.4;
            left: -100px;
            top: ${startY + Math.random() * 10}%;
            filter: drop-shadow(0 0 5px rgba(78, 205, 196, 0.3));
            animation: school-swim-${schoolIndex} ${20 + Math.random() * 10}s linear infinite;
            animation-delay: ${i * 0.2}s;
        `;
        
        container.appendChild(shark);
        school.push(shark);
    }
    
    // Add school animation CSS
    const schoolCSS = document.createElement('style');
    schoolCSS.textContent = `
        @keyframes school-swim-${schoolIndex} {
            0% {
                left: -100px;
                transform: translateY(0) rotate(0deg);
            }
            25% {
                transform: translateY(-${5 + Math.random() * 10}px) rotate(${Math.random() * 4 - 2}deg);
            }
            50% {
                transform: translateY(0) rotate(0deg);
            }
            75% {
                transform: translateY(${5 + Math.random() * 10}px) rotate(${Math.random() * 4 - 2}deg);
            }
            100% {
                left: 100vw;
                transform: translateY(0) rotate(0deg);
            }
        }
    `;
    document.head.appendChild(schoolCSS);
    
    // Clean up after animation
    setTimeout(() => {
        school.forEach(shark => shark.remove());
        schoolCSS.remove();
    }, 30000);
}

// Ocean Effects
function initOceanEffects() {
    createSeaweed();
    createJellyfish();
    createCoralReef();
}

function createSeaweed() {
    const seaweedContainer = document.createElement('div');
    seaweedContainer.className = 'seaweed-container';
    seaweedContainer.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 200px;
        z-index: -9;
        pointer-events: none;
    `;
    document.body.appendChild(seaweedContainer);
    
    // Create seaweed strands
    for (let i = 0; i < 10; i++) {
        const seaweed = document.createElement('div');
        seaweed.innerHTML = '🌿';
        seaweed.style.cssText = `
            position: absolute;
            bottom: 0;
            left: ${Math.random() * 100}%;
            font-size: ${2 + Math.random() * 2}rem;
            opacity: 0.3;
            animation: seaweed-sway ${3 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            transform-origin: bottom center;
        `;
        seaweedContainer.appendChild(seaweed);
    }
    
    // Seaweed animation
    const seaweedCSS = document.createElement('style');
    seaweedCSS.textContent = `
        @keyframes seaweed-sway {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
        }
    `;
    document.head.appendChild(seaweedCSS);
}

function createJellyfish() {
    const jellyfishContainer = document.createElement('div');
    jellyfishContainer.className = 'jellyfish-container';
    jellyfishContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -7;
        pointer-events: none;
    `;
    document.body.appendChild(jellyfishContainer);
    
    // Create jellyfish
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const jellyfish = document.createElement('div');
            jellyfish.innerHTML = '🪼';
            jellyfish.style.cssText = `
                position: absolute;
                top: ${Math.random() * 50}%;
                left: ${Math.random() * 100}%;
                font-size: 2rem;
                opacity: 0.6;
                animation: jellyfish-float ${8 + Math.random() * 4}s ease-in-out infinite;
                filter: drop-shadow(0 0 10px rgba(255, 192, 203, 0.3));
            `;
            jellyfishContainer.appendChild(jellyfish);
            
            // Remove after animation
            setTimeout(() => jellyfish.remove(), 15000);
        }, i * 5000);
    }
    
    // Jellyfish animation
    const jellyfishCSS = document.createElement('style');
    jellyfishCSS.textContent = `
        @keyframes jellyfish-float {
            0%, 100% { 
                transform: translateY(0) scale(1);
                opacity: 0.6;
            }
            25% { 
                transform: translateY(-20px) scale(1.1);
                opacity: 0.8;
            }
            50% { 
                transform: translateY(0) scale(1);
                opacity: 0.6;
            }
            75% { 
                transform: translateY(20px) scale(0.9);
                opacity: 0.4;
            }
        }
    `;
    document.head.appendChild(jellyfishCSS);
}

function createCoralReef() {
    const reefContainer = document.createElement('div');
    reefContainer.className = 'coral-reef';
    reefContainer.style.cssText = `
        position: fixed;
        bottom: 0;
        right: 0;
        width: 300px;
        height: 150px;
        z-index: -9;
        pointer-events: none;
        opacity: 0.3;
    `;
    
    const corals = ['🪸', '🐚', '⭐', '🐠'];
    for (let i = 0; i < 8; i++) {
        const coral = document.createElement('div');
        coral.innerHTML = corals[Math.floor(Math.random() * corals.length)];
        coral.style.cssText = `
            position: absolute;
            bottom: ${Math.random() * 100}px;
            right: ${Math.random() * 250}px;
            font-size: ${1 + Math.random() * 1.5}rem;
            animation: coral-glow ${4 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        reefContainer.appendChild(coral);
    }
    
    document.body.appendChild(reefContainer);
    
    // Coral animation
    const coralCSS = document.createElement('style');
    coralCSS.textContent = `
        @keyframes coral-glow {
            0%, 100% { 
                filter: brightness(1) drop-shadow(0 0 5px rgba(255, 105, 180, 0.3));
            }
            50% { 
                filter: brightness(1.3) drop-shadow(0 0 15px rgba(255, 105, 180, 0.6));
            }
        }
    `;
    document.head.appendChild(coralCSS);
}

// Floating Elements
function createFloatingElements() {
    const elements = ['💧', '🫧', '✨', '🌊'];
    
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            const element = document.createElement('div');
            element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
            element.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                font-size: ${0.8 + Math.random() * 1}rem;
                opacity: 0.6;
                z-index: -4;
                pointer-events: none;
                animation: float-up ${5 + Math.random() * 5}s linear forwards;
            `;
            
            document.body.appendChild(element);
            
            // Remove after animation
            setTimeout(() => element.remove(), 10000);
        }
    }, 2000);
    
    // Float up animation
    const floatCSS = document.createElement('style');
    floatCSS.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatCSS);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('feature-card')) {
                    animateFeatureCard(entry.target);
                } else if (entry.target.classList.contains('cmd-card')) {
                    animateCommandCard(entry.target);
                } else if (entry.target.classList.contains('step')) {
                    animateStep(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.feature-card, .cmd-card, .step, .hero-stats');
    animatedElements.forEach(el => observer.observe(el));
}

function animateFeatureCard(card) {
    const icon = card.querySelector('.feature-icon');
    if (icon) {
        icon.style.animation = 'bounce 0.6s ease-out 0.3s both';
    }
}

function animateCommandCard(card) {
    const commandName = card.querySelector('.cmd-name');
    if (commandName) {
        commandName.style.animation = 'glow 1s ease-out 0.2s both';
    }
}

function animateStep(step) {
    const stepNumber = step.querySelector('.step-number');
    if (stepNumber) {
        stepNumber.style.animation = 'pulse-grow 0.8s ease-out 0.4s both';
    }
}

// Hover Effects
function initHoverEffects() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createRippleEffect(card);
        });
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(78, 205, 196, 0.3);
        width: 20px;
        height: 20px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    // Ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const rippleCSS = document.createElement('style');
        rippleCSS.id = 'ripple-styles';
        rippleCSS.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleCSS);
    }
}

// Click Effects
function initClickEffects() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn, .glass-card, .feature-card')) {
            createClickExplosion(e.clientX, e.clientY);
        }
    });
}

function createClickExplosion(x, y) {
    const explosion = document.createElement('div');
    explosion.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, rgba(78, 205, 196, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        animation: click-explosion 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(explosion);
    
    setTimeout(() => explosion.remove(), 500);
    
    // Click explosion animation
    if (!document.querySelector('#click-explosion-styles')) {
        const explosionCSS = document.createElement('style');
        explosionCSS.id = 'click-explosion-styles';
        explosionCSS.textContent = `
            @keyframes click-explosion {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(10);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(explosionCSS);
    }
}

// Interactive Elements
function initInteractiveElements() {
    // Shark follows cursor in hero section
    const heroShark = document.querySelector('.shark-large');
    const heroSection = document.querySelector('.hero');
    
    if (heroShark && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 50;
            const rotateY = (x - centerX) / 50;
            
            heroShark.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroShark.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
    
    // Interactive bubbles on click
    document.addEventListener('click', (e) => {
        if (Math.random() < 0.3) { // 30% chance
            createInteractiveBubble(e.clientX, e.clientY);
        }
    });
}

function createInteractiveBubble(x, y) {
    const bubble = document.createElement('div');
    bubble.innerHTML = '🫧';
    bubble.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9999;
        animation: bubble-pop 2s ease-out forwards;
    `;
    
    document.body.appendChild(bubble);
    
    setTimeout(() => bubble.remove(), 2000);
    
    // Bubble pop animation
    if (!document.querySelector('#bubble-pop-styles')) {
        const bubbleCSS = document.createElement('style');
        bubbleCSS.id = 'bubble-pop-styles';
        bubbleCSS.textContent = `
            @keyframes bubble-pop {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0) translateY(-100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(bubbleCSS);
    }
}

// Additional animation styles
const additionalCSS = document.createElement('style');
additionalCSS.textContent = `
    @keyframes glow {
        0% { text-shadow: none; }
        50% { text-shadow: 0 0 20px rgba(78, 205, 196, 0.8); }
        100% { text-shadow: none; }
    }
    
    @keyframes pulse-grow {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(additionalCSS);

// Performance optimization
let animationFrame;
function optimizeAnimations() {
    const isLowPerformance = document.body.classList.contains('low-performance');
    
    if (isLowPerformance) {
        // Reduce particle count
        const canvas = document.querySelector('#particle-canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
        
        // Reduce shark school frequency
        clearInterval(window.schoolInterval);
    }
}

// Monitor performance
setInterval(optimizeAnimations, 5000);

// Export for global use
window.SharkAnimations = {
    createSharkSchool,
    createFloatingElements,
    createRippleEffect,
    createClickExplosion,
    createInteractiveBubble
};
