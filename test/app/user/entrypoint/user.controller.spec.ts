import { mock } from 'jest-mock-extended';
import { UserController } from 'src/app/user/entrypoint/user.controller';
import { UserResource } from 'src/app/user/entrypoint/user.resource';
import { AuthError } from 'src/domain/user/error/auth.error';
import { CreateUserError } from 'src/domain/user/error/createuser.error';
import { AuthUseCase } from 'src/domain/user/usecase/auth.usecase';
import { CreateUserUseCase } from 'src/domain/user/usecase/createuser.usecase';

describe('UserController', () => {
  const createUserUseCase = mock<CreateUserUseCase>();
  const authUseCase = mock<AuthUseCase>();
  let controller: UserResource;

  beforeEach(() => {
    controller = new UserController(createUserUseCase, authUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a user', async () => {
    const user = {
      name: 'Test User',
      email: 'testuser@test.com',
      isAdmin: false,
      password: '123456',
    };

    createUserUseCase.execute.mockResolvedValue(user);
    const response = await controller.create(user);
    expect(response).toBeDefined();
    expect(response.sucess).toBeTruthy();
    expect(response.data).toBeDefined();
    expect(response.data.name).toEqual(user.name);
    expect(response.data.email).toEqual(user.email);
  });

  it('should return error when user already exists', async () => {
    const user = {
      name: 'Test User',
      email: 'testuser@test.com',
      isAdmin: false,
      password: '123456',
    };

    createUserUseCase.execute.mockImplementation(() => {
      throw new CreateUserError('User already exists');
    });

    try {
      await controller.create(user);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.success).toBeFalsy();
      expect(error.message).toEqual(
        'Error creating user. Error: User already exists',
      );
    }
  });

  it('should return a token', async () => {
    const userAuthReq = {
      email: 'testemail@email.com',
      password: '123456',
      isAdmin: false,
      token: '',
    };

    const userAuthRes = {
      email: 'testemail@email.com',
      password: '',
      isAdmin: false,
      token: 'valid_token',
    };

    authUseCase.execute.mockResolvedValue(userAuthRes);
    const response = await controller.auth(userAuthReq);
    expect(response).toBeDefined();
    expect(response.sucess).toBeTruthy();
    expect(response.data).toBeDefined();
    expect(response.data.email).toEqual(userAuthReq.email);
    expect(response.data.token).toEqual(userAuthRes.token);
  });

  it('should return error when user or password invalid', async () => {
    authUseCase.execute.mockImplementation(() => {
      throw new AuthError('Invalid user or password');
    });
    try {
      await controller.auth({
        email: 'email',
        password: 'password',
        isAdmin: false,
        token: '',
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.success).toBeFalsy();
      expect(error.message).toEqual(
        'Error authenticating user. Error: Invalid user or password',
      );
    }
  });
});
