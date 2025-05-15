import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getGenreById } from '@/store/genre/genre.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ManageViewGenre: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { genreDetail, loading } = useAppSelector((state: RootState) => state.genre);

    useEffect(() => {
        if (id) {
            dispatch(getGenreById(id));
        }
    }, [dispatch, id]);

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Genre Details</h1>
                <div className="flex items-center space-x-2">
                    <Button asChild variant={'outline'}>
                        <Link to={'/admin/genres'}>
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Genre Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    {loading ? (
                        <Loading />
                    ) : genreDetail ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Genre Name
                                </label>
                                <p className="text-base text-foreground">{genreDetail.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    The name of the genre displayed to users.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Description
                                </label>
                                <p className="text-base text-foreground">
                                    {genreDetail.description || 'No description provided.'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    A brief description of the genre.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Created At
                                </label>
                                <p className="text-base text-foreground">
                                    {formatDate(genreDetail.createdAt)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    The date and time when the genre was created.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Updated At
                                </label>
                                <p className="text-base text-foreground">
                                    {formatDate(genreDetail.updatedAt)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    The date and time when the genre was last updated.
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Button asChild variant="outline">
                                    <Link to={'/admin/genres'}>Close</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>No genre data found.</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageViewGenre;