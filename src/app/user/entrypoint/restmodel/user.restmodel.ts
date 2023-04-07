class UserRestModel {
  constructor(
    public name: string,
    public isAdmin: boolean,
    public email: string,
    public password: string,
  ) {}
}

export { UserRestModel };
