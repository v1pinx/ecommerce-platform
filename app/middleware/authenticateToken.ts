import jwt from 'jsonwebtoken';

const JWT_SECRET = "secret";

export const authenticateToken = async (req: Request) => {
    const authHeader = req.headers.get('authorization'); 
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new Error("Access denied");
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                reject(new Error("Forbidden")); 
            } else {
                resolve(user); 
            }
        });
    });
}
