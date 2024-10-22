import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const verifyToken = async (req, res, next) => {
    const secret = process.env.SECRET
    const token = req.headers['access-token']

    if (!token) return res.status(403).json({message: 'No se ha proporcionado ningún Token.'})
    //Extraer la información del token
    const decoded = jwt.verify(token, secret)
    req.userId = decoded.id
    //Buscar el usuario en la base de datos
    const user = await User.findById(req.userId, {password: 0})
    //Validar si el usuario existe
    if (!user) return res.status(404).json({message: 'Usuario no encontrado.'})
    //Continuar con la siguiente función si el usuario existe
    next();
}
