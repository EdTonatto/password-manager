/* eslint-disable @typescript-eslint/no-var-requires */
import { Controller, Get, Injectable, Scope } from '@nestjs/common';
import { UptimeUseCase } from 'src/domain/uptime/usecase/uptime.usecase';
import { UptimeRestModel } from './restmodel/uptime.restmodel';
import { UptimeResource } from './uptime.resource';

@Controller('/uptime')
@Injectable({ scope: Scope.REQUEST })
class UptimeController implements UptimeResource {
  constructor(private readonly uptimeUseCase: UptimeUseCase) {}

  @Get('/')
  async ping(): Promise<UptimeRestModel> {
    try {
      const response = await this.uptimeUseCase.ping();
      return new UptimeRestModel(response);
    } catch (error) {
      return new UptimeRestModel(error.message);
    }
  }
}

export { UptimeController };
