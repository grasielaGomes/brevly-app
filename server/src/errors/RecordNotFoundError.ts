export class RecordNotFoundError extends Error {
  constructor(message: string = 'Record not found') {
    super(message)
    this.name = 'RecordNotFoundError'
  }
}
