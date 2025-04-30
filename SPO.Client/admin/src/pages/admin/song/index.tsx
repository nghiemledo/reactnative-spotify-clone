import { Song } from '@/types/Song';
import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';

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
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => console.log(row.original.id)}>Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
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