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

  const validateForm = (): boolean => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.charityName ||
      !formData.charityDescription ||
      !formData.charityAmountGoal ||
      !formData.charityImage
    ) {
      // Below are validation alerts for each field..

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

  // This Validation is for the Charity Description Field - should not be empty
  if (!formData.charityDescription) {
    alert('Please enter the Charity Description.');
    return false;
  }

  // Minimum length requirement for Charity Description
  if (formData.charityDescription.length < 50) {
    alert('Charity Description must be at least 50 characters long.');
    return false;
  }

  //This Validation ni ya no empty charity amount goal
  if (!formData.charityAmountGoal) {
    alert('Please enter the Charity Amount Goal.');
    return false;
  }

  // This is a numeric validation for charity amount goal
  if (isNaN(formData.charityAmountGoal) || formData.charityAmountGoal <= 0) {
    alert('Charity Amount Goal must be a positive number.');
    return false;
  }

  //This is a validation for the no empty charity image field
  if (!formData.charityImage) {
    alert('Please upload a Charity Image.');
    return false;
  }

  // This Validation is for the image format allowed which are (JPG, JPEG, PNG, SVG)
  const allowedImageFormats = ['jpg', 'jpeg', 'png', 'svg'];
    const imageExtension = formData.charityImage?.name.split('.').pop()?.toLowerCase();
    if (!imageExtension || !allowedImageFormats.includes(imageExtension)) {
      alert('Please upload a valid image with format JPG, JPEG, PNG, or SVG.');
      return false;
    }

    // Future additional validations can be added here...

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      setSuccessMessage(
        'Registration is successful. Thank you for registering with us. Welcome to Donation APP'
      );
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (successMessage) {
      timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 60000); // Equivalent to 1 minute
    }

    return () => clearTimeout(timeout);
  }, [successMessage]);

return (
    <div>
      <h2>Charity Form</h2>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Charity Name:
        <input type="text" name="charityName" value={formData.charityName} onChange={handleInputChange} />
      </label>
      <label>
        Charity Description:
        <textarea
          name="charityDescription"
          value={formData.charityDescription}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Charity Amount Goal:
        <input
          type="number"
          name="charityAmountGoal"
          value={formData.charityAmountGoal}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Charity Image:
        <input type="file" accept=".jpg, .jpeg, .png, .svg" onChange={handleImageChange} />
      </label>
      <button onClick={handleSubmit}>Create Charity</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default CharityForm;
