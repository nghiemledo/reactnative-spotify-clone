import { getSongBySlug, putSongData } from '@/store/song/song.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { Song } from '@/types/song.type';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SongStatus } from '@/enums/song-status.enum';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check } from 'lucide-react';

type SongFormData = Song;

const ManageEditSong: React.FC = () => {
    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { songDetail, loading, error } = useAppSelector((state: RootState) => state.song);

    const form = useForm<SongFormData>({
        defaultValues: {
            id: '',
            title: '',
            slug: '',
            artist: '',
            album: '',
            duration: '',
            releaseDate: '',
            genre: '',
            status: SongStatus.Published,
        },
        mode: 'onChange',
    });

    useEffect(() => {
        if (slug) {
            dispatch(getSongBySlug(slug));
        }
    }, [dispatch, slug]);

    useEffect(() => {
        if (songDetail) {
            form.reset({
                id: songDetail.id,
                slug: songDetail.slug,
                title: songDetail.title,
                artist: songDetail.artist,
                album: songDetail.album,
                duration: songDetail.duration,
                releaseDate: songDetail.releaseDate,
                genre: songDetail.genre,
                status: songDetail.status,
                createdAt: songDetail.createdAt,
                updatedAt: songDetail.updatedAt,
            });
        }
    }, [songDetail, form]);

    const onSubmit: SubmitHandler<SongFormData> = async (data) => {
        try {
            await dispatch(putSongData(data)).unwrap();
            toast('Success', {
                description: 'Updated song successfully!',
            });
            navigate('/admin/songs');
        } catch (err) {
            console.error('Submission error:', err);
            toast('Error', {
                description: error || 'Could not update song. Please try again.',
            });
        }
    };

    const handleCancel = () => {
        navigate('/admin/songs');
    };

    return (
        <div className="flex flex-col gap-4 container mx-auto">
            <h1 className="text-2xl font-bold">Edit Song</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Song Information</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-600">Error: {error}</p>}
                    {!loading && !error && (
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        {...form.register('title', {
                                            required: 'Title is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Title must be at least 2 characters',
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: 'Title cannot exceed 100 characters',
                                            },
                                        })}
                                        disabled={loading}
                                        placeholder="Enter song title"
                                    />
                                    {form.formState.errors.title && (
                                        <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
                                    )}
                                </div>

                                {/* Artist */}
                                <div className="space-y-2">
                                    <Label htmlFor="artist">Artist</Label>
                                    <Input
                                        id="artist"
                                        {...form.register('artist', {
                                            required: 'Artist is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Artist must be at least 2 characters',
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: 'Artist cannot exceed 100 characters',
                                            },
                                        })}
                                        disabled={loading}
                                        placeholder="Enter artist name"
                                    />
                                    {form.formState.errors.artist && (
                                        <p className="text-sm text-red-600">{form.formState.errors.artist.message}</p>
                                    )}
                                </div>

                                {/* Album */}
                                <div className="space-y-2">
                                    <Label htmlFor="album">Album</Label>
                                    <Input
                                        id="album"
                                        {...form.register('album', {
                                            required: 'Album is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Album must be at least 2 characters',
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: 'Album cannot exceed 100 characters',
                                            },
                                        })}
                                        disabled={loading}
                                        placeholder="Enter album name"
                                    />
                                    {form.formState.errors.album && (
                                        <p className="text-sm text-red-600">{form.formState.errors.album.message}</p>
                                    )}
                                </div>

                                {/* Duration */}
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (MM:SS)</Label>
                                    <Input
                                        id="duration"
                                        {...form.register('duration', {
                                            required: 'Duration is required',
                                            pattern: {
                                                value: /^(?:[0-5]?[0-9]):[0-5][0-9]$/,
                                                message: 'Duration must be in MM:SS format (e.g., 3:45)',
                                            },
                                        })}
                                        disabled={loading}
                                        placeholder="e.g., 3:45"
                                    />
                                    {form.formState.errors.duration && (
                                        <p className="text-sm text-red-600">{form.formState.errors.duration.message}</p>
                                    )}
                                </div>

                                {/* Release Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="releaseDate">Release Date</Label>
                                    <Input
                                        id="releaseDate"
                                        type="date"
                                        {...form.register('releaseDate', {
                                            required: 'Release date is required',
                                            validate: (value) => {
                                                const today = new Date();
                                                today.setHours(0, 0, 0, 0);
                                                const selectedDate = new Date(value);
                                                return selectedDate <= today || 'Release date cannot be in the future';
                                            },
                                        })}
                                        disabled={loading}
                                    />
                                    {form.formState.errors.releaseDate && (
                                        <p className="text-sm text-red-600">{form.formState.errors.releaseDate.message}</p>
                                    )}
                                </div>

                                {/* Genre */}
                                <div className="space-y-2">
                                    <Label htmlFor="genre">Genre</Label>
                                    <Input
                                        id="genre"
                                        {...form.register('genre', {
                                            required: 'Genre is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Genre must be at least 2 characters',
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: 'Genre cannot exceed 50 characters',
                                            },
                                        })}
                                        disabled={loading}
                                        placeholder="Enter genre"
                                    />
                                    {form.formState.errors.genre && (
                                        <p className="text-sm text-red-600">{form.formState.errors.genre.message}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        onValueChange={(value) => form.setValue('status', value as SongStatus)}
                                        value={form.watch('status')}
                                        disabled={loading}
                                    >
                                        <SelectTrigger className="w-full rounded-2xl">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={SongStatus.Published}>{SongStatus.Published}</SelectItem>
                                            <SelectItem value={SongStatus.Draft}>{SongStatus.Draft}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.formState.errors.status && (
                                        <p className="text-sm text-red-600">{form.formState.errors.status.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={loading}
                                    className="cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="cursor-pointer">
                                    {loading ? 'Saving...' : 'Save'} <Check />
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageEditSong;