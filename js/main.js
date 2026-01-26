// Products Database - Featured Products
const products = [
    { id: 1, name: 'Premium Motor Oil', category: 'Lubricants', description: 'Premium synthetic motor oil for superior engine protection', image: 'havoline.png' },
    { id: 2, name: 'Industrial Grease', category: 'Lubricants', description: 'Heavy-duty industrial grease for maximum durability', image: 'excavator.png' },
    { id: 3, name: 'Industrial Solvents', category: 'Chemicals', description: 'Professional-grade industrial solvents for cleaning and degreasing', image: 'logo-oildri-o.png' },
    { id: 4, name: 'Cleaning Solutions', category: 'Chemicals', description: 'Effective cleaning solutions for industrial equipment', image: 'purusoil.png' },
];

const productCategories = [
    { id: 1, name: 'Lubricants', description: 'Motor oils and gear lubricants' },
    { id: 2, name: 'Coolants', description: 'Industrial coolants and fluids' },
    { id: 3, name: 'Hydraulics', description: 'Hydraulic and pressure fluids' },
];

// Render Products
function renderProducts(filteredProducts = products) {
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) return;
    
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
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

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Set Active Nav Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupMobileMenu();
    setActiveNavLink();
});
