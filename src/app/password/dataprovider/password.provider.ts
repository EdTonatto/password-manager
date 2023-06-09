import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordDataProvider } from 'src/domain/password/dataprovider/password.dataprovider';
import { PasswordRestModel } from '../entrypoint/restmodel/password.restmodel';
import { Password } from './model/password.model';

@Injectable({ scope: Scope.REQUEST })
class PasswordProvider implements PasswordDataProvider {
  constructor(
    @InjectModel(Password.name) private passwordModel: Model<Password>,
  ) {}

  async create(password: PasswordRestModel): Promise<PasswordRestModel> {
    const { _id } = await this.passwordModel.create(password);
    return { _id, ...password };
  }
}

export { PasswordProvider };
