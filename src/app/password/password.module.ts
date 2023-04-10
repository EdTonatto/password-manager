import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordDataProvider } from 'src/domain/password/dataprovider/password.dataprovider';
import { Password, PasswordSchema } from './dataprovider/model/password.model';
import { PasswordProvider } from './dataprovider/password.provider';

const passwordProvider = {
  provide: PasswordDataProvider,
  useClass: PasswordProvider,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Password.name, schema: PasswordSchema },
    ]),
  ],
  providers: [passwordProvider],
  exports: [passwordProvider],
})
export class PasswordModule {}
