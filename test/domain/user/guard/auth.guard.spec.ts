import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { AuthGuard } from 'src/domain/user/service/auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, JwtService],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('canActivate', () => {
    it('should throw an error if the token is missing', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: {} }),
        }),
      };

      await expect(guard.canActivate(context as any)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an error if the token is invalid', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: { authorization: 'Bearer invalid-token' },
          }),
        }),
      };
      const verifyAsyncSpy = jest
        .spyOn(jwtService, 'verifyAsync')
        .mockRejectedValue(new Error());

      await expect(guard.canActivate(context as any)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(verifyAsyncSpy).toHaveBeenCalledWith('invalid-token', {
        secret: process.env.JWT_SECRET,
      });
    });

    it('should set the user property on the request object if the token is valid', async () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: { authorization: 'Bearer valid-token' },
          }),
        }),
      };
      const user = { id: 1, email: 'test@example.com' };
      const verifyAsyncSpy = jest
        .spyOn(jwtService, 'verifyAsync')
        .mockResolvedValue(user);

      const canActivateResult = await guard.canActivate(context as any);

      expect(canActivateResult).toBe(true);
      expect(verifyAsyncSpy).toHaveBeenCalledWith('valid-token', {
        secret: process.env.JWT_SECRET,
      });
    });
  });

  describe('extractTokenFromHeader', () => {
    it('should return undefined if the Authorization header is missing', () => {
      const request: Request = { headers: {} } as any;

      const result = guard['extractTokenFromHeader'](request);

      expect(result).toBe(undefined);
    });

    it('should return undefined if the Authorization header is invalid', () => {
      const request: Request = {
        headers: { authorization: 'invalid-header' },
      } as any;

      const result = guard['extractTokenFromHeader'](request);

      expect(result).toBe(undefined);
    });

    it('should extract and return the token if the Authorization header is valid', () => {
      const request: Request = {
        headers: { authorization: 'Bearer valid-token' },
      } as any;

      const result = guard['extractTokenFromHeader'](request);

      expect(result).toBe('valid-token');
    });
  });
});
