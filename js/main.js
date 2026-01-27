// ==============================
// Global Data Namespace
// ==============================
window.RoycoData = {
    products: [
        {
            id: 1,
            name: 'Premium Motor Oil',
            category: 'Lubricants',
            description: 'Premium synthetic motor oil for superior engine protection',
            image: 'havoline.png'
        },
        {
            id: 2,
            name: 'Industrial Grease',
            category: 'Lubricants',
            description: 'Heavy-duty industrial grease for maximum durability',
            image: 'excavator.png'
        },
        {
            id: 3,
            name: 'Industrial Solvents',
            category: 'Chemicals',
            description: 'Professional-grade industrial solvents for cleaning and degreasing',
            image: 'logo-oildri-o.png'
        },
        {
            id: 4,
            name: 'Cleaning Solutions',
            category: 'Chemicals',
            description: 'Effective cleaning solutions for industrial equipment',
            image: 'purusoil.png'
        }
    ]
};

// ==============================
// Featured Products (HOME PAGE)
// ==============================
function renderFeaturedProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid || !window.RoycoData) return;

    productGrid.innerHTML = window.RoycoData.products.map(product => `
        <div class="product-card">
            <div class="product-image"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                       display: flex;
                       align-items: center;
                       justify-content: center;
                       color: white;
                       font-size: 3rem;">
                📦
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
            </div>
        </div>
    `).join('');
}

// ==============================
// Mobile Menu (GLOBAL)
// ==============================
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!menuToggle || !navMenu) return;

    if (menuToggle.dataset.bound) return;
    menuToggle.dataset.bound = 'true';

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ==============================
// Active Nav Link
// ==============================
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length) return;

    let currentPage = window.location.pathname.split('/').pop();

    // Handle root path "/"
    if (!currentPage) currentPage = 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href')?.split('/').pop();

        link.classList.toggle('active', href === currentPage);
    });
}

// ==============================
// Footer Year
// ==============================
function setCopyrightYear() {
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// ==============================
// Init
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProducts(); // only runs on pages with #productGrid
    setupMobileMenu();
    setActiveNavLink();
    setCopyrightYear();
});
