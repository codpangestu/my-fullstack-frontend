import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Play, Plus, Info, ChevronLeft, ChevronRight } from "lucide-react";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  
  // Ref untuk mengontrol scroll horizontal
  const scrollRef = useRef(null);

  const getMovies = () => {
    setLoading(true);
    let url = "/movies";
    if (search) url += `?search=${search}`;

    api.get(url)
      .then((res) => {
        setMovies(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMovies();
  }, [search]);

  // Fungsi untuk menggeser scroll ke kiri/kanan
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 400; // Jarak geser pas klik
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleClearSearch = () => setSearchParams({});
  const featured = movies[0];

  return (
    <div className="bg-[#081C3A] min-h-screen text-white">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      {!search && featured && (
        <section className="relative h-[80vh] w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-105"
            style={{
              backgroundImage: `linear-gradient(to right, #081C3A 15%, transparent 50%, #081C3A 85%), 
                                linear-gradient(to top, #081C3A 5%, transparent 40%),
                                url(${featured.thumbnail})`,
            }}
          />
          <div className="relative h-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex items-center">
            <div className="max-w-2xl mt-20">
              <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold text-sm italic uppercase tracking-widest">
                <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded non-italic">Watch on</span>
                diStreaming Original
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase italic tracking-tighter leading-none">{featured.title}</h1>
              <p className="text-gray-300 mb-8 text-sm md:text-base leading-relaxed line-clamp-3 max-w-xl">{featured.description}</p>
              <div className="flex gap-4">
                <Link to={`/movies/${featured.id}`} className="bg-blue-500 hover:bg-blue-400 text-[#081C3A] px-8 py-3.5 rounded-md font-black flex items-center gap-2 transition-all">
                  <Play size={20} fill="currentColor" /> WATCH NOW
                </Link>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md p-3.5 rounded-md transition-all">
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <main className={`max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 ${!search && featured ? "-mt-16 relative z-20" : "pt-32"}`}>
        
        {/* ================= TRENDING SECTION (BUTTON) ================= */}
        <section className="mb-16 relative group">
          <div className="flex items-center gap-4 mb-6">
            {search && (
              <button onClick={handleClearSearch} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all">
                <ChevronLeft size={24} className="text-blue-400" />
              </button>
            )}
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">
              {search ? <span>Results for <span className="text-blue-400">"{search}"</span></span> : <span>Trending <span className="text-blue-400">Now</span></span>}
            </h2>
            <div className="h-[1px] flex-1 bg-white/10 ml-4 hidden sm:block"></div>
          </div>

          {/* Navigasi Tombol Scroll (Hanya muncul saat tidak search & di desktop) */}
          {!search && !loading && movies.length > 0 && (
            <>
              <button 
                onClick={() => scroll("left")}
                className="absolute left-[-20px] top-[46%] z-30 bg-black/50 hover:bg-blue-600 p-3 rounded-full border border-white/10 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden md:block"
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="absolute right-[-20px] top-[46%] z-30 bg-black/50 hover:bg-blue-600 p-3 rounded-full border border-white/10 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden md:block"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* List Movies */}
          <div 
            ref={scrollRef}
            className={`flex gap-4 md:gap-6 overflow-x-auto pb-6 scroll-smooth no-scrollbar ${search ? "flex-wrap" : "flex-nowrap"}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {(search ? movies : movies.slice(0, 15)).map((item) => (
              <div key={item.id} className={search ? "w-[calc(50%-8px)] sm:w-[180px] lg:w-[200px]" : "min-w-[160px] md:min-w-[220px]"}>
                <Card id={item.id} thumbnail={item.thumbnail} title={item.title} rating={item.rating} />
              </div>
            ))}
          </div>
        </section>

        {/* ================= ALL CONTENT (GRID) ================= */}
        {!search && (
          <section className="pb-24">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic mb-8">Explore <span className="text-blue-400">All Movies</span></h2>
            
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-6">
              {movies.map((item) => (
                <Card key={item.id} id={item.id} thumbnail={item.thumbnail} title={item.title} rating={item.rating} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-[#06162d] border-t border-white/5 py-12 text-center">
        <div className="text-white font-black tracking-tighter text-2xl italic mb-4">DI<span className="text-blue-400">STREAMING</span></div>
        <p className="text-gray-500 text-xs tracking-[0.3em] uppercase font-bold">© 2026 diStreaming. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Movies;