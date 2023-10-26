import { useUser } from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { DONATE } from "../services/donate";

const DonateToCharity: React.FC = () => {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();

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
    user_id: "",
    amount: "",
    is_anonymous: false,
    charity_id: "",
  };

  // Define a function to validate form input fields
  const validate = (values: { amount: string; is_anonymous: boolean }) => {
    const errors: { amount?: string; is_anonymous?: string } = {};

    // Validate the interval field
    // if (!values.interval) {
    //   errors.interval = "interval Required";
    // }

    // Validate the amount field
    if (!values.amount) {
      errors.amount = "amount Required";
    }

    // Validate the anonymous field
    if (!values.is_anonymous) {
      errors.is_anonymous = "anonymous Required";
    }
    return errors;
  };

  // Define the form submission handler
  const onSubmit = async (
    values: { amount: string; is_anonymous: boolean },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // navigate("https://donate.stripe.com/test_14k9CFcui85Y9uo8ww");

    try {
      // Call the login function to authenticate the user

      const donateValues = {
        ...values,
        charity_id: id,
        user_id: user!.id,
      };
      console.log("well", donateValues);

      const donateData = await DONATE(donateValues);

      // Disable the submit button to prevent multiple submissions
      setSubmitting(false);
      // Add the authenticated user to the user context

      // Clear any previous error messages
      setError(null);
      navigate("/");
      return donateData;
    } catch (error) {
      // Handle login failure by displaying an error message
      setError("Donation failed");
    }
  };

  // check if user is logged in
  if (!user) {
    return null;
  }

  return (
    <section className="mx-4 md:w-[64%] md:mx-auto mb-24">
      <div className="flex items-center gap-4 mb-10 text-zinc-400 self-start font-metrophobic">
        <p>Donating to Charity name</p>
        <div className="bg-zinc-300 h-[1px] w-20 md:w-[260px]"></div>
      </div>

      {/* donation form */}
      <div className="flex justify-center items-center bg-purple-900 md:w-full rounded-xl md:mx-auto p-6 ">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col  space-y-4  w-full h-full">
              {/* interval input field */}
              <div
                role="group"
                aria-labelledby="my-radio-group"
                className="flex gap-4 w-full "
              >
                <div className="inline-block radio w-full">
                  <Field
                    type="radio"
                    name="is_anonymous"
                    id="A1"
                    value="true"
                    checked
                    hidden="hidden"
                  />
                  <label
                    htmlFor="A1"
                    className="px-2 py-1 h-14 rounded-lg flex justify-center items-center text-base w-full"
                  >
                    Give Named
                  </label>
                </div>
                <div className="inline-block radio w-full">
                  <Field
                    type="radio"
                    name="is_anonymous"
                    id="B1"
                    value="false"
                    hidden="hidden"
                    className="w-1/2"
                  />
                  <label
                    htmlFor="B1"
                    className="px-2 py-1 h-14 rounded-lg flex justify-center items-center text-base  w-full "
                  >
                    Give Anonymously
                  </label>
                </div>
              </div>

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

              {/* <label className="flex gap-2 text-white">
                <Field
                  type="checkbox"
                  name="toggle"
                  className="relative peer shrink-0
                  appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white
                  mt-1
                  checked:bg-blue-800 checked:border-0 "
                />
                Donate Anonymously
              </label> */}
              {/* <div className="flex gap-2 text-white">
                <Field
                  id="some_id"
                  type="checkbox"
                  name="is_anonymous"
                  className="  relative peer shrink-0
                  appearance-none w-4 h-4 border-2 border-purple-500 rounded-sm bg-white
                  mt-1
                  checked:bg-purple-800 checked:border-0
                  focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100
                  disabled:border-steel-400 disabled:bg-steel-400"
                />
                <label htmlFor="some_id">Donate Anonymously </label>
                <svg
                  className="
                    absolute 
                    w-4 h-4 mt-1
                    hidden peer-checked:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div> */}
              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                // onClick={handleThis}
                className={`mt-12 text-white bg-slate-900 w-full h-14 rounded-lg font-metrophobic font-bold mb-3 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Donate"}
              </button>
              {/* <a
                href="https://donate.stripe.com/test_14k9CFcui85Y9uo8ww"
                target="_blank"
                type="submit"
                // onClick={handleThis}
                className={`mt-12 text-white bg-slate-900 w-full h-14 rounded-lg font-metrophobic font-bold mb-3 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Donate"}
              </a> */}

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
