import { Song } from '@/types/Song';
import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { cn } from '@/lib/utils';
import { DataTable } from '@/components/data-table';
import { EditIcon } from '@/components/edit-icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { EyeIcon } from '@/components/eye-icon';
import { DeleteIcon } from '@/components/delete-icon';

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
        cell: ({ row }) => (
            <div className="relative flex items-center gap-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="text-lg cursor-pointer active:opacity-50"
                            // onClick={handleView}
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
                            //  onClick={() => setEditOpen(true)}
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
                            // onClick={() => setDeleteOpen(true)}
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
        ),
    },
];

const ManageSong: React.FC = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Manage Songs</h2>
            <DataTable columns={columns} data={songs} />
        </div>
    );
};

export default ManageSong;