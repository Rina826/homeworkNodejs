export default class BaseController {
  static async execute(res, callback) {
    try {
      return await callback()
    } catch (error) {
      return this.handleError(res, error)
    }
  }

  static handleError(res, error, message = 'Internal server error') {
    const { message: errorMessage = 'Unknown error' } = error || {}
    return res.status(500).json({ message, error: errorMessage })
  }

  static validateRequestBody(body, requiredFields = []) {
    const missingFields = requiredFields.filter((field) => body[field] == null)
    return missingFields
  }
}
