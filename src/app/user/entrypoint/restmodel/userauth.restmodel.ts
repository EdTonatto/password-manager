class UserAuthRestModel {
  constructor(
    public email: string,
    public password: string,
    public token: string,
  ) {}
}

export { UserAuthRestModel };
