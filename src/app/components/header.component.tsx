import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import AuthContext from "../contexts/auth.context";
import lock from "../../assets/icons/lock.png";
import unlock from "../../assets/icons/unlock.png";

const variants = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.1,
    },
  },
};

export default function Header() {
  const { isVerified } = useContext(AuthContext);

  return (
    <motion.div
      className="header"
      initial="initial"
      animate="final"
      variants={variants}
    >
      <div className="container">
        <div className="header__inner">
          <h1>
            <Link className="header__logo" to={"/"}>
              Olha Charuk
            </Link>
          </h1>
          <div className="header__right">
            <div className="header__menu">
              <Link className="header__menu-item" to={"/work"}>
                <span>Work</span>
                <span className="header__menu-item-icon-wrapper">
                  <img
                    className="header__menu-item-icon-img"
                    src={isVerified ? unlock : lock}
                    alt="Verification icon"
                  />
                </span>
              </Link>
              <Link className="header__menu-item" to={"/info"}>
                Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
