import React from "react";
import { BsSun, BsLightningCharge } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";
function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>
      <div className=" flex space-x-2 text-center">
        <div>
          <div className=" flex flex-col items-center justify-center mb-5">
            <BsSun className=" h-8 w-8 " />
            <h2>Example</h2>
          </div>
          <div className=" space-y-2 ">
            <p className="infoText">"Explann something to me"</p>
            <p className="infoText">"What difference between a dog and cat"</p>
            <p className="infoText">"What is the color of the sun"</p>
          </div>
        </div>

        <div>
          <div className=" flex flex-col items-center justify-center mb-5">
            <BsLightningCharge className=" h-8 w-8 " />
            <h2>Capabilities</h2>
          </div>
          <div className=" space-y-2 ">
            <p className="infoText">"Explann something to me"</p>
            <p className="infoText">"What difference between a dog and cat"</p>
            <p className="infoText">"What is the color of the sun"</p>
          </div>
        </div>

        <div>
          <div className=" flex flex-col items-center justify-center mb-5">
            <AiOutlineWarning className=" h-8 w-8 " />
            <h2>Limitions</h2>
          </div>
          <div className=" space-y-2 ">
            <p className="infoText">"Explann something to me"</p>
            <p className="infoText">"What difference between a dog and cat"</p>
            <p className="infoText">"What is the color of the sun"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
