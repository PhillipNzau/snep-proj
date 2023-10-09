import React from "react";

const DonorListCard = () => {
  return (
    <div className="bg-white md:w-screen">
      <h1>Donor List Modal</h1>
      <div className="flex items-center justify-between w-full ">
        <div className=" h-16">Non-Anonymous Donors</div>
        <div className=" h-16 bg-purple-900">Anonymous Donors</div>
      </div>
    </div>
  );
};

export default DonorListCard;
