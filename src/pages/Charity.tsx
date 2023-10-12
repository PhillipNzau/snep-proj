import { LazyLoadImage } from "react-lazy-load-image-component";
import CharityCard from "../components/CharityCard";
import SEO from "../components/SEO";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_CHARITY } from "@/services/charity";
import { CharityModel } from "@/models/CharityModel";

const Charity: React.FC = () => {
  const [charities, setCharities] = useState<CharityModel[] | null>(null);
  const { user } = useUser();
  // const isAdmin = user?.role == "admin";
  const isCharity = user?.role == "charity";
  const navigate = useNavigate();

  const toCreateCharity = () => {
    navigate(`/charity/create-charity`);
  };

  // fetch charities
  const getCharities = async () => {
    const getCharity = await GET_CHARITY();
    setCharities(getCharity);
  };
  useEffect(() => {
    getCharities();
  }, [user]);

  return (
    <main className="flex flex-col items-center gap-12 w-full">
      <SEO
        title="Snep Charity"
        description="Snep is a charity donation platform"
        type="article"
      />

      {/* Hero section */}
      <section className="relative w-[535px] mb-20">
        <div className="">
          <LazyLoadImage
            src="/hero.png"
            alt="charity img"
            width={535}
            height={417}
          />
        </div>

        <div className="absolute -bottom-16 -right-20 w-[402px] h-48 bg-indigo-900 bg-opacity-60 px-6 py-7 text-white">
          <h1 className="text-4xl mb-5 ">Create Lasting Impact</h1>
          <p className="text-base ">
            Thanks to generous generation we keep kids in school
          </p>
        </div>
      </section>

      {/* View Charities */}
      <section className="w-[64%] mx-auto">
        <div className="flex items-center gap-4 mb-10 text-zinc-400 self-start px-8 font-metrophobic">
          <p>CHARITIES</p>
          <div className="bg-zinc-300 h-[1px] w-[260px]"></div>
        </div>
        <div className="flex flex-col items-center justify-center flex-wrap gap-4 w-full ">
          <div className="flex items-center gap-4 w-[95%] flex-wrap md:grid grid-cols-3  ">
            {charities &&
              charities.map((charity) => (
                <CharityCard
                  key={charity?.id}
                  title={charity.name}
                  description={charity.description}
                  date={charity.created_at}
                  image={charity.image_url}
                  clamp="3"
                  width="375px"
                />
              ))}
          </div>

          {isCharity ? (
            <button
              className="bg-purple-900 w-[182px] h-11 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200"
              onClick={() => {
                toCreateCharity();
              }}
            >
              Add Charity
            </button>
          ) : (
            <button className="bg-purple-900 w-[182px] h-11 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200">
              View More
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Charity;
