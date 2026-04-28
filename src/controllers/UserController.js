import User from '../models/User.js'

export default class UserController {
  static async getAll(req, res) {
    try {
      const users = await User.getAll()
      return res.json(users)
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch users', error })
    }
  }

  static async create(req, res) {
    try {
      const { name } = req.body

      if (!name) {
        return res.status(400).json({ message: 'name is required' })
      }

      const user = await User.create({ name })
      return res.status(201).json(user)
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create user', error })
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body

      if (!name) {
        return res.status(400).json({ message: 'name is required' })
      }

      const affectedRows = await User.updateById(id, { name })
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res.json({ id, name })
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update user', error })
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params
      const affectedRows = await User.deleteById(id)

      if (affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res.json({ message: 'User deleted' })
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete user', error })
    }
  }
}

