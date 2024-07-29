import { createContext } from "react";

export interface IAuthContext {
  password: string;
  isVerified: boolean;
  isLoading: boolean;
  setPassword: (_password: string) => void;
  setIsVerified: (_isVerified: boolean) => void;
}

const AuthContext = createContext<IAuthContext>({
  password: "",
  isVerified: false,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPassword: (_password: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsVerified: (_isVerified: boolean) => {},
});

export default AuthContext;
