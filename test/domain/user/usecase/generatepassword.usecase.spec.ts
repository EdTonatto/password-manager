import { mock } from 'jest-mock-extended';
import { PasswordDataProvider } from 'src/domain/password/dataprovider/password.dataprovider';
import { UserDataProvider } from 'src/domain/user/dataprovider/user.dataprovider';
import { GeneratePasswordService } from 'src/domain/user/service/generatepassword.service';
import { GeneratePasswordUseCase } from 'src/domain/user/usecase/generatepassword.usecase';

describe('GeneratePasswordUseCase', () => {
  const passwordDataProvider = mock<PasswordDataProvider>();
  const userDataProvider = mock<UserDataProvider>();

  let usecase: GeneratePasswordUseCase;

  beforeEach(() => {
    usecase = new GeneratePasswordService(
      passwordDataProvider,
      userDataProvider,
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should generate and save a password for the user', async () => {
    const userEmail = 'test@example.com';
    const passwordGenerate = {
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      excludeSimilarCharacters: true,
      application: 'Test Application',
      username: 'testuser',
    };
    const generatedPassword = 'generated-password';
    const savedPassword = {
      application: passwordGenerate.application,
      username: passwordGenerate.username,
      password: generatedPassword,
    };
    const user = {
      name: 'name',
      isAdmin: false,
      email: userEmail,
      password: 'password',
      stored_passwords: [],
    };

    passwordDataProvider.create.mockResolvedValue(savedPassword);
    userDataProvider.findByEmail.mockResolvedValue(user);
    userDataProvider.update.mockResolvedValue(user);

    const result = await usecase.execute(userEmail, passwordGenerate);

    expect(result).toBeDefined();
    expect(result.stored_passwords).toBeDefined();
    expect(result.stored_passwords).toContain(savedPassword);
  });
});
