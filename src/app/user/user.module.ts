import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDataProvider } from 'src/domain/user/dataprovider/user.dataprovider';
import { AuthService } from 'src/domain/user/service/auth.service';
import { CreateUserService } from 'src/domain/user/service/createuser.service';
import { GeneratePasswordService } from 'src/domain/user/service/generatepassword.service';
import { AuthUseCase } from 'src/domain/user/usecase/auth.usecase';
import { CreateUserUseCase } from 'src/domain/user/usecase/createuser.usecase';
import { GeneratePasswordUseCase } from 'src/domain/user/usecase/generatepassword.usecase';
import { PasswordModule } from '../password/password.module';
import { User, UserSchema } from './dataprovider/model/user.model';
import { UserProvider } from './dataprovider/user.provider';
import { UserController } from './entrypoint/user.controller';

const userProvider = {
  provide: UserDataProvider,
  useClass: UserProvider,
};

const createUserUseCase = {
  provide: CreateUserUseCase,
  useClass: CreateUserService,
};

const authUseCase = {
  provide: AuthUseCase,
  useClass: AuthService,
};

const generatePasswordUseCase = {
  provide: GeneratePasswordUseCase,
  useClass: GeneratePasswordService,
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PasswordModule,
  ],
  controllers: [UserController],
  providers: [
    userProvider,
    createUserUseCase,
    authUseCase,
    generatePasswordUseCase,
  ],
})
export class UserModule {}
