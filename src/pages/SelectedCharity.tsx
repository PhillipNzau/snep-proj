// import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HoverCard from "../components/HoverCard";

const SelectedCharity = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const handleOnClick = (id: any) => {
    navigate(`/charity/${id}/donate`, { state: { id } });
  };

  return (
    <>
      {/* back button */}
      <div
        className="w-[64%] mx-auto py-4  flex justify-start items-center gap-4 transition-all duration-300 group  hover:cursor-pointer mb-8 text-zinc-500"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-6 h-6 stroke-zinc-500 transition-all duration-300 group-hover:w-8 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        Back
      </div>

      <div className="w-[64%] mx-auto ">
        <div className="flex items-center gap-4 mb-10 text-zinc-400 self-start font-metrophobic">
          <p>CHARITIES</p>
          <div className="bg-zinc-300 h-[1px] w-[260px]"></div>
        </div>

        {/* Charity brief/about */}
        <div className="mb-12">
          <img
            src="/mainCharity.png"
            alt="main charity"
            width={814}
            height={335}
            className="w-full mb-8"
          />

          <p className="mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <div className=" flex items-center justify-between text-xs text-zinc-500 font-metrophobic">
            <p>PROJECT UPDATE</p>
            <div className="text-end">
              <p>
                <span className="font-bold text-base font-poppins">
                  KES 30,000
                </span>{" "}
                raised of KES 50,000 goal
              </p>
              <p>20 SEP 2023</p>
            </div>
          </div>
        </div>

        {/* Beneficiary story */}
        <div>
          <div className="flex items-center gap-4 mb-10 text-zinc-400 self-start font-metrophobic">
            <p>Beneficiaries Stories</p>
            <div className="bg-zinc-300 h-[1px] w-[260px]"></div>
          </div>

          <div className="flex flex-col items-center gap-14">
            <div className="flex items-center  gap-4 flex-wrap">
              <HoverCard />
              <HoverCard />
              <HoverCard />
              <HoverCard />
              <HoverCard />
              <HoverCard />
            </div>

            <button
              className="bg-purple-900 w-[182px] h-11 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200"
              onClick={() => {
                handleOnClick(id);
              }}
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedCharity;
