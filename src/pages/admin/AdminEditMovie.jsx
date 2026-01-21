import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { Save, ArrowLeft, Image as ImageIcon, Film } from "lucide-react";

const AdminEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Ambil Data Movie
    api.get(`/movies/${id}`).then((res) => {
      const movie = res.data.data;
      setTitle(movie.title);
      setDescription(movie.description);
      setRating(movie.rating);
      setReleaseYear(movie.release_year);
      setCategoryId(movie.category.id);
      setThumbnail(movie.thumbnail);
    });

    // Ambil Data Kategori
    api.get("/categories").then((res) => {
      setCategories(res.data.data);
    });
  }, [id]);

  const submit = (e) => {
    e.preventDefault();
    api
      .put(`/movies/${id}`, {
        title,
        description,
        rating,
        release_year: releaseYear,
        category_id: categoryId,
        thumbnail,
      })
      .then(() => navigate("/admin/dashboard"))
      .catch((err) => {
        console.log(err.response?.data);
        alert("Gagal update movie");
      });
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white">
      <Navbar />

      <div className="max-w-[1500px] mx-auto px-16 pt-32 pb-16">
        {/* HEADER & BACK BUTTON */}
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              Edit <span className="text-blue-500">Film</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">ID Film: #{id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ================= FORM UTAMA ================= */}
          <form onSubmit={submit} className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Judul */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Judul Film</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600 font-medium"
                  placeholder="Masukkan judul film..."
                  required
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Rating (0 - 10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="Contoh: 8.5"
                  required
                />
              </div>

              {/* Tahun Rilis */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tahun Rilis</label>
                <input
                  type="number"
                  min="1900"
                  max="2030"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="Contoh: 2024"
                  required
                />
              </div>

              {/* Kategori */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Kategori / Genre</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all font-medium appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-[#050b18]">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#050b18]">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Thumbnail URL */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Thumbnail URL</label>
                <div className="relative">
                  <input
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all font-medium pl-12"
                    placeholder="https://image-link.com/poster.jpg"
                  />
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>

              {/* Deskripsi */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Deskripsi Film</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all font-medium min-h-[150px] resize-none"
                  placeholder="Tuliskan sinopsis film di sini..."
                  required
                />
              </div>
            </div>

            <button className="flex items-center justify-center gap-3 w-full md:w-fit bg-blue-600 hover:bg-white hover:text-blue-900 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95">
              <Save size={18} /> Save Change
            </button>
          </form>

          {/* ================= PRATINJAU (PREVIEW) ================= */}
          <div className="relative">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Film size={80} />
                </div>
                
                <h2 className="text-[10px] font-black text-blue-500 mb-6 uppercase tracking-[0.3em]">Live Preview</h2>

                {/* POSTER PRATINJAU */}
                <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-black/40 border border-white/5 shadow-2xl mb-6 group">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt="Preview"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-600 gap-2">
                      <ImageIcon size={40} strokeWidth={1} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">No Image</span>
                    </div>
                  )}
                </div>

                {/* DETAIL PRATINJAU */}
                <div className="space-y-3">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter truncate">
                    {title || "Judul Film"}
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black bg-blue-500 text-white px-2 py-1 rounded italic">
                      {releaseYear || "0000"}
                    </span>
                    <span className="text-[10px] font-black border border-white/20 px-2 py-1 rounded text-gray-400 uppercase tracking-tighter">
                      {categories.find((c) => c.id == categoryId)?.name || "Kategori"}
                    </span>
                    <span className="text-yellow-500 font-bold text-xs ml-auto">
                      ★ {rating || "0.0"}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 italic mt-4">
                    {description || "Sinopsis film akan muncul di sini secara otomatis saat Anda mengetik..."}
                  </p>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-[9px] text-yellow-500 font-bold uppercase tracking-widest leading-relaxed">
                  Perhatian: Pastikan semua data sudah benar sebelum menekan tombol simpan. Perubahan akan langsung berakibat pada tampilan publik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditMovie;