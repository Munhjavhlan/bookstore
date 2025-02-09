document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Login амжилттай
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/index.html';
        } else {
            // Login амжилтгүй
            alert(data.message || 'Нэвтрэх үед алдаа гарлаа');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Серверт холбогдоход алдаа гарлаа');
    }
});
