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
    charityamountGoal: number;
  }

  const CharityForm: React.FC<CharityFormProps> = ({ onSubmit }) => {
    const [charityDetails, setCharityDetails] = useState<CharityDetails>({
      firstName: '',
      lastName: '',
      email: '',
      charityName: '',
      charityDescription: '',
      amountGoal: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCharityDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleCreateCharity = () => {
      // You might want to add validation here

      // Call the onSubmit callback with the charity details
      onSubmit(charityDetails);
    };

