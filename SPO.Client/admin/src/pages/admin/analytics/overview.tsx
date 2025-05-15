/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { getUserData } from "@/store/user/user.actions";
import { getSongData } from "@/store/song/song.actions";
import { BadgeCent, Music, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const analyticsData = [
    { date: "Sep 1", plays: 120 },
    { date: "Sep 2", plays: 200 },
    { date: "Sep 3", plays: 180 },
    { date: "Sep 4", plays: 300 },
    { date: "Sep 5", plays: 250 },
    { date: "Sep 6", plays: 350 },
    { date: "Sep 7", plays: 400 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg">
                <p className="font-semibold">{label}</p>
                <p>{`Plays: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
};

const AnalyticsOverview: React.FC = () => {
    const dispatch = useAppDispatch();
    const { userData, loading: userLoading, error: userError } = useAppSelector((state: RootState) => state.user);
    const { songData, loading: songLoading, error: songError } = useAppSelector((state: RootState) => state.song);

    useEffect(() => {
        dispatch(getUserData());
        dispatch(getSongData());
    }, [dispatch]);

    useEffect(() => {
        if (userError) {
            toast("Error", {
                description: "Failed to load user data.",
            });
        }
        if (songError) {
            toast("Error", {
                description: "Failed to load song data.",
            });
        }
    }, [userError, songError, toast]);

    const totalRevenue = formatNumber(analyticsData.reduce((sum, item) => sum + item.plays, 0) * 0.05);

    return (
        <div className="min-h-screen">
            <h1 className="mb-5 text-2xl font-bold tracking-tight">Analytics Overview</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {userLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className="text-3xl font-bold">{formatNumber(userData.length)}</p>
                        )}
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <Music className="h-5 w-5" />
                        <CardTitle>Total Songs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {songLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className="text-3xl font-bold">{formatNumber(songData.length)}</p>
                        )}
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <BadgeCent className="h-5 w-5" />
                        <CardTitle>Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {songLoading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className="text-3xl font-bold">${totalRevenue}</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-gray-800 dark:text-gray-100">Daily Song Plays</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={analyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="date" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="plays"
                                    stroke="#4f46e5"
                                    strokeWidth={3}
                                    dot={{ r: 5, fill: "#4f46e5" }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AnalyticsOverview;