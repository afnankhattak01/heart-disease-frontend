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

    
        <section className="form-login-class ">
          <div className="container-x2 container-common  shadow-lg x-men">
            <div className="formDiv ">
              <LoginForm />
            </div>

            <div className="pic">
              <img
                src="/images/heart-2.jpg"
                alt="img of road"
                className="responsive"

              />
            </div>
          </div>
        </section>
    
    </Fragment>
  );
};

export default Login;
