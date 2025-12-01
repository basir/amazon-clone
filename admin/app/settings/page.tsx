"use client";

import { Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Settings
                </h2>
                <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                    <Save className="h-4 w-4" />
                    Save Changes
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                            General Settings
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Manage your store's general information.
                        </p>
                        <div className="mt-6 space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="storeName"
                                    className="text-sm font-medium text-zinc-900 dark:text-white"
                                >
                                    Store Name
                                </label>
                                <input
                                    id="storeName"
                                    type="text"
                                    defaultValue="Amazon Clone"
                                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="currency"
                                    className="text-sm font-medium text-zinc-900 dark:text-white"
                                >
                                    Currency
                                </label>
                                <select
                                    id="currency"
                                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-50"
                                >
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>GBP (£)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="timezone"
                                    className="text-sm font-medium text-zinc-900 dark:text-white"
                                >
                                    Timezone
                                </label>
                                <select
                                    id="timezone"
                                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-50"
                                >
                                    <option>UTC</option>
                                    <option>EST</option>
                                    <option>PST</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                            Contact Information
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Public contact information for your store.
                        </p>
                        <div className="mt-6 space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-zinc-900 dark:text-white"
                                >
                                    Support Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    defaultValue="support@amazon-clone.com"
                                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="phone"
                                    className="text-sm font-medium text-zinc-900 dark:text-white"
                                >
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    defaultValue="+1 (555) 000-0000"
                                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="address"
                                    className="text-sm font-medium text-zinc-900 dark:text-white"
                                >
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    rows={3}
                                    defaultValue="123 Commerce St, New York, NY 10001"
                                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
