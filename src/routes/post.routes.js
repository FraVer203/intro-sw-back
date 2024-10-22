import { Router } from 'express'
import {authJwt, validations} from "../middleware/index.js"
import * as postCtrl from '../controllers/post.controller.js'

const router = Router()

router.get('/get', postCtrl.view)
router.get('/get/:id', postCtrl.viewId)
router.get('/get-user/:id', [authJwt.verifyToken], postCtrl.viewIdUser)
router.post('/add', [authJwt.verifyToken, validations.postAdd], postCtrl.add)

export default router
