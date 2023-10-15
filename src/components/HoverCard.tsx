import { LazyLoadImage } from "react-lazy-load-image-component";
import { Modal } from "./Modal";
import * as React from "react";

export interface Props {
  title?: string;
  description?: string;
  date?: string;
  image?: string;
}

const HoverCard: React.FC<Props> = ({ title, description, date, image }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const [story, setStory] = React.useState<StoryModel | null>(null);
  const story = {
    title: title,
    description: description,
    date: date,
    image: image,
    width: "375px",
  };

  return (
    <>
      {/* hover card effect */}
      <div
        className="relative flex items-center justify-center w-full md:w-72 h-60 bg-gray-900 group hover:cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <LazyLoadImage
          className="absolute inset-0 object-cover  w-full h-full group-hover:opacity-50"
          src={image}
          alt="charity image"
          width={288}
          height={240}
        />
        <div className="relative p-5">
          <div className="">
            {/* Hidden content */}
            <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="p-2 font-metrophobic">
                <p className="text-2xl text-white mb-10">{title}</p>
                <p className="text-base text-white line-clamp-3">
                  {description}
                </p>
              </div>
            </div>
            {/* End of hidden content */}
          </div>
        </div>
      </div>
      {story && <Modal isOpen={isOpen} setIsOpen={setIsOpen} story={story} />}
    </>
  );
};

export default HoverCard;
