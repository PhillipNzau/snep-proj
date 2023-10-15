import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { CREATE_STORY } from "@/services/story";

const CreateStory: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if the user is not available, then redirect to "/login"
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const initialValues = {
    name: "",
    description: "",
    // image_url: "",
    // image: null as File | null,
  };

  const validate = (values: {
    name: string;
    description: string;
    // image_url: string;
  }) => {
    const errors: {
      name?: string;
      description?: string;
      // image_url?: string;
    } = {};

    if (!values.name) {
      errors.name = "Beneficiary Name Required";
    }

    if (!values.description) {
      errors.description = "Description Required";
    }

    return errors;
  };

  const onSubmit = async (
    values: {
      name: string;
      description: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const data = {
        ...values,
        charity_id: id,
      };
      // Call the login function to authenticate the user
      const story = await CREATE_STORY(data);
      // setSubmitting(false);

      // Disable the submit button to prevent multiple submissions
      setSubmitting(false);
      // Redirect to a specific route upon successful login
      navigate("/charity");
      // Redirect to a specific route upon successful login
      // Clear any previous error messages
      setError(null);
      return story;
    } catch (error) {
      // Handle login failure by displaying an error message
      setError("Creation failed. Please check your data.");
    }
  };

  // const handleSubmit = (values: { image: File | null }) => {
  //   if (values.image) {
  //     // You can now handle the uploaded image (e.g., send it to a server)
  //     console.log("Uploaded image:", values.image);
  //   }
  // };
  return (
    <div className="md:w-[64%] mx-auto px-4 md:px-0">
      {/* header */}
      <div className="flex items-center gap-4 mb-10 text-zinc-400 self-start font-metrophobic">
        <p>Create Story</p>
        <div className="bg-zinc-300 h-[1px] w-52 md:w-[260px]"></div>
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
              <Field
                type="text"
                name="name"
                placeholder="name"
                className="bg-transparent outline-none border border-purple-900  p-2 rounded-lg text-purple-900 font-metrophobic w-full h-14 placeholder:text-purple-900"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-rose-600"
              />

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
                className="mt-8 md:mt-14 bg-white border border-purple-900 text-purple-900 w-full md:w-96 mx-auto h-14 rounded-lg font-metrophobic font-bold mb-3"
              >
                Create Story
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateStory;
