class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 140px; /* Header-ийн бодит өндөр */
                }
                
                .header-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    background: white;
                }

                header {
                    width: 100%;
                    background: white;
                }

                .main-nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    background: white;
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
                    gap: 20px;
                    padding: 10px 0;
                    background: white;
                    border-top: 1px solid #eee;
                }

                .category-nav a {
                    text-decoration: none;
                    color: #333;
                    padding: 8px 16px;
                    position: relative;
                }

                .category-nav a::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #007bff;
                    transition: width 0.3s ease;
                }

                .category-nav a:hover::after,
                .category-nav a.active::after {
                    width: 100%;
                }

                .category-nav a.active {
                    background-color: #f5f5f5;
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

            <div class="header-wrapper">
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
                            <button class="dark-mode-btn" id="darkModeToggle">
                                <img src="images/dark-mode.svg" alt="Dark Mode">
                            </button>
                            <a href="/wishlist.html"><img src="images/heart.svg" alt="Хүслийн жагсаалт"></a>
                            <a href="/cart.html"><img src="images/cart.svg" alt="Сагс"></a>
                            <a href="/login.html"><img src="images/profile.svg" alt="Профайл"></a>
                        </div>
                    </nav>

                    <nav class="category-nav">
                        <a href="./index.html" class="${window.location.pathname === '/index.html' || window.location.pathname === '/' ? 'active' : ''}">Нүүр хуудас</a>
                        <a href="./books.html" class="${window.location.pathname === '/books.html' ? 'active' : ''}">Номын жагсаалт</a>
                        <a href="./abus.html" class="${window.location.pathname === '/abus.html' ? 'active' : ''}">Бидний тухай</a>
                        <a href="./sanal.html" class="${window.location.pathname === '/sanal.html' ? 'active' : ''}">Санал хүсэлт</a>
                        <a href="./locations.html" class="${window.location.pathname === '/locations.html' ? 'active' : ''}">Салбаруудын байршил</a>
                    </nav>
                </header>
            </div>
        `;

        // Dark mode toggle functionality
        const darkModeBtn = shadow.getElementById('darkModeToggle');
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark-mode');
                const isDarkMode = document.documentElement.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDarkMode);
                this.updateDarkModeStyles(isDarkMode);
            });

            // Check saved dark mode preference
            const savedDarkMode = localStorage.getItem('darkMode') === 'true';
            if (savedDarkMode) {
                document.documentElement.classList.add('dark-mode');
                this.updateDarkModeStyles(true);
            }
        }
    }

    updateDarkModeStyles(isDark) {
        const root = document.documentElement;
        if (isDark) {
            root.style.setProperty('--bg-color', '#1a1a1a');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--border-color', '#404040');
        } else {
            root.style.setProperty('--bg-color', '#ffffff');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--border-color', '#eeeeee');
        }
    }

    connectedCallback() {
        const currentPath = window.location.pathname;
        const links = this.shadowRoot.querySelectorAll('.category-nav a');
        
        links.forEach(link => {
            if (link.getAttribute('href').includes(currentPath)) {
                link.classList.add('active');
            }
        });

        // Header-ийн өндрийг body-д margin болгон нэмэх
        
    }

    disconnectedCallback() {
        // Component устах үед margin-ийг буцаан хасах
        
    }
}

customElements.define("header-component", HeaderComponent); 
