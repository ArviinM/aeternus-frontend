import React, { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserService from "../../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";
import { TabTitle } from "../../utils/GenerateFunctions";
import { Toast } from "primereact/toast";
import { string } from "yup/lib/locale";

const Register: React.FC = () => {
  TabTitle("Aeternus – Register");
  let navigate = useNavigate();
  const Props = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useRef<any>(null);
  const [message, setMessage] = useState<string>("");
  const initialValues: {
    first_name: string;
    last_name: string;
    username: string;
    address: string;
    contact_no: string;
    email: string;
    password: string;
  } = {
    first_name: "",
    last_name: "",
    username: "",
    address: "",
    contact_no: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("This field is required!"),
    last_name: Yup.string().required("This field is required!"),
    username: Yup.string().required("This field is required!"),
    address: Yup.string().required("This field is required!"),
    contact_no: Yup.string().required("This field is required!"),
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleRegister = (formValue: {
    first_name: string;
    last_name: string;
    username: string;
    address: string;
    contact_no: string;
    email: string;
    password: string;
  }) => {
    const data = formValue;

    setMessage("");
    setLoading(true);

    UserService.register(data).then(
      () => {
        toast.current.show({
          severity: "Success",
          summary: "Success",
          detail: "Successfully Registered!",
          life: 5000,
        });

        navigate("/login");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
        toast.current.show({
          severity: "error",
          summary: "Error!",
          detail: resMessage,
          life: 5000,
        });
      }
    );
  };

  return (
    <div className="min-h-full h-screen flex overflow-hidden tracking-wider ">
      <Toast ref={toast} />
      <div className="hidden lg:block relative flex-1 w-2/5">
        <img
          className="absolute inset-0 h-full w-full object-cover brightness-50"
          src="http://localhost:5000/public/register-bg.jpg"
          alt="logo-bg"
        />

        <div className="h-3/6">
          <a href="http://localhost:3000/">
            <img
              className="mt-16 max-w-lg m-auto relative w-80 animate-float rounded-full"
              src="aeternus-logo-dark-circle.png"
              alt="logo-bg"
            />
          </a>
        </div>
        <div className="h-3/6 tracking-wider">
          <div className="mt-8 w-full max-w-lg m-auto relative px-10 lg:px-6">
            <h2 className="mt-8 text-4xl font-extrabold font-primary text-white">
              Powerful, Easy to Use{" "}
              <span className="text-blue-400">Cemetery Software</span>
            </h2>
            <h2 className="mt-1 text-lg font-secondary font-bold text-gray-200">
              Making cemetery mapping and providing information easier with
              tools that are easy to use. Complete features and services for all
              types of cemetery.
            </h2>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-3/5">
        <div className="mx-auto w-max">
          <div>
            <h2 className="sm:mt-6 mt-2 text-3xl font-extrabold font-primary text-blue-600 text-center sm:text-5xl ">
              Welcome To Aeternus
            </h2>
            <h2 className="mt-1 sm:text-lg text-base font-secondary text-gray-900 text-center ">
              Sign up by entering the information below
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              <div className="mt-8 w-full max-w-sm lg:w-96 m-auto">
                <div className="mt-6">
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="first_name"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        First Name
                      </label>
                      <div className="mt-1">
                        <Field
                          id="first_name"
                          name="first_name"
                          type="text"
                          autoComplete="first_name"
                          placeholder="e.g. John"
                          required
                          className="appearance-none font-primary block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="first_name"
                          component="p"
                          className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="last_name"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        Last Name
                      </label>
                      <div className="mt-1">
                        <Field
                          id="last_name"
                          name="last_name"
                          type="text"
                          autoComplete="last_name"
                          placeholder="e.g. Doe"
                          required
                          className="appearance-none font-primary block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="last_name"
                          component="p"
                          className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="username"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        Username
                      </label>
                      <div className="mt-1">
                        <Field
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="username"
                          required
                          placeholder="e.g. JohnDoe"
                          className="appearance-none font-primary block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="username"
                          component="p"
                          className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="address"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <Field
                          id="address"
                          name="address"
                          type="text"
                          autoComplete="address"
                          placeholder="e.g. 1000 Doe Bldg. John St, Brgy. Moon, Carmona, Cavite"
                          required
                          className="appearance-none font-primary block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="address"
                          component="p"
                          className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="contact_no"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        Contact Number
                      </label>
                      <div className="mt-1">
                        <Field
                          id="contact_no"
                          name="contact_no"
                          type="number"
                          autoComplete="contact_no"
                          placeholder="09217300521"
                          required
                          className="appearance-none font-primary block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="contact_no"
                          component="p"
                          className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="email"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="e.g. johndoe@email.aeternus.com"
                          required
                          className="appearance-none font-primary block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="email"
                          component="p"
                          className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          placeholder="Password"
                          required
                          className="appearance-none font-primary block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="password"
                          component="p"
                          className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <Field
                          id="confirm_password"
                          name="confirm_password"
                          type="password"
                          placeholder="Confirm Password"
                          required
                          className="appearance-none font-primary block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="password"
                          component="p"
                          className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm font-primary text-gray-900"
                        >
                          I've read and accept the terms & conditions?{" "}
                          <span className="text-red-500 ">*</span>
                        </label>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Sign up
                      </button>
                      {/* {localStorage.getItem("user")} */}
                    </div>

                    <div className="text-md font-primary text-center">
                      <label htmlFor="">
                        Already have an account?{" "}
                        <a
                          className="underline text-base font-medium"
                          href="http://localhost:3000/login"
                        >
                          Login here!
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
