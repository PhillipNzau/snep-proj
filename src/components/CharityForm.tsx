import React, { useState } from 'react';

interface CharityFormProps {
  onSubmit: (charityDetails: CharityDetails) => void;
}

interface CharityDetails {
    firstName: string;
    lastName: string;
    email: string;
    charityName: string;
    charityDescription: string;
    amountGoal: number;
  }

