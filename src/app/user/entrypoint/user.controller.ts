import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
  Scope,
} from '@nestjs/common';
import { AuthUseCase } from 'src/domain/user/usecase/auth.usecase';
import { CreateUserUseCase } from 'src/domain/user/usecase/createuser.usecase';
import { ResponseData } from 'src/shared/response/responsedata';
import { UserRestModel } from './restmodel/user.restmodel';
import { UserAuthRestModel } from './restmodel/userauth.restmodel';
import { UserResource } from './user.resource';

@Controller('/user')
@Injectable({ scope: Scope.REQUEST })
class UserController implements UserResource {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly authUseCase: AuthUseCase,
  ) {}

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

  @HttpCode(HttpStatus.OK)
  @Post('/auth')
  async auth(@Body() body: UserAuthRestModel): Promise<ResponseData<any>> {
    try {
      const response = await this.authUseCase.execute(
        body.email,
        body.password,
      );
      return ResponseData.success(response);
    } catch (error) {
      throw ResponseData.exception(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

export { UserController };
