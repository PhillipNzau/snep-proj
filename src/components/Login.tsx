import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../services/auth";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  // Initialize the useUser hook to manage user-related data
  // const { addUser } = useUser();
  // Initialize a state variable to manage error messages
  const [error, setError] = useState<string | null>(null);

  // Define the initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Define a function to validate form input fields
  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    // Validate the email field
    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    // Validate the password field
    if (!values.password) {
      errors.password = "Password Required";
    }

    return errors;
  };

  // Define the form submission handler
  const onSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      // Call the login function to authenticate the user
      const user = await LOGIN_USER(values);

      // Disable the submit button to prevent multiple submissions
      setSubmitting(false);
      // Add the authenticated user to the user context

      login(user);
      // Redirect to a specific route upon successful login
      navigate("/");
      // Clear any previous error messages
      setError(null);
    } catch (error) {
      // Handle login failure by displaying an error message
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center mx-6 bg-purple-900 md:w-[562px] h-[530px] rounded-xl md:mx-auto">
      <div className="w-[379px]">
        <img
          src="/footer-logo.png"
          alt="logo"
          width={197}
          height={74}
          className="mx-auto mb-11"
        />

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email input field */}
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-rose-600"
              />

              {/* Password input field */}
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic mt-4 w-full h-14"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-rose-600"
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-12 bg-white text-purple-900 w-full h-14 rounded-lg font-metrophobic font-bold mb-3 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              {/* Display error message if there is one */}
              {error && <p className="text-red-500">{error}</p>}

              {/* Sign-up link */}
              <p className="text-white font-metrophobic">
                Don't have an account?{" "}
                <span className="hover:cursor-pointer">
                  <Link to="/register">Sign-up</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
