// Products page specific functionality
let selectedCategory = null;

// ==============================
// Render Categories
// ==============================
function renderCategories() {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid || !window.RoycoData?.categories) return;

    categoryGrid.innerHTML = window.RoycoData.categories.map(category => `
        <div class="category-card" data-category="${category.name}" onclick="filterByCategory('${category.name}')">
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <div class="category-badge">View</div>
        </div>
    `).join('');
}

// ==============================
// Filter Products by Category
// ==============================
function filterByCategory(categoryName) {
    selectedCategory = categoryName;
    renderProductsFiltered();
    updateFilterUI();
}

// ==============================
// Clear Filter
// ==============================
function clearFilter() {
    selectedCategory = null;
    renderProductsFiltered();
    updateFilterUI();
}

// ==============================
// Update Filter UI
// ==============================
function updateFilterUI() {
    // Update active category card
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.toggle('active', card.dataset.category === selectedCategory);
    });
    
    // Show/hide clear filter button
    const clearBtn = document.getElementById('clearFilterBtn');
    if (clearBtn) {
        clearBtn.style.display = selectedCategory ? 'inline-block' : 'none';
    }
}

// ==============================
// Render Filtered Products
// ==============================
function renderProductsFiltered() {
    const productsGrid = document.getElementById('productGrid');
    if (!productsGrid || !window.RoycoData?.products) return;

    let filtered = window.RoycoData.products;
    
    // Apply category filter if selected
    if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }

    let html = filtered.map(product => renderProductCard(product, '../images/')).join('');
    productsGrid.innerHTML = html;
}

// ==============================
// Initialize Products Page
// ==============================
function initializeProducts() {
    renderCategories();
    renderProductsFiltered();
    updateFilterUI();
    
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
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProducts);
} else {
    initializeProducts();
}
