import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
function JokeHome() {
  const [joke, setJoke] = useState("Click the below button to generate Joke");
  const [loading, setLoading] = useState(false);

  const generateJoke = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const categories = [
        "animal joke",
        "college joke",
        "fact joke",
        "samay raina joke",
      ];
      const randomData =
        categories[Math.floor(Math.random() * categories.length)];
      const prompt = `Tell me a funny clean ${randomData} suitable for all ages`;
      const result = await model.generateContent(prompt);
      console.log(result);
      const response = await result.response;
      setJoke(response.text());
    } catch {
      setJoke("Sorry for the Inconvinience");
    }
    setLoading(false);
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-r from-yellow-400 to-yellow-800 flex flex-col justify-center items-center" > 
      <h1 className="font-bold text-3xl mb-10">AI Joke Generator</h1>
<div className="bg-black max-w-xl drop-shadow-2xl rounded-lg text-white p-10 flex flex-col items-center justify-center space-y-5">

<div className=" text-center ">
          {joke}

        </div>
        <div className="flex justify-center  mt-5 ">
          <div
            onClick={generateJoke}
            className="border border-gray-400 bg-white text-black rounded-sm px-2 py-0.5 w-50 text-center cursor-pointer "
          >
            {loading ? "Generating..." : "Generate Joke"}
          </div>
        </div>
</div>

      </section>
    </>
  );
}
export default JokeHome;
