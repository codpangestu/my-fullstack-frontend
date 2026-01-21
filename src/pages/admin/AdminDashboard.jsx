import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { Plus, Edit, Trash2, Film, Eye } from "lucide-react";

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    setLoading(true);
    api.get("/movies")
      .then((res) => {
        // Pastikan mengambil data sesuai struktur response backend
        setMovies(res.data.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data film:", err);
      })
      .finally(() => setLoading(false));
  };

  const deleteMovie = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus film ini?")) {
      api.delete(`/movies/${id}`).then(() => {
        fetchMovies();
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white font-sans">
      <Navbar />

      <div className="max-w-[1500px] mx-auto px-16 pt-32 pb-10">

        {/* HEADER DASHBOARD */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">
              Dashboard <span className="text-blue-500">Admin</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium uppercase tracking-widest">
              Kelola daftar film dan konten diStreaming
            </p>
          </div>

          <Link
            to="/admin/movies/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-white hover:text-blue-900 transition-all duration-300 px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 w-fit"
          >
            <Plus size={18} /> Tambah Film
          </Link>
        </div>

        {/* TABEL DATA FILM */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Judul Film</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Genre / Kategori</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Rating</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center text-gray-500 font-bold uppercase tracking-widest animate-pulse">
                      Memuat data film...
                    </td>
                  </tr>
                ) : movies.length > 0 ? (
                  movies.map((movie) => (
                    <tr key={movie.id} className="hover:bg-white/[0.02] transition-colors group">
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">

                          {/* Menampilkan poster kecil agar lebih oke */}
                          <div className="w-10 h-14 rounded-md overflow-hidden border border-white/10 bg-black/20 flex-shrink-0">
                            <img src={movie.thumbnail} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-black text-sm uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                              {movie.title}
                            </p>
                            <p className="text-[10px] text-gray-500 font-medium">
                              Tahun: {movie.release_year}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full text-blue-400 uppercase tracking-tight">
                        
                          {/* SINKRONISASI DI SINI: movie.category.name */}
                          {movie.category?.name || "Tanpa Kategori"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                          ★ <span className="text-white">{movie.rating}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/movies/${movie.id}`}
                            className="p-2 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 rounded-lg transition-all"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            to={`/admin/movies/edit/${movie.id}`}
                            className="p-2 hover:bg-yellow-500/20 text-gray-400 hover:text-yellow-500 rounded-lg transition-all"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => deleteMovie(movie.id)}
                            className="p-2 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center text-gray-500 font-bold uppercase tracking-widest">
                      Belum ada film yang terdaftar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;