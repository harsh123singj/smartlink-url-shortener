import {
    LogOut,
    Mail,
    Shield,
    User,
    AlertTriangle,
} from "lucide-react";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
    const { user, logout } = useAuth();

    const [showLogoutConfirm, setShowLogoutConfirm] =
        useState(false);

    const handleLogout = () => {
        logout();
        window.location.href = "/login";
    };

    const initials = user?.name
        ? user.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
        : "U";

    return (
        <div className="mx-auto max-w-4xl">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
                    Settings
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage your SmartLink account and preferences.
                </p>
            </div>

            <div className="mt-8 space-y-6">

                {/* =================================
                    Profile
                ================================= */}

                <section className="rounded-xl border border-black/10 bg-white">

                    <div className="border-b border-black/5 px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                                <User className="h-5 w-5 text-[#FF5A1F]" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-[#171717]">
                                    Profile
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Your account information
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="p-5">

                        {/* Avatar */}
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#FF5A1F] text-lg font-bold text-white">
                                {initials}
                            </div>

                            <div>
                                <p className="text-lg font-semibold text-[#171717]">
                                    {user?.name || "User"}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    SmartLink account
                                </p>
                            </div>

                        </div>

                        {/* Information */}
                        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>

                                <label className="mb-2 block text-xs font-medium text-gray-500">
                                    Full Name
                                </label>

                                <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-gray-50 px-3 py-2.5">

                                    <User className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm text-[#171717]">
                                        {user?.name || "Not available"}
                                    </span>

                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block text-xs font-medium text-gray-500">
                                    Email Address
                                </label>

                                <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-gray-50 px-3 py-2.5">

                                    <Mail className="h-4 w-4 text-gray-400" />

                                    <span className="truncate text-sm text-[#171717]">
                                        {user?.email || "Not available"}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================
                    Security
                ================================= */}

                <section className="rounded-xl border border-black/10 bg-white">

                    <div className="border-b border-black/5 px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                                <Shield className="h-5 w-5 text-[#FF5A1F]" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-[#171717]">
                                    Security
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Account security information
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="p-5">

                        <div className="rounded-lg border border-black/10 bg-gray-50 px-4 py-4">

                            <div className="flex items-start gap-3">

                                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />

                                <div>

                                    <p className="text-sm font-medium text-[#171717]">
                                        Password protected account
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Your password is securely stored
                                        using bcrypt hashing and is never
                                        displayed in your account settings.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================
                    Session
                ================================= */}

                <section className="rounded-xl border border-black/10 bg-white">

                    <div className="border-b border-black/5 px-5 py-4">

                        <h2 className="font-semibold text-[#171717]">
                            Session
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Manage your current SmartLink session
                        </p>

                    </div>

                    <div className="p-5">

                        <button
                            type="button"
                            onClick={() =>
                                setShowLogoutConfirm(true)
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </button>

                    </div>

                </section>


                {/* =================================
                    Danger Zone
                ================================= */}

                <section className="rounded-xl border border-red-200 bg-white">

                    <div className="border-b border-red-100 px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-red-600">
                                    Danger Zone
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Irreversible account actions
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="p-5">

                        <p className="text-sm text-gray-500">
                            Account deletion will be added once
                            account management is implemented.
                        </p>

                        <button
                            type="button"
                            disabled
                            className="mt-4 cursor-not-allowed rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-400 opacity-60"
                        >
                            Delete Account
                        </button>

                    </div>

                </section>

            </div>


            {/* =================================
                Logout Confirmation
            ================================= */}

            {showLogoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50">
                            <LogOut className="h-5 w-5 text-[#FF5A1F]" />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-[#171717]">
                            Log out of SmartLink?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            You'll need to log in again to access
                            your dashboard and links.
                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setShowLogoutConfirm(false)
                                }
                                className="rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium text-[#171717] hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-lg bg-[#FF5A1F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E94D16]"
                            >
                                Log out
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Settings;