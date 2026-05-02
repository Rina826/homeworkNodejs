import BaseController from './BaseController.js'
import User from '../models/User.js'

export default class UserController extends BaseController {
  static async getAll(req, res) {
    return super.execute(res, async () => {
      const users = await User.getAll()
      return res.json(users)
    })
  }

  static async create(req, res) {
    return super.execute(res, async () => {
      const { name } = req.body
      const missingFields = super.validateRequestBody(req.body, ['name'])

      if (missingFields.length > 0) {
        return res.status(400).json({ message: 'Missing required fields', missingFields })
      }

      const user = await User.create({ name })
      return res.status(201).json(user)
    })
  }

  static async update(req, res) {
    return super.execute(res, async () => {
      const { id } = req.params
      const { name } = req.body
      const missingFields = super.validateRequestBody(req.body, ['name'])

      if (missingFields.length > 0) {
        return res.status(400).json({ message: 'Missing required fields', missingFields })
      }

      const affectedRows = await User.updateById(id, { name })
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res.json({ id, name })
    })
  }

  static async remove(req, res) {
    return super.execute(res, async () => {
      const { id } = req.params
      const affectedRows = await User.deleteById(id)

      if (affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res.json({ message: 'User deleted' })
    })
  }
}
