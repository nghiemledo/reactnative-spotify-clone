import { DataTable } from '@/components/data-table';
import { columns } from '@/components/album/columns';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { PlusCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAlbumData } from '@/store/album/album.actions';
import { useFetchAlbumData } from '@/hooks/use-fetch-album-data';

const ManageAlbums: React.FC = () => {
    const { albumData, loading } = useAppSelector((state: RootState) => state.album);
    const dispatch = useAppDispatch();
    useFetchAlbumData();
    useEffect(() => {
        dispatch(getAlbumData());
    }, [dispatch]);
    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Album Management</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
                        asChild
                    >
                        <Link to={'/admin/albums/add'}>
                            <PlusCircle className="h-4 w-4" />
                            Add Album
                        </Link>
                    </Button>
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <DataTable columns={columns} data={albumData} />
            )
            }
        </div>
    );
};

export default ManageAlbums;