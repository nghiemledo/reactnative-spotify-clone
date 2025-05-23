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
import { getUserData } from "@/store/user/user.actions";
import { Users, TrendingUp, UserPlus } from "lucide-react";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "sonner";

const userGrowthData = [
    { date: "Sep 1", newUsers: 10 },
    { date: "Sep 2", newUsers: 15 },
    { date: "Sep 3", newUsers: 12 },
    { date: "Sep 4", newUsers: 20 },
    { date: "Sep 5", newUsers: 18 },
    { date: "Sep 6", newUsers: 25 },
    { date: "Sep 7", newUsers: 30 },
];

const topUsers = [
    { id: "550e8400-e29b-41d4-a716-446655440001", email: "user1@example.com", fullName: "Nguyen An", listens: 150, createdAt: "2025-01-01" },
    { id: "550e8400-e29b-41d4-a716-446655440002", email: "user2@example.com", fullName: "Tran Binh", listens: 120, createdAt: "2025-02-15" },
    { id: "550e8400-e29b-41d4-a716-446655440003", email: "user3@example.com", fullName: "Le Cuong", listens: 100, createdAt: "2025-03-10" },
    { id: "550e8400-e29b-41d4-a716-446655440004", email: "admin@example.com", fullName: "Admin User", listens: 80, createdAt: "2025-01-01" },
    { id: "550e8400-e29b-41d4-a716-446655440005", email: "user5@example.com", fullName: "Pham Minh", listens: 60, createdAt: "2025-04-20" },
];

const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
};

const calculateGrowthRate = (data: { date: string; newUsers: number }[]) => {
    if (data.length < 2) return 0;
    const current = data[data.length - 1].newUsers;
    const previous = data[data.length - 2].newUsers;
    return previous ? ((current - previous) / previous * 100).toFixed(1) : 0;
};

const AnalyticsUsers: React.FC = () => {
    const dispatch = useAppDispatch();
    const { userData, loading, error } = useAppSelector((state: RootState) => state.user);
    const [timeRange, setTimeRange] = useState("7d");

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast("Error", {
                description: "Failed to load user data.",
            });
        }
    }, [error]);

    const totalUsers = userData.length;
    const newUsers = userGrowthData.reduce((sum, item) => sum + item.newUsers, 0);
    const growthRate = calculateGrowthRate(userGrowthData);

    return (
        <div className="min-h-screen">
            <h1 className="text-2xl font-bold mb-6 tracking-tight">User Growth Analytics</h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <CardTitle>Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className="text-3xl font-bold">{formatNumber(totalUsers)}</p>
                        )}
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        <CardTitle>New Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className="text-3xl font-bold">{formatNumber(newUsers)}</p>
                        )}
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        <CardTitle>Growth Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className="text-3xl font-bold">{growthRate}%</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white dark:bg-gray-800 shadow-lg mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-gray-800 dark:text-gray-100">New Users Over Time</CardTitle>
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
                                newUsers: {
                                    label: "New Users",
                                    color: "#4f46e5",
                                },
                            }}
                            className="h-[400px]"
                        >
                            <AreaChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="date" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="newUsers"
                                    stroke="#4f46e5"
                                    fill="#4f46e5"
                                    fillOpacity={0.3}
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-100">Top Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-[200px] w-full" />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Full Name</TableHead>
                                    <TableHead>Listens</TableHead>
                                    <TableHead>Joined</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.email}</TableCell>
                                        <TableCell>{user.fullName}</TableCell>
                                        <TableCell>{formatNumber(user.listens)}</TableCell>
                                        <TableCell>{user.createdAt}</TableCell>
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

export default AnalyticsUsers;