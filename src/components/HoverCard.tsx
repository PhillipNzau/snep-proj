const HoverCard = () => {
  return (
    <>
      {/* hover card effect */}
      <div className="relative flex items-center justify-center w-72 h-60 bg-gray-900 group hover:cursor-pointer">
        <img
          className="absolute inset-0 object-cover  w-full h-full group-hover:opacity-50"
          src="/public/charityImg.png"
          alt="charity image"
        />
        <div className="relative p-5">
          <div className="">
            {/* Hidden content */}
            <div className="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="p-2 font-metrophobic">
                <p className="text-2xl text-white mb-10">Beneficiary name</p>
                <p className="text-base text-white">
                  Brief description of the beneficiary highlighted...
                </p>
              </div>
            </div>
            {/* End of hidden content */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HoverCard;
