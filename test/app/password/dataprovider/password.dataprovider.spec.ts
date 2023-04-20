import { mock } from 'jest-mock-extended';
import { Model } from 'mongoose';
import { Password } from 'src/app/password/dataprovider/model/password.model';
import { PasswordProvider } from 'src/app/password/dataprovider/password.provider';
import { PasswordDataProvider } from 'src/domain/password/dataprovider/password.dataprovider';

describe('PasswordDataProvider', () => {
  const passwordModel = mock<Model<Password>>();
  let passwordDataProvider: PasswordDataProvider;

  beforeEach(() => {
    passwordDataProvider = new PasswordProvider(passwordModel);
  });

  it('should be defined', () => {
    expect(passwordDataProvider).toBeDefined();
  });
});
