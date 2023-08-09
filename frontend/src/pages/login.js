import { Fragment } from "react";
import LoginForm from "../components/loginComponents/loginform";
import Header from "../components/loginComponents/header";

const Login = () => {
  return (
    <Fragment>
      <header className="navbarOne">
        <div className="container-x container-common">
          <Header />
        </div>
      </header>

      <div className="row  ">
        <div className="col-md-4  d-flex  align-items-center">
          <LoginForm />
        </div>

        <div className="col-md-8 h-100">
          <img
            src="/images/heart-2.jpg"
            alt="img of road"
            className="responsive"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
