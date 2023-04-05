import { UserAuthRestModel } from 'src/app/user/entrypoint/restmodel/userauth.restmodel';

abstract class AuthUseCase {
  abstract execute(email: string, password: string): Promise<UserAuthRestModel>;
}

export { AuthUseCase };
