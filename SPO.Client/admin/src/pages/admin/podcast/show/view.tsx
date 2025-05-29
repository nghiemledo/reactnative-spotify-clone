import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPodcastShowById } from '@/store/podcast-show/podcast-show.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ManageViewPodcastShow: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { podcastShowDetail, loading } = useAppSelector((state: RootState) => state.podcastShow);

    useEffect(() => {
        if (id) {
            dispatch(getPodcastShowById(id));
        }
    }, [dispatch, id]);

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Podcast Show Details</h1>
                <div className="flex items-center space-x-2">
                    <Button asChild variant={'outline'}>
                        <Link to={'/admin/podcast-shows'}>
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Podcast Show Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    {loading ? (
                        <Loading />
                    ) : podcastShowDetail ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Podcast Show Name
                                </label>
                                <p className="text-base text-foreground">{podcastShowDetail.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    The name of the podcast show displayed to users.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Creator
                                </label>
                                <p className="text-base text-foreground">{podcastShowDetail.creator}</p>
                                <p className="text-sm text-muted-foreground">
                                    The creator of the podcast show.
                                </p>
                            </div>
                            <div className="space-ytitle-2">
                                <label className="text-sm font-medium leading-none">
                                    Description
                                </label>
                                <p className="text-base text-foreground">
                                    {podcastShowDetail?.description || "No description found"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    A brief description of the podcast show.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Cover Image
                                </label>
                                <div className='w-2xl h-fit'>
                                    <img className='w-full h-full rounded-3xl  object-cover' src={podcastShowDetail.coverImage} alt={podcastShowDetail.title} />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Cover image of the album.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Category
                                </label>
                                <p className="text-base text-foreground">
                                    {podcastShowDetail.categoryId || "No category found"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    The category of the podcast show.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Created At
                                </label>
                                <p className="text-base text-foreground">
                                    {formatDate(podcastShowDetail.createdAt!)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    The date and time when the podcast show was created.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Updated At
                                </label>

                                <p className="text-base text-foreground">
                                    {podcastShowDetail.updatedAt ? formatDate(podcastShowDetail.updatedAt) : 'N/A'}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    The date and time when the podcast show was last updated.
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Button asChild variant="outline">
                                    <Link to={'/admin/podcast-shows'}>Close</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>No podcast show data found.</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageViewPodcastShow;