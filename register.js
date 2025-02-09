document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Нууц үг шалгах
    if (password !== confirmPassword) {
        alert('Нууц үг таарахгүй байна');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Бүртгэл амжилттай үүслээ');
            window.location.href = '/login.html';
        } else {
            alert(data.message || 'Бүртгэл үүсгэхэд алдаа гарлаа');
        }
    } catch (error) {
        console.error('Register error:', error);
        alert('Серверт холбогдоход алдаа гарлаа');
    }
});