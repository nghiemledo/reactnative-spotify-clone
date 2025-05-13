import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPodcastCategoryById } from '@/store/podcast-category/podcast-category.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ManageViewPodcastCategory: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { podcastCategoryDetail, loading } = useAppSelector((state: RootState) => state.podcastCategory);

    useEffect(() => {
        if (id) {
            dispatch(getPodcastCategoryById(id));
        }
    }, [dispatch, id]);

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Podcast Category Details</h1>
                <div className="flex items-center space-x-2">
                    <Button asChild variant={'outline'}>
                        <Link to={'/admin/podcast-categories'}>
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Podcast Category Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    {loading ? (
                        <Loading />
                    ) : podcastCategoryDetail ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Podcast Category Name
                                </label>
                                <p className="text-base text-foreground">{podcastCategoryDetail.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    The name of the podcast category displayed to users.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Description
                                </label>
                                <p className="text-base text-foreground">
                                    {podcastCategoryDetail.description || 'No description provided.'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    A brief description of the Podcast Category.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Created At
                                </label>
                                <p className="text-base text-foreground">
                                    {formatDate(podcastCategoryDetail.createdAt!)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    The date and time when the Podcast Category was created.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Updated At
                                </label>
                                <p className="text-base text-foreground">
                                    {formatDate(podcastCategoryDetail?.updatedAt || "")}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    The date and time when the Podcast Category was last updated.
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Button asChild variant="outline">
                                    <Link to={'/admin/podcast-categories'}>Close</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>No Podcast Category data found.</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageViewPodcastCategory;