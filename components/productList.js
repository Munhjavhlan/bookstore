import { getBooks } from '../services/api.js';
 
class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.books = [
            {
                id: 1,
                title: "Ном 1",
                author: "Зохиолч 1",
                price: "15000",
                category: "gadaad",
                image_url: "images/book1.jpg"
            },
            {
                id: 2,
                title: "Ном 2", 
                author: "Зохиолч 2",
                price: "25000",
                category: "tuuh",
                image_url: "images/book.jpg"
            },
          
        ];
        this.loadBooks();
    }

    loadBooks() {
        // URL-аас категорийг авах
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category') || 'all';

        // Категорийн дагуу номнуудыг шүүх
        const filteredBooks = category === 'all' 
            ? this.books 
            : this.books.filter(book => book.category === category);

        this.render(filteredBooks);
    }

    render(books) {
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
                    font-size: 1.1em;
                    margin-bottom: 8px;
                }

                .book-author {
                    color: #666;
                    font-size: 0.9em;
                    margin-bottom: 8px;
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
                ${books.map(book => `
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