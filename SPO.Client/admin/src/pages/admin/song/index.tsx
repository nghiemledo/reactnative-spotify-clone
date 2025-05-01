/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { Song } from '@/types/Song';
import React, { useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { cn } from '@/lib/utils';
import { DataTable } from '@/components/data-table';
import { EditIcon } from '@/components/edit-icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { EyeIcon } from '@/components/eye-icon';
import { DeleteIcon } from '@/components/delete-icon';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import axiosClient from '@/configs/api.config';

const songs: Song[] = [
    {
        id: "1",
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "Divide",
        duration: "4:24",
        releaseDate: "2017-01-06",
        genre: "Pop",
        status: "Published",
    },
    {
        id: "2",
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        releaseDate: "2019-11-29",
        genre: "Synth-pop",
        status: "Draft",
    },
];

const columns: ColumnDef<Song>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "artist",
        header: "Artist",
    },
    {
        accessorKey: "album",
        header: "Album",
    },
    {
        accessorKey: "duration",
        header: "Duration",
    },
    {
        accessorKey: "releaseDate",
        header: "Release Date",
    },
    {
        accessorKey: "genre",
        header: "Genre",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <span
                    className={cn(
                        "px-2 py-1 text-sm font-medium rounded",
                        status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    )}
                >
                    {status}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const [viewOpen, setViewOpen] = useState(false);
            const [editOpen, setEditOpen] = useState(false);
            const [deleteOpen, setDeleteOpen] = useState(false);

            const handleView = () => {
                setViewOpen(true);
            };

            const handleDelete = async () => {
                try {
                    const response = await axiosClient.delete(`/songs/${row.original.slug}`);
                    if (response.status === 200) {
                        toast.success(`Delete song ${row.original.title} successfully`);
                        setDeleteOpen(false);
                        // fetchAllUsers();
                    }
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Failed to delete song");
                    console.error(error);
                }
            };

            console.log(viewOpen, editOpen, deleteOpen, handleDelete);
            return (
                <div className="relative flex items-center gap-3">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-lg cursor-pointer active:opacity-50"
                                    onClick={handleView}
                                >
                                    <EyeIcon />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>View</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-lg cursor-pointer active:opacity-50"
                                    onClick={() => setEditOpen(true)}
                                >
                                    <EditIcon />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Update</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="text-lg text-red-400 cursor-pointer active:opacity-50"
                                    onClick={() => setDeleteOpen(true)}
                                >
                                    <DeleteIcon />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )
        }
    },
];

const ManageSong: React.FC = () => {
    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Song Management</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    // onClick={() => setCreateOpen(true)}
                    >
                        Add new
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <DataTable columns={columns} data={songs} />
        </div>
    );
};

export default ManageSong;