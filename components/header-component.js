<<<<<<< HEAD
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
            <style>
                .main-nav {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 2rem;
                max-width: 1200px;
                margin: 0 auto;
            }

            .logo img {
                height: 60px;
            }

            .search-bar {
                display: flex;
                align-items: center;
                background: #f5f5f5;
                border-radius: 20px;
                padding: 0.5rem 1rem;
                flex: 1;
                max-width: 500px;
                margin: 0 2rem;
            }

            .search-bar input {
                border: none;
                background: none;
                flex: 1;
                padding: 0.5rem;
            }

            .search-bar button {
                background: none;
                border: none;
                cursor: pointer;
            }

            .nav-actions {
                display: flex;
                align-items: center;
                gap: 1.5rem;
            }

            .nav-actions a, 
            .nav-actions button {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .nav-actions img {
                width: 24px;
                height: 24px;
            }

            .category-nav {
                display: flex;
                justify-content: center;
                gap: 2rem;
                padding: 1rem;
                border-top: 1px solid #eee;
            }

            .category-nav a {
                color: #333;
                text-decoration: none;
                padding: 10px 20px;
                position: relative;
                transition: color 0.3s ease;
            }

            .category-nav a:hover {
                color: #007bff;  /* Hover хийх үеийн текстийн өнгө */
            }

            /* Доорх зураас үүсгэх hover эффект */
            .category-nav a::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: 0;
                left: 50%;
                background-color: #007bff;
                transition: all 0.3s ease;
                transform: translateX(-50%);
            }

            .category-nav a:hover::after {
                width: 80%;  /* Hover хийх үед зураасны урт */
            }

            .dark-mode-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                display: flex;
                align-items: center;
            }

            .dark-mode-btn img {
                width: 24px;
                height: 24px;
            }

            .nav-actions a img,
            .dark-mode-btn img {
                width: 24px;
                height: 24px;
                transition: transform 0.3s ease, filter 0.3s ease;
            }

            /* Hover effektuud */
            .nav-actions a:hover img,
            .dark-mode-btn:hover img {
                transform: scale(1.2);  /* Tomuruulah */
                filter: brightness(0.8);  /* Baga zereg budeg bolgoh */
            }

            /* Dark mode deer hover hiih ued */
            body.dark-mode .nav-actions a:hover img,
            body.dark-mode .dark-mode-btn:hover img {
                filter: brightness(0.8) invert(1);  /* Tsagaan ungetei ued budeg bolgoh */
            }
            </style>

            <header>
                <nav class="main-nav">
                    <div class="logo">
                        <img src="images/logo_mod.jpg" alt="Номын дэлгүүр">
                    </div>
                    <div class="search-bar">
                        <input type="text" placeholder="Номын нэрээр хайх...">
                        <button type="button"><img src="images/search.svg" alt="Хайх"></button>
                    </div>
                    <div class="nav-actions">
                        <button class="dark-mode-btn">
                            <img src="images/dark-mode.svg" alt="Dark Mode">
                        </button>
                        <a href="/wishlist"><img src="images/heart.svg" alt="Хүслийн жагсаалт"></a>
                        <a href="/cart"><img src="images/cart.svg" alt="Сагс"></a>
                        <a href="/profile"><img src="images/profile.svg" alt="Профайл"></a>
                    </div>
                </nav>
                <nav class="category-nav">
                    <a href="./index.html">Нүүр хуудас</a>
                    <a href="./books.html">Номын жагсаалт</a>
                    <a href="./about.html">Бидний тухай</a>
                    <a href="./review.html">Санал хүсэлт</a>
                    <a href="/location.html">Салбаруудын байршил</a>
                </nav>
            </header>
        `;

        // Dark Mode functionality
        const darkModeBtn = shadow.querySelector('.dark-mode-btn');
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // Dark mode icon солих
            const darkModeIcon = darkModeBtn.querySelector('img');
            if (document.body.classList.contains('dark-mode')) {
                darkModeIcon.src = 'images/light-mode.svg';
                darkModeIcon.alt = 'Light Mode';
            } else {
                darkModeIcon.src = 'images/dark-mode.svg';
                darkModeIcon.alt = 'Dark Mode';
            }
        });
    }
}

customElements.define("header-component", HeaderComponent); 
=======
    class HeaderComponent extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: "open" });
            shadow.innerHTML = `
                <style>
                    .main-nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .logo img {
                    height: 60px;
                }

                .search-bar {
                    display: flex;
                    align-items: center;
                    background: #f5f5f5;
                    border-radius: 20px;
                    padding: 0.5rem 1rem;
                    flex: 1;
                    max-width: 500px;
                    margin: 0 2rem;
                }

                .search-bar input {
                    border: none;
                    background: none;
                    flex: 1;
                    padding: 0.5rem;
                }

                .search-bar button {
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .nav-actions a, 
                .nav-actions button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .nav-actions img {
                    width: 24px;
                    height: 24px;
                }

                .category-nav {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    padding: 1rem;
                    border-top: 1px solid #eee;
                }

                .category-nav a {
                    color: #333;
                    text-decoration: none;
                    padding: 10px 20px;
                    position: relative;
                    transition: color 0.3s ease;
                }

                .category-nav a:hover {
                    color: #007bff;  /* Hover хийх үеийн текстийн өнгө */
                }

                /* Доорх зураас үүсгэх hover эффект */
                .category-nav a::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 50%;
                    background-color: #007bff;
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }

                .category-nav a:hover::after {
                    width: 80%;  /* Hover хийх үед зураасны урт */
                }

                .dark-mode-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    display: flex;
                    align-items: center;
                }

                .dark-mode-btn img {
                    width: 24px;
                    height: 24px;
                }

                .nav-actions a img,
                .dark-mode-btn img {
                    width: 24px;
                    height: 24px;
                    transition: transform 0.3s ease, filter 0.3s ease;
                }

                /* Hover effektuud */
                .nav-actions a:hover img,
                .dark-mode-btn:hover img {
                    transform: scale(1.2);  /* Tomuruulah */
                    filter: brightness(0.8);  /* Baga zereg budeg bolgoh */
                }

                /* Dark mode deer hover hiih ued */
                body.dark-mode .nav-actions a:hover img,
                body.dark-mode .dark-mode-btn:hover img {
                    filter: brightness(0.8) invert(1);  /* Tsagaan ungetei ued budeg bolgoh */
                }
                </style>

                <header>
                    <nav class="main-nav">
                        <div class="logo">
                            <img src="images/logo_mod.jpg" alt="Номын дэлгүүр">
                        </div>
                        <div class="search-bar">
                            <input type="text" placeholder="Номын нэрээр хайх...">
                            <button type="button"><img src="images/search.svg" alt="Хайх"></button>
                        </div>
                        <div class="nav-actions">
                            <button class="dark-mode-btn">
                                <img src="images/dark-mode.svg" alt="Dark Mode">
                            </button>
                            <a href="/wishlist"><img src="images/heart.svg" alt="Хүслийн жагсаалт"></a>
                            <a href="/cart"><img src="images/cart.svg" alt="Сагс"></a>
                            <a href="/profile"><img src="images/profile.svg" alt="Профайл"></a>
                        </div>
                    </nav>
                    <nav class="category-nav">
                        <a href="./index.html">Нүүр хуудас</a>
                        <a href="./books.html">Номын жагсаалт</a>
                        <a href="./about.html">Бидний тухай</a>
                        <a href="./review.html">Санал хүсэлт</a>
                        <a href="/location.html">Салбаруудын байршил</a>
                    </nav>
                </header>
            `;

            // Dark Mode functionality
            const darkModeBtn = shadow.querySelector('.dark-mode-btn');
            darkModeBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                // Dark mode icon солих
                const darkModeIcon = darkModeBtn.querySelector('img');
                if (document.body.classList.contains('dark-mode')) {
                    darkModeIcon.src = 'images/light-mode.svg';
                    darkModeIcon.alt = 'Light Mode';
                } else {
                    darkModeIcon.src = 'images/dark-mode.svg';
                    darkModeIcon.alt = 'Dark Mode';
                }
            });
        }
    }

    customElements.define("header-component", HeaderComponent); 
>>>>>>> origin
