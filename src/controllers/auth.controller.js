import dotenv from 'dotenv'
import User from '../models/User.js'
import jwt from 'jsonwebtoken';
dotenv.config()

const secret = process.env.SECRET

// Iniciar Sesión
export const signin = async (req, res) => {
    try {
        const {email,password} = req.body
        console.log(email)

        // Buscar usuario
        const userFound = await User.findOne({email})
        if (!userFound) return res.status(400).json({message: 'Usuario no encontrado'})

        // Iniciar Sesión
        const newUser = await User.comparePassword(password, userFound.password )
        //Verificar si la contraseña es correcta
        if (!newUser) return res.status(401).json({ message: "La contraseña inválida." })

        // Token
        const token = jwt.sign({ id: userFound._id, username: userFound.username }, secret, {
            expiresIn: 86400 // 24 Horas
        })

        res.status(200).json({message: 'Iniciando sesión', token: token})
    } catch (e) {
        res.status(500).json({message: 'Error: ' + e})
    }
}

// Registrarse
export const signup = async (req, res) => {
    try {
        const {username, email,password} = req.body

        // Encriptar la contraseña
        const passwordEncypt = await User.encryptPassword(password)

        // Crear usuario
        const user = new User({
            username,
            email,
            passtext: password,
            password: passwordEncypt
        })

        // Guardar usuario
        const userSave = await user.save()

        res.status(200).json({message: 'Usuario Registrado', user: userSave})
    } catch (e) {
        res.status(500).json({message: 'Error: ' + e})
    }
}
