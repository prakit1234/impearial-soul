// Theme Management
const themes = ['aesthetic', 'tree', 'cloud', 'moon'];
let currentTheme = localStorage.getItem('theme') || 'moon';

// Apply saved theme on load
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    setupModal();
    setupCart();
});

function applyTheme(theme) {
    // Remove all theme classes
    themes.forEach(t => document.body.classList.remove(`theme-${t}`));
    
    // Apply new theme
    document.body.classList.add(`theme-${theme}`);
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    currentTheme = theme;

    // Update theme-specific elements
    document.documentElement.style.setProperty('--theme-transition', 'all 0.3s ease');
    
    // Notify user
    showThemeNotification(theme);
}

function showThemeNotification(theme) {
    const themeName = theme.charAt(0).toUpperCase() + theme.slice(1);
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${themeName} theme applied`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Modal Management
function setupModal() {
    const modal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.querySelector('.close');

    if (loginBtn && modal && closeBtn) {
        loginBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Cart Management
function setupCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const closeCart = document.querySelector('.close-cart');

    if (cartIcon && cartModal && closeCart) {
        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });
    }
}

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

// Navbar Transparency
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.background = 'var(--transparent-bg)';
        return;
    }

    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.background = 'var(--background-color)';
    } else {
        // Scrolling up
        navbar.style.background = 'var(--transparent-bg)';
    }
    lastScroll = currentScroll;
}); 