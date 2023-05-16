import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { MongoPingProvider } from 'src/app/uptime/dataprovider/mongoping.provider';
import { MongoPingDataProvider } from 'src/domain/uptime/dataprovider/mongoping.dataprovider';

describe('MongoPingDataProvider', () => {
  let mongoPingDataProvider: MongoPingDataProvider;
  const mockConnection = {
    db: {
      command: jest.fn(),
    }
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MongoPingProvider,
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        }
      ]
    }).compile();

    mongoPingDataProvider = await moduleRef.resolve<MongoPingProvider>(MongoPingProvider);
  });

  it('should be defined', () => {
    expect(mongoPingDataProvider).toBeDefined();
  });

  it('should return "MongoDB is connected" if its ok', async () => {
    mockConnection.db.command.mockResolvedValueOnce({ok: 1});
    const result = await mongoPingDataProvider.ping();
    expect(result).toEqual('MongoDB is connected');
  });
});
