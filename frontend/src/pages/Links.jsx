import {
    Check,
    Copy,
    ExternalLink,
    Link2,
    MoreVertical,
    Search,
    Trash2,
    Power,
    PowerOff,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useUrls } from "../context/UrlContext";

const API_URL = import.meta.env.VITE_API_URL;

const Links = () => {
    const {
        urls,
        loading,
        error,
        updateUrl,
        deleteUrl,
    } = useUrls();

    const [search, setSearch] = useState("");
    const [copiedId, setCopiedId] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    const [actionError, setActionError] = useState("");

    const filteredUrls = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) {
            return urls;
        }

        return urls.filter((url) => {
            return (
                url.originalUrl?.toLowerCase().includes(query) ||
                url.shortCode?.toLowerCase().includes(query) ||
                url.customAlias?.toLowerCase().includes(query)
            );
        });
    }, [urls, search]);

    const getShortUrl = (url) => {
        const backendUrl = API_URL.replace(/\/api\/?$/, "");

        return (
            url.shortUrl ||
            `${backendUrl}/${url.shortCode}`
        );
    };

    const handleCopy = async (url) => {
        try {
            await navigator.clipboard.writeText(
                getShortUrl(url)
            );

            setCopiedId(url._id);

            setTimeout(() => {
                setCopiedId(null);
            }, 2000);
        } catch {
            setActionError("Failed to copy the short URL.");
        }
    };

    const handleToggle = async (url) => {
        try {
            setActionLoading(url._id);
            setActionError("");
            setOpenMenu(null);

            await updateUrl(url._id, {
                isActive: !url.isActive,
            });
        } catch (err) {
            setActionError(
                err.message || "Failed to update link."
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (url) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete /${url.shortCode}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setActionLoading(url._id);
            setActionError("");
            setOpenMenu(null);

            await deleteUrl(url._id);
        } catch (err) {
            setActionError(
                err.message || "Failed to delete link."
            );
        } finally {
            setActionLoading(null);
        }
    };

    const isExpired = (url) => {
        return (
            url.expiresAt &&
            new Date(url.expiresAt) <= new Date()
        );
    };

    return (
        <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
                        Your Links
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Manage and track all your shortened URLs.
                    </p>
                </div>

            </div>

            {/* Error */}
            {(error || actionError) && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {actionError || error}
                </div>
            )}

            {/* Search */}
            <div className="mt-8 rounded-xl border border-black/10 bg-white p-4">

                <div className="relative">

                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search links..."
                        className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#FF5A1F] focus:ring-2 focus:ring-orange-100"
                    />

                </div>

            </div>

            {/* Links */}
            <div className="mt-5 overflow-visible rounded-xl border border-black/10 bg-white">

                {/* Desktop Header */}
                <div className="hidden border-b border-black/5 px-5 py-4 md:grid md:grid-cols-[minmax(0,2fr)_120px_120px_50px] md:items-center md:gap-4">

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Link
                    </p>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Clicks
                    </p>

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Status
                    </p>

                    <p></p>

                </div>

                {/* Loading */}
                {loading ? (
                    <div className="px-5 py-16 text-center text-sm text-gray-500">
                        Loading your links...
                    </div>
                ) : filteredUrls.length === 0 ? (

                    /* Empty State */
                    <div className="px-5 py-16 text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                            <Link2 className="h-6 w-6 text-[#FF5A1F]" />
                        </div>

                        <h2 className="mt-4 font-semibold text-[#171717]">
                            {search
                                ? "No links found"
                                : "No links yet"}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {search
                                ? "Try a different search term."
                                : "Create your first short link to get started."}
                        </p>

                    </div>

                ) : (

                    /* Link List */
                    <div className="divide-y divide-black/5">

                        {filteredUrls.map((url) => {

                            const expired = isExpired(url);
                            const busy =
                                actionLoading === url._id;

                            return (
                                <div
                                    key={url._id}
                                    className="relative px-5 py-5"
                                >

                                    {/* Desktop */}
                                    <div className="hidden md:grid md:grid-cols-[minmax(0,2fr)_120px_120px_50px] md:items-center md:gap-4">

                                        {/* Link Info */}
                                        <div className="min-w-0">

                                            <div className="flex items-center gap-2">

                                                <Link2 className="h-4 w-4 shrink-0 text-[#FF5A1F]" />

                                                <a
                                                    href={getShortUrl(url)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="truncate text-sm font-semibold text-[#FF5A1F] hover:underline"
                                                >
                                                    /{url.shortCode}
                                                </a>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleCopy(url)
                                                    }
                                                    className="shrink-0 rounded-md p-1.5 text-gray-400 transition hover:bg-orange-50 hover:text-[#FF5A1F]"
                                                    title="Copy short URL"
                                                >
                                                    {copiedId ===
                                                    url._id ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="h-4 w-4" />
                                                    )}
                                                </button>

                                            </div>

                                            <p className="mt-1 truncate pl-6 text-xs text-gray-500">
                                                {url.originalUrl}
                                            </p>

                                            {url.expiresAt && (
                                                <p
                                                    className={`mt-1 pl-6 text-xs ${
                                                        expired
                                                            ? "text-red-500"
                                                            : "text-gray-400"
                                                    }`}
                                                >
                                                    {expired
                                                        ? "Expired"
                                                        : `Expires ${new Date(
                                                              url.expiresAt
                                                          ).toLocaleDateString()}`}
                                                </p>
                                            )}

                                        </div>

                                        {/* Clicks */}
                                        <div>
                                            <p className="text-sm font-semibold text-[#171717]">
                                                {url.clicks || 0}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                clicks
                                            </p>
                                        </div>

                                        {/* Status */}
                                        <div>
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    expired
                                                        ? "bg-red-50 text-red-600"
                                                        : url.isActive
                                                        ? "bg-green-50 text-green-600"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {expired
                                                    ? "Expired"
                                                    : url.isActive
                                                    ? "Active"
                                                    : "Disabled"}
                                            </span>
                                        </div>

                                        {/* Menu */}
                                        <div className="relative flex justify-end">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu ===
                                                            url._id
                                                            ? null
                                                            : url._id
                                                    )
                                                }
                                                disabled={busy}
                                                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </button>

                                            {openMenu ===
                                                url._id && (
                                                <ActionMenu
                                                    url={url}
                                                    onToggle={() =>
                                                        handleToggle(
                                                            url
                                                        )
                                                    }
                                                    onDelete={() =>
                                                        handleDelete(
                                                            url
                                                        )
                                                    }
                                                />
                                            )}

                                        </div>

                                    </div>

                                    {/* Mobile */}
                                    <div className="md:hidden">

                                        <div className="flex items-start justify-between gap-3">

                                            <div className="min-w-0 flex-1">

                                                <div className="flex items-center gap-2">

                                                    <Link2 className="h-4 w-4 shrink-0 text-[#FF5A1F]" />

                                                    <a
                                                        href={getShortUrl(
                                                            url
                                                        )}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="truncate text-sm font-semibold text-[#FF5A1F]"
                                                    >
                                                        /{url.shortCode}
                                                    </a>

                                                </div>

                                                <p className="mt-2 truncate text-xs text-gray-500">
                                                    {url.originalUrl}
                                                </p>

                                            </div>

                                            <div className="relative shrink-0">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenMenu(
                                                            openMenu ===
                                                                url._id
                                                                ? null
                                                                : url._id
                                                        )
                                                    }
                                                    disabled={busy}
                                                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>

                                                {openMenu ===
                                                    url._id && (
                                                    <ActionMenu
                                                        url={url}
                                                        onToggle={() =>
                                                            handleToggle(
                                                                url
                                                            )
                                                        }
                                                        onDelete={() =>
                                                            handleDelete(
                                                                url
                                                            )
                                                        }
                                                    />
                                                )}

                                            </div>

                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                                            <div className="flex items-center gap-2">

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        expired
                                                            ? "bg-red-50 text-red-600"
                                                            : url.isActive
                                                            ? "bg-green-50 text-green-600"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {expired
                                                        ? "Expired"
                                                        : url.isActive
                                                        ? "Active"
                                                        : "Disabled"}
                                                </span>

                                                <span className="text-xs text-gray-400">
                                                    {url.clicks || 0}{" "}
                                                    clicks
                                                </span>

                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleCopy(url)
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                                            >
                                                {copiedId ===
                                                url._id ? (
                                                    <>
                                                        <Check className="h-3.5 w-3.5 text-green-500" />
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="h-3.5 w-3.5" />
                                                        Copy
                                                    </>
                                                )}
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>

            {/* Result Count */}
            {!loading && filteredUrls.length > 0 && (
                <p className="mt-4 text-xs text-gray-400">
                    Showing {filteredUrls.length} of{" "}
                    {urls.length} links
                </p>
            )}

        </div>
    );
};

/* =================================
   Action Menu
================================= */

const ActionMenu = ({
    url,
    onToggle,
    onDelete,
}) => {
    const backendUrl = API_URL.replace(/\/api\/?$/, "");

    return (
        <div className="absolute right-0 top-10 z-30 w-44 rounded-xl border border-black/10 bg-white p-1.5 shadow-lg">

            <a
                href={`${backendUrl}/${url.shortCode}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
                <ExternalLink className="h-4 w-4" />
                Open link
            </a>

            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
                {url.isActive ? (
                    <>
                        <PowerOff className="h-4 w-4" />
                        Disable link
                    </>
                ) : (
                    <>
                        <Power className="h-4 w-4" />
                        Enable link
                    </>
                )}
            </button>

            <button
                type="button"
                onClick={onDelete}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
                <Trash2 className="h-4 w-4" />
                Delete link
            </button>

        </div>
    );
};

export default Links;