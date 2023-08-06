import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Image } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  username: yup.string().required("Please Provide a User Name."),
  emailaddress: yup.string().email().required("Please Provide a Valid Email."),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match."),
 
});

const SignupForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("emailaddress", data.emailaddress);

    formData.append("password", data.password);

    try {
      const { data } = await axios.post("/api/loginpage/logindata", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        reset();
        setImageUrl("");

        localStorage.setItem("token", JSON.stringify(`${data.jwttoken}`));
        return navigate("/");
      }
      setErr(data.message);
    } catch (error) {
      console.log("this is the current error:", error);
    }
  };

  const handlePreview = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <Fragment>
      <form className="form " onSubmit={handleSubmit(onSubmit)}>
        <p className="text-danger">{err}</p>

        <label htmlFor="USERNAME">User Name</label>
        <input
          type={"text"}
          className="inputforusername mb-2"
          placeholder="john"
          name="username"
          {...register("username")}
        />
        <p className="text-danger">{errors.username?.message} </p>

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
          name="password"
          placeholder="Password"
          {...register("password")}
        />
        <p className="text-danger">{errors.password?.message} </p>

        <label htmlFor="CONFORM PASSWORD">Confirm Password</label>
        <input
          type={"password"}
          className="inputforconfirmpassword"
          name="confirmpassword"
          placeholder="Confirm Password"
          {...register("confirmpassword")}
        />
        <p className="text-danger">
          {errors.confirmpassword && "passwords does not Match !"}{" "}
        </p>

        <button type="submit" className="btn  primary-x">
          Sign-up
        </button>
      </form>
    </Fragment>
  );
};

export default SignupForm;
