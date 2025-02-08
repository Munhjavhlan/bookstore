import { getBooks } from '../services/api.js';
 
class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.books = [];
        this.currentCategory = 'all';
        this.loadBooks();
    }

    async loadBooks() {
        try {
            const response = await fetch('http://localhost:3000/api/books');
            this.books = await response.json();
            this.render();
            this.setupCategoryFilter();
        } catch (error) {
            console.error('Номны мэдээлэл татахад алдаа гарлаа:', error);
        }
    }

    setupCategoryFilter() {
        const urlParams = new URLSearchParams(window.location.search);
        this.currentCategory = urlParams.get('category') || 'all';
        
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentCategory = item.dataset.category;
                this.render();
            });
        });
    }

    render() {
        const filteredBooks = this.currentCategory === 'all' 
            ? this.books 
            : this.books.filter(book => book.category === this.currentCategory);

        this.shadowRoot.innerHTML = `
            <style>
                .book-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 20px;
                    padding: 20px;
                }

                .book-card {
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }

                .book-card:hover {
                    transform: translateY(-5px);
                }

                .book-image {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                }

                .book-info {
                    padding: 15px;
                }

                .book-title {
                    margin: 0 0 5px 0;
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: #333;
                }

                .book-author {
                    margin: 0 0 10px 0;
                    font-size: 0.9rem;
                    color: #666;
                    font-style: italic;
                }

                .book-price {
                    color: #ff4444;
                    font-weight: bold;
                    margin: 10px 0;
                }

                .buy-btn {
                    width: 100%;
                    padding: 8px;
                    background: #f8f9fa;
                    border: none;
                    border-radius: 4px;
                    color: #666;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .buy-btn:hover {
                    background: #007bff;
                    color: white;
                }
            </style>

            <div class="book-grid">
                ${filteredBooks.map(book => `
                    <div class="book-card">
                        <img src="${book.image_url}" alt="${book.title}" class="book-image">
                        <div class="book-info">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">${book.author}</p>
                            <p class="book-price">${book.price}₮</p>
                            <button class="buy-btn">САГСАНД ХИЙХ</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}
 
customElements.define('product-list', ProductList);