import { useNavigate, useParams } from "react-router-dom";
import HoverCard from "../components/HoverCard";
import { useUser } from "../hooks/useUser";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DonorModal } from "@/components/DonorModal";

const SelectedCharity = () => {
  const { user } = useUser();
  const isAdmin = user?.role == "admin";
  const isCharity = user?.role == "charity";
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleOnClick = (id: any) => {
    navigate(`/charity/${id}/donate`, { state: { id } });
  };

  const toCreateStory = (id: any) => {
    navigate(`/charity/${id}/create-story`, { state: { id } });
  };

  return (
    <Dialog>
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

        {isCharity ? (
          <DialogTrigger asChild>
            <button className="bg-purple-900 w-[182px] h-11 mx-auto my-10 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200">
              View Donors
            </button>
          </DialogTrigger>
        ) : (
          isAdmin && (
            <div className="flex items-center gap-4">
              <button className="bg-purple-900 w-[182px] h-11 mx-auto my-10 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200">
                Approve Charity
              </button>
              <button className="bg-rose-600 w-[182px] h-11 mx-auto my-10 flex items-center justify-center text-white font-metrophobic hover:bg-rose-500 transition-all duration-200">
                Reject Charity
              </button>
            </div>
          )
        )}

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

            {isAdmin && (
              <button className="bg-purple-900 w-[182px] h-11 mx-auto my-10 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200">
                Delete Charity
              </button>
            )}

            {isCharity ? (
              <button
                className="bg-purple-900 w-[182px] h-11 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200"
                onClick={() => {
                  toCreateStory(id);
                }}
              >
                Create Story
              </button>
            ) : (
              <button
                className="bg-purple-900 w-[182px] h-11 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200"
                onClick={() => {
                  handleOnClick(id);
                }}
              >
                Donate
              </button>
            )}
          </div>
        </div>
      </div>

      <DialogContent className="sm:max-w-[800px]">
        <DonorModal />
      </DialogContent>
    </Dialog>
  );
};

export default SelectedCharity;
