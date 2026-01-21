import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setError(null);

    api
      .post("/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("role", res.data.data.user.role);
        localStorage.setItem("name", res.data.data.user.name);

        navigate("/"); 
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message || "Login gagal, coba lagi."
        );
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 font-sans relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle, rgba(20,110,190,0.2) 0%, rgb(9, 97, 173) 70%)",
      }}
    >
      <div className="absolute top-8  left-8 md:top-12 md:left-16 z-50">
        <Link
          to="/"
          className="text-3xl font-black tracking-tighter uppercase italic text-white "
        >
          DI<span className="text-white-500">STREAMING</span>
        </Link>
      </div>

      <div
        className="relative w-full max-w-5xl rounded-[40px] overflow-hidden border border-white/10 z-10"
        style={{
          backgroundImage: "url('/Image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#081C3A]/95 via-[#081C3A]/50 to-black/70" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          {/* LEFT */}
          <div className="hidden md:flex flex-col justify-center px-16 text-white italic">
            <h1 className="text-5xl font-black leading-[0.9] mb-6 uppercase tracking-tighter">
              BEYOND <br />
              <span className="text-blue-500 text-6xl">CINEMATIC</span> <br />
              EXPERIENCE
            </h1>

            <p className="text-base text-gray-300 max-w-sm font-medium leading-relaxed not-italic">
              Diving into the depths of extraordinary stories. Your journey into
              the world of premium entertainment starts here.
            </p>
          </div>

          {/* FORM */}
          <div className="flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-sm bg-black/40 backdrop-blur-3xl rounded-[32px] p-10 text-white border border-white/10 shadow-2xl">
              <form onSubmit={submit} className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-widest mb-1 italic">
                    Sign In
                  </h2>
                  <div className="h-1 w-12 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                {error && (
                  <div className="text-red-400 text-xs text-center font-semibold">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 text-white px-5 py-3.5 rounded-2xl outline-none text-sm focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 text-white px-5 py-3.5 rounded-2xl outline-none text-sm focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-gray-500"
                  />
                </div>

                <button className="w-full bg-blue-500 hover:bg-blue-400 text-[#081C3A] transition-all duration-300 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-500/30 active:scale-95">
                  Sign In
                </button>

                {/* DIVIDER */}
                <div className="flex items-center gap-4 text-gray-500 py-2">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <p className="text-center text-xs text-gray-400 font-medium">
                  New to diStreaming?{" "}
                  <Link
                    to="/register"
                    className="text-blue-400 font-bold hover:text-white transition-colors underline underline-offset-4"
                  >
                    Create Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

