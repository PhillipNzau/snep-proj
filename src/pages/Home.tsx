import { LazyLoadImage } from "react-lazy-load-image-component";

import SEO from "../components/SEO";
import CharityCard from "../components/CharityCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_CHARITY } from "@/services/charity";
import { CharityModel } from "@/models/CharityModel";
import { useUser } from "@/hooks/useUser";

const Home: React.FC = () => {
  const [charities, setCharities] = useState<CharityModel[] | null>(null);
  const { user } = useUser();

  const isAdmin = user?.role == "admin";
  const isCharity = user?.role == "charity";

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toCreateCharity = (id: any) => {
    navigate(`/charity/create-charity`, { state: { id } });
  };
  // fetch charities
  const getCharities = async () => {
    const getCharity = await GET_CHARITY();
    const reversedCharities = getCharity.reverse();

    setCharities(reversedCharities);
  };
  useEffect(() => {
    getCharities();
  }, [user]);
  return (
    <main className="flex flex-col items-center gap-12 w-full">
      <SEO
        title="Snep Home"
        description="Snep is a charity donation platform"
        type="article"
      />

      {/* Hero section */}
      <section className="relative md:w-[535px] mb-4 md:mb-20">
        <div className="">
          <LazyLoadImage
            src="/hero.png"
            alt="charity img"
            width={535}
            height={417}
          />
        </div>

        <div className="md:absolute -bottom-16 -right-20 md:w-[402px] h-48 bg-indigo-900 bg-opacity-60 px-6 py-7 text-white">
          <h1 className="text-3xl md:text-4xl mb-5 ">Create Lasting Impact</h1>
          <p className="text-base ">
            Thanks to generous generation we keep kids in school
          </p>
        </div>
      </section>

      {/* About us Section */}
      <section className="md:w-[64%] mx-auto text-zinc-400 self-start px-6">
        <div className="flex items-center gap-4 mb-8 font-metrophobic">
          <p>Trust & Safety</p>
          <div className="bg-zinc-300 h-[1px] w-52 md:w-[260px]"></div>
        </div>

        <div className="md:flex items-start justify-between text-black space-y-8 md:space-y-0">
          <p className=" text-2xl font-bold">We have your back</p>

          <p className="w-80 text-base">
            With a global team dedicated to trust and safety, we’ve successfully
            managed fundraisers worldwide for more than a decade. Don’t worry
            about a thing, we’ve got you covered.
          </p>
        </div>
      </section>

      {/* CTA banner */}
      {!isAdmin &&
        (isCharity ? (
          <section className="bg-purple-900 w-full md:h-72 px-4 py-4 space-y-6 md:space-y-0 md:py-0 md:px-[20%] md:flex items-center justify-between font-metrophobic">
            <p className="md:w-[426px] text-white text-4xl md:text-5xl uppercase">
              Thank you for making a difference in the world!
            </p>
            <button
              className="bg-transparent border border-white w-[182px] h-11 flex items-center justify-center text-white hover:bg-white hover:text-purple-900 transition-all duration-200 uppercase"
              onClick={() => {
                toCreateCharity(id);
              }}
            >
              Create A CHARITY
            </button>
          </section>
        ) : (
          <section className="bg-purple-900 w-full md:h-72 px-4 py-4 space-y-6 md:space-y-0 md:py-0 md:px-[20%] md:flex items-center justify-between font-metrophobic">
            <p className="md:w-[426px] text-white text-4xl md:text-5xl uppercase">
              Ready to get started? Join thousands of others today.
            </p>
            <Link to="/register" className="font-metrophobic uppercase">
              <button className="bg-transparent border border-white w-[182px] h-11 flex items-center justify-center text-white hover:bg-white hover:text-purple-900 transition-all duration-200">
                Become a charity
              </button>
            </Link>
          </section>
        ))}

      {/* View Charities */}
      <section className="md:w-[64%] mx-auto">
        <div className="flex items-center gap-4 mb-10 text-zinc-400 self-start px-6 font-metrophobic">
          <p>Charities & Organizations</p>
          <div className="bg-zinc-300 h-[1px] w-52 md:w-[260px]"></div>
        </div>
        <div className="flex flex-col items-center justify-center flex-wrap gap-4 w-full ">
          <div className="flex items-center px-4 md:px-0 justify-between flex-wrap gap-4 md:w-[95%] md:grid grid-cols-3">
            {charities &&
              charities.map((charity) => (
                <CharityCard
                  key={charity?.id}
                  id={charity.id}
                  title={charity.name}
                  description={charity.description}
                  date={charity.created_at}
                  status={charity.status}
                  image={charity.image_url}
                  clamp="3"
                  width="375px"
                />
              ))}
          </div>

          <Link to="/charity">
            <button className="bg-purple-900 w-[182px] h-11 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200">
              View More
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
