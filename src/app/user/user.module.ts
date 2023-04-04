import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDataProvider } from 'src/domain/user/dataprovider/user.dataprovider';
import { CreateUserService } from 'src/domain/user/service/createuser.service';
import { CreateUserUseCase } from 'src/domain/user/usecase/createuser.usecase';
import { UserModel, UserSchema } from './dataprovider/model/user.model';
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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [userProvider, createUserUseCase],
})
export class UserModule {}
