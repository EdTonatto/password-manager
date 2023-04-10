import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordModule } from './password/password.module';
import { UptimeModule } from './uptime/uptime.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL_CONNECTION),
    UptimeModule,
    UserModule,
    PasswordModule,
  ],
})
export class AppModule {}
