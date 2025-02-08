// Cart Component
const cartComponent = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],

    addToCart(book) {
        // Check if book already exists in cart
        const existingItemIndex = this.cartItems.findIndex(item => item.id === book.id);
        
        if (existingItemIndex > -1) {
            // Increment quantity if book already exists
            this.cartItems[existingItemIndex].quantity = (this.cartItems[existingItemIndex].quantity || 1) + 1;
        } else {
            // Add new book with quantity 1
            book.quantity = 1;
            this.cartItems.push(book);
        }

        // Save to localStorage
        this.saveCart();
        
        // Show notification
        this.showNotification(`"${book.title}" ном сагсанд нэмэгдлээ!`);
        
        // Update cart display if we're on the cart page
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartItems();
        }

        // Update cart counter in header
        this.updateCartCounter();
    },

    removeFromCart(index) {
        const removedItem = this.cartItems[index];
        this.cartItems.splice(index, 1);
        this.saveCart();
        this.showNotification(`"${removedItem.title}" ном сагснаас хасагдлаа`);
        this.renderCartItems();
        this.updateCartCounter();
    },

    updateQuantity(index, newQuantity) {
        if (newQuantity < 1) newQuantity = 1;
        this.cartItems[index].quantity = newQuantity;
        this.saveCart();
        this.renderCartItems();
    },

    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },

    calculateTotal() {
        return this.cartItems.reduce((total, item) => {
            return total + (parseFloat(item.price) * (item.quantity || 1));
        }, 0);
    },

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: '1000',
            animation: 'slideIn 0.5s ease-out'
        });

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-in';
            setTimeout(() => notification.remove(), 450);
        }, 3000);
    },

    updateCartCounter() {
        const counter = document.querySelector('.cart-counter');
        if (counter) {
            const totalItems = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
            counter.textContent = totalItems;
        }
    },

    renderCartItems() {
        const cartContainer = document.querySelector('.cart-items');
        if (!cartContainer) return;

        if (this.cartItems.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Таны сагс хоосон байна</p>';
            return;
        }

        cartContainer.innerHTML = this.cartItems.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image_url}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-author">${item.author}</p>
                    <p class="cart-item-price">${item.price}₮</p>
                    <div class="quantity-controls">
                        <button onclick="cartComponent.updateQuantity(${index}, ${(item.quantity || 1) - 1})" class="decrease-btn">-</button>
                        <input type="number" value="${item.quantity || 1}" min="1" 
                               onchange="cartComponent.updateQuantity(${index}, parseInt(this.value))" class="quantity-input">
                        <button onclick="cartComponent.updateQuantity(${index}, ${(item.quantity || 1) + 1})" class="increase-btn">+</button>
                    </div>
                </div>
                <button onclick="cartComponent.removeFromCart(${index})" class="remove-btn">Устгах</button>
            </div>
        `).join('');

        // Update total
        const totalElement = document.querySelector('.cart-total');
        if (totalElement) {
            totalElement.textContent = `Нийт дүн: ${this.calculateTotal().toLocaleString()}₮`;
        }
    }
};

function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Хуучин агуулгыг цэвэрлэх
    
    // Local storage-с сагсны мэдээллийг авах
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    cartItems.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image_url}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p>${item.author}</p>
                    <p class="cart-item-price">${item.price}</p>
                    <div class="quantity-controls">
                        <button class="decrease-btn">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                        <button class="increase-btn">+</button>
                    </div>
                </div>
                <button class="wishlist-btn">
                    <img src="images/heart.svg" alt="Хүслийн жагсаалт">
                </button>
                <button class="remove-btn">Устгах</button>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    updateTotal(); // Нийт дүнг шинэчлэх
} 

// Add styles for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification {
        transition: transform 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    cartComponent.updateCartCounter();
    if (window.location.pathname.includes('cart.html')) {
        cartComponent.renderCartItems();
    }
});

// Export the cart component
window.cartComponent = cartComponent;