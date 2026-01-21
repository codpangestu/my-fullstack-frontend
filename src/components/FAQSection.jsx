import { useState } from "react";

const faqs = [
  { q: "What is diStreaming?", a: "diStreaming is a movie discovery platform to explore trailers and trending movies." },
  { q: "How much does diStreaming cost?", a: "diStreaming is completely free. No subscription required." },
  { q: "Where can I watch?", a: "You can watch on any device with a modern browser." },
  { q: "How do I cancel?", a: "There is nothing to cancel. No subscription needed." },
  { q: "What can I watch on diStreaming?", a: "Browse movies, trailers, and categories powered by your backend and TMDB." },
  { q: "Is diStreaming good for kids?", a: "Yes, content can be curated for family-friendly viewing." },
];

const FAQSection = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-gradient-to-b from-[#081C3A] to-[white] py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ===== MORE REASONS ===== */}
        <h2 className="text-white text-2xl font-semibold mb-6">
          More Reasons to Join
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            {
              title: "Enjoy on your TV",
              desc: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
            },
            {
              title: "Download your shows to watch offline",
              desc: "Save your favorites easily and always have something to watch.",
            },
            {
              title: "Watch everywhere",
              desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
            },
            {
              title: "Create profiles for kids",
              desc: "Send kids on adventures with their favorite characters in a space made just for them.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#081C3A] from-zinc-800 to-zinc-900 p-6 rounded-xl text-white"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ===== FAQ ===== */}
        <h2 className="text-white text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>

        <div className="border-t border-zinc-700">
          {faqs.map((item, index) => (
            <div key={index} className="border-b border-white">
              <button
                onClick={() => setActive(active === index ? null : index)}
                className="w-full flex justify-between items-center text-white px-6 py-5 text-left bg-[#081C3A] hover:bg-blue-900 transition"
              >
                <span>{item.q}</span>
                <span className="text-2xl font-light">
                  {active === index ? "×" : "+"}
                </span>
              </button>

              {active === index && (
                <div className="bg-blue-900 px-6 pb-5 text-gray-300 text-sm">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
