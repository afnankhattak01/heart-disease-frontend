import { Fragment } from "react";
import { Link } from "react-router-dom";
const LogButtons = () => {
 
  return (
    <Fragment>
      <div className="d-flex gap-2 justify-content-center">
        <Link to="/page/user/logintoaccount/new/login">
          <button className="btn btn-primary">Login</button>
        </Link>
        <Link to="/user/createaccount/new/signup">
          <button className="btn btn-primary">Sign-up</button>
        </Link>
      </div>
    </Fragment>
  );
};

export default LogButtons;
