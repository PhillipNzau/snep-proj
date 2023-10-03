import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface Props {
  title: string;
  description: string;
  date: string;
  image: string;
  height?: string;
  width?: string;
}

const CharityCard: React.FC<Props> = ({
  title,
  description,
  date,
  image,
  width = "262px",
  height = "338px",
}) => {
  const navigate = useNavigate();
  const handleOnClick = (id: any) => {
    navigate(`/charity/${id}`, { state: { id } });
  };
  return (
    <div
      className={`w-${width} h-${height} h-  mb-20 bg-white border border-zinc-300`}
      onClick={() => {
        handleOnClick(1);
      }}
    >
      <div>
        <LazyLoadImage
          // src="/charityImg.png"
          src={image}
          alt="charity img"
          width={262}
          height={154}
          className="w-full"
        />
      </div>

      <div className=" px-2 py-3 flex flex-col justify-between h-[180px] ">
        <div className="flex flex-col gap-4 text-base">
          <h1 className="text-purple-900">{title} Charity Name</h1>
          <p className="text-zinc-500 font-metrophobic">
            {description}
            Helping children across kenya get clean water
          </p>
        </div>

        <div className=" flex items-center justify-between text-xs text-zinc-500 font-metrophobic">
          <p>PROJECT UPDATE</p>
          <p>{date} 20 SEP 2023</p>
        </div>
      </div>
    </div>
  );
};

export default CharityCard;
