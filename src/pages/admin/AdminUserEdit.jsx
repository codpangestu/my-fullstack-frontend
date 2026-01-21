import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { ShieldAlert, ArrowLeft, Save, UserCheck, Shield } from "lucide-react";

const AdminUserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState(""); // Tambahan biar lebih personal
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/users/${id}`).then((res) => {
      const data = res.data.data;
      setRole(data.role);
      setUserName(data.name);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const submit = (e) => {
    e.preventDefault();
    api.put(`/users/${id}`, { role }).then(() => {
      navigate("/admin/users");
    });
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white font-sans">
      <Navbar />

      <div className="max-w-[1500px] mx-auto px-16 pt-32 pb-16">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate("/admin/users")}
          className="group flex items-center gap-2 text-gray-500 hover:text-white transition-all mb-8 uppercase text-[10px] font-black tracking-[0.2em]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Database
        </button>

        <div className="max-w-xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              Akses <span className="text-blue-500">Kontrol</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
              Modifikasi level keamanan akun pengguna
            </p>
          </div>

          {/* CARD CONTAINER */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-md relative overflow-hidden shadow-2xl">
            {/* Background Decor */}
            <div className="absolute -top-10 -right-10 opacity-5">
              <Shield size={200} />
            </div>

            {loading ? (
              <div className="py-10 text-center animate-pulse text-gray-500 font-black uppercase tracking-widest">
                Fetching Account...
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-8 relative z-10">
                {/* User Info Display */}
                <div className="flex items-center gap-5 p-6 bg-white/5 border border-white/5 rounded-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <UserCheck size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Target User</p>
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">{userName || "User"}</h3>
                    <p className="text-xs text-gray-500 font-medium">UID: #{id}</p>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Pilih Level Akses
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* User Option */}
                    <button
                      type="button"
                      onClick={() => setRole("user")}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        role === "user" 
                        ? "border-blue-600 bg-blue-600/10" 
                        : "border-white/5 bg-white/5 hover:bg-white/10 text-gray-500"
                      }`}
                    >
                      <p className={`font-black uppercase tracking-widest text-[10px] ${role === "user" ? "text-blue-400" : ""}`}>Regular</p>
                      <p className="text-sm font-bold">User</p>
                    </button>

                    {/* Admin Option */}
                    <button
                      type="button"
                      onClick={() => setRole("admin")}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        role === "admin" 
                        ? "border-blue-600 bg-blue-600/10" 
                        : "border-white/5 bg-white/5 hover:bg-white/10 text-gray-500"
                      }`}
                    >
                      <p className={`font-black uppercase tracking-widest text-[10px] ${role === "admin" ? "text-blue-400" : ""}`}>Full Access</p>
                      <p className="text-sm font-bold">Admin</p>
                    </button>
                  </div>
                </div>

                {/* Warning Note */}
                <div className="flex gap-3 px-4 py-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <ShieldAlert size={18} className="text-yellow-500 flex-shrink-0" />
                  <p className="text-[9px] text-yellow-500 font-bold uppercase tracking-widest leading-relaxed">
                    Perhatian: Memberikan akses Admin mengizinkan user ini untuk mengubah database film dan manajemen user lainnya.
                  </p>
                </div>

                {/* Submit Button */}
                <button className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-white hover:text-blue-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-95">
                  <Save size={18} /> Update Permission
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserEdit;