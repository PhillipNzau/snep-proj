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
      // I will add validation here ...

      // Call the onSubmit callback with the charity details
      onSubmit(charityDetails);
    };

    return (
        <div>
          <h2>Create Charity</h2>
          <label>
            First Name:
            <input type="text" name="firstName" value={charityDetails.firstName} onChange={handleChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lastName" value={charityDetails.lastName} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="text" name="email" value={charityDetails.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Charity Name:
            <input type="text" name="charityName" value={charityDetails.charityName} onChange={handleChange} />
          </label>
          <br />
          <label>
            Charity Description:
            <textarea name="charityDescription" value={charityDetails.charityDescription} onChange={handleChange} />
          </label>
          <br />
          <label>
            Amount Goal:
            <input type="number" name="charityamountGoal" value={charityDetails.charityamountGoal} onChange={handleChange} />
          </label>
          <br />
          {/* Add Image Button (You might want to implement this) */}
          <br />
          <button onClick={handleCreateCharity}>Create Charity</button>
        </div>
      );
    };

    export default CharityForm;
