// About page specific functionality
const stats = [
    { number: "30+", label: "Years of Excellence", description: "Delivering top-quality industrial solutions since 1993." },
    { number: "30+", label: "Bulk Products", description: "Comprehensive range of lubricants, chemicals, and supplies." },
    { number: "80+", label: "Years Combined Experience", description: "Our team brings decades of industry expertise." },
    { number: "6", label: "States Served", description: "Serving MA, RI, CT, NH, VT, and ME with reliable distribution." },
];

const features = [
    { title: "Authorized Distributor", description: "Chevron Lubricants Repackaging Distributor with hundreds of packaged solutions." },
    { title: "Expert Service", description: "Specialized in waste oil systems, installations, and service." },
    { title: "Complete Solutions", description: "From antifreeze to diesel pumps and lube equipment." },
    { title: "Trusted Partner", description: "Fast shipping and reliable service across New England." },
];

function renderStats() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;

    statsGrid.innerHTML = stats.map((stat, index) => `
        <div class="stat-item" style="animation-delay: ${index * 0.1}s;">
            <div class="stat-header">
                <h2>${stat.number}</h2>
                <h3>${stat.label}</h3>
            </div>
            <p class="stat-description">${stat.description}</p>
        </div>
    `).join('');
}

function renderFeatures() {
    const featuresGrid = document.getElementById('featuresGrid');
    if (!featuresGrid) return;

    featuresGrid.innerHTML = features.map((feature, index) => `
        <div class="feature-card" style="animation-delay: ${index * 0.1}s;">
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderFeatures();
    setupMobileMenu();
    setActiveNavLink();
});
