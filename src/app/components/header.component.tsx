import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="header__logo" to={"/"}>
            Olha Charuk
          </Link>
          <div className="header__menu">
            <Link className="header__menu-item" to={"/work"}>
              Work
            </Link>
            <Link className="header__menu-item" to={"/info"}>
              Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
