const DonorListCard = () => {
  return (
    <div className="flex items-center justify-between bg-purple-900 bg-opacity-40 w-full px-5 py-2 rounded-md">
      <img
        src="/charityImg.png"
        alt="avatar"
        className="rounded-full w-16 h-16"
      />

      <p className="text-purple-900 font-poppins text-base">Anonymous Donors</p>
      <p className="text-purple-900 font-poppins text-base">Ksh 5,000</p>
      <p className="font-metrophobic text-gray-600 text-sm">20 Sep 2023</p>
    </div>
  );
};

export default DonorListCard;
