// ==============================
// Global Data Namespace
// ==============================
window.RoycoData = {
    categories: [
        { id: 1, name: 'Lubricants', description: 'Motor oils and gear lubricants' },
        { id: 2, name: 'Coolants', description: 'Industrial coolants and fluids' },
        { id: 3, name: 'Chemicals', description: 'Industrial solvents and absorbents' }
    ],
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
        },
        {
            id: 5,
            name: 'Extended Life Antifreeze',
            category: 'Coolants',
            description: 'Long-lasting coolant protection for extended intervals',
            image: ''
        },
        {
            id: 6,
            name: 'Heavy Duty Coolants',
            category: 'Coolants',
            description: 'High-performance coolants for demanding industrial applications',
            image: 'servicepro.png'
        },
        {
            id: 7,
            name: 'Universal Absorbent Pads',
            category: 'Chemicals',
            description: 'Versatile absorbent pads for spill containment and cleanup',
            image: ''
        }
    ]
};

// ==============================
// Featured Products (HOME PAGE)
// ==============================
function renderFeaturedProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid || !window.RoycoData) return;

    let html = '';
    for (let product of window.RoycoData.products.slice(0, 3)) {
        const imageUrl = product.image ? `images/${product.image}` : '';
        let imageHtml = '';
        
        if (product.image) {
            imageHtml = `<img src="${imageUrl}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
        } else {
            imageHtml = `<div class="placeholder-image">📦</div>`;
        }
        
        html += `<div class="product-card">
            <div class="product-image">${imageHtml}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
            </div>
        </div>`;
    }
    
    productGrid.innerHTML = html;
}

// ==============================
// Render Product Card Helper
// ==============================
function renderProductCard(product, imagePath = 'images/') {
    const imageUrl = product.image ? `${imagePath}${product.image}` : '';
    let imageHtml = '';
    
    if (product.image) {
        imageHtml = `<img src="${imageUrl}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else {
        imageHtml = `<div class="placeholder-image">📦</div>`;
    }
    
    return `<div class="product-card">
        <div class="product-image">${imageHtml}</div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
        </div>
    </div>`;
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
