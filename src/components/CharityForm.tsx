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
const [successMessage, setSuccessMessage] = useState<string | null>(null);

const handleInoutChange = (
  e: React.ChangeEvent<HtmlInputElement | HtmlTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value}));
};

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files && e.target.files[0];
  setFormData((preData) =>({ ...prevData, charityImage: file }));
};

const validateForm = (): boolean => {
  //This validation for no empty field for firstName
  if (!formData.firstName) {
    alert('Please enter your First Name.');
    return false;
  }

  // This Validation is for no empty field for LastName
  if (!formData.lastName) {
    alert('Please enter your Last Name.');
    return false;
  }
  // So, this validation is for an empty field for email
  if (!formData.email) {
    alert('Please enter your Email.');
    return false;
  }

  // Validatin for how the email format should be
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  // This Validation is for no empty charity name
  if (!formData.charityName) {
    alert('Please enter the Charity Name.');
    return false;
  }
