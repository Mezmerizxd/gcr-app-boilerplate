import * as rqa from 'react-query-auth';
import React from 'react';
import { server } from '../server';
import storage from './storage';
import { Spinner } from '../components/Elements';

interface AuthConfig {
  account: Account | null;
  profile: Profile | null;
  error: string | null;
}

async function loadUser(): Promise<AuthConfig> {
  if (server.profile !== null) {
    return {
      account: server.account,
      profile: server.profile,
      error: null,
    };
  } else if (storage.getToken() !== null) {
    const profile = await server.GetProfile();
    if (!profile.data) {
      return {
        account: null,
        profile: null,
        error: profile.server.error,
      };
    }
    return {
      account: { ...server.account, ...profile.data },
      profile: profile.data,
      error: null,
    };
  }
  return null;
}

async function loginFn(data: LoginAccountData): Promise<AuthConfig> {
  const account = await server.Login(data);
  if (!account.data) {
    return {
      account: null,
      profile: null,
      error: account.server.error,
    };
  }

  return {
    account: account.data,
    profile: { ...account.data },
    error: null,
  };
}

async function registerFn(data: CreateAccountData): Promise<AuthConfig> {
  const account = await server.Create(data);
  if (!account.data) {
    return {
      account: null,
      profile: null,
      error: account.server.error,
    };
  }

  return {
    account: account.data,
    profile: { ...account.data },
    error: null,
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
  LoginAccountData,
  CreateAccountData
>(authConfig);
