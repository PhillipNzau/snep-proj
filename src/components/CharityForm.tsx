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
      // Validation alerts for each field
      // ... (Your existing validation logic)
      return false;
    }

    // Additional validations can be added here...

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
