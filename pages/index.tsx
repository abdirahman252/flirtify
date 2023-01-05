// @ts-ignore
import type { NextPage } from "next";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { useEffect, useRef, useState } from "react";
import { FastArrowRight, MapsArrowDiagonal } from "iconoir-react";

import { motion, AnimatePresence } from "framer-motion";

const relationshipAdvice = [
  "Communication is key.",
  "Trust is essential.",
  "Respect is fundamental.",
  "Make time for each other.",
  "Include your partner in your interests and hobbies.",
  "Express appreciation and gratitude.",
  "Don't be afraid to ask for help or support.",
  "Keep the romance alive.",
  "Learn to resolve conflicts in a healthy way.",
  "Seek help from a therapist or counselor if needed.",
  "Practice forgiveness.",
  "Compromise and be open to your partner's perspective.",
  "Show love and affection regularly.",
  "Discuss your needs and boundaries.",
  "Keep the lines of communication open.",
  "Practice honesty and transparency.",
  "Don't let resentment or negative emotions build up.",
  "Be patient and understanding.",
  "Practice gratitude and focus on the positive.",
  "Keep the spark alive.",
  "Don't take your partner for granted.",
  "Don't let outside influences come between you.",
  "Practice forgiveness and let go of grudges.",
  "Support and encourage your partner's goals and dreams.",
  "Regularly express your love and affection.",
];

const Home: NextPage = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [advice, setAdvice] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: "Enter your",
    annotatedText: "location",
    placeholder: "eg: Delhi, Kerala",
    promptStart: "Write 5 ",
    promptEnd: " themed hardcore pick-up lines",
  });
  const { title, annotatedText, placeholder, promptStart, promptEnd } =
    popupContent;
  const [pickupLine, setPickupLine] = useState("");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (dots.length < 3) {
        setDots(dots + ".");
      } else {
        setDots("");
      }
    }, 500);
    return () => clearInterval(interval);
  }, [dots]);

  function getRandomAdvice(adviceArray: any) {
    const index = Math.floor(Math.random() * adviceArray.length);
    return adviceArray[index];
  }

  async function getPickupLine(prompt: string) {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        prompt: prompt,
        temperature: 0.7,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch("/api/pickup", requestOptions as any);
      const result = await response.json();
      setPickupLine(result.text);
      setLoading(false);
      setAdvice(getRandomAdvice(relationshipAdvice));
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }

  const popupRef: any = useRef(null);

  const handleClick = (event: any) => {
    if (!popupRef.current.contains(event.target)) {
      // clicked outside the popup, so close it
      setOpenPopup(false);
      setPickupLine("");
    }
  };

  const data = [
    {
      title: "Location",
      imageURL:
        "https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?w=2000&t=st=1672441825~exp=1672442425~hmac=f932ef5b7f849902326ae1b1cf1fc7d20918290e69e72295e3489721468d4602",
      description:
        "Are you from Delhi? Because you have me feeling like I'm in the heart of India, surrounded by beauty and culture.",
      accentColor: "green",
      popupContent: {
        title: "Enter any",
        annotatedText: "location",
        placeholder: "eg: Delhi, Singapore",
        promptStart: "Write 5 ",
        promptEnd:
          " themed hardcore pick-up lines that're very funny and impressive",
      },
    },
    {
      title: "Food",
      imageURL:
        "https://mir-s3-cdn-cf.behance.net/projects/404/df41cb110989141.Y3JvcCwxOTI1LDE1MDUsMCw0NDc.jpg",
      description:
        "Are you a pepperoni pizza? Because you've got me feeling hot and spicy, and I can't resist a slice of you.",
      accentColor: "yellow",
      popupContent: {
        title: "Enter your",
        annotatedText: "fav fooood",
        placeholder: "eg: Pepperoni pizza, Double cheeseburger",
        promptStart:
          "Generate 5 very funny, catchy hardcore pickup line relating to ",
        promptEnd: "",
      },
    },
    {
      title: "Drinks",
      imageURL:
        "https://img.freepik.com/free-vector/hand-drawn-cocktail-collection_52683-41676.jpg?w=2000",
      description:
        "Are you a can of Pepsi? Because you have me feeling refreshed and ready for anything.",
      accentColor: "red",
      popupContent: {
        title: "Enter your",
        annotatedText: "fav drink",
        placeholder: "eg: Coca Cola, Pepsi",
        promptStart: "Generate 5 hardcore pickup line relating to",
        promptEnd: "",
      },
    },
    {
      title: "Celebrity",
      imageURL:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/59607587119117.5dae90066d5d9.jpg",
      description:
        "Baby, let's play football together and both of us can be Messi together.",
      accentColor: "blue",
      popupContent: {
        title: "Who is your",
        annotatedText: "fav celebrity",
        placeholder: "eg: Lionel Messi, Tom Cruise",
        promptStart: "Write 5 hardcore pick-up lines relating to ",
        promptEnd: "",
      },
    },
  ];

  const onSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);
    getPickupLine(promptStart + input + promptEnd);
  };

  useEffect(() => {
    if (document.querySelector(".pickup-line-container")) {
      const list = document.createElement("ol");

      const items = pickupLine.split("\n");

      if (list.children.length >= 5) {
        return;
      }

      items.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = item;
        list.appendChild(li);
      });

      document.querySelector(".pickup-line-container")?.appendChild(list);
    }
  }, [pickupLine]);

  return (
    <div className="bg-[#330b34] w-screen">
      <div className="flex flex-col items-center justify-center px-5 py-24">
        <div className="">
          <h1 className="leading-[140%] mb-6 text-5xl font-bold text-white">
            Upgrade your{" "}
            <RoughNotation
              type="underline"
              show={true}
              color="#d370c4"
              strokeWidth={2}
            >
              flirting game
            </RoughNotation>{" "}
            with a little help from AI
          </h1>
          <span className="text-2xl italic text-gray-400">
            AI-generated pickup lines for the modern romantic 💃
          </span>
        </div>
      </div>
      <div className="w-full h-full bg-[#eee] shadow-cont rounded-t-[50px] px-5 lg:px-20 py-20">
        <p className="text-gray-500 leading-[170%] text-lg mb-14">
          Need a cute and funny way to sweep your partner off their feet? Try
          these clever AI generated pickup lines!
        </p>
        <div className="w-full lg:flex mb-9">
          {data.map((item, index) => {
            const [grpHover, setGrpHover] = useState(false);

            return (
              <motion.div
                className={`bg-white border border-transparent rounded-2xl transition duration-500 w-full lg:w-[350px] my-12 h-[420px] border-${item.accentColor} group parent cursor-pointer lg:m-3`}
                key={index}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.0 }}
                onHoverStart={() => setGrpHover(true)}
                onHoverEnd={() => setGrpHover(false)}
                onClick={() => {
                  setInput("");
                  setPopupContent(item.popupContent);
                  setOpenPopup(true);
                }}
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
        <div className="flex items-center justify-center w-full text-gray-500">
          <p>
            Built with ❤️ by{" "}
            <a
              href="https://twitter.com/saviomartin7"
              target="_blank"
              className="text-gray-600 font-[500] hover:text-pink-400 transition duration-300"
            >
              Savio
            </a>
            , (on hunt for a soulmate lol)
          </p>
        </div>
      </div>
      <AnimatePresence>
        {openPopup && (
          <motion.div
            className="top-0 left-0 h-full z-[9999] w-full fixed flex items-center justify-center glassmorphism popup-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClick}
          >
            <motion.div
              className="lg:p-12 p-8 bg-white rounded-2xl w-[700px] shadow-[#330b34]/40 shadow-2xl popup relative"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              ref={popupRef}
            >
              <AnimatePresence>
                {pickupLine ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xl text-gray-600 pickup-line-container"></div>
                    <div className="border my-5 border-[#191919]/10 border-b-transparent border-dotted border-x-transparent"></div>
                    <p className="text-gray-500 font-[500]">
                      <span className="font-light text-[13px]">
                        PS. Here is a free relationship advice:
                      </span>{" "}
                      <br />
                      <span className="mt-2">{advice}</span>
                    </p>
                    <div className="border my-5 border-[#191919]/10 border-b-transparent border-dotted border-x-transparent"></div>
                    <a
                      className="bg-[#d370c4] mb-2 inline-block text-white w-fit px-8 py-2 rounded-lg hover:shadow-xl hover:shadow-[#d370c4]/20 transition duration-500"
                      href="https://www.buymeacoffee.com/saviomartin"
                      target="_blank"
                    >
                      Buy me a coffee? ❤️
                    </a>
                    <br />
                    <span className="font-[400] text-[#d370c4]">
                      Help us keep the romance alive with a{" "}
                      <a
                        href="https://www.buymeacoffee.com/saviomartin"
                        target="_blank"
                      >
                        <RoughNotation
                          type="underline"
                          show={true}
                          color="#d370c4"
                          strokeWidth={2}
                        >
                          small donation
                        </RoughNotation>
                      </a>
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-6 text-3xl font-semibold">
                      {title}{" "}
                      <RoughNotation
                        type="underline"
                        show={true}
                        color="#d370c4"
                        strokeWidth={2}
                      >
                        {annotatedText}
                      </RoughNotation>
                      ?
                    </h3>
                    <form onSubmit={onSubmit} className="mb-2">
                      <input
                        type="text"
                        placeholder={placeholder}
                        className="w-full px-3 py-2 mb-6 text-lg bg-gray-100 rounded-xl placeholder:italic"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="bg-[#330b34] hover:bg-[#d370c4] transition duration-500 cursor-pointer px-7 rounded-full py-3 text-white w-fit flex items-center justify-center"
                        style={{ pointerEvents: loading ? "none" : "auto" }}
                      >
                        Generate{" "}
                        <FastArrowRight fontSize={14} className="ml-1" />
                      </button>
                    </form>
                    {loading && (
                      <motion.span
                        className="text-[#d370c4]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        Our AI is busy making love connections, hang tight{" "}
                        {dots}
                      </motion.span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
