import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
import { mock } from 'jest-mock-extended';
import { UserDataProvider } from 'src/domain/user/dataprovider/user.dataprovider';
import { AuthError } from 'src/domain/user/error/auth.error';
import { AuthService } from 'src/domain/user/service/auth.service';
import { AuthUseCase } from 'src/domain/user/usecase/auth.usecase';

describe('AuthUseCase', () => {
  const userDataProvider = mock<UserDataProvider>();
  const jwtService = mock<JwtService>();
  let usecase: AuthUseCase;

  beforeEach(() => {
    usecase = new AuthService(userDataProvider, jwtService);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should return a token', async () => {
    const userDb = {
      name: 'Test User',
      email: 'testemail@email.com',
      password: await hash('123456', 8),
    };

    const userAuth = {
      email: 'testemail@email.com',
      password: '123456',
    };

    userDataProvider.findByEmail.mockResolvedValue(userDb);
    jwtService.signAsync.mockResolvedValue('valid_token');
    const response = await usecase.execute(userAuth.email, userAuth.password);
    expect(response).toBeDefined();
    expect(response.email).toEqual(userAuth.email);
    expect(response.token).toEqual('valid_token');
  });

  it('should return error when user not exists', async () => {
    userDataProvider.findByEmail.mockResolvedValue(null);
    try {
      await usecase.execute('email', 'password');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual(
        'Error authenticating user. Error: Invalid user or password',
      );
    }
  });

  it('should return error when password not match', async () => {
    const userDb = {
      name: 'Test User',
      email: 'testemail@email.com',
      password: await hash('123456', 8),
    };

    const userAuth = {
      email: 'testemail@email.com',
      password: '123456',
    };

    userDataProvider.findByEmail.mockResolvedValue(userDb);
    try {
      await usecase.execute(userAuth.email, 'wrong_password');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual(
        'Error authenticating user. Error: Invalid user or password',
      );
    }
  });
});
