// @ts-ignore
import type { NextPage } from "next";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { useEffect, useState } from "react";
import { MapsArrowDiagonal } from "iconoir-react";
import { motion, AnimatePresence } from "framer-motion";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function setText(
  prompt: string,
  temperature: number,
  setPickUp: Function
) {
  var raw = JSON.stringify({
    prompt: prompt,
    temperature: temperature,
  });

  fetch("/api/pickup", {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((res) => setPickUp(res.text));
}

const Home: NextPage = () => {
  let [pickUp, setPickUp] = useState("");

  useEffect(() => {
    setText("write a pickup line relating to delhi", 0.7, setPickUp);
  }, []);

  const data = [
    {
      title: "Location",
      imageURL:
        "https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?w=2000&t=st=1672441825~exp=1672442425~hmac=f932ef5b7f849902326ae1b1cf1fc7d20918290e69e72295e3489721468d4602",
      description:
        "Are you from Delhi? Because you have me feeling like I'm in the heart of India, surrounded by beauty and culture.",
      accentColor: "green",
    },
    {
      title: "Food",
      imageURL:
        "https://mir-s3-cdn-cf.behance.net/projects/404/df41cb110989141.Y3JvcCwxOTI1LDE1MDUsMCw0NDc.jpg",
      description:
        "Are you a pepperoni pizza? Because you've got me feeling hot and spicy, and I can't resist a slice of you.",
      accentColor: "yellow",
    },
    {
      title: "Drinks",
      imageURL:
        "https://img.freepik.com/free-vector/hand-drawn-cocktail-collection_52683-41676.jpg?w=2000",
      description:
        "Are you a can of Pepsi? Because you have me feeling refreshed and ready for anything.",
      accentColor: "red",
    },
    {
      title: "Celebrity",
      imageURL:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/59607587119117.5dae90066d5d9.jpg",
      description:
        "Baby, let's play football together and both of us can be Messi together.",
      accentColor: "blue",
    },
  ];
  return (
    <div className="bg-[#330b34] h-screen w-screen">
      <div className="flex flex-col items-center justify-center py-24">
        <div className="">
          <h1 className="mb-6 text-5xl font-bold text-white">Pickup Lines</h1>
          <span className="text-2xl italic font-semibold text-[#a0a1a9]">
            — (Use at your own risk)
          </span>
        </div>
      </div>
      <div className="w-full h-full bg-[#eee] shadow-cont rounded-[50px] p-20">
        <p className="mb-12 text-gray-500 leading-[170%] text-lg">
          Looking for the perfect way to sweep your partner off their feet? Look
          no further! We've got a range of options that are sure to make their
          heart skip a beat. And the best part? These pickup lines are so
          clever, they'll blow your mind! Trust us, you won't be disappointed.
          {pickUp}
        </p>
        <div className="flex w-full">
          {data.map((item, index) => {
            const [grpHover, setGrpHover] = useState(false);

            return (
              <motion.div
                className={`bg-white border border-transparent rounded-2xl transition duration-500 w-[350px] h-[420px] border-${item.accentColor} group parent cursor-pointer m-3`}
                key={index}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.0 }}
                onHoverStart={() => setGrpHover(true)}
                onHoverEnd={() => setGrpHover(false)}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img src={item.imageURL} className=" w-full h-[200px]" />
                  <div
                    className={`absolute p-4 text-white transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-clickBtn-${item.accentColor} flex items-center justify-center top-1/2 left-1/2 glassmorphism duration-300  parent-div`}
                  >
                    <AnimatePresence>
                      {!grpHover ? (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="block"
                        >
                          <MapsArrowDiagonal fontSize={14} className="mr-1" />
                        </motion.div>
                      ) : (
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="block"
                        >
                          Generate
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="px-8 pt-6 pb-9 h-[170px]">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-[170%] text-gray-400 italic">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
