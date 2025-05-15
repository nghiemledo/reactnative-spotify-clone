import { DataTable } from '@/components/data-table';
import { columns } from '@/components/playlist/columns';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { PlusCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlaylistData } from '@/store/playlist/playlist.actions';
import { getUserData } from '@/store/user/user.actions';

const ManagePlaylist: React.FC = () => {
    const { playlistData, loading } = useAppSelector((state: RootState) => state.playlist);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPlaylistData());
        dispatch(getUserData());
    }, [dispatch]);
    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Playlist Management</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
                        asChild
                    >
                        <Link to={'/admin/playlists/add'}>
                            <PlusCircle className="h-4 w-4" />
                            Add Playlist
                        </Link>
                    </Button>
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <DataTable columns={columns} data={playlistData} />
            )
            }
        </div>
    );
};

export default ManagePlaylist;