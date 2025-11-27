// path: admin-frontend/src/pages/AdminUsersPage.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { createAdminUser, deleteAdminUser, getAdminUsers, updateAdminUser } from "../lib/apiClient";
import { AdminUser } from "../lib/types";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "admin", is_active: true });

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAdminUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load admin users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    try {
      await createAdminUser(newUser);
      setNewUser({ username: "", password: "", role: "admin", is_active: true });
      await load();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to create admin");
    }
  };

  return (
    <AdminLayout title="Admin Users">
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-4 border border-slate-800/70 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <h2 className="text-lg font-semibold text-white mb-4">Create Admin</h2>
            <div className="grid gap-3 md:grid-cols-4">
              <input
                className="input-primary"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
              <input
                className="input-primary"
                placeholder="Password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
              <select
                className="input-primary"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={newUser.is_active}
                  onChange={(e) => setNewUser({ ...newUser, is_active: e.target.checked })}
                />
                <span className="text-sm text-slate-200">Active</span>
              </div>
            </div>
            <div className="mt-3">
              <button className="btn-primary" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-4 border border-slate-800/70 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <h2 className="text-lg font-semibold text-white mb-4">Existing Admins</h2>
            <div className="space-y-3">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-lg border border-slate-800/70 bg-slate-900/50 px-3 py-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{u.username}</p>
                    <p className="text-xs text-slate-400">
                      Role: {u.role} · {u.is_active ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <select
                      className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-white outline-none border border-slate-700"
                      value={u.role}
                      onChange={async (e) => {
                        await updateAdminUser(u.id, { role: e.target.value });
                        await load();
                      }}
                    >
                      <option value="admin">Admin</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
                    <button
                      className="text-rose-300 hover:text-rose-200"
                      onClick={async () => {
                        await deleteAdminUser(u.id);
                        await load();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsersPage;
