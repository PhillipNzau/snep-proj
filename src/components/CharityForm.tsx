interface CharityDetails {
  firstName: string;
  lastName: string;
  email: string;
  charityName: string;
  charityDescription: string;
  charityAmountGoal: number;
}

const CharityForm: React.FC<CharityFormProps> = ({ onSubmit }) => {
  const [charityDetails, setCharityDetails] = useState<CharityDetails>({
    firstName: '',
    lastName: '',
    email: '',
    charityName: '',
    charityDescription: '',
    charityAmountGoal: 0,
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
      {/* ... (other input fields) ... */}
      <br />
      <label>
        Amount Goal:
        <input type="number" name="charityAmountGoal" value={charityDetails.charityAmountGoal} onChange={handleChange} />
      </label>
      <br />
      {/* Add Image Button (You might want to implement this) */}
      <br />
      <button onClick={handleCreateCharity}>Create Charity</button>
    </div>
  );
};

export default CharityForm;
