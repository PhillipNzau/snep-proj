import { useNavigate, useParams } from "react-router-dom";
import HoverCard from "../components/HoverCard";
import { useUser } from "../hooks/useUser";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DonorModal } from "@/components/DonorModal";
import { useEffect, useState } from "react";
import { GET_CHARITY } from "@/services/charity";
import { CharityModel } from "@/models/CharityModel";
import { GET_STORY } from "@/services/story";
import { StoryModel } from "@/models/StoryModel";
import { CHANGE_STATUS } from "@/services/changeStatus";

const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const SelectedCharity = () => {
  const [charities, setCharities] = useState<CharityModel | null>(null);
  const [stories, setStories] = useState<StoryModel[] | null>(null);

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

  // fetch charities
  const getCharities = async () => {
    const getCharity = await GET_CHARITY(id);
    setCharities(getCharity);
  };

  // fetch charities
  const getStories = async (id: string | undefined) => {
    const getStory = await GET_STORY(id);
    setStories(getStory);
  };
  useEffect(() => {
    getCharities();
    getStories(id);
  }, [user]);

  const changeCharityStatus = async (status: string) => {
    const data = {
      status: status,
      charity_id: id,
    };
    const changeStatus = await CHANGE_STATUS(data);
    return changeStatus;
  };
  return (
    <Dialog>
      {/* back button */}
      <div
        className="px-4 md:px-0 md:w-[64%] mx-auto py-4  flex justify-start items-center gap-4 transition-all duration-300 group  hover:cursor-pointer mb-8 text-zinc-500"
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

      <div className="px-6 md:w-[64%] md:mx-auto ">
        <div className="flex items-center gap-4 mb-10 text-zinc-400 self-start font-metrophobic">
          <p>CHARITIES</p>
          <div className="bg-zinc-300 h-[1px] w-52 md:w-[260px]"></div>
        </div>

        {/* Charity brief/about */}
        <div className="mb-12">
          <img
            // src="/mainCharity.png"
            src={charities?.image_url}
            alt="main charity"
            width={814}
            height={335}
            className="w-full mb-8"
          />

          <p className="mb-6">{charities?.description}</p>
          <div className=" flex items-center justify-between text-xs text-zinc-500 font-metrophobic">
            <p>PROJECT UPDATE</p>
            <div className="text-end">
              <p>
                <span className="font-bold text-base font-poppins">
                  KES {charities?.goal}
                </span>{" "}
                raised of KES {charities?.goal}
              </p>
              <p>
                {charities?.created_at &&
                  formatCreatedAt(charities?.created_at)}
              </p>
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
              <button
                className="bg-purple-900 w-[182px] h-11 mx-auto my-10 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200"
                onClick={() => {
                  changeCharityStatus("active");
                }}
              >
                Approve Charity
              </button>
              <button
                className="bg-rose-600 w-[182px] h-11 mx-auto my-10 flex items-center justify-center text-white font-metrophobic hover:bg-rose-500 transition-all duration-200"
                onClick={() => {
                  changeCharityStatus("reject");
                }}
              >
                Reject Charity
              </button>
            </div>
          )
        )}

        {/* Beneficiary story */}
        <div>
          <div className="flex items-center  gap-4 mb-6 md:mb-10 text-zinc-400 self-start font-metrophobic">
            <p>Beneficiaries Stories</p>
            <div className="bg-zinc-300 h-[1px] w-32 md:w-[260px]"></div>
          </div>

          <div className="flex flex-col items-center gap-14">
            <div className="flex items-center gap-4 flex-wrap">
              {stories &&
                stories.map((story) => (
                  <HoverCard
                    key={story.id}
                    title={story.name}
                    description={story.description}
                    image={story.image_url}
                    date={story.created_at}
                  />
                ))}
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
