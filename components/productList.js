import { getBooks } from '../services/api.js';
 
class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.books = [
            {
                id: 1,
                title: "Монгол түүх",
                author: "Б.Баярсайхан",
                price: "25,000₮",
                image: "images/book1.jpg"
            },
            {
                id: 2,
                title: "Англи хэлний дүрэм",
                author: "Д.Болормаа",
                price: "19,900₮",
                image: "images/book2.jpg"
            },
            {
                id: 3,
                title: "Математик",
                author: "П.Наранбаатар",
                price: "22,000₮",
                image: "images/book3.jpg"
            },
            // Цааш үргэлжлүүлэн нэмж болно
        ];

        this.render();
    }
 
    async connectedCallback() {
        try {
            this._books = await getBooks();
            this.render();
        } catch (error) {
            console.error('Алдаа:', error);
            this.renderError();
        }
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
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    overflow: hidden;
                    transition: transform 0.3s ease;
                    position: relative;
                }

                .book-card:hover {
                    transform: translateY(-5px);
                }

                .book-image {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                }

                .book-info {
                    padding: 15px;
                }

                .book-title {
                    font-size: 1.1rem;
                    margin: 0 0 5px 0;
                    color: #333;
                }

                .book-author {
                    color: #666;
                    font-size: 0.9rem;
                    margin: 0 0 10px 0;
                }

                .book-price {
                    color: #007bff;
                    font-weight: bold;
                    font-size: 1.1rem;
                }

                .wishlist-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: white;
                    border: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                }

                .wishlist-btn svg {
                    width: 16px;
                    height: 16px;
                    color: #666;
                }

                .wishlist-btn:hover {
                    transform: scale(1.1);
                }

                .wishlist-btn:hover svg {
                    color: #e74c3c;
                }
            </style>

            <div class="book-grid">
                ${this.books.map(book => `
                    <div class="book-card">
                        <button class="wishlist-btn">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                                    stroke="currentColor" 
                                    stroke-width="2" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <img src="${book.image}" alt="${book.title}" class="book-image">
                        <div class="book-info">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">${book.author}</p>
                            <p class="book-price">${book.price}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
 
    renderError() {
        this.innerHTML = `
            <p style="color: red; text-align: center;">
                Номны мэдээлэл ачаалахад алдаа гарлаа. Дахин оролдоно уу.
            </p>
        `;
    }
}
 
customElements.define('product-list', ProductList);