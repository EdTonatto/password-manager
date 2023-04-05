import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { Connection } from 'mongoose';
import { MongoPingProvider } from 'src/app/uptime/dataprovider/mongoping.provider';
import { MongoPingDataProvider } from 'src/domain/uptime/dataprovider/mongoping.dataprovider';

describe('MongoPingDataProvider', () => {
  const connection = mock<Connection>();
  let mongoPingDataProvider: MongoPingDataProvider;

  beforeEach(async () => {
    mongoPingDataProvider = new MongoPingProvider(connection);
  });

  it('should be defined', () => {
    expect(mongoPingDataProvider).toBeDefined();
  });
});
