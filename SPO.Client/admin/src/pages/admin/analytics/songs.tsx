import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { getSongData } from "@/store/song/song.actions";
import { BadgeCent, Music, Star } from "lucide-react";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "sonner";

const songAnalyticsData = [
    { date: "Sep 1", plays: 120 },
    { date: "Sep 2", plays: 200 },
    { date: "Sep 3", plays: 180 },
    { date: "Sep 4", plays: 300 },
    { date: "Sep 5", plays: 250 },
    { date: "Sep 6", plays: 350 },
    { date: "Sep 7", plays: 400 },
];

const topSongs = [
    { id: "550e8400-e29b-41d4-a716-446655440401", title: "Mưa Trên Phố Huế", artist: "Tung Duong", album: "Chiec Khăn Piêu", plays: 1200, likes: 150 },
    { id: "550e8400-e29b-41d4-a716-446655440402", title: "Họa Mây", artist: "My Tam", album: "Tam 9", plays: 1000, likes: 120 },
    { id: "550e8400-e29b-41d4-a716-446655440403", title: "Chạy Ngay Đi", artist: "Sơn Tùng M-TP", album: null, plays: 900, likes: 200 },
    { id: "550e8400-e29b-41d4-a716-446655440404", title: "Hello", artist: "Adele", album: "25", plays: 800, likes: 180 },
    { id: "550e8400-e29b-41d4-a716-446655440405", title: "Rolling in the Deep", artist: "Adele", album: "25", plays: 700, likes: 100 },
];

const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
};

const AnalyticsSongs: React.FC = () => {
    const dispatch = useAppDispatch();
    const { songData, loading, error } = useAppSelector((state: RootState) => state.song);
    const [timeRange, setTimeRange] = useState("7d");

    useEffect(() => {
        dispatch(getSongData());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast("Error", {
                description: "Failed to load song data.",
            });
        }
    }, [error]);

    const totalSongs = songData.length;
    const totalPlays = topSongs.reduce((sum, song) => sum + song.plays, 0);
    const mostPopularSong = topSongs[0]?.title || "N/A";

    return (
        <div className="min-h-screen">
            <h1 className="text-2xl font-bold mb-5 tracking-tight">Song Analytics</h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <Music className="h-5 w-5" />
                        <CardTitle>Total Songs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className="text-3xl font-bold">{formatNumber(totalSongs)}</p>
                        )}
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <BadgeCent className="h-5 w-5" />
                        <CardTitle>Total Song Plays</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className="text-3xl font-bold">{formatNumber(totalPlays)}</p>
                        )}
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        <CardTitle>Most Popular Song</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-48" />
                        ) : (
                            <p className="text-xl font-bold truncate">{mostPopularSong}</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white dark:bg-gray-800 shadow-lg mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-gray-800 dark:text-gray-100">Song Plays Over Time</CardTitle>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="all">All Time</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-[400px] w-full" />
                    ) : (
                        <ChartContainer
                            config={{
                                plays: {
                                    label: "Plays",
                                    color: "#4f46e5",
                                },
                            }}
                            className="h-[400px]"
                        >
                            <BarChart data={songAnalyticsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="date" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar
                                    dataKey="plays"
                                    fill="#4f46e5"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-100">Top Songs by Plays</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-[200px] w-full" />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Artist</TableHead>
                                    <TableHead>Album</TableHead>
                                    <TableHead>Plays</TableHead>
                                    <TableHead>Likes</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topSongs.map((song) => (
                                    <TableRow key={song.id}>
                                        <TableCell className="font-medium">{song.title}</TableCell>
                                        <TableCell>{song.artist}</TableCell>
                                        <TableCell>{song.album || "Single"}</TableCell>
                                        <TableCell>{formatNumber(song.plays)}</TableCell>
                                        <TableCell>{formatNumber(song.likes)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AnalyticsSongs;