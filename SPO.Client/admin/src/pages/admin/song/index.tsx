import { Song } from '@/types/song.type';
import React from 'react';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { columns } from '@/components/songs/columns';

const songs: Song[] = [
    {
        id: "1",
        title: "Shape of You",
        slug: "shape-of-you",
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
        slug: "blinding-lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        releaseDate: "2019-11-29",
        genre: "Synth-pop",
        status: "Draft",
    },
];

const ManageSong: React.FC = () => {
    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Song Management</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
                        asChild
                    >
                        <Link to={'/admin/songs/add'}>
                            <PlusCircle className="h-4 w-4" />
                            Add Song
                        </Link>
                    </Button>
                </div>
            </div>
            <DataTable columns={columns} data={songs} />
        </div>
    );
};

export default ManageSong;