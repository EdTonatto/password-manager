import { ResponseData } from 'src/shared/response/responsedata';
import { UptimeRestModel } from './restmodel/uptime.restmodel';

abstract class UptimeResource {
  abstract ping(): Promise<ResponseData<UptimeRestModel>>;
}

export { UptimeResource };
