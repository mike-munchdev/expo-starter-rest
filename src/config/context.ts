import { createContext } from 'react';

export const AuthContext = createContext({
  signIn: async (token: string) => {},
  signOut: async () => {},
  signUp: async () => {},
  setIsStarted: async (value: boolean) => {},
  getIsStarted: async () => {
    return false;
  },
});

export const AppContext = createContext({
  user: null,
  setUserContext: async (user: any) => {},
  setCurrentThemeContext: async (theme: any) => {},
});
