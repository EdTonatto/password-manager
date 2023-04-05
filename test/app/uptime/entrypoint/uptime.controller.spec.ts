import { response } from 'express';
import { mock } from 'jest-mock-extended';
import { UptimeController } from 'src/app/uptime/entrypoint/uptime.controller';
import { UptimeUseCase } from 'src/domain/uptime/usecase/uptime.usecase';

describe('UptimeController', () => {
  const uptimeUseCase = mock<UptimeUseCase>();
  let uptimeController: UptimeController;

  beforeEach(() => {
    uptimeController = new UptimeController(uptimeUseCase);
  });

  it('should be defined', () => {
    expect(uptimeController).toBeDefined();
  });

  it('should return a response', async () => {
    uptimeUseCase.ping.mockResolvedValue('pong');
    const expectedResponse = {
      message: 'pong',
    };

    const response = await uptimeController.ping();
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    expect(response.sucess).toBeTruthy();
    expect(response.data.message).toEqual(expectedResponse.message);
  });

  it('should return a response with error', async () => {
    uptimeUseCase.ping.mockRejectedValue(
      new Error('some error on trying to ping'),
    );

    try {
      await uptimeController.ping();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.sucess).toBeFalsy();
      expect(error.message).toEqual('some error on trying to ping');
    }
  });
});
