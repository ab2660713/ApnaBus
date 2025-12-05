// src/pages/AllUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { Card, CardContent } from "../components/ui/card";
import { Trash } from "lucide-react";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const authHeader = { 
    headers: { Authorization: `Bearer ${token}` } 
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      // backend route you already have: GET /admin/view-users
      const { data } = await axios.get("/api/admin/view-users", authHeader);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch users failed", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(uid) {
    if (!confirm("Delete this user?")) return;
    try {
      const { data } = await axios.put(
        `/api/admin/user/${uid}`,
        { isActive: false },
        authHeader
      );
  
      setUsers((prev) =>
        prev.map((u) => (u._id === uid ? { ...u, isActive: false } : u))
      );
    } catch (err) {
      console.error("Delete user failed", err);
      alert("Delete failed.");
    }
  }
  

  async function toggleBlock(uid, isActive) {
    try {
      const { data } = await axios.put(
        `/api/admin/user/${uid}`,
        { isActive: !isActive },
        authHeader
      );
  
      setUsers((prev) =>
        prev.map((u) => (u._id === uid ? data : u))
      );
    } catch (err) {
      console.error("Toggle block failed", err);
      alert("Action failed.");
    }
  }
  

  return (
    <div className="flex bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">All Users</h1>
          <p className="text-sm text-gray-600">Manage registered users.</p>
        </div>

        <Card>
          <CardContent>
            {loading ? (
              <div>Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-3">Name</th>
                      <th className="py-3">Email</th>
                      <th className="py-3">Phone</th>
                      <th className="py-3">Role</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 && (
                      <tr><td colSpan={6} className="py-6 text-center text-gray-500">No users found.</td></tr>
                    )}
                    {users.map((u) => (
                      <tr key={u._id || u.id} className="border-b hover:bg-gray-50">
                        <td className="py-4">{u.name || "—"}</td>
                        <td className="py-4">{u.email}</td>
                        <td className="py-4">{u.phone || "—"}</td>
                        <td className="py-4">{u.isAdmin ? "admin" : "user"}</td>

                        <td className="py-4">{u.isActive === false ? (
  <span className="text-red-600">Deleted</span>
) : u.blocked ? (
  <span className="text-yellow-600">Blocked</span>
) : (
  <span className="text-green-600">Active</span>
)}</td>
                        <td className="py-4">
                          <div className="flex gap-3">
                          <button
  onClick={() => toggleBlock(u._id || u.id, u.isActive)}
  className={`px-3 py-1 rounded-md ${
    u.isActive
      ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"   // active -> block button
      : "bg-green-100 hover:bg-green-200 text-green-800"     // inactive -> activate button
  }`}
>
  {u.isActive ? "Block" : "Activate"}
</button>
                            <button
  onClick={() => handleDelete(u._id || u.id)}
  className={`${
    u.isActive === false
      ? "text-gray-400 cursor-not-allowed"
      : "text-red-600 hover:text-red-800"
  }`}
  disabled={u.isActive === false}
>
  <Trash className="w-5 h-5" />
</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
