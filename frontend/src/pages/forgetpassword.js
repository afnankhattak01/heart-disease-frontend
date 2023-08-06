import axios from "axios";
import { Fragment, useState } from "react";
import Header from "../components/loginComponents/header";
import { message } from "antd";
const ForgetPassword = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [messages, setmMssage] = useState("");

  const handleVerifyEmailAddress = async (e) => {
    e.preventDefault();
    if (emailAddress === "") {
      return message.error("Please Provide a Valid Email Address");
    }

    try {
      let data = {
        emailAddress,
      };
      const resp = await axios.post("/api/verify/verifyemail", data);
      message.success("Password Link Sent Successfully !");
      setmMssage("A Password Reset Link Has been shared on Your Email!");
    } catch (error) {
      console.log(error);
      message.error("Failed to verify the Email Address !");
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
              <label className="form-label">Email Address</label>
              <input
                className="form-control"
                placeholder="Email Address"
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
              />
              <div className="text-end">
                <button
                  className="btn btn-primary mt-3 "
                  type="button"
                  onClick={(e) => {
                    handleVerifyEmailAddress(e);
                  }}
                >
                  Verify Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgetPassword;
