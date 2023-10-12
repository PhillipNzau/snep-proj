import React, { useState, useEffect } from 'react';

interface CharityFormProps {
  onSubmit: (formData: CharityFormData) => void;
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

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      setFormData((prevData) => ({ ...prevData, charityImage: file }));
    };

