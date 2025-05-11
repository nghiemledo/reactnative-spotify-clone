import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAlbumById, putAlbumData } from '@/store/album/album.actions';
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
    artistId: string;
}

const ManageEditAlbum: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { albumDetail, loading } = useAppSelector((state: RootState) => state.album);
    const [imageError, setImageError] = useState(false);

    const { genreData } = useAppSelector((state: RootState) => state.genre);
    const { artistData } = useAppSelector((state: RootState) => state.artist);

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
            coverImage: "",
            genreId: "",
            artistId: ""
        },
    });

    const coverImage = watch('coverImage');

    useEffect(() => {
        if (id) {
            dispatch(getAlbumById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (albumDetail) {
            setValue('title', albumDetail.title);
            setValue('coverImage', albumDetail.coverImage || '');
            setValue('genreId', albumDetail.genreId || '');
            setValue('artistId', albumDetail.artistId || '');
        }
    }, [albumDetail, setValue]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!id) return;
        const payload = {
            id,
            title: data.title,
            coverImage: data.coverImage,
            genreId: data.genreId,
            artistId: data.artistId,
            createdAt: albumDetail?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        try {
            await dispatch(putAlbumData(payload)).unwrap();
            toast('Success!', {
                description: 'Albums has been updated successfully.',
            });
            navigate('/admin/albums');
        } catch {
            toast('Error', {
                description: 'Failed to update album. Please try again.',
            });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Edit Album</h1>
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
                <CardContent className="pt-6">
                    {loading ? (
                        <Loading />
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Album Title <span className="text-red-500">*</span>
                                    </label>
                                    {errors.title && <p className="text-sm font-medium text-destructive">{errors.title.message}</p>}
                                </div>
                                <Input
                                    id="name"
                                    placeholder="Enter album title"
                                    {...register("title", {
                                        required: "Album title is required",
                                        minLength: {
                                            value: 2,
                                            message: "Album title must be at least 2 characters",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Album title must not exceed 50 characters",
                                        },
                                    })}
                                    className={errors.title ? "border-destructive" : ""}
                                />
                                <p className="text-sm text-muted-foreground">The title of the album that will be displayed to users.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="avatar"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Cover Image <span className="text-red-500">*</span>
                                    </label>
                                    {errors.coverImage && <p className="text-sm font-medium text-destructive">{errors.coverImage.message}</p>}
                                </div>
                                <Input
                                    id="avatar"
                                    placeholder="Enter artist url avatar"
                                    {...register("coverImage", {
                                        required: "Cover image is required",
                                        minLength: {
                                            value: 2,
                                            message: "Cover image must be at least 2 characters",
                                        }
                                    })}
                                    className={errors.coverImage ? "border-destructive" : ""}
                                />
                                <p className="text-sm text-muted-foreground">The image of the album that will be displayed to users.</p>
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

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className='cursor-pointer'
                                    onClick={() => {
                                        reset()
                                        navigate('/admin/albums')
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex items-center gap-1 cursor-pointer">
                                    <Save className="h-4 w-4" />
                                    Save Album
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageEditAlbum;