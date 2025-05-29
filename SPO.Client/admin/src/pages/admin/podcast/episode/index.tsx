import { DataTable } from '@/components/data-table';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { PlusCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPodcastEpisodeData } from '@/store/podcast-episode/podcast-episode.actions';
import { getPodcastShowData } from '@/store/podcast-show/podcast-show.actions';
import { columns } from '@/components/podcast-episode/columns';

const ManagePodcastEpisodes: React.FC = () => {
    const { podcastEpisodeData, loading } = useAppSelector((state: RootState) => state.podcastEpisode);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPodcastEpisodeData());
        dispatch(getPodcastShowData());
    }, [dispatch]);
    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Podcast Episodes Management</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer"
                        asChild
                    >
                        <Link to={'/admin/podcast-episodes/add'}>
                            <PlusCircle className="h-4 w-4" />
                            Add Episode
                        </Link>
                    </Button>
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <DataTable columns={columns} data={podcastEpisodeData} />
            )
            }
        </div>
    );
};

export default ManagePodcastEpisodes;