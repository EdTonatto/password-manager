import { Injectable } from '@nestjs/common';
import generate from 'generate-random-secure-password';
import { hash } from 'bcryptjs';
import { PasswordGenerateRestModel } from 'src/app/password/entrypoint/restmodel/passwordgenerate.restmodel';
import { GeneratePasswordUseCase } from '../usecase/generatepassword.usecase';
import { PasswordRestModel } from 'src/app/password/entrypoint/restmodel/password.restmodel';
import { PasswordDataProvider } from 'src/domain/password/dataprovider/password.dataprovider';
import { UserRestModel } from 'src/app/user/entrypoint/restmodel/user.restmodel';
import { UserDataProvider } from '../dataprovider/user.dataprovider';

@Injectable()
class GeneratePasswordService implements GeneratePasswordUseCase {
  constructor(
    private readonly passwordDataProvider: PasswordDataProvider,
    private readonly userDataProvider: UserDataProvider,
  ) {}

  async execute(
    userEmail: string,
    passwordGenerate: PasswordGenerateRestModel,
  ): Promise<UserRestModel> {
    const generatedPassword = await hash(
      generate({
        length: passwordGenerate.length,
        numbers: passwordGenerate.numbers,
        symbols: passwordGenerate.symbols,
        uppercase: passwordGenerate.uppercase,
        lowercase: passwordGenerate.lowercase,
        excludeSimilarCharacters: passwordGenerate.excludeSimilarCharacters,
      }),
      8,
    );

    const passwordModel: PasswordRestModel = {
      application: passwordGenerate.application,
      username: passwordGenerate.username,
      password: generatedPassword,
    };
    const savedPassword = await this.passwordDataProvider.create(passwordModel);

    const user: UserRestModel = await this.userDataProvider.findByEmail(
      userEmail,
    );
    user.stored_passwords.push(savedPassword);
    Object.assign(user, { stored_passwords: user.stored_passwords });

    return await this.userDataProvider.update(user);
  }
}

export { GeneratePasswordService };
