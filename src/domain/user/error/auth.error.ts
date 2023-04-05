class AuthError extends Error {
  constructor(message: string) {
    super('Error authenticating user. Error: ' + message);
    this.name = 'AuthError';
  }
}

export { AuthError };
