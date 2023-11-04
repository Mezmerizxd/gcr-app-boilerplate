import * as rqa from 'react-query-auth';

import { engine } from './engine';
import storage from './storage';
import { Spinner } from '../components/Elements';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
}

interface AuthConfig {
  account: Account | null;
  profile: Profile | null;
  error: string | null;
}

async function loadUser(): Promise<AuthConfig> {
  return null;
}

async function loginFn(data: LoginCredentials): Promise<AuthConfig> {
  return {
    account: null,
    profile: null,
    error: 'Auth not setup',
  };
}

async function registerFn(data: RegisterCredentials): Promise<AuthConfig> {
  return {
    account: null,
    profile: null,
    error: 'Auth not setup',
  };
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  },
};

export const { AuthProvider, useAuth } = rqa.initReactQueryAuth<
  AuthConfig,
  unknown,
  LoginCredentials,
  RegisterCredentials
>(authConfig);
