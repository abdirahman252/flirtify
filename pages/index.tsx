import type { NextPage } from "next";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

const Home: NextPage = () => {
  return (
    <div className="bg-[#330b34] h-screen w-screen">
      <div className="flex flex-col items-center justify-center py-24">
        <div className="">
          <h1 className="mb-6 text-5xl font-bold text-white">
            Pickup Lines to Up Your{" "}
            <RoughNotation
              type="underline"
              strokeWidth={2}
              color="#d370c4"
              show={true}
            >
              Flirting Game
            </RoughNotation>
          </h1>
          <span className="text-2xl italic font-semibold text-[#a0a1a9]">
            — (Use at your own risk)
          </span>
        </div>
      </div>
      <div className="w-full h-full bg-[#eee] shadow-cont rounded-[50px]">
        <p>
          Choose from a variety of options to create the perfect match for your
          partner. Trust me, the pickup lines blow your mind!
        </p>
      </div>
    </div>
  );
};

export default Home;
