import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getArtistById } from '@/store/artist/artist.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ManageViewArtist: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { artistDetail, loading } = useAppSelector((state: RootState) => state.artist);

    useEffect(() => {
        if (id) {
            dispatch(getArtistById(id));
        }
    }, [dispatch, id]);

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Artist Details</h1>
                <div className="flex items-center space-x-2">
                    <Button asChild variant={'outline'}>
                        <Link to={'/admin/artists'}>
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Artist Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    {loading ? (
                        <Loading />
                    ) : artistDetail ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Artist Name
                                </label>
                                <p className="text-base text-foreground">{artistDetail.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    The name of the artist displayed to users.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Bio
                                </label>
                                <p className="text-base text-foreground">
                                    {artistDetail.bio || 'No bio provided.'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    A brief bio of the artist.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Url Avatar
                                </label>
                                <div className='w-2xl h-fit'>
                                    <img className='w-full h-full rounded-3xl  object-cover' src={artistDetail.urlAvatar} alt={artistDetail.name} />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Avatar of the artist.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Created At
                                </label>
                                <p className="text-base text-foreground">
                                    {formatDate(artistDetail.createdAt!)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    The date and time when the artist was created.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Updated At
                                </label>

                                <p className="text-base text-foreground">
                                    {artistDetail.updatedAt ? formatDate(artistDetail.updatedAt) : 'N/A'}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    The date and time when the artist was last updated.
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Button asChild variant="outline">
                                    <Link to={'/admin/artists'}>Close</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>No artist data found.</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageViewArtist;