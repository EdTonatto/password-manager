import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Password } from 'src/app/password/dataprovider/model/password.model';
import { PasswordProvider } from 'src/app/password/dataprovider/password.provider';
import { PasswordRestModel } from 'src/app/password/entrypoint/restmodel/password.restmodel';
import { PasswordDataProvider } from 'src/domain/password/dataprovider/password.dataprovider';

describe('PasswordDataProvider', () => {
  let passwordDataProvider: PasswordDataProvider;
  const passwordModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PasswordProvider,
        {
          provide: getModelToken(Password.name),
          useValue: passwordModel,
        },
      ],
    }).compile();

    passwordDataProvider = await moduleRef.resolve<PasswordProvider>(
      PasswordProvider,
    );
  });

  it('should be defined', () => {
    expect(passwordDataProvider).toBeDefined();
  });

  it('should create a password', async () => {
    const passwordRestModel: PasswordRestModel = {
      application: 'application',
      username: 'username',
      password: 'password',
    };
    passwordModel.create.mockResolvedValueOnce(passwordRestModel);
    const result = await passwordDataProvider.create(passwordRestModel);
    expect(result).toEqual(passwordRestModel);
  });
});
