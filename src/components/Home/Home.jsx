import { useState } from "react";
import TopSection from "../Navigation/TopSection";

function Home() {
  const [data, setData] = useState({
    genric: "Click Button to Change me",
    name: "Here You Go ",
  });

  const handleDataClick = () => {
    setData({
      genric: "Wow Great",
      name: "Thanks for Changing",
    });
  };
  return (
    <>
      <section className="h-screen   bg-linear-to-t from-purple-600 to-purple-300">
        <div className="pt-[15%]">
          <TopSection data={data} />
        </div>
        <div className="flex justify-center m-10 ">
          <button
            className="text-lg font-semibold bg-white p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={handleDataClick}
          >
            Change Data
          </button>
        </div>

        <div className="flex justify-center m-10 ">
          <button
            className="text-lg font-semibold text-white hover:p-2.5 border-black border-2  p-2 rounded-lg cursor-pointer"
            onClick={() =>
              setData({
                genric: "Click Button to Change me",
                name: "Here You Go ",
              })
            }
          >
            Reset
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
