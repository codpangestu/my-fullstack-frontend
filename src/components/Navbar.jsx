import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Grid,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import api from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  /* ================= INIT ================= */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    syncAuth();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const syncAuth = () => {
    setIsAuth(!!localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
    setName(localStorage.getItem("name") || "");
  };

  const logout = () => {
    api.post("/logout").finally(() => {
      localStorage.clear();
      navigate("/login");
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    navigate(`/movies?search=${keyword}`);
    setKeyword("");
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-[#050b18]/90 backdrop-blur-xl border-b border-white/5 py-5 px-6 md:px-10 lg:px-16 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-7 px-6 md:px-10 lg:px-16"
      }`}
    >
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="text-white text-2xl md:text-3xl font-black italic uppercase"
          >
            DI<span className="text-blue-500">STREAMING</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { name: "Beranda", path: "/" },
              { name: "Movies", path: "/movies" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-[11px] font-bold uppercase tracking-[0.2em] ${
                  isActive(item.path)
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute -bottom-[22px] left-0 w-full h-[3px] bg-blue-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5"
          >
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari judul..."
              className="bg-transparent w-[150px] focus:w-[220px] text-xs text-white outline-none transition-all"
            />
            <button type="submit">
              <Search size={16} className="text-gray-500 hover:text-blue-500" />
            </button>
          </form>

          {/* AUTH */}
          {!isAuth ? (
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/login"
                className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-widest"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-7 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-blue-900"
              >
                Register
              </Link>
            </div>
          ) : (
            <div ref={dropdownRef} className="relative hidden md:block">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 bg-white/5 border text-white border-white/10 p-1.5 pl-3 rounded-xl"
              >
                <span className="hidden md:block text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Hi {name}
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <ChevronDown size={14} />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-4 w-60 bg-[#050b18] border border-white/10 rounded-xl overflow-hidden">
                  <Link
                    to="/profile"
                    className="flex gap-3 px-4 py-3 hover:bg-white/5 text-gray-300"
                  >
                    <Grid size={16} className="text-blue-500" /> Profil
                  </Link>

                  {role === "admin" && (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="flex gap-3 px-4 py-3 hover:bg-white/5 text-gray-300"
                      >
                        <LayoutDashboard size={16} className="text-blue-500" />{" "}
                        Dashboard Admin
                      </Link>
                      <Link
                        to="/admin/users"
                        className="flex gap-3 px-4 py-3 hover:bg-white/5 text-gray-300"
                      >
                        <Users size={16} className="text-blue-500" /> Manage
                        Users
                      </Link>
                    </>
                  )}

                  <button
                    onClick={logout}
                    className="flex gap-3 w-full px-4 py-3 hover:bg-red-500/10 text-red-500"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="lg:hidden text-white p-2"
          >
            <Search size={22} />
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setShowMobileSearch(false);
            }}
            className="lg:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH DROPDOWN */}
      {showMobileSearch && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#050b18] border-b border-white/10 px-6 py-4 animate-in slide-in-from-top duration-300">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
          >
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari film..."
              autoFocus
              className="bg-transparent w-full text-sm text-white outline-none placeholder:text-gray-500"
            />
            <button type="submit">
              <Search size={18} className="text-blue-500" />
            </button>
          </form>
        </div>
      )}

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#050b18] border-b border-white/5 p-8 space-y-6">
          

          <div className="flex flex-col gap-5 text-center font-black uppercase tracking-widest text-sm">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-blue-500"
            >
              Beranda
            </Link>
            <Link
              to="/movies"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-blue-500"
            >
              Movies
            </Link>

            {isAuth && (
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-blue-500"
              >
                Profil
              </Link>
            )}

            {role === "admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-blue-400"
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  onClick={() => setIsOpen(false)}
                  className="text-blue-400"
                >
                  Manage Users
                </Link>
              </>
            )}

            {!isAuth ? (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 py-3 rounded-lg text-white"
              >
                Masuk
              </Link>
            ) : (
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
