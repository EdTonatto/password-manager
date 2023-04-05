import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { UserRestModel } from 'src/app/user/entrypoint/restmodel/user.restmodel';
import { UserDataProvider } from '../dataprovider/user.dataprovider';
import { CreateUserError } from '../error/createuser.error';
import { CreateUserUseCase } from '../usecase/createuser.usecase';

@Injectable()
class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userProvider: UserDataProvider) {}

  async execute(userRestModel: UserRestModel): Promise<UserRestModel> {
    try {
      const user = await this.userProvider.findByEmail(userRestModel.email);
      if (user) throw new Error('User already exists');

      const passwordHash = await hash(userRestModel.password, 8);
      Object.assign(userRestModel, {
        password: passwordHash,
      });
      return await this.userProvider.create(userRestModel);
    } catch (error) {
      throw new CreateUserError(error.message);
    }
  }
}

export { CreateUserService };
