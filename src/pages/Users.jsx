import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getUsers = (pageNumber = 1) => {
    setLoading(true);
    api
      .get(`/users?page=${pageNumber}`)
      .then((res) => {
        setUsers(res.data.data.data); // isi 
        setPage(res.data.data.current_page);
        setLastPage(res.data.data.last_page);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  return (
    <>
      <Navbar />

      <div className="bg-[#0f171e] min-h-screen px-8 py-10 text-white">
        <h1 className="text-2xl font-bold mb-6">Users List</h1>

        {loading ? (
          <p className="text-gray-400">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-white/10 rounded-lg">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-white/10 hover:bg-white/5"
                  >
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <Link
                        to={`/users/${user.id}`}
                        className="text-blue-400 hover:underline"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-between mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-white/10 rounded disabled:opacity-30"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {page} of {lastPage}
              </span>

              <button
                disabled={page === lastPage}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-white/10 rounded disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
