import { ResponseData } from 'src/shared/response/responsedata';
import { UserRestModel } from './restmodel/user.restmodel';

abstract class UserResource {
  abstract create(body: UserRestModel): Promise<ResponseData<UserRestModel>>;
}

export { UserResource };
