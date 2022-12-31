// @ts-ignore
import type { NextPage } from "next";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import axios from "axios";
import { getText } from "./api/pickup";
import { useEffect, useState } from "react";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let pickUpLine: any;

async function setText(prompt: string, temperature: number, setPickUp: Function) {
  var raw = JSON.stringify({
    "prompt": prompt,
    "temperature": temperature
  });

  fetch("/api/pickup", {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
  .then(res => res.json())
  .then(res => setPickUp(res.text));

}

const Home: NextPage = () => {
  let [pickUp, setPickUp] = useState("");

  useEffect(() => {
    setText("write a pickup line relating to delhi", 0.7, setPickUp);
  }, []);

  return (
    <div className="bg-[#330b34] h-screen w-screen">
      <div className="flex flex-col items-center justify-center py-24">
        <div className="">
          <h1 className="mb-6 text-5xl font-bold text-white">
            Pickup Lines
          </h1>
          <span className="text-2xl italic font-semibold text-[#a0a1a9]">
            — (Use at your own risk)
          </span>
        </div>
      </div>
      <div className="w-full h-full bg-[#eee] shadow-cont rounded-[50px]">
        <p>
          {pickUp}
        </p>
        <p>
          Choose from a variety of options to create the perfect match for your
          partner. Trust me, the pickup lines blow your mind!
        </p>
      </div>
    </div>
  );
};

export default Home;
