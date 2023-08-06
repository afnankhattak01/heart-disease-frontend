import axios from "axios";
import { Fragment, useState } from "react";
import Header from "../components/loginComponents/header";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [messages, setmMssage] = useState("");

  const { resettoken } = useParams();

  const navigate = useNavigate();
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password === "") {
      return message.error("Please Provide a Valid Email Address");
    }

    try {
      let data = {
        password,
        resettoken,
      };
      const resp = await axios.post("/api/verify/resetPasswrd", data);

      setmMssage("Password Changed Successfully!");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      // console.log(error.response)
      message.error("Failed to  Update Password !");
    }
  };

  return (
    <Fragment>
      <header className="navbarOne">
        <div className="container-x container-common ">
          <Header />
        </div>
      </header>

      <div className="container ">
        <div
          className="row  justify-content-center align-items-center"
          style={{ height: "calc(100vh - 190px)" }}
        >
          <div className="col-md-5 col-12 shadow-lg p-5  rounded">
            <form>
              <p className="text-danger fw-bold">{messages}</p>
              <label className="form-label">New Password</label>
              <input
                className="form-control"
                placeholder="New Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="text-end">
                <button
                  className="btn btn-primary mt-3 "
                  type="button"
                  onClick={(e) => {
                    handlePasswordReset(e);
                  }}
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PasswordReset;
