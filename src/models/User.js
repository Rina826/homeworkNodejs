import db from '../config/db.js'

export default class User {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM users')
    return rows
  }

  static async create({ name }) {
    const [result] = await db.execute('INSERT INTO users (name) VALUES (?)', [
      name
    ])
    return { id: result.insertId, name }
  }

  static async updateById(id, { name }) {
    const [result] = await db.execute('UPDATE users SET name = ? WHERE id = ?', [
      name,
      id
    ])
    return result.affectedRows
  }

  static async deleteById(id) {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id])
    return result.affectedRows
  }
}

