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

