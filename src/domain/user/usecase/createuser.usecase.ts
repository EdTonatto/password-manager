import { UserRestModel } from 'src/app/user/entrypoint/restmodel/user.restmodel';

abstract class CreateUserUseCase {
  abstract execute(userRestModel: UserRestModel): Promise<UserRestModel>;
}

export { CreateUserUseCase };
