import { DataTable } from '@/components/data-table';
import { columns } from '@/components/artist/columns';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { getArtistData } from '@/store/artist/artist.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { PlusCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageArtist: React.FC = () => {
    const { artistData, loading } = useAppSelector((state: RootState) => state.artist);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getArtistData());
    }, [dispatch]);

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Artist Management</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
                        asChild
                    >
                        <Link to={'/admin/artists/add'}>
                            <PlusCircle className="h-4 w-4" />
                            Add Artist
                        </Link>
                    </Button>
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <DataTable columns={columns} data={artistData} />
            )
            }
        </div>
    );
};

export default ManageArtist;