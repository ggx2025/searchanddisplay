// Navigation functionality with enhanced interactivity
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle with animation
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Add body scroll lock when menu is open
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Enhanced navbar scroll effect with color transition
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Active nav link highlighting with smooth transitions
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Enhanced animated counter with easing
function animateCounter(element, target, duration = 2500) {
    let start = 0;
    const startTime = performance.now();
    
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        const current = Math.floor(easedProgress * target);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            // Add completion animation
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Animated counter with prefix and suffix
function animateCounterWithPrefix(element, target, prefix = '', suffix = '', duration = 2500) {
    let start = 0;
    const startTime = performance.now();
    
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        const current = Math.floor(easedProgress * target);
        element.textContent = prefix + current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + target + suffix;
            // Add completion animation
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Animated counter with suffix only
function animateCounterWithSuffix(element, target, suffix = '', duration = 2500) {
    let start = 0;
    const startTime = performance.now();
    
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        const current = Math.floor(easedProgress * target);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
            // Add completion animation
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate counters when hero section comes into view
            if (entry.target.classList.contains('hero-stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = counter.getAttribute('data-target');
                    if (target === '50' && counter.closest('.stat').querySelector('.stat-label').textContent.includes('Million')) {
                        // For $50M+ display
                        animateCounterWithPrefix(counter, 50, '$', 'M+');
                    } else if (target === '12') {
                        // For 12X display
                        animateCounterWithSuffix(counter, 12, 'X');
                    } else if (target === '50' && counter.closest('.stat').querySelector('.stat-label').textContent.includes('Reduction')) {
                        // For 50% display
                        animateCounterWithSuffix(counter, 50, '%');
                    } else {
                        // Default counter animation
                        animateCounter(counter, parseInt(target));
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe all elements with animation class
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Portfolio filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Enhanced Testimonials Carousel
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsCarousel = document.getElementById('testimonials-carousel');
    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialPrev = document.getElementById('testimonial-prev');
    const testimonialNext = document.getElementById('testimonial-next');
    const indicatorsContainer = document.getElementById('testimonial-indicators');
    
    if (!testimonialsTrack || !testimonialPrev || !testimonialNext) {
        return; // Exit if testimonial elements don't exist
    }
    
    const slides = testimonialsTrack.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isTransitioning = false;
    let autoPlayInterval;
    
    // Create circular indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < Math.ceil(totalSlides / 3); i++) {
            const indicator = document.createElement('button');
            indicator.className = `testimonial-indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlideGroup(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        if (isTransitioning) return;
        
        const slideWidth = 100 / 3; // Show 3 slides at a time
        const translateX = -(currentIndex * slideWidth);
        testimonialsTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        const indicators = document.querySelectorAll('.testimonial-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === Math.floor(currentIndex / 3));
        });
    }
    
    // Go to specific slide group
    function goToSlideGroup(groupIndex) {
        if (isTransitioning) return;
        currentIndex = groupIndex * 3;
        updateCarousel();
        resetAutoPlay();
    }
    
    // Previous slide
    function previousSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex = currentIndex <= 0 ? Math.max(0, totalSlides - 3) : currentIndex - 3;
        updateCarousel();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
        resetAutoPlay();
    }
    
    // Next slide
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex = currentIndex >= totalSlides - 3 ? 0 : currentIndex + 3;
        updateCarousel();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
        resetAutoPlay();
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 6000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Event listeners
    testimonialPrev.addEventListener('click', previousSlide);
    testimonialNext.addEventListener('click', nextSlide);
    
    // Pause auto-play on hover
    testimonialsCarousel.addEventListener('mouseenter', stopAutoPlay);
    testimonialsCarousel.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    testimonialsCarousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    });
    
    testimonialsCarousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });
    
    testimonialsCarousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        const deltaX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
        
        isDragging = false;
        startAutoPlay();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.closest('.testimonials-carousel-container')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });
    
    // Initialize carousel
    createIndicators();
    updateCarousel();
    startAutoPlay();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formValues = {};
        
        for (let [key, value] of formData.entries()) {
            formValues[key] = value;
        }
        
        // Basic validation
        if (!formValues.name || !formValues.email || !formValues.service || !formValues.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(formValues.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced service card hover effects with particle animation
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;
        card.appendChild(particleContainer);
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            
            // Create floating particles
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createParticle(particleContainer);
                }, i * 100);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Clear particles
            setTimeout(() => {
                particleContainer.innerHTML = '';
            }, 500);
        });
    });
    
    function createParticle(container) {
        const particle = document.createElement('div');
        const colors = ['#9c27b0', '#ffd700', '#4caf50', '#f8bbd9'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${randomColor};
            border-radius: 50%;
            bottom: 10px;
            left: ${Math.random() * 100}%;
            animation: float-up 2s ease-out forwards;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-20px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-40px) scale(0);
            }
        }
        
        .particle-container {
            z-index: 0;
        }
        
        .service-card > * {
            position: relative;
            z-index: 1;
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .navbar {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Floating animation for hero elements
document.addEventListener('DOMContentLoaded', function() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random delays and durations for more natural movement
        const duration = 4 + Math.random() * 4; // 4-8 seconds
        const delay = index * 0.5; // Stagger the animations
        
        card.style.animationDuration = `${duration}s`;
        card.style.animationDelay = `${delay}s`;
        
        // Add mouse interaction
        card.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'translateY(-30px) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
});

// Parallax effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelector('.floating-elements');
    
    if (hero && floatingElements) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                floatingElements.style.transform = `translateY(${rate}px)`;
            }
        });
    }
});

// Service links functionality - Direct navigation with enhanced debugging
document.addEventListener('DOMContentLoaded', function() {
    const serviceLinks = document.querySelectorAll('.service-link');
    console.log('Found service links:', serviceLinks.length);
    
    serviceLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`Service link ${index + 1}: ${href}`);
        
        // Ensure the link is clickable
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
        
        link.addEventListener('click', function(e) {
            console.log(`Clicked on service link: ${href}`);
            if (this.getAttribute('href').endsWith('.html')) {
                // Add a subtle visual feedback without preventing navigation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                // Allow normal navigation to proceed
            }
        });
        
        // Additional event listener for debugging
        link.addEventListener('mousedown', function() {
            console.log(`Mouse down on: ${href}`);
        });
    });
});

// Stats animation when visible
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.hero-stats');
    let statsAnimated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                const counters = entry.target.querySelectorAll('.stat-number');
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 100;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 20);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Portfolio Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const portfolioCarousel = document.getElementById('portfolio-carousel');
    const portfolioTrack = document.getElementById('portfolio-track');
    const prevButton = document.getElementById('portfolio-prev');
    const nextButton = document.getElementById('portfolio-next');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const slides = document.querySelectorAll('.portfolio-slide');
    
    if (!portfolioCarousel || !portfolioTrack || !prevButton || !nextButton) {
        return; // Exit if carousel elements don't exist
    }
    
    let currentIndex = 0;
    const slidesToShow = 3;
    const totalSlides = slides.length;
    const maxIndex = Math.max(0, totalSlides - slidesToShow);
    
    // Create indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const numIndicators = Math.ceil(totalSlides / slidesToShow);
        
        for (let i = 0; i < numIndicators; i++) {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(i * slidesToShow));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Update carousel position with consistent smooth movement
    function updateCarousel() {
        const slideWidth = 100 / slidesToShow; // Each slide takes 33.333% width
        const translateX = -currentIndex * slideWidth;
        
        portfolioTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            const indicatorStart = index * slidesToShow;
            const indicatorEnd = indicatorStart + slidesToShow - 1;
            indicator.classList.toggle('active', currentIndex >= indicatorStart && currentIndex <= indicatorEnd);
        });
        
        // Update navigation buttons
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextButton.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }
    
    // Go to specific slide with consistent animation
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(maxIndex, index));
        // Ensure transition is properly set
        portfolioTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        updateCarousel();
    }
    
    // Next slide with consistent movement
    function nextSlide() {
        if (currentIndex < maxIndex) {
            portfolioTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Previous slide with consistent movement
    function prevSlide() {
        if (currentIndex > 0) {
            portfolioTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    portfolioCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    portfolioCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextSlide(); // Swipe left - go to next
            } else {
                prevSlide(); // Swipe right - go to previous
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.closest('.portfolio-carousel-container')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });
    
    // Auto-play functionality (optional - can be enabled/disabled)
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentIndex >= maxIndex) {
                goToSlide(0); // Loop back to start
            } else {
                nextSlide();
            }
        }, autoPlayDelay);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Pause auto-play on hover
    portfolioCarousel.addEventListener('mouseenter', stopAutoPlay);
    portfolioCarousel.addEventListener('mouseleave', startAutoPlay);
    
    // Pause auto-play when user interacts
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('click', () => {
            stopAutoPlay();
            setTimeout(startAutoPlay, autoPlayDelay); // Restart after delay
        });
    });
    
    // Initialize carousel
    createIndicators();
    updateCarousel();
    startAutoPlay();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
});

// Add scroll-to-top button
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopButton.className = 'scroll-top-btn';
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-medium);
    `;
    
    document.body.appendChild(scrollTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.visibility = 'visible';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = 'var(--shadow-large)';
    });
    
    scrollTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-medium)';
    });
});

// Industry Expertise Infinite Carousel
document.addEventListener('DOMContentLoaded', function() {
    const industryTrack = document.getElementById('industry-track');
    
    if (!industryTrack) return;
    
    // Clone all industry items to create seamless infinite scroll
    const originalItems = industryTrack.querySelectorAll('.industry-item');
    
    // Create multiple copies for smooth infinite scroll
    for (let i = 0; i < 3; i++) {
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            industryTrack.appendChild(clone);
        });
    }
    
    // Pause animation on hover for better UX
    const industryCarousel = document.querySelector('.industry-carousel');
    
    industryCarousel.addEventListener('mouseenter', () => {
        industryTrack.style.animationPlayState = 'paused';
    });
    
    industryCarousel.addEventListener('mouseleave', () => {
        industryTrack.style.animationPlayState = 'running';
    });
});