import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { User, Mail, Shield, Calendar, Settings, LogOut } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/user")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#050b18] text-white font-sans">
      <Navbar />

      <div className="max-w-[1500px] mx-auto px-16 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* HEADER TITLE */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              My <span className="text-blue-500">Account</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
              Atur detail profil dan preferensi streaming Anda
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-[2.5rem] animate-pulse">
              <div className="w-20 h-20 bg-white/10 rounded-full mb-4"></div>
              <div className="h-4 w-40 bg-white/10 rounded mb-2"></div>
              <div className="h-3 w-60 bg-white/10 rounded"></div>
            </div>
          ) : user ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* LEFT section : AVATAR & QUICK ACTIONS */}
              <div className="md:col-span-1 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 text-center backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                  
                  {/* Avatar */}
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-3xl font-black shadow-2xl shadow-blue-500/20 border-2 border-white/10 transform transition-transform group-hover:rotate-3">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 p-2 rounded-xl border-4 border-[#050b18]">
                      <Shield size={14} className="text-white" />
                    </div>
                  </div>

                  <h2 className="text-xl font-black uppercase tracking-tight truncate">{user.name}</h2>
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1 mb-6">
                    {user.role} Member
                  </p>

                  <div className="space-y-3">
                    <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                      <Settings size={14} /> Edit Profil
                    </button>
                    <button className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT section: DETAILS */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-md">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8 pb-4 border-b border-white/5">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                    {/* NAME */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <User size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Nama Lengkap</span>
                      </div>
                      <p className="text-lg font-black uppercase tracking-tight italic">{user.name}</p>
                    </div>

                    {/* EMAIL */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Mail size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Alamat Email</span>
                      </div>
                      <p className="text-lg font-black tracking-tight">{user.email}</p>
                    </div>

                    {/* ROLE */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Shield size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Level Akses</span>
                      </div>
                      <div>
                        <span className={`inline-block px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest
                          ${user.role === "admin" 
                            ? "bg-blue-500 text-white" 
                            : "bg-emerald-500 text-white"}`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </div>

                    {/* JOINED AT */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Calendar size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Anggota Sejak</span>
                      </div>
                      <p className="text-sm font-bold text-gray-300">
                        {new Date(user.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* INFO CARD */}
                <div className="p-6 bg-gradient-to-r from-blue-600/20 to-transparent border border-blue-500/20 rounded-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                    Status Langganan
                  </p>
                  <p className="text-sm text-gray-400">Anda sedang menggunakan paket <strong>Premium Cinematic</strong>. Selamat menikmati film favorit Anda!</p>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-20 bg-red-500/5 border border-red-500/10 rounded-[2.5rem]">
              <p className="text-red-400 font-black uppercase tracking-widest">Data profil tidak ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;