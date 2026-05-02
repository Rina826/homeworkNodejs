import db from '../config/db.js'

export default class BaseModel {
  static async query(sql, params = []) {
    const [rows] = await db.execute(sql, params)
    return rows
  }

  static async execute(sql, params = []) {
    const [result] = await db.execute(sql, params)
    return result
  }
}
