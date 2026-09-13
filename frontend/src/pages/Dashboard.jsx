import {
    Activity,
    ArrowUpRight,
    Link2,
    MousePointerClick,
    Plus,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

import CreateLinkModal from "../components/CreateLinkModal";
import { useAuth } from "../context/AuthContext";
import { useUrls } from "../context/UrlContext";

const Dashboard = () => {
    const { user } = useAuth();
    const { urls, loading, error } = useUrls();

    const [showCreateModal, setShowCreateModal] = useState(false);

    const totalLinks = urls.length;

    const totalClicks = urls.reduce(
        (total, url) => total + (url.clicks || 0),
        0
    );

    const activeLinks = urls.filter(
        (url) => url.isActive
    ).length;

    const expiredLinks = urls.filter(
        (url) =>
            url.expiresAt &&
            new Date(url.expiresAt) <= new Date()
    ).length;

    const recentUrls = urls.slice(0, 5);

    return (
        <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">



                <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF5A1F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E94D16]"
                >
                    <Plus className="h-4 w-4" />
                    Create Link
                </button>

            </div>

            {/* Error */}
            {error && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    icon={Link2}
                    title="Total Links"
                    value={loading ? "—" : totalLinks}
                />

                <StatCard
                    icon={MousePointerClick}
                    title="Total Clicks"
                    value={loading ? "—" : totalClicks}
                />

                <StatCard
                    icon={Activity}
                    title="Active Links"
                    value={loading ? "—" : activeLinks}
                />

                <StatCard
                    icon={ArrowUpRight}
                    title="Expired Links"
                    value={loading ? "—" : expiredLinks}
                />

            </div>

            {/* Recent Links */}
            <div className="mt-8 rounded-xl border border-black/10 bg-white">

                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">

                    <div>
                        <h2 className="font-semibold text-[#171717]">
                            Recent Links
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Your latest shortened URLs
                        </p>
                    </div>

                    <Link
                        to="/links"
                        className="text-sm font-medium text-[#FF5A1F] hover:underline"
                    >
                        View all →
                    </Link>

                </div>

                {/* Loading */}
                {loading ? (
                    <div className="px-5 py-12 text-center text-sm text-gray-500">
                        Loading your links...
                    </div>
                ) : recentUrls.length === 0 ? (

                    /* Empty State */
                    <div className="px-5 py-12 text-center">

                        <Link2 className="mx-auto h-8 w-8 text-gray-300" />

                        <p className="mt-3 font-medium text-[#171717]">
                            No links yet
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Create your first short link to get started.
                        </p>

                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#FF5A1F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E94D16]"
                        >
                            <Plus className="h-4 w-4" />
                            Create Link
                        </button>

                    </div>

                ) : (

                    /* Links List */
                    <div className="divide-y divide-black/5">

                        {recentUrls.map((url) => (

                            <div
                                key={url._id}
                                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                            >

                                {/* URL Information */}
                                <div className="min-w-0">

                                    <p className="truncate text-sm font-semibold text-[#FF5A1F]">
                                        /{url.shortCode}
                                    </p>

                                    <p className="mt-1 max-w-md truncate text-xs text-gray-500">
                                        {url.originalUrl}
                                    </p>

                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6">

                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-[#171717]">
                                            {url.clicks || 0}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            clicks
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                            url.isActive
                                                ? "bg-green-50 text-green-600"
                                                : "bg-red-50 text-red-600"
                                        }`}
                                    >
                                        {url.isActive
                                            ? "Active"
                                            : "Disabled"}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {/* Create Link Modal */}
            {showCreateModal && (
                <CreateLinkModal
                    onClose={() => setShowCreateModal(false)}
                />
            )}

        </div>
    );
};


/* ================================
   Stat Card Component
================================ */

const StatCard = ({
    icon: Icon,
    title,
    value,
}) => {
    return (
        <div className="rounded-xl border border-black/10 bg-white p-5">

            <div className="flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                    <Icon className="h-5 w-5 text-[#FF5A1F]" />
                </div>

            </div>

            <p className="mt-5 text-sm text-gray-500">
                {title}
            </p>

            <p className="mt-1 text-2xl font-bold text-[#171717]">
                {value}
            </p>

        </div>
    );
};

export default Dashboard;