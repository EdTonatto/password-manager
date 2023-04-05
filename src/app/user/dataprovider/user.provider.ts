import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDataProvider } from 'src/domain/user/dataprovider/user.dataprovider';
import { UserRestModel } from '../entrypoint/restmodel/user.restmodel';
import { UserModel } from './model/user.model';

@Injectable({ scope: Scope.REQUEST })
class UserProvider implements UserDataProvider {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async create(userRestModel: UserRestModel): Promise<UserRestModel> {
    const createdUser = new this.userModel(userRestModel);
    return await createdUser.save();
  }

  async findByEmail(email: string): Promise<UserRestModel> {
    return await this.userModel.findOne({ email: email }).exec();
  }
}

export { UserProvider };