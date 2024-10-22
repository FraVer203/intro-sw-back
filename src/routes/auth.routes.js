import { Router } from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controller.js'
import {validations} from "../middleware/index.js"

router.post('/signin', [validations.userLogin], authCtrl.signin)
router.post('/signup', [validations.userAdd], authCtrl.signup)

export default router
