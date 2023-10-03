import React, { useState } from 'react';

interface CreateStoryFormProps {

    onSubmit: (storyDetails: StoryDetails) => void;
}

interface StoryDetails {
    beneficiaryName: string;
    beneficiaryDescription: string;
  }

