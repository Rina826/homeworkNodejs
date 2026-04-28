import { Router } from 'express'
import UserController from '../controllers/UserController.js'

const router = Router()

router.get('/', UserController.getAll)
router.post('/', UserController.create)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.remove)

export default router

