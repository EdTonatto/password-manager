import { mock } from 'jest-mock-extended';
import { UserDataProvider } from 'src/domain/user/dataprovider/user.dataprovider';
import { CreateUserService } from 'src/domain/user/service/createuser.service';
import { CreateUserUseCase } from 'src/domain/user/usecase/createuser.usecase';

describe('CreateUserUseCase', () => {
  const userDataProvider = mock<UserDataProvider>();
  let usecase: CreateUserUseCase;

  beforeEach(() => {
    usecase = new CreateUserService(userDataProvider);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return a user', async () => {
    const user = {
      name: 'Test User',
      email: 'testuser@test.com',
      isAdmin: false,
      password: '123456',
    };
    userDataProvider.findByEmail.mockResolvedValue(null);
    userDataProvider.create.mockResolvedValue(user);
    const response = await usecase.execute(user);

    expect(response).toBeDefined();
    expect(response.name).toEqual(user.name);
    expect(response.email).toEqual(user.email);
    expect(response.email).toBeDefined();
  });

  it('should return error when user already exists', async () => {
    const user = {
      name: 'Test User',
      email: 'testuser@test.com',
      isAdmin: false,
      password: '123456',
    };
    userDataProvider.findByEmail.mockResolvedValue(user);
    try {
      await usecase.execute(user);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual(
        'Error creating user. Error: User already exists',
      );
    }
  });

  it('should return error when creating user', async () => {
    const user = {
      name: 'Test User',
      email: 'testuser@test.com',
      isAdmin: false,
      password: '123456',
    };
    userDataProvider.findByEmail.mockResolvedValue(null);
    userDataProvider.create.mockImplementation(() => {
      throw new Error('Error while creating and saving user');
    });

    try {
      await usecase.execute(user);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual(
        'Error creating user. Error: Error while creating and saving user',
      );
    }
  });
});
