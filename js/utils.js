// ============================================
// STYLESYNC AI - UTILITY FUNCTIONS
// Helper functions, notifications, filters, and AI UI updates
// ============================================

let currentFilters = {
    color: null,
    occasion: null,
    type: 'all'
};

let currentSearchTerm = '';
let userActivityHistory = [];

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${icons[type] || icons.success}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#ff6b6b' : type === 'warning' ? '#ff9800' : '#2196f3'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1002;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== FILTER FUNCTIONS ==========
function filterByColor(color) {
    currentFilters.color = color;
    currentFilters.occasion = null;
    
    // Update active color button styling
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active-filter');
        const btnColor = btn.style.backgroundColor;
        if ((color === 'white' && btnColor === 'rgb(255, 255, 255)') ||
            btnColor.includes(color)) {
            btn.classList.add('active-filter');
        }
    });
    
    // Show AI suggestion
    updateAISuggestion(`Showing items in ${color.toUpperCase()} 🎨`);
    
    if (typeof renderProducts === 'function') {
        renderProducts();
    }
}

function filterByOccasion(occasion) {
    currentFilters.occasion = occasion;
    currentFilters.color = null;
    
    // Show occasion section
    const occasionSection = document.getElementById('occasionSection');
    if (occasionSection) {
        occasionSection.style.display = 'block';
    }
    
    // Update active occasion button
    document.querySelectorAll('.occasion-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === occasion) {
            btn.classList.add('active');
        }
    });
    
    // Show AI suggestion
    updateAISuggestion(`Perfect ${occasion.toUpperCase()} outfit ideas coming up! ✨`);
    
    if (typeof renderProducts === 'function') {
        renderProducts();
    }
}

function filterByType(type) {
    currentFilters.type = type;
    
    // Update active tab styling
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.toLowerCase();
        if (type === 'all' && btnText === 'all items') {
            btn.classList.add('active');
        } else if (btnText === type) {
            btn.classList.add('active');
        }
    });
    
    // Show AI suggestion
    if (type !== 'all') {
        updateAISuggestion(`Browsing ${type.toUpperCase()} collection 👔`);
    } else {
        updateAISuggestion(`Showing all items - find your perfect look! 🎯`);
    }
    
    if (typeof renderProducts === 'function') {
        renderProducts();
    }
}

function clearFilters() {
    currentFilters = {
        color: null,
        occasion: null,
        type: 'all'
    };
    currentSearchTerm = '';
    
    // Clear search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reset color button borders
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active-filter');
    });
    
    // Reset occasion buttons
    document.querySelectorAll('.occasion-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Reset category tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === 'All Items') {
            btn.classList.add('active');
        }
    });
    
    // Show AI suggestion
    updateAISuggestion(`Filters cleared! Showing all items 🎨`);
    
    if (typeof renderProducts === 'function') {
        renderProducts();
    }
    
    showNotification('All filters cleared', 'info');
}

// ========== AI SUGGESTION BAR ==========
function updateAISuggestion(message) {
    const suggestionText = document.getElementById('aiSuggestionText');
    if (suggestionText) {
        suggestionText.innerHTML = `🤖 ${message}`;
        
        // Add typing animation effect
        suggestionText.style.animation = 'none';
        suggestionText.offsetHeight;
        suggestionText.style.animation = 'fadeInUp 0.3s ease';
    }
}

function showOccasionFilter() {
    const occasionSection = document.getElementById('occasionSection');
    if (occasionSection) {
        occasionSection.style.display = 'block';
        occasionSection.scrollIntoView({ behavior: 'smooth' });
        updateAISuggestion(`Select an occasion for personalized styling tips! ✨`);
    }
}

// ========== PRODUCT DETAIL FUNCTIONS ==========
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId && document.getElementById('productDetailContainer')) {
        const product = getProductById(productId);
        if (product) {
            renderProductDetail(product);
            loadRecommendationsForProduct(product);
            showAIStylingTip(product);
            
            // Track product view
            trackUserSelection(product, 'view');
        } else {
            document.getElementById('productDetailContainer').innerHTML = `
                <div style="text-align: center; padding: 60px;">
                    <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #ff6b6b;"></i>
                    <h3>Product Not Found</h3>
                    <p>The product you're looking for doesn't exist.</p>
                    <a href="index.html" class="cta-button" style="display: inline-block; margin-top: 20px;">Back to Home</a>
                </div>
            `;
        }
    }
}

function renderProductDetail(product) {
    const container = document.getElementById('productDetailContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <span class="product-detail-category">${product.category.toUpperCase()}</span>
            <h1>${product.name}</h1>
            <p class="product-detail-price">$${product.price.toFixed(2)}</p>
            <p class="product-detail-description">${product.description}</p>
            <div class="product-detail-colors">
                <strong>🎨 Color:</strong> ${product.color.charAt(0).toUpperCase() + product.color.slice(1)}
            </div>
            <div class="product-detail-occasion">
                <strong>✨ Perfect for:</strong> ${product.occasion.map(o => o.charAt(0).toUpperCase() + o.slice(1)).join(', ')}
            </div>
            <div class="product-detail-style">
                <strong>💫 Style:</strong> ${product.style.charAt(0).toUpperCase() + product.style.slice(1)}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart - $${product.price.toFixed(2)}
            </button>
        </div>
    `;
}

function showAIStylingTip(product) {
    const tipContainer = document.getElementById('aiStylingTips');
    if (!tipContainer) return;
    
    const tips = getStylingTips(product);
    tipContainer.style.display = 'block';
    tipContainer.innerHTML = `
        <i class="fas fa-robot"></i>
        <strong>AI Styling Tip:</strong>
        <span id="stylingTipText">${tips[0]}</span>
    `;
}

function getStylingTips(product) {
    const tips = {
        black: ["✨ Gold jewelry makes black pop!", "✨ Add a colorful bag for contrast", "✨ Red lipstick complements black perfectly"],
        white: ["✨ White is a blank canvas - add colorful accessories!", "✨ Silver jewelry creates an elegant look", "✨ Pair with pastels for a soft aesthetic"],
        red: ["✨ Keep accessories minimal - let red be the star!", "✨ Gold jewelry complements red beautifully", "✨ Black or nude shoes work best"],
        blue: ["✨ White accessories create a fresh look", "✨ Brown leather complements blue nicely", "✨ Silver jewelry adds sophistication"],
        navy: ["✨ Gold accents make navy look luxurious", "✨ Pair with white for a classic combo", "✨ Burgundy accessories create depth"],
        beige: ["✨ Beige is versatile - experiment with textures!", "✨ Gold jewelry adds warmth", "✨ Pair with earth tones for a natural look"]
    };
    
    return tips[product.color] || [
        `✨ ${product.color.toUpperCase()} pairs well with neutral accessories!`,
        `✨ Add a statement piece to elevate this look`,
        `✨ Consider the occasion when accessorizing`
    ];
}

function loadRecommendationsForProduct(product) {
    const shoesRecs = getMatchingRecommendations(product, 'shoes');
    const jewelryRecs = getMatchingRecommendations(product, 'jewelry');
    
    renderAIRecommendations(shoesRecs, 'shoesRecommendations', 'shoes');
    renderAIRecommendations(jewelryRecs, 'jewelryRecommendations', 'jewelry');
}

function renderAIRecommendations(items, containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!items || items.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; grid-column: 1/-1;">No matching items found 🤖</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="product-card recommendation-card" onclick="window.location.href='product-detail.html?id=${item.id}'">
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}">
                ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ''}
                <span class="match-badge">${item.aiScore}% Match</span>
            </div>
            <div class="product-info">
                <h3>${item.name}</h3>
                <p class="product-category">${item.category}</p>
                <p class="product-price">$${item.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${item.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function showRecommendationType(type) {
    const shoesTab = document.querySelectorAll('.rec-tab')[0];
    const jewelryTab = document.querySelectorAll('.rec-tab')[1];
    const shoesContainer = document.getElementById('shoesRecommendations');
    const jewelryContainer = document.getElementById('jewelryRecommendations');
    
    if (type === 'shoes') {
        if (shoesTab) shoesTab.classList.add('active');
        if (jewelryTab) jewelryTab.classList.remove('active');
        if (shoesContainer) shoesContainer.style.display = 'grid';
        if (jewelryContainer) jewelryContainer.style.display = 'none';
    } else {
        if (shoesTab) shoesTab.classList.remove('active');
        if (jewelryTab) jewelryTab.classList.add('active');
        if (shoesContainer) shoesContainer.style.display = 'none';
        if (jewelryContainer) jewelryContainer.style.display = 'grid';
    }
}

// ========== USER ACTIVITY TRACKING ==========
function trackUserSelection(item, action = 'select') {
    const historyItem = {
        id: item.id,
        name: item.name,
        type: item.type,
        color: item.color,
        style: item.style,
        occasion: item.occasion,
        action: action,
        timestamp: Date.now()
    };
    
    userActivityHistory.unshift(historyItem);
    
    // Keep only last 20 items
    if (userActivityHistory.length > 20) {
        userActivityHistory = userActivityHistory.slice(0, 20);
    }
    
    localStorage.setItem('stylesync_user_history', JSON.stringify(userActivityHistory));
    
    // Update personalized recommendations
    loadPersonalizedRecommendations();
}

function loadPersonalizedRecommendations() {
    const savedHistory = localStorage.getItem('stylesync_user_history');
    if (savedHistory) {
        userActivityHistory = JSON.parse(savedHistory);
    }
    
    const personalizedRecs = getPersonalizedRecommendations(userActivityHistory);
    const container = document.getElementById('personalizedRecs');
    
    if (container && personalizedRecs.length > 0) {
        container.innerHTML = personalizedRecs.map(item => `
            <div class="product-card" onclick="window.location.href='product-detail.html?id=${item.id}'">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.name}">
                    ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ''}
                    <span class="ai-match-badge">Recommended for you</span>
                </div>
                <div class="product-info">
                    <h3>${item.name}</h3>
                    <p class="product-category">${item.category}</p>
                    <p class="product-price">$${item.price.toFixed(2)}</p>
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${item.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// ========== HELPER FUNCTIONS ==========
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
        updateAISuggestion(`Explore our collection! 🛍️`);
    }
}

// Load personalized recommendations on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPersonalizedRecommendations();
});