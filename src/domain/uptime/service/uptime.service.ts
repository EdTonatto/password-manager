import { Injectable, Scope } from '@nestjs/common';
import { MongoPingDataProvider } from '../dataprovider/mongoping.dataprovider';
import { UptimeError } from '../error/uptime.error';
import { UptimeUseCase } from '../usecase/uptime.usecase';

@Injectable({ scope: Scope.REQUEST })
class UptimeService implements UptimeUseCase {
  constructor(private readonly mongopingDataProvider: MongoPingDataProvider) {}

  async ping(): Promise<string> {
    try {
      return await this.mongopingDataProvider.ping();
    } catch (error) {
      throw new UptimeError(error.message);
    }
  }
}

export { UptimeService };
