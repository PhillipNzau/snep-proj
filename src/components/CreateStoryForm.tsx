import React, { useState } from 'react';

interface CreateStoryFormProps {

    onSubmit: (storyDetails: StoryDetails) => void;
}

interface StoryDetails {
    beneficiaryName: string;
    beneficiaryDescription: string;
  }

  const CreateStoryForm: React.FC<CreateStoryFormProps> = ({ onSubmit }) => {
    const [storyDetails, setStoryDetails] = useState<StoryDetails>({
      beneficiaryName: '',
      beneficiaryDescription: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStoryDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
      };

      const handleCreateStory = () => {
        // You might want to add validation here

        // Call the onSubmit callback with the story details
        onSubmit(storyDetails);
      };

return (
        <div>
          <h2>Create Story</h2>
          <label>
            Beneficiary Name:
            <input
              type="text"
              name="beneficiaryName"
              value={storyDetails.beneficiaryName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Beneficiary Description:
            <textarea
              name="beneficiaryDescription"
              value={storyDetails.beneficiaryDescription}
              onChange={handleChange}
            />
          </label>
          <br />
          {/* Add Image Button (You might want to implement this) */}
          <br />
          <button onClick={handleCreateStory}>Post</button>
        </div>
      );
    };

    export default CreateStoryForm;
