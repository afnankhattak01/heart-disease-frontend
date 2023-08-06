import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.css";
import axiosPublic from "../../helpers/axiosPublic";

const schema = yup.object().shape({
  emailaddress: yup.string().email().required("Please Provide a Valid Email."),
  password: yup.string().required("Please Provide a Password."),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (userLoginData) => {
    try {
      const { data } = await axiosPublic.post(
        "/api/loginpage/verifyloginpage",
        userLoginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        reset();

        localStorage.setItem("token", JSON.stringify(`${data.jwttoken}`));
        return navigate("/home");
      }
      setErr(data.message);
    } catch (error) {
      console.log("this is the current error:", error);
    }
  };

  return (
    <Fragment>
      <form className="form " onSubmit={handleSubmit(onSubmit)}>
        <p className="text-danger">{err}</p>

        <label htmlFor="EMAIL">Email</label>
        <input
          type={"text"}
          className="inputforemail mb-2"
          placeholder="john@outlook.com"
          name="emailaddress"
          {...register("emailaddress")}
        />
        <p className="text-danger">{errors.emailaddress?.message} </p>
        <label htmlFor="PASSWORD">Password</label>
        <input
          type="password"
          className="inputforpassword"
          placeholder="Password"
          name="password"
          {...register("password")}
        />

        <div className="text-end my-2 ">
          <Link to={"/forgetPassword"} className="frg">
            Forgot Password ?
          </Link>
        </div>
        <p className="text-danger">{errors.password?.message} </p>

        <button type="submit" className="btn  primary-x">
          Sign-in
        </button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
