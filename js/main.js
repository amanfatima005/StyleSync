// ============================================
// STYLESYNC AI - MAIN APPLICATION
// Complete working functionality with AI features
// ============================================

// Global variables
let currentFilterType = 'all';
let currentFilterColor = null;
let currentFilterOccasion = null;
let currentSearchTerm = '';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🤖 StyleSync AI initialized');
    
    // Load cart from localStorage
    loadCart();
    
    // Load user history
    loadPersonalizedRecommendations();
    
    // Render products
    renderProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check if on product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetail();
    }
    
    // Check if on outfit builder page
    if (window.location.pathname.includes('outfit-builder.html')) {
        setTimeout(() => initOutfitBuilder(), 100);
    }
    
    // Animate AI suggestion bar
    animateAISuggestionBar();
});

// Setup all event listeners
function setupEventListeners() {
    // Cart icon click
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCart();
        });
    }
    
    // Close cart button
    const closeCartBtn = document.getElementById('closeCartBtn');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            toggleCart();
        });
    }
    
    // Overlay click
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            toggleCart();
        });
    }
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Animate AI suggestion bar
function animateAISuggestionBar() {
    const suggestions = [
        "🤖 AI analyzing latest fashion trends...",
        "🎨 Color harmony algorithms active!",
        "✨ Finding perfect matches for you...",
        "💡 Did you know? Complementary colors create contrast!",
        "🌟 StyleSync AI learns your preferences over time!"
    ];
    
    let index = 0;
    setInterval(() => {
        const suggestionText = document.getElementById('aiSuggestionText');
        if (suggestionText && !currentFilterColor && !currentFilterOccasion && !currentSearchTerm) {
            suggestionText.innerHTML = suggestions[index % suggestions.length];
            index++;
        }
    }, 5000);
}

// Perform search with AI suggestions
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        currentSearchTerm = searchInput.value;
        
        if (currentSearchTerm) {
            updateAISuggestion(`Searching for "${currentSearchTerm}"... 🔍`);
        } else {
            updateAISuggestion(`Showing all items - find your perfect look! 🎯`);
        }
        
        renderProducts();
    }
}

// Filter by color with AI feedback
function filterByColorWithAI(color) {
    filterByColor(color);
    updateAISuggestion(`✨ ${color.toUpperCase()} is trending! Try pairing with ${getComplementaryColor(color)} for a bold look.`);
}

// Filter by occasion with AI feedback
function filterByOccasionWithAI(occasion) {
    filterByOccasion(occasion);
    
    const tips = {
        casual: "Keep it comfortable and relaxed! 👕",
        formal: "Add elegant accessories for a polished look! 👔",
        party: "Make a statement with bold accessories! 🎉",
        work: "Professional yet stylish - you've got this! 💼",
        date: "Show your personality while staying elegant! ❤️",
        beach: "Light fabrics and bright colors work best! 🏖️"
    };
    
    updateAISuggestion(`${tips[occasion] || 'Great choice!'} ✨`);
}

// Clear filters with AI feedback
function clearFiltersWithAI() {
    clearFilters();
    updateAISuggestion(`Filters cleared! Showing all ${products.length} items 🎨`);
}

// Get complementary color for AI suggestions
function getComplementaryColor(color) {
    const complements = {
        red: "green",
        blue: "orange",
        yellow: "purple",
        green: "red",
        orange: "blue",
        purple: "yellow",
        black: "white",
        white: "black",
        navy: "coral",
        beige: "navy"
    };
    return complements[color] || "neutral tones";
}

// Render products based on filters
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    let filteredProducts = [...products];
    
    // Apply search filter
    if (currentSearchTerm) {
        filteredProducts = searchProducts(currentSearchTerm);
    }
    
    // Apply type filter
    if (currentFilterType !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.type === currentFilterType);
    }
    
    // Apply color filter
    if (currentFilterColor) {
        filteredProducts = filteredProducts.filter(p => p.color === currentFilterColor);
    }
    
    // Apply occasion filter
    if (currentFilterOccasion) {
        filteredProducts = filteredProducts.filter(p => p.occasion.includes(currentFilterOccasion));
    }
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div style="text-align: center; grid-column: 1/-1; padding: 60px;">
                <i class="fas fa-search" style="font-size: 48px; color: #0a0a5c; margin-bottom: 20px;"></i>
                <h3 style="color: #0a0a5c;">No products found</h3>
                <p style="color: #666;">Try adjusting your filters or search term</p>
                <button onclick="clearFiltersWithAI()" style="margin-top: 20px; padding: 10px 25px; background: #0a0a5c; color: #ebe5ce; border: none; border-radius: 25px; cursor: pointer;">
                    <i class="fas fa-robot"></i> Clear Filters with AI
                </button>
            </div>
        `;
        return;
    }
    
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="viewProductDetail(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                ${product.popularity > 90 ? '<span class="ai-match-badge">🔥 Trending</span>' : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// View product detail
function viewProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Add CSS animations if not present
if (!document.querySelector('#ai-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'ai-animation-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
        }
        
        .recommended-item {
            border: 2px solid #ffd966 !important;
            position: relative;
            background: linear-gradient(135deg, #fffef7, #ffffff);
        }
        
        .rec-badge {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #ffd966;
            color: #0a0a5c;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 10px;
            font-weight: bold;
        }
        
        .free-shipping {
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            padding: 8px;
            text-align: center;
            border-radius: 8px;
            margin: 10px 0;
            font-size: 12px;
            font-weight: bold;
        }
        
        .shipping-note {
            background: #f5f5f5;
            padding: 8px;
            text-align: center;
            border-radius: 8px;
            margin: 10px 0;
            font-size: 12px;
            color: #666;
        }
        
        .product-detail-style {
            margin-bottom: 20px;
            padding: 15px;
            background: linear-gradient(135deg, #f8f9fa, #ffffff);
            border-radius: 10px;
            border-left: 4px solid #ffd966;
        }
        
        .product-detail-style strong {
            color: #0a0a5c;
        }
        
        .ai-match-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #ffd966, #ffb347);
            color: #0a0a5c;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: bold;
            z-index: 2;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
}