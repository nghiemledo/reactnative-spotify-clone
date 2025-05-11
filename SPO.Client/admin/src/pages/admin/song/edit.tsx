import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSongById, putSongData } from '@/store/song/song.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { ArrowLeft, Save } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

interface FormValues {
    title: string;
    coverImage: string;
    genreId: string;
    duration: number;
    audioUrl: string;
    artistId: string;
    albumId: string;
}

const ManageEditSong: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { songDetail, loading } = useAppSelector((state: RootState) => state.song);
    const { albumData } = useAppSelector((state: RootState) => state.album);
    const { genreData } = useAppSelector((state: RootState) => state.genre);
    const { artistData } = useAppSelector((state: RootState) => state.artist);
    const [imageError, setImageError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            genreId: "",
            duration: 0,
            audioUrl: "",
            artistId: "",
            albumId: ""
        },
    });

    const coverImage = watch("coverImage");

    useEffect(() => {
        if (id) {
            dispatch(getSongById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (songDetail) {
            setValue('title', songDetail.title);
            setValue('coverImage', songDetail.coverImage || '');
            setValue('genreId', songDetail.genreId || '');
            setValue('duration', songDetail.duration);
            setValue('audioUrl', songDetail.audioUrl || '');
            setValue('artistId', songDetail.artistId || '');
            setValue('albumId', songDetail.albumId || '');
        }
    }, [songDetail, setValue]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!id) return;
        const payload = {
            id,
            title: data.title,
            coverImage: data.coverImage,
            genreId: data.genreId,
            duration: data.duration,
            audioUrl: data.audioUrl,
            artistId: data.artistId,
            albumId: data.albumId,
            createdAt: songDetail?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        try {
            await dispatch(putSongData(payload)).unwrap();
            toast('Success!', {
                description: 'Song has been updated successfully.',
            });
            navigate('/admin/songs');
        } catch {
            toast('Error', {
                description: 'Failed to update song. Please try again.',
            });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Edit Song</h1>
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
                <CardContent className="pt-6">
                    {loading ? (
                        <Loading />
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="title"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Song Title <span className="text-red-500">*</span>
                                    </label>
                                    {errors.title && <p className="text-sm font-medium text-destructive">{errors.title.message}</p>}
                                </div>
                                <Input
                                    id="title"
                                    placeholder="Enter song title"
                                    {...register("title", {
                                        required: "Song title is required",
                                        minLength: {
                                            value: 2,
                                            message: "Song title must be at least 2 characters",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Song title must not exceed 50 characters",
                                        },
                                    })}
                                    className={errors.title ? "border-destructive" : ""}
                                />
                                <p className="text-sm text-muted-foreground">The title of the song that will be displayed to users.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="avatar"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Song Image <span className="text-red-500">*</span>
                                    </label>
                                    {errors.coverImage && <p className="text-sm font-medium text-destructive">{errors.coverImage.message}</p>}
                                </div>
                                <Input
                                    id="avatar"
                                    placeholder="Enter song url image"
                                    {...register("coverImage", {
                                        required: "Song image is required",
                                        minLength: {
                                            value: 2,
                                            message: "Song image must be at least 2 characters",
                                        }
                                    })}
                                    className={errors.coverImage ? "border-destructive" : ""}
                                />
                                <p className="text-sm text-muted-foreground">The image of the song that will be displayed to users.</p>
                                {coverImage && (
                                    <div className="mt-2">
                                        <p className="text-sm font-medium">Image Preview:</p>
                                        {imageError ? (
                                            <p className="text-sm text-destructive">
                                                Unable to load image. Please check the URL.
                                            </p>
                                        ) : (
                                            <img
                                                src={coverImage}
                                                alt="Artist avatar preview"
                                                className="mt-2 h-32 w-32 object-cover rounded-md border"
                                                onError={() => setImageError(true)}
                                                onLoad={() => setImageError(false)}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="genreId"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Genre <span className="text-red-500">*</span>
                                    </label>
                                    {errors.genreId && <p className="text-sm font-medium text-destructive">{errors.genreId.message}</p>}
                                </div>
                                <Select
                                    onValueChange={(value) => setValue("genreId", value)}
                                    value={watch('genreId')}
                                    {...register("genreId", {
                                        required: "Genre is required",
                                    })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select genre" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {genreData?.map((genre) => (
                                            <SelectItem key={genre.id} value={genre.id!.toString()}>
                                                {genre.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground">Select the genre of the song.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="artistId"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Artist <span className="text-red-500">*</span>
                                    </label>
                                    {errors.artistId && <p className="text-sm font-medium text-destructive">{errors.artistId.message}</p>}
                                </div>
                                <Select
                                    onValueChange={(value) => setValue("artistId", value)}
                                    value={watch('artistId')}
                                    {...register("artistId", {
                                        required: "Artist is required",
                                    })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select artist" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {artistData?.map((artist) => (
                                            <SelectItem key={artist.id} value={artist.id?.toString() || ''}>
                                                {artist.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground">Select the artist of the song.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="albumId"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Album <span className="text-red-500">*</span>
                                    </label>
                                    {errors.albumId && <p className="text-sm font-medium text-destructive">{errors.albumId.message}</p>}
                                </div>
                                <Select
                                    onValueChange={(value) => setValue("albumId", value)}
                                    value={watch('albumId')}
                                    {...register("albumId")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select album" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {albumData?.map((album) => (
                                            <SelectItem key={album.id} value={album.id?.toString() || ""}>
                                                {album.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground">Select the album of the song.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="duration"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Duration (seconds) <span className="text-red-500">*</span>
                                    </label>
                                    {errors.duration && <p className="text-sm font-medium text-destructive">{errors.duration.message}</p>}
                                </div>
                                <Input
                                    id="duration"
                                    type="number"
                                    placeholder="Enter duration in seconds"
                                    {...register("duration", {
                                        required: "Duration is required",
                                        min: {
                                            value: 1,
                                            message: "Duration must be at least 1 second",
                                        },
                                    })}
                                    className={errors.duration ? "border-destructive" : ""}
                                />
                                <p className="text-sm text-muted-foreground">The duration of the song in seconds.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="audioUrl"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Audio URL <span className="text-red-500">*</span>
                                    </label>
                                    {errors.audioUrl && <p className="text-sm font-medium text-destructive">{errors.audioUrl.message}</p>}
                                </div>
                                <Input
                                    id="audioUrl"
                                    placeholder="Enter audio URL"
                                    {...register("audioUrl", {
                                        required: "Audio URL is required",
                                        pattern: {
                                            value: /^(https?:\/\/).+\.(mp3|wav)$/,
                                            message: "Please enter a valid audio URL (mp3 or wav)",
                                        },
                                    })}
                                    className={errors.audioUrl ? "border-destructive" : ""}
                                />
                                <p className="text-sm text-muted-foreground">The URL to the audio file (mp3 or wav).</p>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className='cursor-pointer'
                                    onClick={() => {
                                        reset();
                                        navigate('/admin/songs');
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex items-center gap-1 cursor-pointer">
                                    <Save className="h-4 w-4" />
                                    Save Song
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