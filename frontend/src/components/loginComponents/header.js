import { Fragment } from "react";
import { GiHeartInside } from "react-icons/gi";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Fragment>
      <div className="logo p-3">
        <GiHeartInside />{" "}
        <i className="display-5 fs-4 ">Heart Disease Predictor</i>
      </div>
      <ul className="nav">
        <li>
          <Link to={"/user/createaccount/new/signup"}>Sign-up</Link>
        </li>

        <li>
          <Link to={"/"}>Log-in</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Header;
