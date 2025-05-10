import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAlbumById } from '@/store/album/album.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ManageViewAlbum: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { albumDetail, loading } = useAppSelector((state: RootState) => state.album);

    useEffect(() => {
        if (id) {
            dispatch(getAlbumById(id));
        }
    }, [dispatch, id]);

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Album Details</h1>
                <div className="flex items-center space-x-2">
                    <Button asChild variant={'outline'}>
                        <Link to={'/admin/albums'}>
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Album Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    {loading ? (
                        <Loading />
                    ) : albumDetail ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Album Name
                                </label>
                                <p className="text-base text-foreground">{albumDetail.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    The name of the album displayed to users.
                                </p>
                            </div>
                            <div className="space-ytitle-2">
                                <label className="text-sm font-medium leading-none">
                                    Release Date
                                </label>
                                <p className="text-base text-foreground">
                                    {formatDate(albumDetail.releaseDate!)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    A brief bio of the artist.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Cover Image
                                </label>
                                <div className='w-2xl h-fit'>
                                    <img className='w-full h-full rounded-3xl  object-cover' src={albumDetail.coverImage} alt={albumDetail.title} />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Cover image of the album.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Created At
                                </label>
                                <p className="text-base text-foreground">
                                    {formatDate(albumDetail.createdAt!)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    The date and time when the album was created.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Updated At
                                </label>

                                <p className="text-base text-foreground">
                                    {albumDetail.updatedAt ? formatDate(albumDetail.updatedAt) : 'N/A'}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    The date and time when the album was last updated.
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Button asChild variant="outline">
                                    <Link to={'/admin/albums'}>Close</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>No album data found.</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageViewAlbum;