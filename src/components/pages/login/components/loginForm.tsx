import React from "react";
import FormInput from "../../../common/form-components/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { axios_post } from "../../../../service/api.service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../../utils";

const LoginForm: React.FC<any> = ({ setIsLoginPage }) => {
  const navigate = useNavigate();

  const loginMutation = useMutation(
    (data) => {
      return axios_post("auth/login", data);
    },
    {
      onSuccess: () => {
        navigate("/blog");
      },
      onError: (error: any) => {
        const message = getErrorMessage(error);
        toast.error(message || "An error occurred");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: (values: any) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080')" }}
    >
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-black text-2xl font-bold text-center mb-6">Login</h2>
        <FormInput
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          formik={formik}
          isRequired={true}
        />

        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          formik={formik}
          isRequired={true}
        />

        <button
          onClick={() => {
            formik.handleSubmit();
          }}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;
