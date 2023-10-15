import { useState } from "react";
import DonorListCard from "./DonorListCard";

export function DonorModal() {
  const [anonymous, setAnonymous] = useState(false);

  const handleToggle = (status: boolean) => {
    setAnonymous(status);
  };
  return (
    <div className="space-y-6  ">
      <h1 className="text-purple-900 font-poppins text-lg text-center mb-10">
        Donor List Modal
      </h1>
      <div className="flex items-center justify-between  gap-4 ">
        <div
          onClick={() => {
            handleToggle(false);
          }}
          className={`flex items-center justify-center rounded-[8px] w-1/2 h-16  font-metrophobic border border-purple-900 hover:cursor-pointer transition-all duration-200 text-sm px-2 md:px-0 ${
            !anonymous ? "bg-purple-900 text-white" : "text-purple-900" // Add the class conditionally
          }`}
        >
          Non-Anonymous Donors
        </div>
        <div
          onClick={() => {
            handleToggle(true);
          }}
          className={`flex items-center justify-center rounded-[8px] w-1/2 h-16  font-metrophobic border border-purple-900 hover:cursor-pointer transition-all duration-200 text-sm px-2 md:px-0 ${
            anonymous ? "bg-purple-900 text-white" : "text-purple-900" // Add the class conditionally
          }`}
        >
          Anonymous Donors
        </div>
      </div>

      <DonorListCard />
    </div>
  );
}
