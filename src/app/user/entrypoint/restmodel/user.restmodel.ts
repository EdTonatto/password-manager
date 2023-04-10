import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

class UserRestModel {
  public _id?: mongoose.Types.ObjectId;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public isAdmin: boolean;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public password: string;

  public stored_passwords?: any[];

  constructor(name: string, isAdmin: boolean, email: string, password: string) {
    this.name = name;
    this.isAdmin = isAdmin;
    this.email = email;
    this.password = password;
  }
}

export { UserRestModel };
