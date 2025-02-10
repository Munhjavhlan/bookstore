class CartComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
            <style>
                .cart-modal {
                    position: fixed;
                    top: 0;
                    right: -400px;
                    width: 400px;
                    height: 100vh;
                    background: white;
                    box-shadow: -2px 0 5px rgba(0,0,0,0.2);
                    transition: right 0.3s ease;
                    z-index: 1000;
                    padding: 20px;
                }

                .cart-modal.active {
                    right: 0;
                }

                .cart-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .close-cart {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                }

                .cart-items {
                    max-height: calc(100vh - 200px);
                    overflow-y: auto;
                }

                .cart-total {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    right: 20px;
                }
            </style>
            <div class="cart-modal">
                <div class="cart-header">
                    <h3>Таны сагс</h3>
                    <button class="close-cart">&times;</button>
                </div>
                <div class="cart-items">
                    <!-- Cart items will be rendered here -->
                </div>
                <div class="cart-total">
                    <p>Нийт: <span class="total-amount">0₮</span></p>
                    <button class="checkout-btn">Захиалах</button>
                </div>
            </div>
        `;

        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            const cartButton = document.querySelector('header-component')
                ?.shadowRoot?.querySelector('.cart-btn');
            const closeButton = shadow.querySelector('.close-cart');
            const cartModal = shadow.querySelector('.cart-modal');

            if (cartButton) {
                cartButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    cartModal.classList.add('active');
                });
            }

            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    cartModal.classList.remove('active');
                });
            }
        });
    }

    connectedCallback() {
        this.loadCart();
        window.addEventListener('cart-updated', (event) => this.updateCart(event.detail));
    }

    loadCart() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.render();
    }

    updateCart(updatedCart) {
        this.cart = updatedCart;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.render();
    }

    getTotalPrice() {
        return this.cart.reduce((total, book) => total + book.price, 0);
    }

    render() {
        this.shadowRoot.querySelector('.cart-items').innerHTML = this.cart.length === 0 
            ? '<p>Сагс хоосон байна.</p>' 
            : this.cart.map(book => `
                <div class="cart-item">
                    <span>${book.title}</span>
                    <span>${book.price}₮</span>
                </div>
            `).join('');

        this.shadowRoot.querySelector('.total-amount').textContent = this.getTotalPrice().toString() + '₮';
    }
}

customElements.define('cart-component', CartComponent);
