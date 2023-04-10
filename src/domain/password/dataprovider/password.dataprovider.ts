import { PasswordRestModel } from 'src/app/password/entrypoint/restmodel/password.restmodel';

abstract class PasswordDataProvider {
  abstract create(password: PasswordRestModel): Promise<PasswordRestModel>;
}

export { PasswordDataProvider };
