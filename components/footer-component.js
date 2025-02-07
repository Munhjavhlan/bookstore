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
                    margin: 5px 0;
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
                            <li><a href="#">Нүүр</a></li>
                            <li><a href="#">Бидний тухай</a></li>
                            <li><a href="#">Үйлчилгээ</a></li>
                            <li><a href="#">Холбоо барих</a></li>
                        </ul>
                    </div>
                    <div class="footer-section social">
                        <h2>Бидэнтэй нэгдээрэй</h2>
                        <a href="#"><img src="images/facebook.svg" alt="Facebook"> Facebook</a>
                        <a href="#"><img src="images/twitter.svg" alt="Twitter"> Twitter</a>
                        <a href="#"><img src="images/instagram.svg" alt="Instagram"> Instagram</a>
                        <a href="#"><img src="images/linkedin.svg" alt="LinkedIn"> LinkedIn</a>
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