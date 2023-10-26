import { DonorModel } from "@/models/DonorModel";
const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
interface DonorListCardProps {
  donors: DonorModel | null;
}

const DonorListCard: React.FC<DonorListCardProps> = ({ donors }) => {
  return (
    <div className="flex items-center justify-between gap-4 md:gap-0 bg-purple-900 bg-opacity-40 w-full px-5 py-2 rounded-md ">
      <img
        src="/charityImg.png"
        alt="avatar"
        className="rounded-full w-10 h-10 md:w-16 md:h-16"
      />

      <p className="text-purple-900 font-poppins text-sm md:text-base">
        {donors?.user_names}
      </p>
      <p className="text-purple-900 font-poppins text-sm md:text-base">
        Ksh {donors?.amount}
      </p>
      <p className="font-metrophobic text-gray-600 text-xs md:text-sm">
        {donors?.created_at && formatCreatedAt(donors?.created_at)}
      </p>
    </div>
  );
};

export default DonorListCard;
