import React, { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserService from "../../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";
import { TabTitle } from "../../utils/GenerateFunctions";
import { Toast } from "primereact/toast";

const PasswordReset: React.FC = () => {
  TabTitle("Aeternus – Recover Password");
  let navigate = useNavigate();
  const Props = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const toast = useRef<any>(null);
  const [message, setMessage] = useState<string>("");
  const initialValues: {
    email: string;
  } = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
  });

  const handleButton = (formValue: { email: string }) => {
    const { email } = formValue;

    setMessage("");
    setLoading(true);

    // const currentUser = UserService.getCurrentUser();

    UserService.passwordReset(email).then(
      (res) => {
        console.log(res);
        toast.current.show({
          severity: "success",
          summary: "Email Sent!",
          detail:
            "We have sent an email to " +
            email +
            ". Please click the link when you get it!",
          life: 5000,
        });
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
          src="https://aeternus-api.onrender.com/public/login-bg-2.jpg"
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
              Recover Password
            </h2>
            <h2 className="mt-1 sm:text-lg text-base font-secondary text-gray-900 text-center ">
              Don't worry, happens to the best of us.
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
                        htmlFor="email"
                        className="block text-md font-medium font-primary text-gray-700"
                      >
                        Your Email
                      </label>
                      <div className="mt-1">
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="e.g. johndoe@email.com"
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

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Email Me a Recovery Link
                      </button>
                    </div>

                    <div className="text-md font-primary text-center">
                      <label htmlFor="">
                        Don't have an account?{" "}
                        <a
                          className="underline text-base font-medium"
                          href="http://localhost:3000/register"
                        >
                          Register here!
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

export default PasswordReset;
