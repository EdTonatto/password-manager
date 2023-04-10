import { PasswordGenerateRestModel } from 'src/app/password/entrypoint/restmodel/passwordgenerate.restmodel';
import { UserRestModel } from 'src/app/user/entrypoint/restmodel/user.restmodel';

abstract class GeneratePasswordUseCase {
  abstract execute(
    userEmail: string,
    passwordGenerate: PasswordGenerateRestModel,
  ): Promise<UserRestModel>;
}

export { GeneratePasswordUseCase };
