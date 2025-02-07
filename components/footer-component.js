class FooterComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
            <style>
                footer {
                    background:rgb(0, 0, 0);
                    color: #bbb;
                    width: 100%;
                    text-align: center;
                    box-sizing: border-box;
                    padding: 20px 0;
                }
 
                .footer-container {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
 
                .footer-section {
                    width: 23%;
                    box-sizing: border-box;
                }
 
                .footer-section h2 {
                    margin-bottom: 15px;
                    font-size: 1.2em;
                    color: #f5f5f5;
                }
 
                .footer-section p,
                .footer-section ul,
                .footer-section a {
                    color: #bbb;
                    text-decoration: none;
                    font-size: 0.9em;
                }
 
                .footer-section ul {
                    list-style: none;
                    padding: 0;
                }
 
                .footer-section ul li {
                    margin: 5px 0;
                }
 
                .footer-section .social a {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin: 10px 0;
                    color: #bbb;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
 
                .footer-section .social img {
                    width: 20px;
                    height: 20px;
                }
 
                .footer-bottom {
                    padding: 10px;
                    background:rgb(0, 0, 0);
                    font-size: 0.8em;
                    color: #bbb;
                }
 
                /* Hover effect */
                .footer-section a:hover {
                    color: #007bff;
                }
 
                .footer-section .social a:hover img {
                    transform: scale(1.1);
                }
 
                /* Dark Mode Compatibility */
                body.dark-mode footer {
                    background: #1a1a1a;
                    color: #ccc;
                }
 
                body.dark-mode .footer-section h2 {
                    color: #fff;
                }
 
                body.dark-mode .footer-section a {
                    color: #aaa;
                }
 
                body.dark-mode .footer-bottom {
                    background: #0d0d0d;
                }
 
                body.dark-mode .social-icon {
                    fill: #fff;
                }
 
                /* Responsive */
                @media (max-width: 800px) {
                    .footer-section {
                        width: 45%;
                        margin-bottom: 20px;
                    }
                }
 
                @media (max-width: 500px) {
                    .footer-section {
                        width: 100%;
                        text-align: center;
                    }
                }

                .social-icon {
                    width: 24px;
                    height: 24px;
                    fill: currentColor;
                    transition: transform 0.3s ease;
                }

                .footer-section .social a:hover {
                    color: #007bff;
                }

                .footer-section .social a:hover .social-icon {
                    transform: scale(1.1);
                }

                /* Dark mode */
                body.dark-mode .social-icon {
                    fill: #fff;
                }
            </style>
 
            <footer>
                <div class="footer-container">
                    <div class="footer-section about">
                        <h2>Бидний тухай</h2>
                        <p>Номын ертөнцөд тавтай морил! Бид таны хүссэн номыг хүргэж өгнө.</p>
                    </div>
                    <div class="footer-section links">
                        <h2>Холбоосууд</h2>
                        <ul>
                            <li><a href="/">Нүүр</a></li>
                            <li><a href="/about">Бидний тухай</a></li>
                            <li><a href="/service">Үйлчилгээ</a></li>
                            <li><a href="/contact">Холбоо барих</a></li>
                        </ul>
                    </div>
                    <div class="footer-section social">
                        <h2>Бидэнтэй нэгдээрэй</h2>
                        <a href="https://facebook.com/your-page" target="_blank">
                            <svg class="social-icon" viewBox="0 0 24 24">
                                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                            </svg>
                            Facebook
                        </a>
                        <a href="https://instagram.com/your-page" target="_blank">
                            <svg class="social-icon" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            Instagram
                        </a>
                        <a href="https://twitter.com/your-page" target="_blank">
                            <svg class="social-icon" viewBox="0 0 24 24">
                                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                            </svg>
                            Twitter
                        </a>
                        <a href="https://linkedin.com/company/your-page" target="_blank">
                            <svg class="social-icon" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            LinkedIn
                        </a>
                    </div>
                    <div class="footer-section contact">
                        <h2>Холбоо барих</h2>
                        <p>Email: info@bookstore.com</p>
                        <p>Утас: +976 99112233</p>
                        <p>Хаяг: Улаанбаатар, Монгол</p>
                    </div>
                </div>
 
                <div class="footer-bottom">
                    <p>&copy; 2025 Бүх эрх хуулиар хамгаалагдсан.</p>
                </div>
            </footer>
        `;
    }
}
 
customElements.define("footer-component", FooterComponent);