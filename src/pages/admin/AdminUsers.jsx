import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { User, ShieldCheck, Mail, UserCog, ChevronRight } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/users")
      .then((res) => {
        setUsers(res.data.data.data || res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#050b18] text-white font-sans">
      <Navbar />

      <div className="max-w-[1500px] mx-auto px-16 pt-32 pb-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">
              User <span className="text-blue-500">Database</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
              Manajemen hak akses dan profil pengguna iStreaming
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Members</p>
              <p className="text-xl font-black text-blue-500">{users.length}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <User size={24} />
            </div>
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">User Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Email Address</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Security Role</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center text-gray-500 font-bold uppercase tracking-[0.3em] animate-pulse">
                      Synchronizing user data...
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-all group">
                      {/* Identity Column */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center font-black text-sm border-2 border-white/10 shadow-lg">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-black text-sm uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                              {u.name}
                            </p>
                            <p className="text-[10px] text-gray-500 font-medium tracking-wider">UID: #{u.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Email Column */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                          <Mail size={14} className="text-gray-600" />
                          {u.email}
                        </div>
                      </td>

                      {/* Role Column */}
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          u.role === 'admin' 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {u.role === 'admin' ? <ShieldCheck size={12} /> : <User size={12} />}
                          {u.role}
                        </span>
                      </td>

                      {/* Action Column */}
                      <td className="px-8 py-5 text-center">
                        <Link
                          to={`/admin/users/edit/${u.id}`}
                          className="inline-flex items-center gap-2 bg-white/5 hover:bg-white hover:text-[#050b18] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border border-white/10"
                        >
                          <UserCog size={14} />
                          Edit Profile
                          <ChevronRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;