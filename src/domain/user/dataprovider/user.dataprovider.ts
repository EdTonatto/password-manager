import { UserRestModel } from 'src/app/user/entrypoint/restmodel/user.restmodel';

abstract class UserDataProvider {
  abstract create(userRestModel: UserRestModel): Promise<UserRestModel>;
  abstract findByEmail(email: string): Promise<UserRestModel>;
}

export { UserDataProvider };
