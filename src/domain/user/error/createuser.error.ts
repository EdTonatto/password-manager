class CreateUserError extends Error {
  constructor(message: string) {
    super('Error creating user. Error: ' + message);
    this.name = 'CreateUserError';
  }
}

export { CreateUserError };
