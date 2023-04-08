import { ApiProperty } from '@nestjs/swagger';

class UserRestModel {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public isAdmin: boolean;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public password: string;

  constructor(name: string, isAdmin: boolean, email: string, password: string) {
    this.name = name;
    this.isAdmin = isAdmin;
    this.email = email;
    this.password = password;
  }
}

export { UserRestModel };
