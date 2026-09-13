import { Copy, Link2, X } from "lucide-react";
import { useState } from "react";
import { useUrls } from "../context/UrlContext.jsx";

const CreateLinkModal = ({ onClose }) => {
    const { createUrl } = useUrls();

    const [originalUrl, setOriginalUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [expiresAt, setExpiresAt] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [createdUrl, setCreatedUrl] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!originalUrl.trim()) {
            setError("Please enter a destination URL.");
            return;
        }

        try {
            setLoading(true);

            const data = await createUrl({
                originalUrl: originalUrl.trim(),
                customAlias: customAlias.trim(),
                expiresAt: expiresAt || "",
            });

            setCreatedUrl(data.url);
        } catch (err) {
            setError(
                err.message || "Failed to create link."
            );
        } finally {
            setLoading(false);
        }
    };

    const getShortUrl = () => {
        if (!createdUrl) {
            return "";
        }

        return (
            createdUrl.shortUrl ||
            `http://localhost:5000/${createdUrl.shortCode}`
        );
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                getShortUrl()
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            setError("Failed to copy the short URL.");
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
                onMouseDown={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                            <Link2 className="h-5 w-5 text-[#FF5A1F]" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-[#171717]">
                                Create Link
                            </h2>

                            <p className="text-xs text-gray-500">
                                Create a new short URL
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X className="h-5 w-5" />
                    </button>

                </div>

                {/* Success */}
                {createdUrl ? (

                    <div className="px-5 py-6">

                        <div className="rounded-xl border border-green-200 bg-green-50 p-4">

                            <p className="text-sm font-semibold text-green-700">
                                Link created successfully!
                            </p>

                            <p className="mt-1 text-xs text-green-600">
                                Your short URL is ready to use.
                            </p>

                        </div>

                        <div className="mt-5">

                            <label className="mb-2 block text-sm font-medium text-[#171717]">
                                Short URL
                            </label>

                            <div className="flex gap-2">

                                <input
                                    type="text"
                                    value={getShortUrl()}
                                    readOnly
                                    className="min-w-0 flex-1 rounded-lg border border-black/10 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#FF5A1F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#E94D16]"
                                >
                                    <Copy className="h-4 w-4" />

                                    {copied
                                        ? "Copied"
                                        : "Copy"}
                                </button>

                            </div>

                        </div>

                        <div className="mt-6 flex justify-end">

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium text-[#171717] hover:bg-gray-50"
                            >
                                Done
                            </button>

                        </div>

                    </div>

                ) : (

                    /* Form */
                    <form
                        onSubmit={handleSubmit}
                        className="px-5 py-6"
                    >

                        {/* Error */}
                        {error && (
                            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Destination URL */}
                        <div>

                            <label
                                htmlFor="originalUrl"
                                className="mb-2 block text-sm font-medium text-[#171717]"
                            >
                                Destination URL
                            </label>

                            <input
                                id="originalUrl"
                                type="url"
                                value={originalUrl}
                                onChange={(e) =>
                                    setOriginalUrl(
                                        e.target.value
                                    )
                                }
                                placeholder="https://example.com"
                                disabled={loading}
                                className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-[#FF5A1F] focus:ring-2 focus:ring-orange-100"
                            />

                        </div>

                        {/* Custom Alias */}
                        <div className="mt-5">

                            <label
                                htmlFor="customAlias"
                                className="mb-2 block text-sm font-medium text-[#171717]"
                            >
                                Custom Alias
                                <span className="ml-1 text-xs font-normal text-gray-400">
                                    (optional)
                                </span>
                            </label>

                            <div className="flex items-center rounded-lg border border-black/10 focus-within:border-[#FF5A1F]">

                                <span className="border-r border-black/10 px-3 text-sm text-gray-400">
                                    /
                                </span>

                                <input
                                    id="customAlias"
                                    type="text"
                                    value={customAlias}
                                    onChange={(e) =>
                                        setCustomAlias(
                                            e.target.value
                                        )
                                    }
                                    placeholder="my-link"
                                    disabled={loading}
                                    className="min-w-0 flex-1 px-3 py-2.5 text-sm outline-none"
                                />

                            </div>

                        </div>

                        {/* Expiration */}
                        <div className="mt-5">

                            <label
                                htmlFor="expiresAt"
                                className="mb-2 block text-sm font-medium text-[#171717]"
                            >
                                Expiration
                                <span className="ml-1 text-xs font-normal text-gray-400">
                                    (optional)
                                </span>
                            </label>

                            <input
                                id="expiresAt"
                                type="datetime-local"
                                value={expiresAt}
                                onChange={(e) =>
                                    setExpiresAt(
                                        e.target.value
                                    )
                                }
                                disabled={loading}
                                className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-[#FF5A1F] focus:ring-2 focus:ring-orange-100"
                            />

                        </div>

                        {/* Buttons */}
                        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium text-[#171717] hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF5A1F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E94D16] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Link2 className="h-4 w-4" />
                                        Create Link
                                    </>
                                )}
                            </button>

                        </div>

                    </form>
                )}

            </div>
        </div>
    );
};

export default CreateLinkModal;