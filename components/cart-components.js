// Cart Component
class CartComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.cartItems = [];
        this.loadCartItems();
    }

    async loadCartItems() {
        try {
            const response = await fetch('http://localhost:3000/api/cart');
            if (!response.ok) throw new Error('Сагсны мэдээлэл авахад алдаа гарлаа');
            this.cartItems = await response.json();
            this.render();
        } catch (error) {
            console.error('Алдаа:', error);
        }
    }

    async addToCart(bookId, quantity = 1) {
        try {
            const response = await fetch('http://localhost:3000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bookId, quantity })
            });

            if (!response.ok) throw new Error('Сагсанд нэмэхэд алдаа гарлаа');
            
            await this.loadCartItems();
            this.showNotification('Ном амжилттай нэмэгдлээ');
        } catch (error) {
            console.error('Алдаа:', error);
        }
    }

    async removeFromCart(bookId) {
        try {
            const response = await fetch(`http://localhost:3000/api/cart/remove/${bookId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Сагснаас хасахад алдаа гарлаа');
            
            await this.loadCartItems();
            this.showNotification('Ном амжилттай хасагдлаа');
        } catch (error) {
            console.error('Алдаа:', error);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        const style = notification.style;
        Object.assign(style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#4CAF50',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '5px',
            zIndex: '1000'
        });

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .cart-container {
                    padding: 20px;
                }
                .cart-item {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                    gap: 15px;
                }
                .cart-item img {
                    width: 100px;
                    height: 140px;
                    object-fit: cover;
                }
                .item-details {
                    flex: 1;
                }
                .quantity-controls {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .quantity-controls button {
                    padding: 5px 10px;
                    border: none;
                    background: #f0f0f0;
                    cursor: pointer;
                }
                .remove-btn {
                    padding: 5px 10px;
                    border: none;
                    background: #ff4444;
                    color: white;
                    cursor: pointer;
                }
                .total {
                    margin-top: 20px;
                    text-align: right;
                    font-weight: bold;
                }
            </style>

            <div class="cart-container">
                ${this.cartItems.length === 0 ? 
                    '<p>Таны сагс хоосон байна</p>' :
                    this.cartItems.map(item => `
                        <div class="cart-item">
                            <img src="${item.image_url}" alt="${item.title}">
                            <div class="item-details">
                                <h3>${item.title}</h3>
                                <p>${item.author}</p>
                                <p>${item.price}₮</p>
                                <div class="quantity-controls">
                                    <button onclick="this.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="this.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                </div>
                            </div>
                            <button class="remove-btn" onclick="this.removeFromCart(${item.id})">Устгах</button>
                        </div>
                    `).join('')}
                <div class="total">
                    Нийт: ${this.calculateTotal()}₮
                </div>
            </div>
        `;
    }

    calculateTotal() {
        return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}

customElements.define('cart-component', CartComponent);

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
    if (window.location.pathname.includes('cart.html')) {
        const cartComponent = document.querySelector('cart-component');
        if (cartComponent) {
            cartComponent.loadCartItems();
        }
    }
});