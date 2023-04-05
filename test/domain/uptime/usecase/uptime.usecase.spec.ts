import { mock } from 'jest-mock-extended';
import { MongoPingDataProvider } from 'src/domain/uptime/dataprovider/mongoping.dataprovider';
import { UptimeService } from 'src/domain/uptime/service/uptime.service';
import { UptimeUseCase } from 'src/domain/uptime/usecase/uptime.usecase';

describe('UptimeUseCase', () => {
  const mongoPingDataProvider = mock<MongoPingDataProvider>();
  let usecase: UptimeUseCase;

  beforeEach(() => {
    usecase = new UptimeService(mongoPingDataProvider);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return uptime', async () => {
    mongoPingDataProvider.ping.mockResolvedValue('pong');
    const result = await usecase.ping();
    expect(result).toEqual('pong');
  });

  it('should throw error', async () => {
    mongoPingDataProvider.ping.mockRejectedValue(new Error('error'));
    await expect(usecase.ping()).rejects.toThrowError('error');
  });
});
