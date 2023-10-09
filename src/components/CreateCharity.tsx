import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ImageUpload from "./ImageUpload";

const CreateCharity: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the user is not available, then redirect to "/login"
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const initialValues = {
    first_name: "",
    last_name: "",
    charity_name: "",
    email: "",
    description: "",
    image: null as File | null,
  };

  const validate = (values: {
    first_name: string;
    last_name: string;
    charity_name: string;
    email: string;
    description: string;
  }) => {
    const errors: {
      first_name?: string;
      last_name?: string;
      charity_name?: string;
      email?: string;
      description?: string;
    } = {};

    if (!values.first_name) {
      errors.first_name = "First Name Required";
    }
    if (!values.last_name) {
      errors.last_name = "Last Name Required";
    }
    if (!values.charity_name) {
      errors.charity_name = "Charity Name Required";
    }

    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.description) {
      errors.description = "Description Required";
    }

    return errors;
  };

  const onSubmit = (
    values: {
      first_name: string;
      last_name: string;
      charity_name: string;
      email: string;
      description: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  //   const handleSubmit = (values: { image: File | null }) => {
  //     if (values.image) {
  //       // You can now handle the uploaded image (e.g., send it to a server)
  //       console.log("Uploaded image:", values.image);
  //     }
  //   };
  return (
    <div className="w-[64%] mx-auto ">
      {/* header */}
      <div className="flex items-center gap-4 mb-10 text-zinc-400 self-start font-metrophobic">
        <p>Create Charity</p>
        <div className="bg-zinc-300 h-[1px] w-[260px]"></div>
      </div>

      {/* story form */}
      <div>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-8">
              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <Field
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    className="bg-transparent outline-none border border-purple-900  p-2 rounded-lg text-purple-900 font-metrophobic w-full h-14 placeholder:text-purple-900"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-rose-600"
                  />
                </div>
                <div className="w-full">
                  <Field
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    className="bg-transparent outline-none border border-purple-900  p-2 rounded-lg text-purple-900 font-metrophobic w-full h-14 placeholder:text-purple-900"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-rose-600"
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-transparent outline-none border border-purple-900  p-2 rounded-lg text-purple-900 font-metrophobic w-full h-14 placeholder:text-purple-900"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-rose-600"
                  />
                </div>

                <div className="w-full">
                  <Field
                    type="text"
                    name="charity_name"
                    placeholder="Charity Name"
                    className="bg-transparent outline-none border border-purple-900  p-2 rounded-lg text-purple-900 font-metrophobic w-full h-14 placeholder:text-purple-900"
                  />
                  <ErrorMessage
                    name="charity_name"
                    component="div"
                    className="text-rose-600"
                  />
                </div>
              </div>
              <Field
                as="textarea"
                rows={4}
                name="description"
                placeholder="Description"
                className="bg-transparent outline-none border border-purple-900  p-2 rounded-lg text-purple-900 font-metrophobic  w-full placeholder:text-purple-900"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-rose-600"
              />

              <ImageUpload field="image" />
              {/* <Field type="file" name="image" id="image" accept="image/*" />
              <ErrorMessage name="image" component="div" className="error" /> */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-14 bg-white border border-purple-900 text-purple-900 w-96 mx-auto h-14 rounded-lg font-metrophobic font-bold mb-3"
              >
                Create Charity
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateCharity;
