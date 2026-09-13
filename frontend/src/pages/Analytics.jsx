import {
    BarChart3,
    ExternalLink,
    Globe,
    Link2,
    MousePointerClick,
} from "lucide-react";

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useUrls } from "../context/UrlContext";

const API_URL = import.meta.env.VITE_API_URL;

const Analytics = () => {
    const { token } = useAuth();
    const { urls } = useUrls();

    const [selectedUrlId, setSelectedUrlId] = useState("");
    const [analyticsData, setAnalyticsData] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* ================================
       Select first URL
    ================================= */

    useEffect(() => {
        if (urls.length > 0) {
            setSelectedUrlId((currentId) => {
                const exists = urls.some(
                    (url) => url._id === currentId
                );

                return exists ? currentId : urls[0]._id;
            });
        } else {
            setSelectedUrlId("");
            setAnalyticsData(null);
        }
    }, [urls]);

    /* ================================
       Fetch Analytics
    ================================= */

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!token || !selectedUrlId) {
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/analytics/${selectedUrlId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch analytics"
                    );
                }

                console.log("Analytics API response:", data);

                setAnalyticsData(data);
            } catch (err) {
                console.error("Analytics fetch error:", err);

                setError(
                    err.message || "Failed to fetch analytics"
                );

                setAnalyticsData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [token, selectedUrlId]);

    /* ================================
       Data
    ================================= */

    const url = analyticsData?.url;

    const analytics = analyticsData?.analytics;

    const totalClicks = analytics?.totalClicks ?? 0;

    /*
     * clicksByDay is currently returned
     * as an object:
     *
     * {
     *   "2026-09-13": 5
     * }
     */

    const clicksByDay = analytics?.clicksByDay || {};

    const chartData = useMemo(() => {
        if (!clicksByDay) {
            return [];
        }

        if (Array.isArray(clicksByDay)) {
            return clicksByDay.map((item) => ({
                date:
                    item.date ||
                    item._id ||
                    "Unknown",

                clicks:
                    item.clicks ??
                    item.count ??
                    0,
            }));
        }

        return Object.entries(clicksByDay)
            .sort(([dateA], [dateB]) =>
                dateA.localeCompare(dateB)
            )
            .map(([date, clicks]) => ({
                date: formatDate(date),
                clicks: Number(clicks) || 0,
            }));
    }, [clicksByDay]);

    /*
     * referrerCounts is currently returned
     * as an object:
     *
     * {
     *   "Direct": 5
     *   "Google": 2
     * }
     */

    const referrerCounts =
        analytics?.referrerCounts || {};

    const referrerData = useMemo(() => {
        if (!referrerCounts) {
            return [];
        }

        if (Array.isArray(referrerCounts)) {
            return referrerCounts.map((item) => ({
                name:
                    item.referrer ||
                    item._id ||
                    "Direct",

                clicks:
                    item.clicks ??
                    item.count ??
                    0,
            }));
        }

        return Object.entries(referrerCounts)
            .sort(([, countA], [, countB]) => {
                return Number(countB) - Number(countA);
            })
            .map(([name, clicks]) => ({
                name,
                clicks: Number(clicks) || 0,
            }));
    }, [referrerCounts]);

    const recentClicks =
        analytics?.recentClicks || [];

    return (
        <div className="mx-auto max-w-7xl">

            {/* =================================
                Header
            ================================= */}

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
                        Analytics
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Understand how your links are performing.
                    </p>
                </div>

                {/* URL Selector */}

                <div className="w-full sm:w-72">

                    <label
                        htmlFor="analytics-url"
                        className="mb-2 block text-xs font-medium text-gray-500"
                    >
                        Select a link
                    </label>

                    <select
                        id="analytics-url"
                        value={selectedUrlId}
                        onChange={(e) =>
                            setSelectedUrlId(e.target.value)
                        }
                        disabled={urls.length === 0}
                        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-[#171717] outline-none transition focus:border-[#FF5A1F] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50"
                    >
                        {urls.length === 0 ? (
                            <option value="">
                                No links available
                            </option>
                        ) : (
                            urls.map((item) => (
                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    /{item.shortCode}
                                </option>
                            ))
                        )}
                    </select>

                </div>

            </div>

            {/* =================================
                Error
            ================================= */}

            {error && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* =================================
                No Links
            ================================= */}

            {!loading && urls.length === 0 && (
                <div className="mt-8 rounded-xl border border-black/10 bg-white px-5 py-16 text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                        <BarChart3 className="h-6 w-6 text-[#FF5A1F]" />
                    </div>

                    <h2 className="mt-4 font-semibold text-[#171717]">
                        No analytics available
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Create a short link first to start
                        tracking its performance.
                    </p>

                </div>
            )}

            {/* =================================
                Loading
            ================================= */}

            {loading && (
                <div className="mt-8 rounded-xl border border-black/10 bg-white px-5 py-16 text-center">

                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF5A1F]" />

                    <p className="mt-4 text-sm text-gray-500">
                        Loading analytics...
                    </p>

                </div>
            )}

            {/* =================================
                Analytics Content
            ================================= */}

            {!loading && analyticsData && url && (
                <div className="mt-8 space-y-6">

                    {/* Selected URL */}

                    <div className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                                <Link2 className="h-5 w-5 text-[#FF5A1F]" />
                            </div>

                            <div className="min-w-0">

                                <p className="font-semibold text-[#FF5A1F]">
                                    /{url.shortCode}
                                </p>

                                <p className="mt-1 truncate text-sm text-gray-500">
                                    {url.originalUrl}
                                </p>

                            </div>

                        </div>

                        <a
                            href={url.shortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-black/10 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Open Link
                        </a>

                    </div>

                    {/* =================================
                        Stats
                    ================================= */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <StatCard
                            icon={MousePointerClick}
                            title="Total Clicks"
                            value={totalClicks}
                        />

                        <StatCard
                            icon={Link2}
                            title="Link Status"
                            value={
                                url.isActive
                                    ? "Active"
                                    : "Disabled"
                            }
                        />

                    </div>

                    {/* =================================
                        Clicks Chart
                    ================================= */}

                    <div className="rounded-xl border border-black/10 bg-white p-5">

                        <div className="mb-6">

                            <h2 className="font-semibold text-[#171717]">
                                Clicks over time
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Daily clicks for this link
                            </p>

                        </div>

                        {chartData.length === 0 ? (
                            <EmptyState text="No clicks recorded yet." />
                        ) : (
                            <div className="h-72 w-full">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <LineChart
                                        data={chartData}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: -20,
                                            bottom: 5,
                                        }}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#eeeeee"
                                        />

                                        <XAxis
                                            dataKey="date"
                                            tick={{
                                                fontSize: 12,
                                                fill: "#737373",
                                            }}
                                        />

                                        <YAxis
                                            allowDecimals={false}
                                            tick={{
                                                fontSize: 12,
                                                fill: "#737373",
                                            }}
                                        />

                                        <Tooltip />

                                        <Line
                                            type="monotone"
                                            dataKey="clicks"
                                            stroke="#FF5A1F"
                                            strokeWidth={3}
                                            dot={{
                                                r: 4,
                                            }}
                                            activeDot={{
                                                r: 6,
                                            }}
                                        />

                                    </LineChart>
                                </ResponsiveContainer>

                            </div>
                        )}

                    </div>

                    {/* =================================
                        Referrers
                    ================================= */}

                    <div className="rounded-xl border border-black/10 bg-white p-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                                <Globe className="h-5 w-5 text-[#FF5A1F]" />
                            </div>

                            <div>

                                <h2 className="font-semibold text-[#171717]">
                                    Referrers
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Where your visitors came from
                                </p>

                            </div>

                        </div>

                        {referrerData.length === 0 ? (
                            <EmptyState text="No referrer data yet." />
                        ) : (
                            <div className="mt-6 space-y-5">

                                {referrerData.map(
                                    (item, index) => {

                                        const total =
                                            referrerData.reduce(
                                                (
                                                    sum,
                                                    referrer
                                                ) =>
                                                    sum +
                                                    referrer.clicks,
                                                0
                                            );

                                        const percentage =
                                            total > 0
                                                ? Math.round(
                                                      (item.clicks /
                                                          total) *
                                                          100
                                                  )
                                                : 0;

                                        return (
                                            <div
                                                key={`${item.name}-${index}`}
                                            >

                                                <div className="flex items-center justify-between gap-3">

                                                    <span className="truncate text-sm text-gray-600">
                                                        {item.name}
                                                    </span>

                                                    <span className="shrink-0 text-sm font-semibold text-[#171717]">
                                                        {item.clicks}
                                                    </span>

                                                </div>

                                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">

                                                    <div
                                                        className="h-full rounded-full bg-[#FF5A1F]"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />

                                                </div>

                                                <p className="mt-1 text-right text-xs text-gray-400">
                                                    {percentage}%
                                                </p>

                                            </div>
                                        );
                                    }
                                )}

                            </div>
                        )}

                    </div>

                    {/* =================================
                        Recent Clicks
                    ================================= */}

                    <div className="rounded-xl border border-black/10 bg-white">

                        <div className="border-b border-black/5 px-5 py-4">

                            <h2 className="font-semibold text-[#171717]">
                                Recent Clicks
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Latest activity for this link
                            </p>

                        </div>

                        {recentClicks.length === 0 ? (
                            <div className="px-5 py-12 text-center">

                                <MousePointerClick className="mx-auto h-8 w-8 text-gray-300" />

                                <p className="mt-3 text-sm text-gray-500">
                                    No clicks recorded yet.
                                </p>

                            </div>
                        ) : (
                            <div className="divide-y divide-black/5">

                                {recentClicks.map(
                                    (click, index) => (
                                        <div
                                            key={
                                                click._id ||
                                                index
                                            }
                                            className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                                        >

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                                                    <MousePointerClick className="h-4 w-4 text-[#FF5A1F]" />
                                                </div>

                                                <div>

                                                    <p className="text-sm font-medium text-[#171717]">
                                                        {click.browser ||
                                                            "Unknown Browser"}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {click.device ||
                                                            "Unknown Device"}{" "}
                                                        ·{" "}
                                                        {click.os ||
                                                            "Unknown OS"}
                                                    </p>

                                                </div>

                                            </div>

                                            <div className="text-left sm:text-right">

                                                <p className="text-xs text-gray-500">
                                                    {click.referrer ||
                                                        "Direct"}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    {formatDateTime(
                                                        click.createdAt
                                                    )}
                                                </p>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                    </div>

                </div>
            )}

        </div>
    );
};

/* =================================
   Stat Card
================================= */

const StatCard = ({
    icon: Icon,
    title,
    value,
}) => {
    return (
        <div className="rounded-xl border border-black/10 bg-white p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <Icon className="h-5 w-5 text-[#FF5A1F]" />
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

/* =================================
   Empty State
================================= */

const EmptyState = ({ text }) => {
    return (
        <div className="flex h-40 items-center justify-center text-sm text-gray-400">
            {text}
        </div>
    );
};

/* =================================
   Helpers
================================= */

const formatDate = (date) => {
    if (!date) {
        return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return parsedDate.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
        }
    );
};

const formatDateTime = (date) => {
    if (!date) {
        return "Unknown";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Unknown";
    }

    return parsedDate.toLocaleString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
};

export default Analytics;