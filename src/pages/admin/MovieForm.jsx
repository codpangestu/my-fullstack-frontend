import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { Save, ArrowLeft, Image as ImageIcon, Sparkles } from "lucide-react";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    rating: "",
    release_year: "",
    category_id: "",
    thumbnail: "",
  });

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    // ambil categories
    api.get("/categories").then((res) => {
      setCategories(res.data.data);
    });

    // edit mode
    if (id) {
      api.get(`/movies/${id}`).then((res) => {
        const movie = res.data.data;
        setForm({
          title: movie.title,
          description: movie.description,
          rating: movie.rating,
          release_year: movie.release_year,
          category_id: movie.category.id,
          thumbnail: movie.thumbnail,
        });
      });
    }
  }, [id]);

  // =========================
  // SUBMIT
  // =========================
  const submit = (e) => {
    e.preventDefault();

    const request = id
      ? api.put(`/movies/${id}`, form)
      : api.post("/movies", form);

    request
      .then(() => navigate("/admin/dashboard"))
      .catch((err) => {
        console.log(err.response?.data);
        alert("Gagal menyimpan movie");
      });
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white">
      <Navbar />

      <div className="max-w-[1500px] mx-auto px-16 pt-32 pb-16">
        {/* HEADER SECTION */}
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              {id ? "Edit" : "Tambah"} <span className="text-blue-500">Film</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              {id ? `ID Film: #${id}` : "Menambahkan konten baru ke database"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* ================= FORM INPUT ================= */}
          <form onSubmit={submit} className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* TITLE */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Judul Film</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600 font-medium"
                  placeholder="Masukkan judul film..."
                  required
                />
              </div>

              {/* RATING */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Rating (0-10)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="Contoh: 8.5"
                  required
                />
              </div>

              {/* RELEASE YEAR */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tahun Rilis</label>
                <input
                  type="number"
                  min="1900"
                  max="2030"
                  value={form.release_year}
                  onChange={(e) => setForm({ ...form, release_year: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="Contoh: 2024"
                  required
                />
              </div>

              {/* CATEGORY */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Kategori</label>
                <select
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all font-medium appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-[#050b18]">-- Pilih Kategori --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#050b18]">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* THUMBNAIL URL */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">URL Thumbnail</label>
                <div className="relative">
                  <input
                    value={form.thumbnail}
                    onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all font-medium pl-12"
                    placeholder="https://image-url.com/poster.jpg"
                  />
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Deskripsi</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all font-medium min-h-[150px] resize-none"
                  placeholder="Sinopsis singkat film..."
                  required
                />
              </div>
            </div>

            <button className="flex items-center justify-center gap-3 w-full md:w-fit bg-blue-600 hover:bg-white hover:text-blue-900 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95">
              <Save size={18} /> {id ? "Update Film" : "Simpan Film"}
            </button>
          </form>

          {/* ================= LIVE PREVIEW ================= */}
          <div className="relative">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md overflow-hidden border-b-blue-500/50 shadow-2xl">
                
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Live Preview</h2>
                  <Sparkles size={14} className="text-blue-500 animate-pulse" />
                </div>

                {/* POSTER */}
                <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-black/40 border border-white/5 mb-6 group">
                  {form.thumbnail ? (
                    <img
                      src={form.thumbnail}
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

                {/* TEXTS */}
                <div className="space-y-3">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter truncate">
                    {form.title || "Movie Title"}
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black bg-blue-500 text-white px-2 py-1 rounded italic">
                      {form.release_year || "20XX"}
                    </span>
                    <span className="text-[10px] font-black border border-white/20 px-2 py-1 rounded text-gray-400 uppercase tracking-tighter">
                      {categories.find((c) => c.id == form.category_id)?.name || "Category"}
                    </span>
                    <span className="text-yellow-500 font-bold text-xs ml-auto">
                      ★ {form.rating || "0.0"}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 italic mt-4">
                    {form.description || "Pratinjau sinopsis akan muncul secara otomatis di sini..."}
                  </p>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest leading-relaxed">
                  Tip: Gunakan URL gambar berkualitas tinggi (aspek rasio 2:3) untuk hasil poster terbaik di halaman beranda.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieForm;