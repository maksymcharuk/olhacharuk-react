import { PropsWithChildren, useEffect, useState } from "react";
import AuthContext from "../contexts/auth.context";
import { verifyPassword } from "../../services/auth.service";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { PASSWORD_KEY } from "../../configs/constants";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [password, setPassword] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { get, set } = useLocalStorage();
  const storedPassword = get(PASSWORD_KEY);

  useEffect(() => {
    if (storedPassword) {
      verifyPassword(storedPassword)
        .then(() => {
          set(PASSWORD_KEY, storedPassword);
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
  }, [storedPassword, set]);

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
