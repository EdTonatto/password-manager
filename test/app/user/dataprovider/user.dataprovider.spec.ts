import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import exp from 'constants';
import { Model } from 'mongoose';
import { User } from 'src/app/user/dataprovider/model/user.model';
import { UserProvider } from 'src/app/user/dataprovider/user.provider';
import { UserRestModel } from 'src/app/user/entrypoint/restmodel/user.restmodel';
import { UserDataProvider } from 'src/domain/user/dataprovider/user.dataprovider';

describe('UserDataProvider', () => {
  let userDataProvider: UserDataProvider;
  const mockUserModel = {
    create: jest.fn(),
    save: jest.fn(),
    fndByIdAndUpdate: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserProvider,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        }
      ]
    }).compile();

    userDataProvider = await moduleRef.resolve<UserProvider>(UserProvider);
  });

  it('should be defined', () => {
    expect(userDataProvider).toBeDefined();
  });

  it('should create a user', async () => {
    const useRestModel: UserRestModel = {
      name: 'test',
      isAdmin: false,
      email: 'test@test.test',
      password: 'test',
    }
    mockUserModel.create.mockResolvedValueOnce(useRestModel);
    const result = await userDataProvider.create(useRestModel);
    expect(result).toEqual(useRestModel);
  });
});
