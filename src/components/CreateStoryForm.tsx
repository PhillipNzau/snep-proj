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

