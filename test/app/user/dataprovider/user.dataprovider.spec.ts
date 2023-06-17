import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User } from 'src/app/user/dataprovider/model/user.model';
import { UserProvider } from 'src/app/user/dataprovider/user.provider';
import { UserRestModel } from 'src/app/user/entrypoint/restmodel/user.restmodel';
import { UserDataProvider } from 'src/domain/user/dataprovider/user.dataprovider';

describe('UserDataProvider', () => {
  let userDataProvider: UserDataProvider;
  const mockUserModel = {
    create: jest.fn(),
    save: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserProvider,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
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
    };
    mockUserModel.create.mockResolvedValueOnce(useRestModel);
    const result = await userDataProvider.create(useRestModel);
    expect(result).toEqual(useRestModel);
  });

  it('should find and update a user', async () => {
    const userRestModel: UserRestModel = {
      name: 'test update',
      isAdmin: false,
      email: 'test@test.test',
      password: 'test',
    };

    mockUserModel.findByIdAndUpdate.mockReturnValue({
      populate: jest.fn().mockResolvedValue(userRestModel),
    });

    const result = await userDataProvider.update(userRestModel);
    expect(result).toEqual(userRestModel);
    expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalled();
    expect(mockUserModel.findByIdAndUpdate().populate).toHaveBeenCalled();
  });

  it('should find a user by email', async () => {
    const useRestModel: UserRestModel = {
      name: 'test',
      isAdmin: false,
      email: 'test@test.test',
      password: 'test',
    };
    mockUserModel.findOne.mockResolvedValueOnce(useRestModel);
    const result = await userDataProvider.findByEmail(useRestModel.email);
    expect(result).toEqual(useRestModel);
  });
});
