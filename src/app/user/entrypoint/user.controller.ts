import {
  Body,
  Controller,
  HttpStatus,
  Injectable,
  Post,
  Scope,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/domain/user/usecase/createuser.usecase';
import { ResponseData } from 'src/shared/response/responsedata';
import { UserRestModel } from './restmodel/user.restmodel';
import { UserResource } from './user.resource';

@Controller('/user')
@Injectable({ scope: Scope.REQUEST })
class UserController implements UserResource {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  async create(
    @Body() body: UserRestModel,
  ): Promise<ResponseData<UserRestModel>> {
    try {
      const response = await this.createUserUseCase.execute(body);
      return ResponseData.success(response);
    } catch (error) {
      throw ResponseData.exception(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

export { UserController };
