import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface Props {
  title?: string;
  description?: string;
  date?: string;
  image?: string;
  height?: string;
  width?: string;
  clamp?: string;
}

const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const CharityCard: React.FC<Props> = ({
  title,
  description,
  date,
  image,
  width,
  clamp,
}) => {
  const navigate = useNavigate();
  const handleOnClick = (id: any) => {
    navigate(`/charity/${id}`, { state: { id } });
  };

  return (
    <div
      className={` mb-2 w-[${width}] h-full bg-white pb-36 border  border-zinc-300 overflow-hidden`}
      onClick={() => {
        handleOnClick(1);
      }}
    >
      <div className="w-full h-[150px] overflow-hidden">
        <LazyLoadImage
          // src="/charityImg.png"
          src={image}
          alt="charity img"
          width={262}
          height={150}
          className="object-cover w-full h-full"
        />
      </div>

      <div className=" px-2 py-3 flex flex-col justify-between h-full ">
        <div className="flex flex-col gap-4 text-base">
          <h1 className="text-purple-900">{title}</h1>
          <p
            className={`text-zinc-500 font-metrophobic h-full line-clamp-${clamp}`}
          >
            {description}
          </p>
        </div>

        <div className="mt-8  flex items-center justify-between text-xs text-zinc-500 font-metrophobic">
          <p>PROJECT UPDATE</p>
          <p>{date && formatCreatedAt(date)}</p>
        </div>
      </div>
    </div>
  );
};

export default CharityCard;
