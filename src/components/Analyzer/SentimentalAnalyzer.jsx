import { useState } from "react";
import { analyzeSentimentWithGemini } from "../../utils/gemini";

function SentimentalAnalyzer() {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await analyzeSentimentWithGemini(review);
      setReviews([
        ...reviews,
        {
          text: review,
          sentiment: data,
          emoji: data,
          explanation: data,
          timestamp: new Date().toLocaleString(),
        },
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
        <div className="grid">
          {reviews.map((items,index)=>(
          <>
            <div key={index} className="bg-white/10 p-5 rounded-lg backdrop-blur-xl">
              <div className="flex ietms-center justify-between mb-5">
                <span>😊</span>
                <span>NEGATIVE</span>
              </div>
              <p>text</p>
              <p>explanation</p>
              <p>timestamp</p>
            </div>
          </>
        ))} 
        </div>
      </div>
    </section>
  );
}

export default SentimentalAnalyzer;
