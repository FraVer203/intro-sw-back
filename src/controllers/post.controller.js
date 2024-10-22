import dotenv from 'dotenv'
import {getToken} from '../helpers/verify.js'
import Post from "../models/Post.js";
dotenv.config()

// Ver publicaciones
export const view = async (req, res) => {
    try {
        const posts = await Post.find().select({
            title: 1,
            description: 1,
            date: 1,
            author: {
                _id: 1,
                username: 1
            }
        }).populate('author', '_id username')
        res.status(200).json({ posts })
    } catch (e) {
        res.status(500).json({message: 'Error: ' + e})
    }
}

// Ver publicacion por id
export const viewId = async (req, res) => {
    try {
        const {id} = req.params
        const posts = await Post.findById(id).select({
            title: 1,
            description: 1,
            date: 1,
            author: {
                _id: 1,
                username: 1
            }
        }).populate('author', '_id username')
        res.status(200).json({ posts })
    } catch (e) {
        res.status(500).json({message: 'Error: ' + e})
    }
}

// Ver publicaciones por usuario
export const viewIdUser = async (req, res) => {
    try {
        const {id} = req.params
        const posts = await Post.find({ 'author._id': id }).select({
            title: 1,
            description: 1,
            date: 1,
            author: {
                _id: 1,
                username: 1
            }
        }).populate('author', '_id username')
        res.status(200).json({ posts })
    } catch (e) {
        res.status(500).json({message: 'Error: ' + e})
    }
}

// Agregar publicacion
export const add = async (req, res) => {
    try {
        const {title, description} = req.body
        const user = await getToken(req)

        // Guardar publicacion
        const post = new Post({
            title,
            description,
            date: Date.now(),
            author: user.user
        })
        const postSave = await post.save()

        res.status(200).json({message: 'Publicación Agregada', post: postSave})
    } catch (e) {
        res.status(500).json({message: 'Error: ' + e})
    }
}

// Editar publicacion
// Eliminar publicacion
