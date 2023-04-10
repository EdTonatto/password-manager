import { PasswordGenerateRestModel } from 'src/app/password/entrypoint/restmodel/passwordgenerate.restmodel';
import { Request } from 'express';
import { ResponseData } from 'src/shared/response/responsedata';
import { UserRestModel } from './restmodel/user.restmodel';
import { UserAuthRestModel } from './restmodel/userauth.restmodel';

abstract class UserResource {
  abstract create(body: UserRestModel): Promise<ResponseData<UserRestModel>>;
  abstract auth(
    body: UserAuthRestModel,
  ): Promise<ResponseData<UserAuthRestModel>>;
  abstract testPass(
    req: Request,
    body: PasswordGenerateRestModel,
  ): Promise<ResponseData<UserRestModel>>;
}

export { UserResource };
