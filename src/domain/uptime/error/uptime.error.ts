class UptimeError extends Error {
  constructor(message: string) {
    super('Error while checking application uptime. Error: ' + message);
    this.name = 'UptimeError';
  }
}

export { UptimeError };
