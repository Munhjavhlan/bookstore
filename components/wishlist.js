class WishlistManager {
    constructor() {
        this.wishlistItems = this.getWishlistFromStorage();
        this.wishlistContainer = document.querySelector('.wishlist-items');
        this.render();
    }

    getWishlistFromStorage() {
        return JSON.parse(localStorage.getItem('wishlist') || '[]');
    }

    saveWishlistToStorage() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    }

    addToWishlist(book) {
        if (!this.wishlistItems.find(item => item.id === book.id)) {
            this.wishlistItems.push(book);
            this.saveWishlistToStorage();
            this.render();
        }
    }

    removeFromWishlist(bookId) {
        this.wishlistItems = this.wishlistItems.filter(item => item.id !== bookId);
        this.saveWishlistToStorage();
        this.render();
    }

    render() {
        if (!this.wishlistContainer) return;

        if (this.wishlistItems.length === 0) {
            this.wishlistContainer.innerHTML = `
                <div class="empty-wishlist">
                    <p>Таны хүслийн жагсаалт хоосон байна.</p>
                    <a href="books.html" class="browse-books-btn">Номнуудыг үзэх</a>
                </div>
            `;
            return;
        }

        this.wishlistContainer.innerHTML = `
            <div class="wishlist-grid">
                ${this.wishlistItems.map(book => `
                    <div class="wishlist-item">
                        <img src="${book.image_url}" alt="${book.title}" class="wishlist-item-image">
                        <div class="wishlist-item-info">
                            <h3>${book.title}</h3>
                            <p class="author">${book.author}</p>
                            <p class="price">${book.price}₮</p>
                            <div class="wishlist-item-actions">
                                <button class="add-to-cart-btn">Сагсанд нэмэх</button>
                                <button class="remove-from-wishlist-btn" data-id="${book.id}">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Remove товчлуурын эвент листенер нэмэх
        this.wishlistContainer.querySelectorAll('.remove-from-wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.currentTarget.dataset.id);
                this.removeFromWishlist(bookId);
            });
        });
    }
}

// Хуудас ачааллах үед хүслийн жагсаалтыг үүсгэх
document.addEventListener('DOMContentLoaded', () => {
    new WishlistManager();
});
