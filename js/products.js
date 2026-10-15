// ============================================
// STYLESYNC AI - PRODUCT DATABASE
// Complete product catalog with colors, occasions, and AI matching data
// ============================================

const products = [
    // ========== CLOTHING ITEMS ==========
    {
        id: 1,
        name: "Classic White Button-Up Shirt",
        category: "clothing",
        type: "clothing",
        color: "white",
        occasion: ["formal", "work", "casual"],
        price: 49.99,
        image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400",
        badge: "Best Seller",
        description: "Crisp white button-up shirt perfect for any occasion. Made from 100% cotton for maximum comfort and breathability.",
        style: "classic",
        season: ["spring", "summer", "fall"],
        popularity: 95
    },
    {
        id: 2,
        name: "Navy Blue Blazer",
        category: "clothing",
        type: "clothing",
        color: "navy",
        occasion: ["formal", "work"],
        price: 129.99,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
        badge: "Premium",
        description: "Elegant navy blazer for a sophisticated look. Perfect for business meetings and formal events.",
        style: "formal",
        season: ["fall", "winter", "spring"],
        popularity: 88
    },
    {
        id: 3,
        name: "Red Cocktail Dress",
        category: "clothing",
        type: "clothing",
        color: "red",
        occasion: ["party", "date"],
        price: 89.99,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
        badge: "Trending",
        description: "Stunning red dress for special occasions. Turn heads at any party or date night.",
        style: "elegant",
        season: ["summer", "spring"],
        popularity: 92
    },
    {
        id: 4,
        name: "Black Leather Jacket",
        category: "clothing",
        type: "clothing",
        color: "black",
        occasion: ["casual", "party"],
        price: 159.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        badge: "Editor's Pick",
        description: "Edgy black leather jacket for a bold statement. Genuine leather with a comfortable fit.",
        style: "edgy",
        season: ["fall", "winter"],
        popularity: 96
    },
    {
        id: 5,
        name: "Beige Cashmere Sweater",
        category: "clothing",
        type: "clothing",
        color: "beige",
        occasion: ["casual", "work"],
        price: 89.99,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
        badge: "Cozy",
        description: "Soft cashmere sweater for ultimate comfort. Perfect for chilly days and casual outings.",
        style: "cozy",
        season: ["fall", "winter"],
        popularity: 87
    },
    {
        id: 6,
        name: "Pink Silk Blouse",
        category: "clothing",
        type: "clothing",
        color: "pink",
        occasion: ["work", "date"],
        price: 69.99,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
        badge: "Elegant",
        description: "Elegant silk blouse that adds a touch of femininity to any outfit.",
        style: "feminine",
        season: ["spring", "summer"],
        popularity: 84
    },
    {
        id: 7,
        name: "Green Cargo Pants",
        category: "clothing",
        type: "clothing",
        color: "green",
        occasion: ["casual", "beach"],
        price: 59.99,
        image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=400",
        badge: "New",
        description: "Comfortable cargo pants with multiple pockets. Great for casual days.",
        style: "casual",
        season: ["spring", "summer", "fall"],
        popularity: 79
    },
    {
        id: 8,
        name: "Blue Denim Jeans",
        category: "clothing",
        type: "clothing",
        color: "blue",
        occasion: ["casual", "work"],
        price: 79.99,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
        badge: "Classic",
        description: "Classic blue denim jeans that never go out of style.",
        style: "classic",
        season: ["all"],
        popularity: 94
    },

    // ========== SHOES ==========
    {
        id: 9,
        name: "Black Leather Loafers",
        category: "shoes",
        type: "shoes",
        color: "black",
        occasion: ["formal", "work"],
        price: 89.99,
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400",
        badge: "Best Seller",
        description: "Elegant leather loafers perfect for formal occasions.",
        style: "formal",
        season: ["all"],
        popularity: 91
    },
    {
        id: 10,
        name: "White Sneakers",
        category: "shoes",
        type: "shoes",
        color: "white",
        occasion: ["casual", "beach"],
        price: 69.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
        badge: "Trending",
        description: "Classic white sneakers that go with everything.",
        style: "casual",
        season: ["all"],
        popularity: 97
    },
    {
        id: 11,
        name: "Red High Heels",
        category: "shoes",
        type: "shoes",
        color: "red",
        occasion: ["party", "date"],
        price: 79.99,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
        badge: "Hot",
        description: "Stunning red heels to make a statement.",
        style: "elegant",
        season: ["spring", "summer"],
        popularity: 89
    },
    {
        id: 12,
        name: "Brown Boots",
        category: "shoes",
        type: "shoes",
        color: "brown",
        occasion: ["casual", "work"],
        price: 99.99,
        image: "https://images.unsplash.com/photo-1542838858-2dfc8e5a5d5f?w=400",
        badge: "Durable",
        description: "Rugged brown boots perfect for outdoor adventures.",
        style: "rugged",
        season: ["fall", "winter"],
        popularity: 86
    },
    {
        id: 13,
        name: "Navy Blue Loafers",
        category: "shoes",
        type: "shoes",
        color: "navy",
        occasion: ["formal", "work"],
        price: 84.99,
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400",
        badge: "",
        description: "Stylish navy loafers for a polished look.",
        style: "formal",
        season: ["all"],
        popularity: 82
    },
    {
        id: 14,
        name: "Beige Sandals",
        category: "shoes",
        type: "shoes",
        color: "beige",
        occasion: ["casual", "beach"],
        price: 49.99,
        image: "https://images.unsplash.com/photo-1549298916-f52d724204b4?w=400",
        badge: "Summer",
        description: "Comfortable sandals perfect for summer days.",
        style: "casual",
        season: ["summer"],
        popularity: 85
    },
    {
        id: 20,
        name: "Gold Heeled Sandals",
        category: "shoes",
        type: "shoes",
        color: "gold",
        occasion: ["party", "date"],
        price: 89.99,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
        badge: "Luxury",
        description: "Elegant gold heeled sandals for special occasions.",
        style: "elegant",
        season: ["spring", "summer"],
        popularity: 88
    },
    {
        id: 21,
        name: "Silver Ballet Flats",
        category: "shoes",
        type: "shoes",
        color: "silver",
        occasion: ["casual", "work"],
        price: 59.99,
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400",
        badge: "Comfort",
        description: "Comfortable silver flats for everyday wear.",
        style: "casual",
        season: ["all"],
        popularity: 83
    },

    // ========== JEWELRY ==========
    {
        id: 15,
        name: "Gold Chain Necklace",
        category: "jewelry",
        type: "jewelry",
        color: "gold",
        occasion: ["formal", "work", "party"],
        price: 49.99,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
        badge: "Classic",
        description: "Elegant gold chain necklace that adds sophistication.",
        style: "elegant",
        season: ["all"],
        popularity: 93
    },
    {
        id: 16,
        name: "Silver Hoop Earrings",
        category: "jewelry",
        type: "jewelry",
        color: "silver",
        occasion: ["casual", "work", "party"],
        price: 29.99,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
        badge: "Trending",
        description: "Modern silver hoop earrings for everyday wear.",
        style: "modern",
        season: ["all"],
        popularity: 94
    },
    {
        id: 17,
        name: "Pearl Stud Earrings",
        category: "jewelry",
        type: "jewelry",
        color: "white",
        occasion: ["formal", "work"],
        price: 39.99,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
        badge: "Elegant",
        description: "Timeless pearl earrings for a classic look.",
        style: "classic",
        season: ["all"],
        popularity: 90
    },
    {
        id: 18,
        name: "Rose Gold Bracelet",
        category: "jewelry",
        type: "jewelry",
        color: "rose gold",
        occasion: ["casual", "date", "party"],
        price: 34.99,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
        badge: "New",
        description: "Delicate rose gold bracelet for a feminine touch.",
        style: "feminine",
        season: ["all"],
        popularity: 87
    },
    {
        id: 19,
        name: "Statement Pendant",
        category: "jewelry",
        type: "jewelry",
        color: "gold",
        occasion: ["party", "date"],
        price: 59.99,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
        badge: "Statement",
        description: "Bold pendant necklace that draws attention.",
        style: "bold",
        season: ["all"],
        popularity: 86
    },
    {
        id: 22,
        name: "Minimalist Ring Set",
        category: "jewelry",
        type: "jewelry",
        color: "silver",
        occasion: ["casual", "work"],
        price: 24.99,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
        badge: "Minimal",
        description: "Simple ring set perfect for everyday wear.",
        style: "minimal",
        season: ["all"],
        popularity: 89
    }
];

// ========== AI COLOR MATRIX ==========
// Advanced color harmony rules for AI recommendations
const colorHarmonyMatrix = {
    // Complementary colors (opposite on color wheel)
    complementary: {
        red: "green",
        green: "red",
        blue: "orange",
        orange: "blue",
        yellow: "purple",
        purple: "yellow",
        pink: "teal",
        teal: "pink",
        black: "white",
        white: "black",
        navy: "coral",
        beige: "navy",
        brown: "sky blue",
        gold: "navy",
        silver: "black"
    },
    
    // Analogous colors (next to each other)
    analogous: {
        red: ["orange", "pink", "burgundy"],
        blue: ["navy", "purple", "teal"],
        green: ["teal", "yellow", "olive"],
        yellow: ["orange", "green", "gold"],
        purple: ["pink", "blue", "lavender"],
        pink: ["red", "purple", "rose"],
        black: ["gray", "charcoal", "navy"],
        white: ["ivory", "cream", "beige"],
        navy: ["blue", "purple", "teal"],
        beige: ["white", "tan", "brown"],
        gold: ["yellow", "brown", "cream"],
        silver: ["gray", "white", "blue"]
    },
    
    // Triadic colors (equally spaced)
    triadic: {
        red: ["blue", "yellow"],
        blue: ["red", "green"],
        green: ["blue", "orange"],
        yellow: ["red", "blue"],
        purple: ["green", "orange"],
        orange: ["purple", "green"]
    },
    
    // Monochromatic (different shades)
    monochromatic: {
        black: ["gray", "charcoal", "dark gray", "light gray"],
        white: ["ivory", "cream", "off-white", "beige"],
        navy: ["blue", "dark blue", "light blue", "teal"],
        beige: ["tan", "brown", "cream", "taupe"],
        red: ["burgundy", "maroon", "crimson", "pink"],
        blue: ["navy", "teal", "sky blue", "baby blue"],
        green: ["olive", "lime", "forest", "mint"],
        gold: ["yellow", "amber", "bronze", "copper"],
        silver: ["gray", "platinum", "chrome", "pewter"]
    }
};

// ========== HELPER FUNCTIONS ==========
function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

function getProductsByColor(color) {
    return products.filter(product => product.color === color);
}

function getProductsByOccasion(occasion) {
    return products.filter(product => product.occasion.includes(occasion));
}

function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

function searchProducts(searchTerm) {
    if (!searchTerm || !searchTerm.trim()) return products;
    
    const term = searchTerm.toLowerCase().trim();
    return products.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.color.toLowerCase().includes(term) ||
        product.occasion.some(occ => occ.toLowerCase().includes(term)) ||
        product.style.toLowerCase().includes(term)
    );
}

// AI-powered color harmony matching
function getColorHarmony(baseColor, harmonyType = 'all') {
    const matches = new Set();
    
    if (harmonyType === 'all' || harmonyType === 'complementary') {
        if (colorHarmonyMatrix.complementary[baseColor]) {
            matches.add(colorHarmonyMatrix.complementary[baseColor]);
        }
    }
    
    if (harmonyType === 'all' || harmonyType === 'analogous') {
        if (colorHarmonyMatrix.analogous[baseColor]) {
            colorHarmonyMatrix.analogous[baseColor].forEach(color => matches.add(color));
        }
    }
    
    if (harmonyType === 'all' || harmonyType === 'triadic') {
        if (colorHarmonyMatrix.triadic[baseColor]) {
            colorHarmonyMatrix.triadic[baseColor].forEach(color => matches.add(color));
        }
    }
    
    if (harmonyType === 'all' || harmonyType === 'monochromatic') {
        if (colorHarmonyMatrix.monochromatic[baseColor]) {
            colorHarmonyMatrix.monochromatic[baseColor].forEach(color => matches.add(color));
        }
    }
    
    // Add neutrals that go with everything
    matches.add("black");
    matches.add("white");
    matches.add("beige");
    
    return Array.from(matches);
}

// Get matching recommendations with AI scoring
function getMatchingRecommendations(product, type) {
    if (!product) return [];
    
    const matchingColors = getColorHarmony(product.color);
    
    let recommendations = products.filter(item => 
        item.type === type && 
        item.id !== product.id &&
        (matchingColors.includes(item.color) || item.color === product.color)
    );
    
    // Add occasion-based matching
    recommendations = recommendations.filter(item => 
        item.occasion.some(occ => product.occasion.includes(occ))
    );
    
    // Calculate AI confidence score for each recommendation
    recommendations = recommendations.map(item => ({
        ...item,
        aiScore: calculateAIScore(product, item)
    })).sort((a, b) => b.aiScore - a.aiScore);
    
    return recommendations.slice(0, 6);
}

// Calculate AI confidence score between two items
function calculateAIScore(baseItem, matchItem) {
    let score = 70; // Base score
    
    // Color harmony bonus (30 points)
    const harmonyColors = getColorHarmony(baseItem.color);
    if (harmonyColors.includes(matchItem.color)) {
        score += 30;
    } else if (matchItem.color === baseItem.color) {
        score += 20;
    }
    
    // Occasion matching bonus (20 points)
    const occasionMatch = matchItem.occasion.filter(occ => baseItem.occasion.includes(occ)).length;
    score += occasionMatch * 10;
    
    // Style compatibility (15 points)
    if (matchItem.style === baseItem.style) {
        score += 15;
    } else if (isStyleCompatible(matchItem.style, baseItem.style)) {
        score += 10;
    }
    
    // Popularity bonus (15 points)
    score += Math.floor(matchItem.popularity / 10);
    
    return Math.min(score, 100);
}

// Check if two styles are compatible
function isStyleCompatible(style1, style2) {
    const compatibleStyles = {
        classic: ["formal", "casual", "elegant"],
        casual: ["classic", "cozy", "minimal"],
        formal: ["classic", "elegant"],
        elegant: ["classic", "formal", "feminine"],
        edgy: ["casual", "bold"],
        cozy: ["casual", "classic"],
        feminine: ["elegant", "casual"],
        bold: ["edgy", "party"],
        minimal: ["classic", "casual"],
        rugged: ["casual", "outdoor"],
        modern: ["minimal", "classic"]
    };
    
    return compatibleStyles[style1]?.includes(style2) || 
           compatibleStyles[style2]?.includes(style1) ||
           style1 === style2;
}

// Get personalized recommendations based on user history
function getPersonalizedRecommendations(userHistory = []) {
    if (userHistory.length === 0) {
        // Return trending products if no history
        return products.filter(p => p.popularity > 85).slice(0, 4);
    }
    
    // Analyze user preferences
    const favoriteColors = {};
    const favoriteStyles = {};
    const favoriteOccasions = {};
    
    userHistory.forEach(item => {
        favoriteColors[item.color] = (favoriteColors[item.color] || 0) + 1;
        favoriteStyles[item.style] = (favoriteStyles[item.style] || 0) + 1;
        item.occasion.forEach(occ => {
            favoriteOccasions[occ] = (favoriteOccasions[occ] || 0) + 1;
        });
    });
    
    // Get top preferences
    const topColor = Object.keys(favoriteColors).sort((a, b) => favoriteColors[b] - favoriteColors[a])[0];
    const topStyle = Object.keys(favoriteStyles).sort((a, b) => favoriteStyles[b] - favoriteStyles[a])[0];
    const topOccasion = Object.keys(favoriteOccasions).sort((a, b) => favoriteOccasions[b] - favoriteOccasions[a])[0];
    
    // Find recommendations based on preferences
    let recommendations = products.filter(p => 
        p.color === topColor || 
        p.style === topStyle ||
        p.occasion.includes(topOccasion)
    );
    
    // Remove items already in history
    const historyIds = userHistory.map(h => h.id);
    recommendations = recommendations.filter(p => !historyIds.includes(p.id));
    
    return recommendations.slice(0, 8);
}