import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAlbumById } from '@/store/album/album.actions';
import { getArtistById } from '@/store/artist/artist.actions';
import { getGenreById } from '@/store/genre/genre.actions';
import { getSongById } from '@/store/song/song.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ManageViewSong: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { songDetail, loading } = useAppSelector((state: RootState) => state.song);
    const { albumDetail } = useAppSelector((state: RootState) => state.album);
    const { genreDetail } = useAppSelector((state: RootState) => state.genre);
    const { artistDetail } = useAppSelector((state: RootState) => state.artist);

    useEffect(() => {
        if (id) {
            dispatch(getSongById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (songDetail) {
            if (songDetail.genreId) {
                dispatch(getGenreById(songDetail.genreId));
            }
            if (songDetail.albumId) {
                dispatch(getAlbumById(songDetail.albumId));
            }
            if (songDetail.artistId) {
                dispatch(getArtistById(songDetail.artistId));
            }
        }
    }, [dispatch, songDetail]);

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Song Details</h1>
                <div className="flex items-center space-x-2">
                    <Button asChild variant={'outline'}>
                        <Link to={'/admin/songs'}>
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Song Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    {loading ? (
                        <Loading />
                    ) : songDetail ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Song Name
                                </label>
                                <p className="text-base text-foreground">{songDetail.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    The name of the song displayed to users.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Duration
                                </label>
                                <p className="text-base text-foreground">
                                    {songDetail.duration}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    A duration of the song.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Cover Image
                                </label>
                                <div className='w-2xl h-fit'>
                                    <img className='w-full h-full rounded-3xl  object-cover' src={songDetail.coverImage} alt={songDetail.title} />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Cover image of the song.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Genre
                                </label>
                                <p className="text-base text-foreground">
                                    {genreDetail ? genreDetail.name : songDetail.genreId || 'N/A'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    A genre of the song.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Audio Url
                                </label>
                                <p className="text-base text-foreground">
                                    {songDetail.audioUrl}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    A audio url of the song.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Artist
                                </label>
                                <p className="text-base text-foreground">
                                    {artistDetail ? artistDetail.name : songDetail.artistId || 'N/A'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Artist of the song.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Album
                                </label>
                                <p className="text-base text-foreground">
                                    {albumDetail ? albumDetail.title : songDetail.albumId || 'N/A'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Album of the song.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Created At
                                </label>
                                <p className="text-base text-foreground">
                                    {formatDate(songDetail.createdAt!)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    The date and time when the song was created.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Updated At
                                </label>

                                <p className="text-base text-foreground">
                                    {songDetail.updatedAt ? formatDate(songDetail.updatedAt) : 'N/A'}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    The date and time when the song was last updated.
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Button asChild variant="outline">
                                    <Link to={'/admin/songs'}>Close</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>No song data found.</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageViewSong;