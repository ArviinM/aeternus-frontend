import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserService from "../../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";
import { TabTitle } from "../../utils/GenerateFunctions";
import { Toast } from "primereact/toast";
import { string } from "yup/lib/locale";

const ChangePassword: React.FC = () => {
  TabTitle("Aeternus – New Password");
  let navigate = useNavigate();
  const Props = useParams();

  const { id, token } = useParams();

  const retrieveUserValidation = () => {
    UserService.getUserValid(id, token)
      .then((response: any) => {
        console.log("User Validated");
      })
      .catch((e: Error) => {
        navigate("*");
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveUserValidation();
  }, []);

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useRef<any>(null);
  const [message, setMessage] = useState<string>("");
  const initialValues: {
    password: string;
    newPassword: string;
  } = {
    password: "",
    newPassword: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("This field is required!")
      .min(4, "Password must be at 4 characters long"),
    newPassword: Yup.string()
      .required("This field is required!")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const handleButton = (formValue: {
    password: string;
    newPassword: string;
  }) => {
    const { password, newPassword } = formValue;

    setMessage("");
    setLoading(true);

    // const currentUser = UserService.getCurrentUser();

    UserService.userChangePW(id, token, password).then(
      (res) => {
        console.log(res);
        toast.current.show({
          severity: "success",
          summary: "Password Changed!",
          detail: "You have successfully changed your password!",
          life: 5000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 5000);
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
          className="absolute inset-0 h-full w-full object-cover brightness-75"
          src="https://aeternus-api.onrender.com/public/password-bg.jpg"
          alt="logo-bg"
        />

        <div className="h-3/6">
          <a href="http://localhost:3000/">
            <img
              className="mt-16 max-w-lg m-auto relative w-80 animate-float rounded-full"
              src="https://aeternus-api.onrender.com/public/logo/aeternus-logo-dark-circle.png"
              alt="logo-dark"
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
              Change Password
            </h2>
            <h2 className="mt-1 sm:text-lg text-base font-secondary text-gray-900 text-center ">
              In order to protect your account make sure your password is
              strong!
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleButton}
          >
            <Form>
              <div className="mt-8 w-full max-w-sm lg:w-96 m-auto">
                <div className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        New Password
                      </label>
                      <div className="mt-1">
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="password"
                          placeholder=""
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
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        Re-enter your password
                      </label>
                      <div className="mt-1">
                        <Field
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          autoComplete="password"
                          placeholder=""
                          required
                          className="appearance-none font-primary block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="newPassword"
                          component="p"
                          className="mt-2 text-sm text-red-600 dark:text-red-500 font-secondary"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Change Password
                      </button>
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

export default ChangePassword;
