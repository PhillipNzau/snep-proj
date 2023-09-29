const CharityCard = () => {
  return (
    <div className="w-[262px] h-[338px]  mb-20 bg-white border border-zinc-300">
      <div>
        <img src="/charityImg.png" alt="charity img" width={262} height={154} />
      </div>

      <div className=" px-2 py-3 flex flex-col justify-between h-[180px] ">
        <div className="flex flex-col gap-4 text-base">
          <h1 className="text-purple-900">Charity Name</h1>
          <p className="text-zinc-500">
            Helping children across kenya get clean water
          </p>
        </div>

        <div className=" flex items-center justify-between text-xs text-zinc-500">
          <p>PROJECT UPDATE</p>
          <p>20 SEP 2023</p>
        </div>
      </div>
    </div>
  );
};

export default CharityCard;
