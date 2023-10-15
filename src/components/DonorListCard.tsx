const DonorListCard = () => {
  return (
    <div className="flex items-center justify-between gap-4 md:gap-0 bg-purple-900 bg-opacity-40 w-full px-5 py-2 rounded-md">
      <img
        src="/charityImg.png"
        alt="avatar"
        className="rounded-full w-10 h-10 md:w-16 md:h-16"
      />

      <p className="text-purple-900 font-poppins text-sm md:text-base">
        Anonymous Donors
      </p>
      <p className="text-purple-900 font-poppins text-sm md:text-base">
        Ksh 5,000
      </p>
      <p className="font-metrophobic text-gray-600 text-xs md:text-sm">
        20 Sep 2023
      </p>
    </div>
  );
};

export default DonorListCard;
