import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP_USER } from "../services/auth";
import { useAuth } from "../hooks/useAuth";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    firstname: "",
    secondname: "",
    email: "",
    password: "",
    role: "regular",
  };

  const validate = (values: {
    email: string;
    password: string;
    firstname: string;
    secondname: string;
    role: string;
  }) => {
    const errors: {
      email?: string;
      password?: string;
      firstname?: string;
      secondname?: string;
      role?: string;
    } = {};

    if (!values.firstname) {
      errors.firstname = "first name Required";
    }

    if (!values.secondname) {
      errors.secondname = "second name Required";
    }

    if (!values.role) {
      errors.role = "role Required";
    }

    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password Required";
    }

    return errors;
  };

  const onSubmit = async (
    values: {
      email: string;
      password: string;
      firstname: string;
      secondname: string;
      role: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      // Call the login function to authenticate the user
      const user = await SIGNUP_USER(values);
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
      setError("signup failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center mx-6  bg-purple-900 md:w-[562px] min:h-[530px] rounded-xl md:mx-auto py-6">
      <div className="w-[379px]">
        <img
          src="/public/footer-logo.png"
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
            <Form className="flex flex-col gap-2">
              <Field
                type="text"
                name="firstname"
                placeholder="First Name"
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="firstname"
                component="div"
                className="text-rose-600"
              />

              <Field
                type="text"
                name="secondname"
                placeholder="Last Name"
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="secondname"
                component="div"
                className="text-rose-600"
              />

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

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-rose-600"
              />

              <Field
                as="select"
                name="role"
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
              >
                <option value="admin">Admin</option>

                <option value="charity">Charity</option>

                <option value="regular">Regular</option>
              </Field>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-12 bg-white text-purple-900 w-full h-14 rounded-lg font-metrophobic font-bold mb-3 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Signing up..." : "Singup"}
              </button>

              {/* Display error message if there is one */}
              {error && <p className="text-red-500">{error}</p>}

              <p className="text-white font-metrophobic">
                Already have an account?{" "}
                <span className="hover:cursor-pointer">
                  <Link to="/login">login</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
