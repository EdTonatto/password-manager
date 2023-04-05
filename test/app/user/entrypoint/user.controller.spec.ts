import { mock } from 'jest-mock-extended';
import { UserController } from 'src/app/user/entrypoint/user.controller';
import { UserResource } from 'src/app/user/entrypoint/user.resource';
import { CreateUserError } from 'src/domain/user/error/createuser.error';
import { CreateUserUseCase } from 'src/domain/user/usecase/createuser.usecase';

describe('UserController', () => {
  const createUserUseCase = mock<CreateUserUseCase>();
  let controller: UserResource;

  beforeEach(() => {
    controller = new UserController(createUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a user', async () => {
    const user = {
      name: 'Test User',
      email: 'testuser@test.com',
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
});
