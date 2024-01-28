import { PropsWithChildren, useEffect, useState } from "react";
import AuthContext from "../contexts/auth.context";
import { verifyPassword } from "../../services/auth.service";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { PASSWORD_KEY } from "../../configs/constants";
import { useSearchParams } from "react-router-dom";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [password, setPassword] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const { get, set } = useLocalStorage();

  const storedPassword = get(PASSWORD_KEY);
  const urlPassword = searchParams.get(PASSWORD_KEY);

  const passwordToVerify = storedPassword || urlPassword;

  useEffect(() => {
    if (passwordToVerify) {
      verifyPassword(passwordToVerify)
        .then(() => {
          set(PASSWORD_KEY, passwordToVerify);
          setIsVerified(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsVerified(false);
          setIsLoading(false);
        });
    } else {
      setIsVerified(false);
      setIsLoading(false);
    }
  }, [passwordToVerify, set]);

  if (isLoading) {
    return <></>;
  }

  return (
    <AuthContext.Provider
      value={{ password, setPassword, isVerified, setIsVerified, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
