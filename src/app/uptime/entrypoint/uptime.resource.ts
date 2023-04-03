import { UptimeRestModel } from './restmodel/uptime.restmodel';

abstract class UptimeResource {
  abstract ping(): Promise<UptimeRestModel>;
}

export { UptimeResource };
