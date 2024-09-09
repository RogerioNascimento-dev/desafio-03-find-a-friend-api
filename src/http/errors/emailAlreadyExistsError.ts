export class EmailAlreadyExistsError extends Error {
  constructor() {
    super(`Already exists an organization with this email.`)
  }
}
