import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignUp: React.FC = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "regular",
  };

  const validate = (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }) => {
    const errors: {
      email?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
      role?: string;
    } = {};

    if (!values.firstName) {
      errors.firstName = "first name Required";
    }

    if (!values.lastName) {
      errors.lastName = "last name Required";
    }

    if (!values.role) {
      errors.role = "last name Required";
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

  const onSubmit = (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
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
                name="firstName"
                placeholder="First Name"
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-rose-600"
              />

              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="lastName"
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-12 bg-white text-purple-900 w-full h-14 rounded-lg font-metrophobic font-bold mb-3"
              >
                Login
              </button>
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
