import React, { useState, useEffect } from 'react';

interface CharityFormProps {
  onsubmit: (formData: CharityFormData) => void;

}

interface CharityFormData {
  firstName: string;
  lastName: string;
  email: string;
  charityName: string;
  charityDescription: string;
  charityAmountGoal: number;
  charityImage: File | null;
}

const CharityForm: React.FC<CharityFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CharityFormData>({
    firstName: '',
    lastName: '',
    email: '',
    charityName: '',
    charityDescription: '',
    charityAmountGoal: 0,
    charityImage: null,
  });
}
