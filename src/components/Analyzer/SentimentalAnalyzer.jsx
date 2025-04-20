import { useState } from "react";
import { analyzeSentimentWithGemini } from "../../utils/gemini";

function SentimentalAnalyzer() {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(false);
  const analyzeSentiment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await analyzeSentimentWithGemini(review);
      
      setReviews([
        
        {
          text: review,
          sentiment: data.sentiment,
          emoji: data.emoji,
          explanation: data.explanation,
          timestamp: new Date().toLocaleString(),
        },
        ...reviews,
      ]);
      setReview("");
    } catch (error) {
      console.error("Error Analyzing", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#B1CEFB] via-[#8AB5FA]  to-[#639CF8]">
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-4xl font-semibold gradient-text text-center mb-5">
          Sentiment Analyzer
        </h1>
        <form onSubmit={analyzeSentiment} className="mb-5">
          <div className="bg-white/20 p-6 rounded-lg backdrop-blur-xl">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="4"
              placeholder="Enter your review here...."
              className="w-full p-3 rounded-lg bg-white/5 border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <button className="mt-5 px-6 py-1 bg-gradient-to-br from-blue-300 to-blue-600  rounded-md cursor-pointer">
              {loading ? "Analyzing..." : "Analyze Sentiment"}
            </button>
          </div>
        </form>
        <div className="grid gap-4">
          {reviews.map((items,index)=>(
          <>
            <div key={index} className="bg-white/10 p-5 rounded-lg backdrop-blur-xl">
              <div className="flex items-center justify-between mb-5">
                <span className="text-4xl">{items.emoji}</span>

                <span className={`px-4 py-1 rounded-full ${
                    items.sentiment === 'POSITIVE'? 'bg-green-500/60 text-green-300':
                    items.sentiment === 'NEGATIVE'? 'bg-red-500/60 text-red-300':
                    'bg-yellow-500/60 text-yellow-300'
                }`}>{items.sentiment}</span>


              </div>
              <p className="text-black mb-5">{items.text}</p>
              <p className="text-blue-800 text-xs"> {items.explanation}</p>
              <p className="text-gray-600 text-xs mt-5">{items.timestamp}</p>
            </div>
          </>
        ))} 
        </div>



<div>
    <h1>drop down</h1>
    <select
    onChange={(e)=>{setOption(e.target.value)}}
    value={option}
    >
    <option value=""> choose an Option</option>
        <option value="Linkdin"> Linkdin</option>
        <option value="Facebook"> Facebook</option>
        <option value="Instagram"> Instagram</option>
    </select>
</div>
      </div>
    </section>
  );
}

export default SentimentalAnalyzer;
