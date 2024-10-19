import axios from "axios";

const fetchAdmin = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.get('/api/protectedRoute', {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data[1].user.role == "admin";
    } catch (error) {
        console.error("Error fetching protected data:", error);
        return false; 
    }
};

export default fetchAdmin;
