import { FormEvent, useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import AuthContext from "../contexts/auth.context";
import { Navigate } from "react-router-dom";
import { verifyPassword } from "../../services/auth.service";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { PASSWORD_KEY } from "../../configs/constants";
import Animated from "../animated";
import lock from "../../assets/icons/lock.png";
import { ORIGIN_URL } from "../../configs/constants";

export default function PasswordPage() {
  const [isFormValid, setIsFormValid] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({ password: "" });
  const { isVerified, setIsVerified } = useContext(AuthContext);
  const { set } = useLocalStorage();

  const submit = (e: FormEvent) => {
    e.preventDefault();

    verifyPassword(formData.password)
      .then(() => {
        set(PASSWORD_KEY, formData.password);
        setIsVerified(true);
      })
      .catch(() => {
        setIsVerified(false);
        setIsFormValid(false);
      });
  };

  if (isVerified) {
    return <Navigate to="/work" />;
  }

  return (
    <Animated>
      <Helmet>
        <title>Olha Charuk | Password</title>
        <link rel="canonical" href={`${ORIGIN_URL}/work`} />
      </Helmet>
      <div className="password-page">
        <form className="password-page__form" onSubmit={submit}>
          <div className="password-page__input-wrapper">
            <input
              type="password"
              name="password"
              className="password-page__input"
              placeholder="Enter password"
              onChange={(e) => {
                setIsFormValid(null);
                setFormData({ ...formData, password: e.target.value });
              }}
            />
            <div className="password-page__input-icon-wrapper">
              <img
                className="password-page__input-icon-img"
                src={lock}
                alt="Lock icon"
              />
            </div>
          </div>
          <button type="submit" className="password-page__submit">
            Open
          </button>
        </form>
        {isFormValid !== null && (
          <span className="password-page__error">
            {!isFormValid && "Wrong password"}
          </span>
        )}
      </div>
    </Animated>
  );
}
