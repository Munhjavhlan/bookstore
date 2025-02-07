const API_URL = 'http://localhost:3000/api';

export async function getBooks() {
    try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export async function searchBooks(query) {
    try {
        const response = await fetch(`${API_URL}/books/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
}

export async function getBooksByCategory(category) {
    try {
        const response = await fetch(`${API_URL}/books/category/${encodeURIComponent(category)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching books by category:', error);
        throw error;
    }
}
