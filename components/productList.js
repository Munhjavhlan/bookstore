class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.books = [];
        this.loadBooks();
    }

    async loadBooks() {
        try {
            const response = await fetch('http://localhost:3000/api/books');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            this.books = await response.json();
            this.render();
        } catch (error) {
            console.error('Error loading books:', error);
        }
    }

    addToCart(book) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(book);
        localStorage.setItem('cart', JSON.stringify(cart));

        // Dispatch event to update cart UI
        this.dispatchEvent(new CustomEvent('cart-updated', {
            detail: cart,
            bubbles: true,
            composed: true
        }));
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .book-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                    padding: 20px;
                }

                .book-card {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    overflow: hidden;
                    padding: 15px;
                }

                .book-image {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                }

                .book-info {
                    padding: 10px 0;
                }

                .book-title {
                    font-size: 1.1em;
                    margin-bottom: 5px;
                }

                .book-author {
                    color: #666;
                    font-size: 0.9em;
                    margin-bottom: 5px;
                }

                .book-price {
                    font-weight: bold;
                    color: #e44d26;
                }

                .buy-btn {
                    width: 100%;
                    padding: 10px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                }

                .buy-btn:hover {
                    background: #0056b3;
                }
            </style>

            <div class="book-grid">
                ${this.books.map((book, index) => `
                    <div class="book-card">
                        <img src="${book.image_url}" alt="${book.title}" class="book-image">
                        <div class="book-info">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">${book.author}</p>
                            <p class="book-price">${book.price}₮</p>
                            <button class="buy-btn" data-index="${index}">САГСАНД ХИЙХ</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add event listeners to Buy buttons
        this.shadowRoot.querySelectorAll('.buy-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                this.addToCart(this.books[index]);
            });
        });
    }
}

customElements.define('product-list', ProductList);
