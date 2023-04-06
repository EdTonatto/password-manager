import { ResponseData } from 'src/shared/response/responsedata';
import { UserRestModel } from './restmodel/user.restmodel';
import { UserAuthRestModel } from './restmodel/userauth.restmodel';

abstract class UserResource {
  abstract create(body: UserRestModel): Promise<ResponseData<UserRestModel>>;
  abstract auth(
    body: UserAuthRestModel,
  ): Promise<ResponseData<UserAuthRestModel>>;
}

export { UserResource };
