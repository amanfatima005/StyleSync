// ============================================
// STYLESYNC AI - ENHANCED OUTFIT BUILDER
// AI-powered outfit creation with style scoring
// ============================================

let currentOutfit = {
    clothing: null,
    shoes: null,
    jewelry: null
};

let currentItemType = 'clothing';
let savedOutfits = [];

// ========== INITIALIZATION ==========
function initOutfitBuilder() {
    loadSavedOutfits();
    loadUserHistory();
    renderItemGrid('clothing');
    updateOutfitPreview();
    setupOutfitBuilderEvents();
    showAISuggestions();
}

function loadUserHistory() {
    const saved = localStorage.getItem('stylesync_user_history');
    if (saved) {
        userActivityHistory = JSON.parse(saved);
    }
}

function loadSavedOutfits() {
    const saved = localStorage.getItem('stylesync_outfits');
    if (saved) {
        savedOutfits = JSON.parse(saved);
        renderEnhancedSavedOutfits();
    }
}

function saveOutfitsToStorage() {
    localStorage.setItem('stylesync_outfits', JSON.stringify(savedOutfits));
}

function setupOutfitBuilderEvents() {
    const previewSlots = document.querySelectorAll('.preview-slot');
    previewSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            selectItemType(type);
        });
    });
}

// ========== ITEM SELECTION ==========
function showItemType(type) {
    currentItemType = type;
    
    // Update active tab
    const tabs = document.querySelectorAll('.selection-tab');
    tabs.forEach((tab, index) => {
        if ((type === 'clothing' && index === 0) ||
            (type === 'shoes' && index === 1) ||
            (type === 'jewelry' && index === 2)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Show/hide item grids
    const clothingGrid = document.getElementById('clothingItems');
    const shoesGrid = document.getElementById('shoesItems');
    const jewelryGrid = document.getElementById('jewelryItems');
    
    if (clothingGrid) clothingGrid.style.display = type === 'clothing' ? 'grid' : 'none';
    if (shoesGrid) shoesGrid.style.display = type === 'shoes' ? 'grid' : 'none';
    if (jewelryGrid) jewelryGrid.style.display = type === 'jewelry' ? 'grid' : 'none';
    
    renderItemGrid(type);
}

function renderItemGrid(type) {
    const container = document.getElementById(`${type}Items`);
    if (!container) return;
    
    const items = getProductsByCategory(type);
    
    if (items.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No items available</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="item-card ${isRecommendedItem(item, type) ? 'recommended-item' : ''}" 
             onclick="selectItem(${item.id}, '${type}')">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-card-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                ${isRecommendedItem(item, type) ? '<span class="rec-badge">✨ AI Pick</span>' : ''}
            </div>
        </div>
    `).join('');
}

function isRecommendedItem(item, type) {
    if (!currentOutfit.clothing) return false;
    
    const recommendations = getMatchingRecommendations(currentOutfit.clothing, type);
    return recommendations.some(rec => rec.id === item.id);
}

function selectItem(itemId, type) {
    const item = getProductById(itemId);
    if (!item) return;
    
    currentOutfit[type] = item;
    updateOutfitPreview();
    
    showNotification(`${item.name} added to outfit! ✨`, 'success');
    
    // Track selection for AI learning
    trackUserSelection(item, 'outfit');
    
    // Show AI suggestions based on new selection
    setTimeout(() => showAISuggestions(), 100);
    
    // Auto-switch to next category
    if (type === 'clothing') {
        showItemType('shoes');
    } else if (type === 'shoes') {
        showItemType('jewelry');
    }
}

function selectItemType(type) {
    showItemType(type);
}

// ========== OUTFIT PREVIEW ==========
function updateOutfitPreview() {
    const previewSlots = {
        clothing: document.querySelector('.clothing-slot'),
        shoes: document.querySelector('.shoes-slot'),
        jewelry: document.querySelector('.jewelry-slot')
    };
    
    for (const [type, slot] of Object.entries(previewSlots)) {
        const item = currentOutfit[type];
        if (item && slot) {
            slot.innerHTML = `
                <div style="text-align: center;">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px;">
                    <p style="margin-top: 10px; font-weight: bold; color: #0a0a5c;">${item.name}</p>
                    <p style="color: #ffd966; font-weight: bold;">$${item.price.toFixed(2)}</p>
                </div>
            `;
            slot.classList.add('filled');
        } else if (slot) {
            const icons = {
                clothing: 'fa-tshirt',
                shoes: 'fa-shoe-prints',
                jewelry: 'fa-gem'
            };
            slot.innerHTML = `
                <div class="slot-placeholder">
                    <i class="fas ${icons[type]}"></i>
                    <span>Select ${type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
            `;
            slot.classList.remove('filled');
        }
    }
    
    // Calculate and show outfit score
    if (currentOutfit.clothing) {
        const score = calculateOutfitScore();
        showOutfitScore(score);
    }
    
    // Show smart recommendations based on clothing
    if (currentOutfit.clothing) {
        showSmartRecommendations(currentOutfit.clothing);
    }
}

// ========== AI OUTFIT SCORING ==========
function calculateOutfitScore() {
    let score = 70; // Base score
    
    // Check color harmony between clothing and shoes
    if (currentOutfit.clothing && currentOutfit.shoes) {
        const harmonyColors = getColorHarmony(currentOutfit.clothing.color);
        if (harmonyColors.includes(currentOutfit.shoes.color)) {
            score += 15;
        } else if (currentOutfit.shoes.color === currentOutfit.clothing.color) {
            score += 10;
        }
    }
    
    // Check color harmony between clothing and jewelry
    if (currentOutfit.clothing && currentOutfit.jewelry) {
        const harmonyColors = getColorHarmony(currentOutfit.clothing.color);
        if (harmonyColors.includes(currentOutfit.jewelry.color)) {
            score += 10;
        }
    }
    
    // Check occasion alignment
    if (currentOutfit.clothing && currentOutfit.shoes) {
        const occasionMatch = currentOutfit.clothing.occasion.some(occ => 
            currentOutfit.shoes.occasion.includes(occ)
        );
        if (occasionMatch) score += 10;
    }
    
    if (currentOutfit.clothing && currentOutfit.jewelry) {
        const occasionMatch = currentOutfit.clothing.occasion.some(occ => 
            currentOutfit.jewelry.occasion.includes(occ)
        );
        if (occasionMatch) score += 5;
    }
    
    // Style compatibility bonus
    if (currentOutfit.clothing && currentOutfit.shoes) {
        if (isStyleCompatible(currentOutfit.clothing.style, currentOutfit.shoes.style)) {
            score += 10;
        }
    }
    
    // Complete outfit bonus
    if (currentOutfit.clothing && currentOutfit.shoes && currentOutfit.jewelry) {
        score += 10;
    }
    
    return Math.min(score, 100);
}

function showOutfitScore(score) {
    const scoreContainer = document.getElementById('outfitScore');
    if (!scoreContainer) return;
    
    let rating = "Good";
    let color = "#ffd966";
    let message = "This outfit works well!";
    
    if (score >= 90) {
        rating = "Perfect! ✨";
        color = "#4caf50";
        message = "Excellent coordination! This outfit is runway-ready! 🎯";
    } else if (score >= 80) {
        rating = "Great! 👍";
        color = "#8bc34a";
        message = "Great choices! Very stylish combination! 🌟";
    } else if (score >= 70) {
        rating = "Solid 💪";
        color = "#ffd966";
        message = "Solid outfit! Consider adding accessories! 💫";
    } else if (score >= 60) {
        rating = "Good Start 💡";
        color = "#ff9800";
        message = "Good start! Try matching colors for a better look! 💡";
    } else {
        rating = "Needs Work 📝";
        color = "#ff6b6b";
        message = "Try different color combinations for better harmony! 🎨";
    }
    
    scoreContainer.innerHTML = `
        <div class="outfit-score">
            <div class="score-circle">
                <svg viewBox="0 0 36 36" class="circular-chart">
                    <path class="circle-bg"
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path class="circle"
                        stroke-dasharray="${score}, 100"
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        style="stroke: ${color}; stroke-dasharray: ${score}, 100;"
                    />
                    <text x="18" y="20.35" class="percentage">${score}%</text>
                </svg>
            </div>
            <div class="score-text">
                <h4>Outfit Score: ${rating}</h4>
                <p>${message}</p>
            </div>
        </div>
    `;
}

// ========== AI SUGGESTIONS ==========
function showAISuggestions() {
    const suggestionsContainer = document.getElementById('aiSuggestions');
    if (!suggestionsContainer) return;
    
    if (currentOutfit.clothing) {
        const aiSuggestions = getSmartOutfitSuggestions(currentOutfit.clothing);
        
        suggestionsContainer.innerHTML = `
            <div class="ai-suggestions-card">
                <div class="ai-header">
                    <i class="fas fa-robot"></i>
                    <h4>AI Style Assistant</h4>
                    <span class="confidence-score">${aiSuggestions.outfitScore}% Match</span>
                </div>
                
                <div class="styling-tips">
                    <h5><i class="fas fa-lightbulb"></i> Styling Tips</h5>
                    <ul>
                        ${aiSuggestions.stylingTips.map(tip => `<li><i class="fas fa-star"></i> ${tip}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="color-palette">
                    <h5><i class="fas fa-palette"></i> Recommended Color Palette</h5>
                    <div class="palette-colors">
                        ${aiSuggestions.colorPalette.map(color => `
                            <div class="palette-color" style="background: ${color};" title="${color}"></div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="recommended-items">
                    <h5><i class="fas fa-star"></i> Perfect Matches</h5>
                    <div class="mini-recommendations">
                        ${aiSuggestions.shoes.slice(0, 2).map(shoe => `
                            <div class="mini-item" onclick="selectItem(${shoe.id}, 'shoes')">
                                <img src="${shoe.image}" alt="${shoe.name}">
                                <p>${shoe.name}</p>
                                <small>${shoe.aiScore}% match</small>
                            </div>
                        `).join('')}
                        ${aiSuggestions.jewelry.slice(0, 2).map(jewelry => `
                            <div class="mini-item" onclick="selectItem(${jewelry.id}, 'jewelry')">
                                <img src="${jewelry.image}" alt="${jewelry.name}">
                                <p>${jewelry.name}</p>
                                <small>${jewelry.aiScore}% match</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    } else {
        suggestionsContainer.innerHTML = `
            <div class="ai-suggestions-card">
                <div class="ai-header">
                    <i class="fas fa-robot"></i>
                    <h4>AI Style Assistant</h4>
                </div>
                <p class="ai-message">✨ Select a clothing item to get AI-powered styling suggestions! ✨</p>
            </div>
        `;
    }
}

function getSmartOutfitSuggestions(selectedItem) {
    if (!selectedItem) return null;
    
    const shoesRecs = getMatchingRecommendations(selectedItem, 'shoes');
    const jewelryRecs = getMatchingRecommendations(selectedItem, 'jewelry');
    
    const outfitScore = calculateOutfitScore();
    
    return {
        shoes: shoesRecs,
        jewelry: jewelryRecs,
        outfitScore: outfitScore,
        stylingTips: getStylingTips(selectedItem),
        colorPalette: getColorPalette(selectedItem.color)
    };
}

function getColorPalette(baseColor) {
    const palettes = {
        black: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC"],
        white: ["#FFFFFF", "#F5F5F5", "#E8E8E8", "#DBDBDB", "#CECECE"],
        red: ["#FF4444", "#FF6666", "#FF8888", "#FFAAAA", "#FFCCCC"],
        blue: ["#4444FF", "#6666FF", "#8888FF", "#AAAAFF", "#CCCCFF"],
        navy: ["#000080", "#1A1A8C", "#333399", "#4C4CA6", "#6666B2"],
        beige: ["#F5F5DC", "#F8F8E8", "#FBFBF4", "#FFF8E7", "#FFFDF5"],
        pink: ["#FF69B4", "#FF85C1", "#FFA1CE", "#FFBDDB", "#FFD9E8"],
        green: ["#44FF44", "#66FF66", "#88FF88", "#AAFFAA", "#CCFFCC"],
        gold: ["#FFD700", "#FFDE33", "#FFE566", "#FFEC99", "#FFF3CC"],
        silver: ["#C0C0C0", "#CDCDCD", "#DADADA", "#E7E7E7", "#F4F4F4"]
    };
    
    return palettes[baseColor] || ["#0a0a5c", "#1a1a7a", "#2a2a8a", "#3a3a9a", "#4a4aaa"];
}

// ========== SMART RECOMMENDATIONS ==========
function showSmartRecommendations(clothingItem) {
    const recommendations = getMatchingRecommendations(clothingItem, 'shoes');
    const jewelryRecs = getMatchingRecommendations(clothingItem, 'jewelry');
    
    // Highlight recommended shoes
    const shoesContainer = document.getElementById('shoesItems');
    if (shoesContainer) {
        const shoesItems = shoesContainer.querySelectorAll('.item-card');
        shoesItems.forEach(card => {
            const name = card.querySelector('h4')?.textContent;
            const isRecommended = recommendations.some(rec => rec.name === name);
            if (isRecommended) {
                card.classList.add('recommended-item');
            }
        });
    }
    
    // Highlight recommended jewelry
    const jewelryContainer = document.getElementById('jewelryItems');
    if (jewelryContainer) {
        const jewelryItems = jewelryContainer.querySelectorAll('.item-card');
        jewelryItems.forEach(card => {
            const name = card.querySelector('h4')?.textContent;
            const isRecommended = jewelryRecs.some(rec => rec.name === name);
            if (isRecommended) {
                card.classList.add('recommended-item');
            }
        });
    }
}

// ========== SAVE OUTFIT ==========
function saveCurrentOutfit() {
    if (!currentOutfit.clothing && !currentOutfit.shoes && !currentOutfit.jewelry) {
        showNotification('Please select at least one item to save!', 'error');
        return;
    }
    
    const outfitScore = calculateOutfitScore();
    
    const outfit = {
        id: Date.now(),
        clothing: currentOutfit.clothing ? {...currentOutfit.clothing} : null,
        shoes: currentOutfit.shoes ? {...currentOutfit.shoes} : null,
        jewelry: currentOutfit.jewelry ? {...currentOutfit.jewelry} : null,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().getTime(),
        score: outfitScore,
        tags: generateOutfitTags(currentOutfit)
    };
    
    savedOutfits.unshift(outfit);
    
    // Keep only last 15 outfits
    if (savedOutfits.length > 15) {
        savedOutfits = savedOutfits.slice(0, 15);
    }
    
    saveOutfitsToStorage();
    renderEnhancedSavedOutfits();
    showNotification(`Outfit saved! Score: ${outfitScore}% ✨`, 'success');
}

function generateOutfitTags(outfit) {
    const tags = [];
    
    if (outfit.clothing) {
        tags.push(outfit.clothing.category);
        tags.push(outfit.clothing.color);
        outfit.clothing.occasion.forEach(occ => tags.push(occ));
        tags.push(outfit.clothing.style);
    }
    
    if (outfit.shoes) tags.push(`${outfit.shoes.color} shoes`);
    if (outfit.jewelry) tags.push(`${outfit.jewelry.color} jewelry`);
    
    return [...new Set(tags)].slice(0, 5);
}

function renderEnhancedSavedOutfits() {
    const container = document.getElementById('savedOutfitsGrid');
    if (!container) return;
    
    if (savedOutfits.length === 0) {
        container.innerHTML = '<p class="empty-message">✨ No saved outfits yet. Create your first outfit! ✨</p>';
        return;
    }
    
    container.innerHTML = savedOutfits.map(outfit => `
        <div class="saved-outfit-card enhanced">
            <div class="outfit-thumbnails">
                ${outfit.clothing ? `<img src="${outfit.clothing.image}" alt="${outfit.clothing.name}" title="${outfit.clothing.name}">` : 
                    '<div class="empty-slot"><i class="fas fa-tshirt"></i></div>'}
                ${outfit.shoes ? `<img src="${outfit.shoes.image}" alt="${outfit.shoes.name}" title="${outfit.shoes.name}">` : 
                    '<div class="empty-slot"><i class="fas fa-shoe-prints"></i></div>'}
                ${outfit.jewelry ? `<img src="${outfit.jewelry.image}" alt="${outfit.jewelry.name}" title="${outfit.jewelry.name}">` : 
                    '<div class="empty-slot"><i class="fas fa-gem"></i></div>'}
            </div>
            <div class="outfit-details">
                <div class="outfit-score-badge" style="background: ${outfit.score >= 80 ? '#4caf50' : outfit.score >= 60 ? '#ffd966' : '#ff6b6b'}">
                    ${outfit.score}% Score
                </div>
                <div class="outfit-tags">
                    ${outfit.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <small>📅 ${outfit.date}</small>
            </div>
            <button class="load-outfit-btn" onclick="loadOutfit(${outfit.id})">Load</button>
        </div>
    `).join('');
}

function loadOutfit(outfitId) {
    const outfit = savedOutfits.find(o => o.id === outfitId);
    if (outfit) {
        currentOutfit = {
            clothing: outfit.clothing,
            shoes: outfit.shoes,
            jewelry: outfit.jewelry
        };
        updateOutfitPreview();
        showNotification('Outfit loaded! ✨', 'success');
        
        // Scroll to preview
        document.querySelector('.preview-area')?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => showAISuggestions(), 100);
    }
}

function addCompleteOutfitToCart() {
    let addedCount = 0;
    
    if (currentOutfit.clothing) {
        addToCart(currentOutfit.clothing.id);
        addedCount++;
    }
    if (currentOutfit.shoes) {
        addToCart(currentOutfit.shoes.id);
        addedCount++;
    }
    if (currentOutfit.jewelry) {
        addToCart(currentOutfit.jewelry.id);
        addedCount++;
    }
    
    if (addedCount > 0) {
        const score = calculateOutfitScore();
        showNotification(`Added ${addedCount} items to cart! Outfit score: ${score}% ✨`, 'success');
        toggleCart();
    } else {
        showNotification('Please select items for your outfit first!', 'error');
    }
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('outfit-builder.html')) {
        setTimeout(() => initOutfitBuilder(), 100);
    }
});