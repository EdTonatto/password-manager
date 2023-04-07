class UserAuthRestModel {
  constructor(
    public email: string,
    public isAdmin: boolean,
    public token?: string,
    public password?: string,
  ) {}
}

export { UserAuthRestModel };
