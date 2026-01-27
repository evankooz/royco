// Products page specific functionality
const productCategoriesData = [
    { id: 1, name: 'Lubricants', description: 'Motor oils and gear lubricants' },
    { id: 2, name: 'Coolants', description: 'Industrial coolants and fluids' },
    { id: 3, name: 'Chemicals', description: 'Industrial solvents and absorbents' },
];

const allProducts = [
    { id: 1, name: 'Premium Motor Oil', category: 'Lubricants', description: 'Premium synthetic motor oil for superior engine protection', image: 'havoline.png' },
    { id: 2, name: 'Industrial Grease', category: 'Lubricants', description: 'Heavy-duty industrial grease for maximum durability', image: 'excavator.png' },
    { id: 3, name: 'Industrial Solvents', category: 'Chemicals', description: 'Professional-grade industrial solvents for cleaning and degreasing', image: 'logo-oildri-o.png' },
    { id: 4, name: 'Cleaning Solutions', category: 'Chemicals', description: 'Effective cleaning solutions for industrial equipment', image: 'purusoil.png' },
    { id: 5, name: 'Extended Life Antifreeze', category: 'Coolants', description: 'Long-lasting coolant protection for extended intervals', image: '' },
    { id: 6, name: 'Heavy Duty Coolants', category: 'Coolants', description: 'High-performance coolants for demanding industrial applications', image: 'servicepro.png' },
    { id: 7, name: 'Universal Absorbent Pads', category: 'Chemicals', description: 'Versatile absorbent pads for spill containment and cleanup', image: '' },
];

let selectedCategory = null;

// Fallback functions if main.js hasn't loaded
if (typeof setupMobileMenu === 'undefined') {
    function setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (menuToggle && navMenu) {
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
    }
}

if (typeof setActiveNavLink === 'undefined') {
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'products.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href').split('/').pop();
            if (href === currentPage || (currentPage === '' && href === 'products.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

function renderCategories() {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid) return;

    categoryGrid.innerHTML = productCategoriesData.map(category => `
        <div class="category-card" data-category="${category.name}" onclick="filterByCategory('${category.name}')">
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <div class="category-badge">View</div>
        </div>
    `).join('');
}

    // Render products
    let html = '';
    for (let product of filtered) {
        const imageUrl = product.image ? `../images/${product.image}` : '';
        let imageHtml = '';
        
        if (product.image) {
            imageHtml = `<img src="${imageUrl}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
        } else {
            imageHtml = `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; width: 100%; height: 100%;">📦</div>`;
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

    productsGrid.innerHTML = html;



// Initialize on page load
function initializeProducts() {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        renderCategories();
        renderProductsFiltered();
        if (typeof setupMobileMenu === 'function') {
            setupMobileMenu();
        }
        if (typeof setActiveNavLink === 'function') {
            setActiveNavLink();
        }

        const clearBtn = document.getElementById('clearFilterBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', clearFilter);
        }
    }, 50);
}

// Try to initialize immediately if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProducts);
} else {
    // DOM is already loaded
    initializeProducts();
}
