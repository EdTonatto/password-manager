import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDataProvider } from 'src/domain/user/dataprovider/user.dataprovider';
import { UserRestModel } from '../entrypoint/restmodel/user.restmodel';
import { User } from './model/user.model';

@Injectable({ scope: Scope.REQUEST })
class UserProvider implements UserDataProvider {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userRestModel: UserRestModel): Promise<UserRestModel> {
    return await this.userModel.create(userRestModel);
  }

  async update(userRestModel: UserRestModel): Promise<UserRestModel> {
    await this.userModel.findByIdAndUpdate(userRestModel._id, userRestModel);
    return await (
      await this.userModel.findById(userRestModel._id).exec()
    ).populate('stored_passwords');
  }

  async findByEmail(email: string): Promise<UserRestModel> {
    return await this.userModel.findOne({ email: email }).exec();
  }
}

export { UserProvider };
