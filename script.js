// Бүтээгдэхүүний мэдээллийг API-аас татаж авах функц
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/books');
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const books = await response.json();
        renderProducts(books);

        // Ангиллын шүүлтүүрт үйлдэл нэмэх
        const categoryLinks = document.querySelectorAll('.category-item');
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedCategory = link.dataset.category;
                filterProducts(books, selectedCategory);
            });
        });

        // URL-аас ангиллын параметрийг авах
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category') || 'all';
        filterProducts(books, categoryFromUrl);
    } catch (error) {
        console.error('Номны мэдээлэл татахад алдаа гарлаа:', error);
    }
}

// Номны жагсаалтыг харуулах функц
function renderProducts(books) {
    const bookGrid = document.querySelector('.book-grid');
    if (!bookGrid) return;
    
    bookGrid.innerHTML = books.map(book => `
        <div class="book-card" data-id="${book.id}">
            <button class="wishlist-btn" onclick="addToWishlist(${JSON.stringify(book)})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="book-image">
                <img src="${book.image_url}" alt="${book.title}">
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-price">${book.price}₮</p>
                <button class="add-to-cart-btn" onclick="cartComponent.addToCart(${JSON.stringify(book)})">
                    Сагсанд нэмэх
                </button>
            </div>
        </div>
    `).join('');
}

// Номыг ангилалаар шүүх функц
function filterProducts(books, selectedCategory = 'all') {
    return selectedCategory === 'all' 
        ? books 
        : books.filter(book => book.category === selectedCategory);
}

// Сагсны функцууд
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

function addToCart(event, book) {
    event.preventDefault();
    cartItems.push(book);
    cartTotal += parseFloat(book.price);

    // Сагсны тоолуурыг шинэчлэх
    const counter = document.querySelector('.cart-counter');
    if (counter) {
        counter.textContent = cartItems.length;
    }

    // LocalStorage шинэчлэх
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal.toString());

    updateCartDisplay();
    alert(`"${book.title}" ном сагсанд нэмэгдлээ!`);
}

function removeFromCart(index, event) {
    event.stopPropagation();
    const removedItem = cartItems.splice(index, 1)[0];
    cartTotal -= parseFloat(removedItem.price);

    // LocalStorage шинэчлэх
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal.toString());

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');

    if (cartItemsContainer && cartTotalElement) {
        cartItemsContainer.innerHTML = cartItems.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image_url}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-author">${item.author}</p>
                    <p class="cart-item-price">${item.price}₮</p>
                </div>
                <button onclick="removeFromCart(${index}, event)" class="remove-btn">Устгах</button>
            </div>
        `).join('');

        cartTotalElement.textContent = `Нийт дүн: ${cartTotal}₮`;
    }
}

// Хуудас ачаалагдахад ажиллах функц
async function initializePage() {
    try {
        const response = await fetch('http://localhost:3000/api/books');
        if (!response.ok) {
            throw new Error('Номны мэдээлэл авахад алдаа гарлаа');
        }
        const books = await response.json();
        
        // URL-аас ангиллын параметрийг авах
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category') || 'all';
        
        // Ангиллаар шүүх
        const filteredBooks = filterProducts(books, categoryFromUrl);
        renderProducts(filteredBooks);
        
        // Ангиллын шүүлтүүрийг тохируулах
        setupCategoryFilters(books);
        
        // URL-д байгаа ангиллыг идэвхжүүлэх
        const activeCategory = document.querySelector(`.category-item[data-category="${categoryFromUrl}"]`);
        if (activeCategory) {
            activeCategory.classList.add('active');
        }
        
    } catch (error) {
        console.error('Алдаа гарлаа:', error);
        document.querySelector('.book-grid').innerHTML = `
            <div class="error-message">
                Номны мэдээлэл ачаалахад алдаа гарлаа. Дахин оролдоно уу.
            </div>
        `;
    }
}

// Хуудас ачаалагдахад функцийг дуудах
document.addEventListener('DOMContentLoaded', initializePage);

// Хүслийн жагсаалтын товчлуурын үйлдэл
function setupWishlistButtons() {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookCard = this.closest('.book-card');
            const book = {
                id: parseInt(bookCard.dataset.id),
                title: bookCard.querySelector('.book-title').textContent,
                author: bookCard.querySelector('.book-author').textContent,
                price: bookCard.querySelector('.book-price').textContent,
                image_url: bookCard.querySelector('img').src
            };
            
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                addToWishlist(book);
            } else {
                removeFromWishlist(book.id);
            }
        });
    });
}

// Мэдэгдэл харуулах функц
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // 3 секундын дараа мэдэгдлийг автоматаар арилгана
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Хуудас ачаалагдахад онцлох номнуудыг татаж авах
document.addEventListener('DOMContentLoaded', fetchFeaturedBooks);

// Dark mode toggle
const darkModeBtn = document.querySelector('.dark-mode-btn');
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Dark mode төлөвийг localStorage-д хадгалах
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Dark mode төлөвийг сэргээх
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

function addToWishlist(book) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!wishlist.find(item => item.id === book.id)) {
        wishlist.push(book);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification(`"${book.title}" ном хүслийн жагсаалтад нэмэгдлээ`);
    }
}

function removeFromWishlist(bookId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist = wishlist.filter(item => item.id !== bookId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showNotification(`"${bookId}" ном хүслийн жагсаалтаас хасагдлаа`);
}

// Ангиллын шүүлтүүрийг тохируулах
function setupCategoryFilters(books) {
    const categoryLinks = document.querySelectorAll('.category-item');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Идэвхтэй ангиллыг тэмдэглэх
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const selectedCategory = link.dataset.category;
            const filteredBooks = filterProducts(books, selectedCategory);
            renderProducts(filteredBooks);
            
            // URL-г шинэчлэх
            const url = new URL(window.location);
            url.searchParams.set('category', selectedCategory);
            window.history.pushState({}, '', url);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    
    // Слайд шилжүүлэх функц
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = n;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Автомат шилжих
    function autoSlide() {
        showSlide(currentSlide + 1);
    }
    let slideInterval = setInterval(autoSlide, 5000); // 5 секунд тутамд
    
    // Товчлуурын үйлдлүүд
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(currentSlide - 1);
        slideInterval = setInterval(autoSlide, 5000);
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(currentSlide + 1);
        slideInterval = setInterval(autoSlide, 5000);
    });
    
    // Цэгэн товчлуурууд
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(autoSlide, 5000);
        });
    });
});

// renderProducts функцийн дараа нэмэх
function filterBooks(searchTerm) {
    const allBooks = document.querySelectorAll('.book-card');
    searchTerm = searchTerm.toLowerCase();

    allBooks.forEach(book => {
        const title = book.querySelector('.book-title').textContent.toLowerCase();
        const author = book.querySelector('.book-author').textContent.toLowerCase();
        
        const isVisible = title.includes(searchTerm) || author.includes(searchTerm);
        book.style.display = isVisible ? 'block' : 'none';
    });
}

// Хайлтын input-д event listener нэмэх
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('header-component')
        .shadowRoot.querySelector('.search-bar input');
        
    searchInput.addEventListener('input', (e) => {
        filterBooks(e.target.value);
    });
});

