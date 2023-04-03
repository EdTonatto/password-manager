import { Injectable, Scope } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoPingDataProvider } from 'src/domain/uptime/dataprovider/mongoping.dataprovider';

@Injectable({ scope: Scope.REQUEST })
class MongoPingProvider implements MongoPingDataProvider {
  constructor(@InjectConnection() private connection: Connection) {}
  async ping(): Promise<string> {
    await this.connection.db.command({ ping: 1 });
    return 'MongoDB is connected';
  }
}

export { MongoPingProvider };
