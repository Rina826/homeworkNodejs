import BaseModel from './BaseModel.js'

export default class User extends BaseModel {
  static tableName = 'users'

  static async getAll() {
    return this.query(`SELECT * FROM ${this.tableName}`)
  }

  static async create({ name }) {
    const result = await this.execute(
      `INSERT INTO ${this.tableName} (name) VALUES (?)`,
      [name]
    )
    return { id: result.insertId, name }
  }

  static async updateById(id, { name }) {
    const result = await this.execute(
      `UPDATE ${this.tableName} SET name = ? WHERE id = ?`,
      [name, id]
    )
    return result.affectedRows
  }

  static async deleteById(id) {
    const result = await this.execute(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    )
    return result.affectedRows
  }
}

