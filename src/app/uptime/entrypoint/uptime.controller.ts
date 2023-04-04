/* eslint-disable @typescript-eslint/no-var-requires */
import { Controller, Get, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { UptimeUseCase } from 'src/domain/uptime/usecase/uptime.usecase';
import { ResponseData } from 'src/shared/response/responsedata';
import { UptimeRestModel } from './restmodel/uptime.restmodel';
import { UptimeResource } from './uptime.resource';

@Controller('/uptime')
@Injectable({ scope: Scope.REQUEST })
class UptimeController implements UptimeResource {
  constructor(private readonly uptimeUseCase: UptimeUseCase) {}

  @Get('/')
  async ping(): Promise<ResponseData<UptimeRestModel>> {
    try {
      const response = await this.uptimeUseCase.ping();
      return ResponseData.success(new UptimeRestModel(response));
    } catch (error) {
      throw ResponseData.exception(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

export { UptimeController };
