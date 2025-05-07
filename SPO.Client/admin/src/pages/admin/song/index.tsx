import React, { useEffect } from 'react';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { columns } from '@/components/songs/columns';
import { getSongData } from '@/store/song/song.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import Loading from '@/components/loading';

const ManageSong: React.FC = () => {
    const { songData, loading } = useAppSelector((state: RootState) => state.song);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getSongData());
    }, [dispatch]);
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
            {loading ? (
                <Loading />
            ) : (
                <DataTable columns={columns} data={songData} />
            )
            }
        </div>
    );
};

export default ManageSong;