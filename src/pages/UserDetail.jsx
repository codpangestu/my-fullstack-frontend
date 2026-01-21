import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        alert("User tidak ditemukan");
        navigate("/users");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  return (
    <>
      <Navbar />

      <div className="bg-[#0f171e] min-h-screen px-8 py-10 text-white">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-blue-400 hover:underline"
        >
          ← Kembali
        </button>

        {loading ? (
          <p className="text-gray-400">Loading user detail...</p>
        ) : user ? (
          <div className="max-w-xl bg-white/5 border border-white/10 rounded-xl p-8">
            <h1 className="text-2xl font-bold mb-6">
              User Detail
            </h1>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400">ID</p>
                <p className="font-medium">{user.id}</p>
              </div>

              <div>
                <p className="text-gray-400">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>

              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-gray-400">Registered At</p>
                <p className="font-medium">
                  {new Date(user.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UserDetail;
