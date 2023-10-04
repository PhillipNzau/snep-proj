import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import ImageUpload from "./ImageUpload";

const CreateStory: React.FC = () => {
  const initialValues = {
    name: "",
    description: "",
    image: null as File | null,
  };

  const validate = (values: { name: string; description: string }) => {
    const errors: { name?: string; description?: string } = {};

    if (!values.name) {
      errors.name = "Name Required";
    }

    if (!values.description) {
      errors.description = "Description Required";
    }

    return errors;
  };

  const onSubmit = (
    values: { name: string; description: string },
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
        <p>Create Story</p>
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
            <Form>
              <ImageUpload field="image" />
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
                className="bg-transparent outline-none border border-purple-900  p-2 rounded-lg text-purple-900 font-metrophobic mt-4 w-full placeholder:text-purple-900"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-rose-600"
              />

              {/* <Field type="file" name="image" id="image" accept="image/*" />
              <ErrorMessage name="image" component="div" className="error" /> */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-12 bg-white text-purple-900 w-full h-14 rounded-lg font-metrophobic font-bold mb-3"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateStory;
