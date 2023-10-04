import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface Props {
  title: string;
  description: string;
  date: string;
  image: string;
  height?: string;
}

const CharityCard: React.FC<Props> = ({
  title,
  description,
  date,
  image,
  height,
}) => {
  const navigate = useNavigate();
  const handleOnClick = (id: any) => {
    navigate(`/charity/${id}`, { state: { id } });
  };
  console.log("h", height);

  return (
    <div
      className={`mb-2 bg-white pb-36 border h-[${height}] border-zinc-300 overflow-scroll`}
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
            Helping children across kenya get clean water Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Architecto magnam illo explicabo
            dolor beatae quae saepe error vero ea illum! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Perferendis sed qui illo ipsum
            quibusdam molestiae quaerat rerum delectus sit. Modi, eius, corrupti
            est, debitis quis earum amet perspiciatis a dolorem nostrum quia!
            Odit ullam assumenda, officiis blanditiis aut, debitis fugiat
            repellat perspiciatis necessitatibus numquam accusantium molestias
            praesentium recusandae dolor asperiores?
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between text-xs text-zinc-500 font-metrophobic">
          <p>PROJECT UPDATE</p>
          <p>{date} 20 SEP 2023</p>
        </div>
      </div>
    </div>
  );
};

export default CharityCard;
