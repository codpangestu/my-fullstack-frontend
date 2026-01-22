import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import {
  Play,
  Plus,
  ThumbsUp,
  Share2,
  Star,
  Calendar,
  Tag,
} from "lucide-react";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movie/${id}`);
        setMovie(res.data.data);
      } catch (error) {
        console.log("ERROR FETCH MOVIE DETAIL:", error);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  if (!movie)
    return (
      <div className="bg-[#081C3A] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="bg-[#081C3A] min-h-screen">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `
              linear-gradient(to right, #081C3A 10%, rgba(8, 28, 58, 0.7) 50%, rgba(8, 28, 58, 0.4) 100%),
              linear-gradient(to top, #081C3A 5%, transparent 30%),
              url(${movie.thumbnail})
            `,
          }}
        />
        <div className="absolute inset-0 bg-[#081C3A]/40 backdrop-blur-[2px]" />

        {/* Content Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: POSTER CARD */}
          <div className="lg:col-span-4 group hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 transform transition-all duration-500 group-hover:scale-[1.02]">
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full object-cover aspect-[2/3]"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-[#081C3A] shadow-xl">
                  <Play size={40} fill="currentColor" className="ml-2" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: MOVIE INFO */}
          <div className="lg:col-span-8 text-white space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-blue-600 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                  Original
                </span>
                <div className="flex items-center gap-1 text-yellow-400 font-bold">
                  <Star size={16} fill="currentColor" />
                  <span>{movie.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-300 font-medium">
                  {movie.release_year}
                </span>
                <span className="text-gray-400">|</span>
                <span className="border border-white/30 px-2 py-0.5 rounded text-xs font-bold text-gray-300">
                  16+
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-[900] uppercase italic tracking-tighter leading-none">
                {movie.title}
              </h1>

              <div className="flex items-center gap-2 text-blue-400 font-bold text-lg">
                <Tag size={20} />
                <span>{movie.category?.name}</span>
              </div>
            </div>

            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl font-medium">
              {movie.description || "No description available for this title."}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 items-center pt-4">
              {!isAuth ? (
                <Link to="/login" className="flex-1 md:flex-none">
                  <button className="w-full bg-blue-500 hover:bg-blue-400 text-[#081C3A] px-10 py-4 rounded-md font-black text-lg transition-all flex items-center justify-center gap-3 uppercase tracking-tighter">
                    <Play size={24} fill="currentColor" /> Masuk untuk nonton
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => alert("Mulai nonton 🎬")}
                  className="flex-1 md:flex-none bg-blue-500 hover:bg-blue-400 text-[#081C3A] px-10 py-4 rounded-md font-black text-lg transition-all flex items-center justify-center gap-3 uppercase tracking-tighter shadow-lg shadow-blue-500/20"
                >
                  <Play size={24} fill="currentColor" /> Watch Now
                </button>
              )}

              <div className="flex gap-3">
                <button
                  title="Add to List"
                  className="bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-md transition-all text-white"
                >
                  <Plus size={24} />
                </button>
                <button
                  title="Like"
                  className="bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-md transition-all text-white"
                >
                  <ThumbsUp size={24} />
                </button>
                <button
                  title="Share"
                  className="bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-md transition-all text-white"
                >
                  <Share2 size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DETAILS SECTION ================= */}
      <section className="bg-[#06162d] py-20 px-6 md:px-12 lg:px-20 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-2xl font-black text-white uppercase italic mb-10 tracking-widest border-l-4 border-blue-500 pl-4">
            Movie <span className="text-blue-500">Details</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-1">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                Genre
              </span>
              <p className="text-white text-lg font-bold">
                {movie.category?.name}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                Release Year
              </span>
              <p className="text-white text-lg font-bold">
                {movie.release_year}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                Rating
              </span>
              <div className="flex items-center gap-2">
                <p className="text-white text-lg font-bold">{movie.rating}</p>
                <div className="flex text-yellow-500">
                  <Star size={14} fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                Studio
              </span>
              <p className="text-white text-lg font-bold italic">
                diStreaming Studio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#040d1a] text-gray-500 text-center py-10 border-t border-white/5">
        <div className="text-white font-black tracking-tighter text-2xl italic mb-4">
          DI<span className="text-blue-400">STREAMING</span>
        </div>
        <p className="text-sm">© 2026 diStreaming. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MovieDetail;
