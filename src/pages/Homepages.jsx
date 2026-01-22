import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import FAQSection from "../components/FAQSection";

const Homepages = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const res = await api.get("/movie"); 
      setMovies(res.data.data);
    } catch (err) {
      console.log("ERROR FETCH MOVIES:", err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="bg-[#081C3A] min-h-screen font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] lg:h-screen flex items-center justify-center overflow-hidden">
        {/* Bg */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "linear-gradient(to top, #081C3A 10%, rgba(8, 28, 58, 0.4) 50%, rgba(8, 28, 58, 0.8) 100%), url('/Image.png')",
          }}
        />
        
        {/* Konten Hero */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto mt-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tighter">
            Unlimited movies, TV <br className="hidden md:block" />
            shows, and more
          </h1>

          <p className="text-lg md:text-2xl font-medium mb-4 text-blue-100">
            Starts at <span className="text-blue-400 font-bold">IDR 54,000</span>. Cancel anytime.
          </p>

          <p className="text-sm md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ready to watch? Enter your email to create or restart your membership.
          </p>

          {/* INPUT + BUTTON GROUP */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-2 max-w-2xl mx-auto group">
            <input
              type="email"
              placeholder="Email address"
              className="px-6 py-4 w-full sm:flex-1 rounded-t-lg sm:rounded-l-full sm:rounded-tr-none bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 outline-none focus:bg-white/20 focus:border-blue-400 transition-all text-lg"
            />
            <Link to="/movies" className="w-full sm:w-auto">
              <button className="w-full bg-blue-500 hover:bg-blue-400 text-[#081C3A] px-10 py-4 rounded-b-lg sm:rounded-r-full sm:rounded-bl-none font-black text-white text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                GET STARTED <span className="text-2xl">›</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <div className="bg-gradient-to-b from-[#081C3A] to-[#06162d]">
        <FAQSection />
      </div>

      {/* ================= NEW MOVIES SECTION ================= */}
      <section className="relative py-24 px-6 md:px-12 lg:px-20 bg-[#06162d] ">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Exclusive Preview
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight tracking-tighter">
              See what’s new on <br />
              <span className="text-blue-500 italic">diStreaming.</span>
            </h2>

            <p className="text-base md:text-lg text-gray-400 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
              Select your favorite streaming services to discover more, search
              faster, and get curated recommendations — all without
              subscription.
            </p>

            <Link to="/register">
              <button className="bg-transparent border-2 border-blue-500 text-blue-500 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-500 hover:text-[#081C3A] transition-all shadow-lg hover:shadow-blue-500/20">
                Register Now
              </button>
            </Link>
          </div>

          {/* RIGHT MOVI GRID */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {movies.slice(0, 8).map((item) => (
                <div key={item.id} className="transform hover:scale-105 transition-transform duration-300">
                  <Card
                    id={item.id}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    rating={item.rating}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#040d1a] border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-black tracking-tighter text-xl">
            DI<span className="text-blue-500">STREAMING</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 diStreaming. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepages;