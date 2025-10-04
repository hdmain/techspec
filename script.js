// Enhanced Tech Specifications JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize animations
    initAnimations();
    
    // Add interactive hover effects
    initHoverEffects();
    
    // Add keyboard navigation
    initKeyboardNavigation();
    
    // Performance monitoring
    initPerformanceStats();
    
    // Dynamic theme adjustments
    initThemeAdjustments();
});

function initAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all device cards
    document.querySelectorAll('.device-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateX(-50px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(title);
    });
}

function initHoverEffects() {
    const cards = document.querySelectorAll('.device-card');
    
    cards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            createRipple(e, this);
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            
            // Animate spec items
            const specItems = this.querySelectorAll('.spec-item');
            specItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(10px)';
                    item.style.borderColor = 'var(--primary-red)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset spec items
            const specItems = this.querySelectorAll('.spec-item');
            specItems.forEach(item => {
                item.style.transform = 'translateX(0)';
                item.style.borderColor = 'rgba(255, 255, 255, 0.05)';
            });
        });
    });
}

function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - element.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - element.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    // Add ripple styles
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.background = 'rgba(220, 38, 38, 0.3)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple 0.6s linear';
    circle.style.pointerEvents = 'none';
    
    const ripple = element.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    element.appendChild(circle);
    
    // Remove ripple after animation
    setTimeout(() => {
        circle.remove();
    }, 600);
}

function initKeyboardNavigation() {
    const cards = document.querySelectorAll('.device-card');
    let currentFocus = 0;
    
    // Make cards focusable
    cards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Device specification ${index + 1}`);
        
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-red)';
            this.style.outlineOffset = '4px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') return; // Let default Tab behavior work
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            currentFocus = (currentFocus + 1) % cards.length;
            cards[currentFocus].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            currentFocus = currentFocus === 0 ? cards.length - 1 : currentFocus - 1;
            cards[currentFocus].focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            cards[currentFocus].click();
        }
    });
}

function initPerformanceStats() {
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            // Display performance badge (optional)
            if (loadTime < 2000) {
                addPerformanceBadge('Fast Load', 'success');
            } else if (loadTime < 5000) {
                addPerformanceBadge('Good Load', 'warning');
            } else {
                addPerformanceBadge('Slow Load', 'error');
            }
        });
    }
}

function addPerformanceBadge(text, type) {
    const badge = document.createElement('div');
    badge.textContent = text;
    badge.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 8px 16px;
        background: ${type === 'success' ? 'var(--primary-red)' : type === 'warning' ? '#f59e0b' : '#ef4444'};
        color: white;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(badge);
    
    // Animate in
    setTimeout(() => {
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        setTimeout(() => badge.remove(), 300);
    }, 3000);
}

function initThemeAdjustments() {
    // Detect system theme preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        if (e.matches) {
            document.body.style.filter = 'brightness(0.9)';
        } else {
            document.body.style.filter = 'brightness(1)';
        }
    });
    
    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Add CSS animation for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Export functions for potential external use
window.TechSpecs = {
    scrollToSection,
    createRipple
};