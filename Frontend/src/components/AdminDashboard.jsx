import React, { useEffect, useState } from "react";
import { fetchUsers, fetchStats } from "../services/adminServices.jsx";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoadingUsers(false);
      }
    };

    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoadingStats(false);
      }
    };

    loadUsers();
    loadStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Engagement Metrics</h2>
        {loadingStats ? (
          <p>Loading stats...</p>
        ) : stats ? (
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-800">
            <li>
              Total Users:{" "}
              <span className="font-semibold">{stats.totalUsers}</span>
            </li>
            <li>
              Users With Progress:{" "}
              <span className="font-semibold">{stats.usersWithProgress}</span>
            </li>
            <li>
              Total Watch Time (seconds):{" "}
              <span className="font-semibold">
                {stats.totalWatchTime.toFixed(0)}
              </span>
            </li>
            <li>
              Average Watch Time (seconds):{" "}
              <span className="font-semibold">
                {stats.avgWatchTime.toFixed(1)}
              </span>
            </li>
          </ul>
        ) : (
          <p>No stats available</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : users.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Username</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="even:bg-gray-100">
                    <td className="py-2 px-4">{u.username}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4">{u.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </section>
    </div>
  );
}
