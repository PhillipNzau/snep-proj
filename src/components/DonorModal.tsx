import React, { useState } from "react";
import DonorListCard from "./DonorListCard";
import { DonorModel } from "@/models/DonorModel";

interface DonorModalProps {
  donors: DonorModel[] | null;
}

export const DonorModal: React.FC<DonorModalProps> = ({ donors }) => {
  const [anonymous, setAnonymous] = useState<boolean | null>(false);
  const [filteredDonors, setFilteredDonors] = useState<
    DonorModel[] | null | undefined
  >(donors);

  const handleToggle = (status: boolean) => {
    setAnonymous(status);

    // Filter the donors based on the "is_anonymous" property
    if (status === null) {
      setFilteredDonors(donors); // Show all donors
    } else {
      const filtered = donors?.filter((donor) => donor.is_anonymous === status);
      setFilteredDonors(filtered);
    }
  };

  return (
    <div className="space-y-6 overflow-hidden overflow-y-scroll">
      <h1 className="text-purple-900 font-poppins text-lg text-center mb-10">
        Donor List Modal
      </h1>
      <div className="flex items-center justify-between gap-4">
        <div
          onClick={() => {
            handleToggle(false);
          }}
          className={`flex items-center justify-center rounded-[8px] w-1/2 h-16 font-metrophobic border border-purple-900 hover:cursor-pointer transition-all duration-200 text-sm px-2 md:px-0 ${
            anonymous === false ? "bg-purple-900 text-white" : "text-purple-900"
          }`}
        >
          All Donors
        </div>
        <div
          onClick={() => {
            handleToggle(true);
          }}
          className={`flex items-center justify-center rounded-[8px] w-1/2 h-16 font-metrophobic border border-purple-900 hover:cursor-pointer transition-all duration-200 text-sm px-2 md:px-0 ${
            anonymous === true ? "bg-purple-900 text-white" : "text-purple-900"
          }`}
        >
          Anonymous Donors
        </div>
      </div>

      <div className="overflow-hidden h-96 overflow-y-scroll space-y-2">
        {filteredDonors &&
          filteredDonors.map((donor) => (
            <DonorListCard key={donor.id} donors={donor} />
          ))}
      </div>
    </div>
  );
};
