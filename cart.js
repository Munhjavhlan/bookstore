document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartContainer = document.querySelector('.cart-items');
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <p>Таны сагс хоосон байна</p>
                <a href="books.html" class="continue-shopping">Номнууд үзэх</a>
            </div>
        `;
        return;
    }

    cartContainer.innerHTML = cartItems.map(item => `
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
            <button class="remove-btn">Устгах</button>
        </div>
    `).join('');

    updateCartTotal();
    setupCartEventListeners();
}); 