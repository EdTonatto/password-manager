import { Module } from '@nestjs/common';
import { MongoPingDataProvider } from 'src/domain/uptime/dataprovider/mongoping.dataprovider';
import { UptimeService } from 'src/domain/uptime/service/uptime.service';
import { UptimeUseCase } from 'src/domain/uptime/usecase/uptime.usecase';
import { MongoPingProvider } from './dataprovider/mongoping.provider';
import { UptimeController } from './entrypoint/uptime.controller';

const mongoPingProvider = {
  provide: MongoPingDataProvider,
  useClass: MongoPingProvider,
};

const uptimeUseCase = {
  provide: UptimeUseCase,
  useClass: UptimeService,
};

@Module({
  controllers: [UptimeController],
  imports: [],
  providers: [mongoPingProvider, uptimeUseCase],
  exports: [],
})
export class UptimeModule {}
