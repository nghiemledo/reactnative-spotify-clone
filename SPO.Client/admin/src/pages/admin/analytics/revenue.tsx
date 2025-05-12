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
import { DollarSign, PieChart, Users } from "lucide-react";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart as RechartsPieChart, Cell } from "recharts";
import { toast } from "sonner";

const revenueSources = [
    { name: "Subscriptions", value: 15000, color: "#4f46e5" },
    { name: "Ads", value: 5000, color: "#10b981" },
    { name: "Song Purchases", value: 2500, color: "#f59e0b" },
];

const topRevenueUsers = [
    { id: "550e8400-e29b-41d4-a716-446655440001", email: "user1@example.com", fullName: "Nguyen An", revenue: 120, lastTransaction: "2025-09-01" },
    { id: "550e8400-e29b-41d4-a716-446655440002", email: "user2@example.com", fullName: "Tran Binh", revenue: 100, lastTransaction: "2025-09-02" },
    { id: "550e8400-e29b-41d4-a716-446655440003", email: "user3@example.com", fullName: "Le Cuong", revenue: 80, lastTransaction: "2025-09-03" },
    { id: "550e8400-e29b-41d4-a716-446655440004", email: "admin@example.com", fullName: "Admin User", revenue: 60, lastTransaction: "2025-09-01" },
    { id: "550e8400-e29b-41d4-a716-446655440005", email: "user5@example.com", fullName: "Pham Minh", revenue: 50, lastTransaction: "2025-09-04" },
];

const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
};

const formatCurrency = (num: number) => {
    return `$${formatNumber(num)}`;
};

const getMainRevenueSource = (sources: { name: string; value: number }[]) => {
    return sources.reduce((max, source) => (source.value > max.value ? source : max), sources[0]).name;
};

const AnalyticsRevenue: React.FC = () => {
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

    const totalRevenue = revenueSources.reduce((sum, source) => sum + source.value, 0);
    const averageRevenuePerUser = userData.length ? totalRevenue / userData.length : 0;
    const mainRevenueSource = getMainRevenueSource(revenueSources);

    return (
        <div className="min-h-screen">
            <h1 className="text-2xl font-bold mb-5 tracking-tight">Revenue Analytics</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        <CardTitle>Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
                        )}
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <CardTitle>Avg. Revenue per User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-24" />
                        ) : (
                            <p className="text-3xl font-bold">{formatCurrency(parseFloat(averageRevenuePerUser.toFixed(2)))}</p>
                        )}
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        <CardTitle>Main Revenue Source</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <Skeleton className="h-8 w-48" />
                        ) : (
                            <p className="text-xl font-bold truncate">{mainRevenueSource}</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white dark:bg-gray-800 shadow-lg mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-gray-800 dark:text-gray-100">Revenue by Source</CardTitle>
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
                            config={revenueSources.reduce((acc, source) => ({
                                ...acc,
                                [source.name]: {
                                    label: source.name,
                                    color: source.color,
                                },
                            }), {})}
                            className="h-[400px]"
                        >
                            <RechartsPieChart>
                                <Pie
                                    data={revenueSources}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                                >
                                    {revenueSources.map((source, index) => (
                                        <Cell key={`cell-${index}`} fill={source.color} />
                                    ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </RechartsPieChart>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-100">Top Revenue Contributors</CardTitle>
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
                                    <TableHead>Revenue</TableHead>
                                    <TableHead>Last Transaction</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topRevenueUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.email}</TableCell>
                                        <TableCell>{user.fullName}</TableCell>
                                        <TableCell>{formatCurrency(user.revenue)}</TableCell>
                                        <TableCell>{user.lastTransaction}</TableCell>
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

export default AnalyticsRevenue;