import { mock } from 'jest-mock-extended';
import { Model } from 'mongoose';
import { UserModel } from 'src/app/user/dataprovider/model/user.model';
import { UserProvider } from 'src/app/user/dataprovider/user.provider';
import { UserDataProvider } from 'src/domain/user/dataprovider/user.dataprovider';

describe('UserDataProvider', () => {
  const userModel = mock<Model<UserModel>>();
  let userDataProvider: UserDataProvider;

  beforeEach(() => {
    userDataProvider = new UserProvider(userModel);
  });

  it('should be defined', () => {
    expect(userDataProvider).toBeDefined();
  });
});
