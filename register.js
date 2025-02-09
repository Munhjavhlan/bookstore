document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const ner = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const nuuts_ug = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Нууц үг шалгах
    if (nuuts_ug !== confirmPassword) {
        alert('Нууц үг таарахгүй байна');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ner, email, nuuts_ug })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Бүртгэл амжилттай үүслээ');
            window.location.href = '/login.html';
        } else {
            alert(data.error || 'Бүртгэл үүсгэхэд алдаа гарлаа');
        }
    } catch (error) {
        console.error('Register error:', error);
        alert('Серверт холбогдоход алдаа гарлаа');
    }
});