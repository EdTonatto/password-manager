import { Injectable } from '@nestjs/common';
import { UserDataProvider } from '../dataprovider/user.dataprovider';
import { AuthUseCase } from '../usecase/auth.usecase';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthError } from '../error/auth.error';
import { UserAuthRestModel } from 'src/app/user/entrypoint/restmodel/userauth.restmodel';

@Injectable()
class AuthService implements AuthUseCase {
  constructor(
    private readonly userProvider: UserDataProvider,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string): Promise<UserAuthRestModel> {
    try {
      const user = await this.userProvider.findByEmail(email);
      if (!user) throw new Error('Invalid user or password');

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) throw new Error('Invalid user or password');

      const token = await this.jwtService.signAsync({
        email: user.email,
        isAdmin: user.isAdmin,
      });
      return new UserAuthRestModel(user.email, user.isAdmin, token);
    } catch (error) {
      throw new AuthError(error.message);
    }
  }
}

export { AuthService };
