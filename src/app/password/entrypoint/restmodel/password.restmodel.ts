import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
class PasswordRestModel {
  public _id?: mongoose.Types.ObjectId;

  @ApiProperty()
  public application: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public password: string;

  constructor(application: string, username: string, password: string) {
    this.application = application;
    this.username = username;
    this.password = password;
  }
}

export { PasswordRestModel };
