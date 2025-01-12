import { useFormik } from "formik";
import FormInput from "../../../common/form-components/FormInput";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { axios_post } from "../../../../service/api.service";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../../utils";
import { toast, ToastContainer } from "react-toastify";

const RegistrationForm: React.FC<any> = ({ setIsLoginPage }) => {
  const mutation = useMutation(
    (data) => {
      return axios_post("auth/register", data);
    },
    {
      onSuccess: () => {
        toast.success("Register Success");
        setIsLoginPage(true);
      },
      onError: (error: any) => {
        const message = getErrorMessage(error);
        toast.error(message || "An error occurred");
      },
    }
  );

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      phone: Yup.string().required("Mobile Number is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values: any) => {
      const fullName = `${values.first_name} ${values.last_name}`;
      const slug = `${values.first_name} ${values.last_name}`.trim().replace(/\s+/g, "-").toLowerCase();

      const updatedValues = {
        ...values,
        full_name: fullName,
        slug: slug,
      };
      mutation.mutate(updatedValues);
    },
  });
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080')" }}
      >
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          <h2 className="text-black text-2xl font-bold text-center mb-6">Register</h2>
          <FormInput
            name="first_name"
            type="text"
            label="First Name"
            placeholder="Enter your first name"
            formik={formik}
            isRequired={true}
          />

          <FormInput
            name="last_name"
            type="text"
            label="Last Name"
            placeholder="Enter your last name"
            formik={formik}
            isRequired={true}
          />

          <FormInput
            name="email"
            type="text"
            label="Email"
            placeholder="Enter your email address"
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

          <FormInput
            name="confirm_password"
            type="password"
            label="Confirm Password"
            placeholder="Enter your password again"
            formik={formik}
            isRequired={true}
          />
          <FormInput
            name="phone"
            type="number"
            label="Mobile Number"
            placeholder="Enter your mobile number here"
            formik={formik}
            isRequired={true}
          />

          <button
            onClick={() => {
              formik.handleSubmit();
            }}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Register
          </button>
          <div className="flex flex-row gap-4 mt-4">
            <p>Need an account?</p>
            <a
              className=" text-blue-400 no-underline hover:underline hover:text-blue-500 cursor-pointer"
              onClick={() => setIsLoginPage(true)}
            >
              Sign up
            </a>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
