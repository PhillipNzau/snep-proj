import { useUser } from "../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { DONATE } from "../services/donate";

const DonateToCharity: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not available, then redirect to "/login"
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [error, setError] = useState<string | null>(null);

  // Define the initial form values
  const initialValues = {
    interval: "",
    amount: "",
    anonymous: "",
  };

  // Define a function to validate form input fields
  const validate = (values: {
    interval: string;
    amount: string;
    anonymous: string;
  }) => {
    const errors: { interval?: string; amount?: string; anonymous?: string } =
      {};

    // Validate the interval field
    if (!values.interval) {
      errors.interval = "interval Required";
    }

    // Validate the amount field
    if (!values.amount) {
      errors.amount = "amount Required";
    }

    // Validate the anonymous field
    if (!values.anonymous) {
      errors.anonymous = "anonymous Required";
    }
    return errors;
  };

  // Define the form submission handler
  const onSubmit = async (
    values: { interval: string; amount: string; anonymous: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      // Call the login function to authenticate the user
      const donateData = await DONATE(values);
      // Disable the submit button to prevent multiple submissions
      setSubmitting(false);
      // Add the authenticated user to the user context

      console.log("donte data res", donateData);

      // Redirect to a specific route upon successful login
      navigate("/");
      // Clear any previous error messages
      setError(null);
    } catch (error) {
      // Handle login failure by displaying an error message
      setError("Login failed. Please check your credentials.");
    }
  };

  // check if user is logged in
  if (!user) {
    return null; // You can return null or a loading indicator here
  }

  return (
    <section className="w-[64%] mx-auto ">
      <div className="flex items-center gap-4 mb-10 text-zinc-400 self-start font-metrophobic">
        <p>Donating to Charity name</p>
        <div className="bg-zinc-300 h-[1px] w-[260px]"></div>
      </div>

      {/* donation form */}
      <div className="flex justify-center items-center mx-6 bg-purple-900 md:w-full h-[530px] rounded-xl md:mx-auto">
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

              {/* amount input field */}
              <Field
                type="text"
                name="amount"
                placeholder="amount"
                className="bg-white outline-none p-2 rounded-lg text-purple-900 font-metrophobic mt-4 w-full h-14 placeholder:text-purple-900"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-rose-600"
              />

              <label className="flex gap-2 text-white">
                <Field type="checkbox" name="toggle" />
                Donate Anonymously
              </label>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-12 text-white bg-slate-900 w-full h-14 rounded-lg font-metrophobic font-bold mb-3 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Donate"}
              </button>

              {/* Display error message if there is one */}
              {error && <p className="text-red-500">{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default DonateToCharity;
