import { LazyLoadImage } from "react-lazy-load-image-component";

import SEO from "../components/SEO";
import CharityCard from "../components/CharityCard";

const Home = () => {
  return (
    <main className="flex flex-col items-center gap-12 w-full">
      <SEO
        title="Snep Home"
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

      {/* About us Section */}
      <section className="w-[64%] mx-auto text-zinc-400 self-start px-8">
        <div className="flex items-center gap-4 mb-8 font-metrophobic">
          <p>OVERVIEW</p>
          <div className="bg-zinc-300 h-[1px] w-[260px]"></div>
        </div>

        <div className="flex items-start justify-between text-black">
          <p className=" text-2xl font-bold">Some fancy title</p>

          <p className="w-80 text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-purple-900 w-full h-64 px-[20%] flex items-center justify-between font-metrophobic">
        <p className="w-[426px] text-white text-6xl ">BECOME A CHARITY TODAY</p>
        <button className="bg-transparent border border-white w-[182px] h-11 flex items-center justify-center text-white hover:bg-white hover:text-purple-900 transition-all duration-200">
          BE A CHARITY
        </button>
      </section>

      {/* View Charities */}
      <section className="w-[64%] mx-auto">
        <div className="flex items-center gap-4 mb-10 text-zinc-400 self-start px-8 font-metrophobic">
          <p>CHARITIES</p>
          <div className="bg-zinc-300 h-[1px] w-[260px]"></div>
        </div>
        <div className="flex flex-col items-center justify-center flex-wrap gap-4 w-full ">
          <div className="flex items-center justify-between  flex-wrap gap-4 w-[95%]">
            <CharityCard />
            <CharityCard />
            <CharityCard />
            <CharityCard />
          </div>

          <button className="bg-purple-900 w-[182px] h-11 flex items-center justify-center text-white font-metrophobic hover:bg-purple-800 transition-all duration-200">
            View More
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
