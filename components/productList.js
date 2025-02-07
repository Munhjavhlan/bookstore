import { getBooks } from '../services/api.js';
 
class ProductList extends HTMLElement {
    constructor() {
        super();
        this._books = [];
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
        this.innerHTML = `
            <div class="book-grid">
                ${this._books.map(book => `
                    <div class="book-card">
                        <div class="book-image">
                            <img src="${book.image_url || 'images/placeholder.png'}" alt="${book.title}">
                        </div>
                        <div class="book-info">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">${book.author}</p>
                            <p class="book-price">₮${book.price}</p>
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