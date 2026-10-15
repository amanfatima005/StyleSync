// ============================================
// STYLESYNC AI - SHOPPING CART
// Cart management with localStorage persistence
// ============================================

let cart = [];

// Load cart from localStorage on page load
function loadCart() {
    const savedCart = localStorage.getItem('stylesync_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('stylesync_cart', JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = getCartItemCount();
        cartCount.textContent = totalItems;
        
        // Add bounce animation
        cartCount.style.animation = 'none';
        cartCount.offsetHeight; // Trigger reflow
        cartCount.style.animation = 'bounce 0.5s ease';
    }
}

// Add product to cart with AI recommendation tracking
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
        showNotification(`Added another ${product.name} to cart! ✨`, 'success');
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            color: product.color,
            style: product.style,
            quantity: quantity,
            addedAt: Date.now()
        });
        showNotification(`${product.name} added to cart! 🛍️`, 'success');
        
        // Track for AI learning
        trackUserSelection(product);
    }
    
    saveCart();
}

// Update cart item quantity
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
}

// Remove item from cart
function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        showNotification(`${item.name} removed from cart`, 'info');
    }
}

// Clear entire cart
function clearCart() {
    cart = [];
    saveCart();
    showNotification('Cart cleared', 'info');
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart UI (sidebar and counter)
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag" style="font-size: 48px; color: #ccc; margin-bottom: 15px;"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 12px; margin-top: 10px;">Add some items to get started! 🛍️</p>
            </div>
        `;
        if (cartTotal) {
            cartTotal.innerHTML = `
                <div class="cart-total">
                    <span>Total:</span>
                    <span class="total-amount">$0.00</span>
                </div>
                <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
            `;
        }
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    const total = getCartTotal();
    const itemCount = getCartItemCount();
    
    if (cartTotal) {
        cartTotal.innerHTML = `
            <div class="cart-total">
                <span>Subtotal (${itemCount} items):</span>
                <span class="total-amount">$${total.toFixed(2)}</span>
            </div>
            ${total >= 50 ? '<div class="free-shipping">✨ Free Shipping Applied! ✨</div>' : 
              `<div class="shipping-note">Add $${(50 - total).toFixed(2)} more for free shipping</div>`}
            <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
        `;
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = getCartTotal();
    const itemCount = getCartItemCount();
    
    const confirmCheckout = confirm(
        `🛍️ Order Summary\n\n` +
        `Items: ${itemCount}\n` +
        `Total: $${total.toFixed(2)}\n` +
        `${total >= 50 ? '✨ Free Shipping Applied ✨\n' : ''}\n` +
        `Proceed to checkout?`
    );
    
    if (confirmCheckout) {
        showNotification(`🎉 Order placed successfully! Total: $${total.toFixed(2)}`, 'success');
        clearCart();
        toggleCart();
    }
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    }
}

// Close cart sidebar
function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}