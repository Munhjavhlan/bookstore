const API_URL = 'http://localhost:3000/api';
 
export async function getBooks() {
    try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) {
            throw new Error('Номны мэдээлэл авахад алдаа гарлаа');
        }
        return await response.json();
    } catch (error) {
        console.error('API алдаа:', error);
        throw error;
    }
}
 