import { useNavigate, useParams } from "react-router-dom";
import HoverCard from "../components/HoverCard";
import { useUser } from "../hooks/useUser";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DonorModal } from "@/components/DonorModal";
import { useEffect, useState } from "react";
import { GET_CHARITY, UPDATE_CHARITY } from "@/services/charity";
import { CharityModel } from "@/models/CharityModel";
import { GET_STORY } from "@/services/story";
import { StoryModel } from "@/models/StoryModel";
import { CHANGE_STATUS } from "@/services/changeStatus";
import { DELETE_CHARITY } from "@/services/deleteCharity";

const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export interface EditedCharityModel {
  name?: string;
  description?: string;
  goal?: number;
  image_url?: string;
}

const SelectedCharity = () => {
  const [charities, setCharities] = useState<CharityModel | null>(null);
  const [stories, setStories] = useState<StoryModel[] | null>(null);

  const { user } = useUser();
  const isAdmin = user?.role == "admin";
  const isCharity = user?.role == "charity";
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);

  const [editedCharity, setEditedCharity] = useState<EditedCharityModel | null>(
    null
  );

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

  // update charity
  const updateCharity = async (data: EditedCharityModel) => {
    const updateCharity = await UPDATE_CHARITY(data, id);
    setCharities(updateCharity);
    return updateCharity;
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
    navigate(`/charity`);
    return changeStatus;
  };

  const onDeleteCharity = async () => {
    const data = {
      id: id,
    };
    const deleteCharity = await DELETE_CHARITY(data);
    navigate(-1);

    return deleteCharity;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedCharity(charities); // Initialize editedCharity with the current charity data
  };

  const handleSave = async () => {
    // Update the charity data with the edited values
    const updatedCharity = { ...editedCharity };
    updateCharity(updatedCharity);

    setIsEditing(false);
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
        <div className="flex items-center w-full justify-between mb-10 text-zinc-400 self-start font-metrophobic">
          <div className="flex items-center gap-4">
            <p>{charities && charities.name}</p>
            <div className="bg-zinc-300 h-[1px] w-52 md:w-[260px]"></div>
          </div>
          {isCharity && (
            <img
              className="self-end hover:cursor-pointer"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABHUlEQVRIS+WV0RGCMAyG6QTiBJYNdAPdBCdyBHEDN5AR3IC6ARvUPx7hSqUlBXmSF+9o8n1tEqzKVn7UyvzsZ4KmaUrabFEUlbvpgQBBR6XUFQE6djJr7dkFEbzLy/w1X2AQuEuE54invA3nuZKBwBhjKUhrLSoddp7jJC1+90irWQLBDe8/JZst6MpyAewE2JMlYN4ZPlvg1hyQ1pFowE2wyZISeXBmkeTgw5NPEIDT5PQ19wdE3AMpnHpBPWGRSJACxyQ9MIVbsUAKJyBiWxpVd8wnT8CNd2sbqvnYkCQLYg1dLIjB6YSzBLH/JX/tDwQ8Zill8WPRpxc+tP4++bpwkFBN3QmhDRAcayUE9eiHtmTnoVzRxbJEvLrgDepW+Bkj+mDVAAAAAElFTkSuQmCC"
              onClick={handleEdit}
            />
          )}
        </div>

        {isCharity ? (
          <DialogTrigger asChild>
            <button className="bg-purple-900 w-[182px] h-11 mx-auto my-10 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200">
              View Donors
            </button>
          </DialogTrigger>
        ) : (
          isAdmin &&
          (charities?.status == "active" ? (
            <button
              className="bg-rose-600 w-[182px] h-11 mx-auto my-10 flex items-center justify-center text-white font-metrophobic hover:bg-rose-500 transition-all duration-200"
              onClick={() => {
                changeCharityStatus("reject");
              }}
            >
              Reject Charity
            </button>
          ) : (
            <button
              className="bg-purple-900 w-[182px] h-11 mx-auto my-10 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200"
              onClick={() => {
                changeCharityStatus("active");
              }}
            >
              Approve Charity
            </button>
          ))
        )}
        {isEditing ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 font-metrophobic">
              <label className="text-gray-700 font-bold">Image Url</label>
              <input
                className="border p-2 rounded-md"
                type="text"
                value="https://plus.unsplash.com/premium_photo-1681492071459-3a45f4289743?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                onChange={(e) =>
                  setEditedCharity({
                    ...editedCharity,
                    image_url: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2 font-metrophobic">
              <label className="text-gray-700 font-bold">Charity Name</label>
              <input
                className="border p-2 rounded-md"
                type="text"
                value={editedCharity?.name}
                onChange={(e) =>
                  setEditedCharity({ ...editedCharity, name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2 font-metrophobic">
              <label className="text-gray-700 font-bold">
                Charity Description
              </label>
              <textarea
                className="border p-2 rounded-md"
                rows={8}
                value={editedCharity?.description}
                onChange={(e) =>
                  setEditedCharity({
                    ...editedCharity,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2 font-metrophobic">
              <label className="text-gray-700 font-bold">Charity Goal</label>
              <input
                className="border p-2 rounded-md"
                type="number"
                value={editedCharity?.goal}
                onChange={(e) =>
                  setEditedCharity({
                    ...editedCharity,
                    goal: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <button
              className="bg-purple-900 w-[182px] h-11 mx-auto mb-10 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="mb-12">
            <img
              // src="/mainCharity.png"
              src={charities?.image_url}
              alt="main charity"
              width={814}
              height={335}
              className="w-full mb-8"
            />

            <p className="mb-6 text-sm font-metrophobic">
              {charities?.description}
            </p>
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
              <button
                className="bg-purple-900 w-[182px] h-11 mx-auto my-10 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200"
                onClick={() => {
                  onDeleteCharity();
                }}
              >
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
            ) : isAdmin ? (
              ""
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
