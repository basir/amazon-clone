"use client";

import { useEffect, useState } from "react";
import { Search, MoreHorizontal, UserPlus } from "lucide-react";
import { api, User } from "@/lib/api";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div className="p-8">Loading users...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Users
                </h2>
                <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                    <UserPlus className="h-4 w-4" />
                    Add User
                </button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-50"
                    />
                </div>
            </div>

            <div className="rounded-xl border bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-zinc-100/50 data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800">
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    User
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    Role
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    Joined
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-zinc-500 dark:text-zinc-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b transition-colors hover:bg-zinc-100/50 data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800"
                                >
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-medium dark:bg-zinc-800">
                                                {user.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-zinc-900 dark:text-white">
                                                    {user.name || "Unknown"}
                                                </span>
                                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-zinc-500 dark:text-zinc-400">
                                        {user.role || "Customer"}
                                    </td>
                                    <td className="p-4 align-middle text-zinc-500 dark:text-zinc-400">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                            <MoreHorizontal className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
