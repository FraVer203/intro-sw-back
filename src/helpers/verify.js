import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function getToken(req) {
    const token = req.headers['access-token'];
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id, 'username email')
        return { user };
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return null;
    }
}
