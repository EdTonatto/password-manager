import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Injectable,
  Post,
  Req,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PasswordGenerateRestModel } from 'src/app/password/entrypoint/restmodel/passwordgenerate.restmodel';
import { AuthGuard } from 'src/domain/user/service/auth.guard';
import { AuthUseCase } from 'src/domain/user/usecase/auth.usecase';
import { CreateUserUseCase } from 'src/domain/user/usecase/createuser.usecase';
import { GeneratePasswordUseCase } from 'src/domain/user/usecase/generatepassword.usecase';
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
    private readonly generatePasswordUseCase: GeneratePasswordUseCase,
  ) {}

  @Post('/')
  @ApiTags('User')
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: UserRestModel })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: UserRestModel,
  })
  @ApiResponse({ status: 400, description: 'User already exists' })
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
  @ApiTags('User')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiBody({ type: UserAuthRestModel })
  @ApiResponse({
    status: 200,
    description: 'User authenticated',
    type: UserAuthRestModel,
  })
  @ApiResponse({ status: 400, description: 'User can not be authenticated' })
  async auth(
    @Body() body: UserAuthRestModel,
  ): Promise<ResponseData<UserAuthRestModel>> {
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

  @UseGuards(AuthGuard)
  @Post('/generate-password')
  async testPass(
    @Req() req: Request,
    @Body() body: PasswordGenerateRestModel,
  ): Promise<ResponseData<UserRestModel>> {
    try {
      const response = await this.generatePasswordUseCase.execute(
        req.user.email,
        body,
      );
      return ResponseData.success(response);
    } catch (error) {
      throw ResponseData.exception(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

export { UserController };
