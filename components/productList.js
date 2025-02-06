import { getBooks } from '../services/api.js';

class ProductList extends HTMLElement {
    constructor() {
        super();
        this.books = [];
        this.filteredBooks = [];
    }

    async connectedCallback() {
        await this.loadBooks();
        this.render();
        this.setupFilters();
    }

    async loadBooks() {
        try {
            this.books = await getBooks();
            this.filteredBooks = [...this.books];
            this.render();
        } catch (error) {
            console.error('Номын жагсаалтыг ачаалахад алдаа гарлаа:', error);
        }
    }

    setupFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const searchQuery = urlParams.get('search');

        if (category) {
            this.filterByCategory(category);
        }
        if (searchQuery) {
            this.filterBySearch(searchQuery);
        }
    }

    filterByCategory(category) {
        this.filteredBooks = this.books.filter(book => 
            book.category.toLowerCase() === category.toLowerCase()
        );
        this.render();
    }

    filterBySearch(query) {
        this.filteredBooks = this.books.filter(book => 
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="filters">
                <input type="text" id="searchInput" placeholder="Хайх...">
                <select id="categoryFilter">
                    <option value="">Бүх ангилал</option>
                    <option value="fiction">Уран зохиол</option>
                    <option value="non-fiction">Нон-фикшн</option>
                </select>
            </div>
            <div class="books-grid">
                ${this.filteredBooks.map(book => `
                    <product-item
                        id="${book.id}"
                        title="${book.title}"
                        price="${book.price}"
                        image="${book.image}"
                    ></product-item>
                `).join('')}
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchInput = this.querySelector('#searchInput');
        const categoryFilter = this.querySelector('#categoryFilter');

        searchInput?.addEventListener('input', (e) => {
            this.filterBySearch(e.target.value);
        });

        categoryFilter?.addEventListener('change', (e) => {
            const category = e.target.value;
            if (category) {
                this.filterByCategory(category);
            } else {
                this.filteredBooks = [...this.books];
                this.render();
            }
        });
    }
}

customElements.define('product-list', ProductList);
