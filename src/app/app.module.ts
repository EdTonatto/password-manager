import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UptimeModule } from './uptime/uptime.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL_CONNECTION),
    UptimeModule,
  ],
})
export class AppModule {}
