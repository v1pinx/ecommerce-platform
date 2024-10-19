import axios from "axios";

const fetchProtectedData = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.get('/api/protectedRoute', {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        (response.status)
        return response.status === 200; 
    } catch (error) {
        console.error("Error fetching protected data:", error);
        return false; 
    }
};

export default fetchProtectedData;
