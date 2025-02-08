class Categories extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.categories = [
            {
                id: 1,
                name: "Түүх",
                count: 65,
                icon: "📚"
            },
            {
                id: 2,
                name: "Уран зохиол",
                count: 180,
                icon: "📖"
            },
            {
                id: 3,
                name: "Хувь хүний хөгжил",
                count: 339,
                icon: "🎯"
            },
            {
                id: 4,
                name: "Шашин",
                count: 69,
                icon: "🕉️"
            },
            {
                id: 5,
                name: "Гадаад",
                count: 171,
                icon: "🌏"
            }
        ];

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .categories {
                    padding: 20px;
                }

                .category-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .category-item {
                    display: flex;
                    align-items: center;
                    padding: 12px 15px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: #333;
                }

                .category-item:hover {
                    transform: translateX(5px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }

                .category-icon {
                    font-size: 1.5rem;
                    margin-right: 15px;
                    width: 30px;
                    text-align: center;
                }

                .category-info {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .category-name {
                    font-weight: 500;
                }

                .category-count {
                    color: #666;
                    font-size: 0.9rem;
                    background: #f5f5f5;
                    padding: 4px 8px;
                    border-radius: 12px;
                }

                @media (max-width: 768px) {
                    .categories {
                        padding: 10px;
                    }
                }
            </style>

            <div class="categories">
                <div class="category-list">
                    ${this.categories.map(category => `
                        <a href="/category/${category.id}" class="category-item">
                            <span class="category-icon">${category.icon}</span>
                            <div class="category-info">
                                <span class="category-name">${category.name}</span>
                                <span class="category-count">${category.count}</span>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('book-categories', Categories);
