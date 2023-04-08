import { ApiProperty } from '@nestjs/swagger';

class UserAuthRestModel {
  @ApiProperty()
  public email: string;

  @ApiProperty()
  public isAdmin: boolean;

  @ApiProperty()
  public token?: string;

  @ApiProperty()
  public password?: string;

  constructor(
    email: string,
    isAdmin: boolean,
    token?: string,
    password?: string,
  ) {
    this.email = email;
    this.isAdmin = isAdmin;
    this.token = token;
    this.password = password;
  }
}

export { UserAuthRestModel };
