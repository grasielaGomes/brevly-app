export class ApplicationError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message)
    this.name = 'ApplicationError'
    this.statusCode = statusCode
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError)
    }
  }
}
