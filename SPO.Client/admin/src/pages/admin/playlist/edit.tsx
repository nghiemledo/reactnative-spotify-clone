import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getPlaylistById, putPlaylistData } from '@/store/playlist/playlist.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { ArrowLeft, Save } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

interface FormValues {
    title: string;
    description: string;
    coverImage: string;
    userId: string;
}

const ManageEditPlayist: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { playlistDetail, loading } = useAppSelector((state: RootState) => state.playlist);
    const { userData } = useAppSelector((state: RootState) => state.user);

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
            description: "",
            coverImage: "",
            userId: "",
        },
    });

    const coverImage = watch('coverImage');

    useEffect(() => {
        if (id) {
            dispatch(getPlaylistById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (playlistDetail) {
            setValue('title', playlistDetail.title);
            setValue('description', playlistDetail?.description || "");
            setValue('coverImage', playlistDetail.coverImage || '');
            setValue('userId', playlistDetail.userId || '');
        }
    }, [playlistDetail, setValue]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!id) return;
        const payload = {
            id,
            title: data.title,
            description: data.description,
            coverImage: data.coverImage,
            userId: data.userId,
            createdAt: playlistDetail?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        try {
            await dispatch(putPlaylistData(payload)).unwrap();
            toast('Success!', {
                description: 'Playlist has been updated successfully.',
            });
            navigate('/admin/playlists');
        } catch {
            toast('Error', {
                description: 'Failed to update playlist. Please try again.',
            });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Edit Playlist</h1>
                <div className="flex items-center space-x-2">
                    <Button asChild variant={'outline'}>
                        <Link to={'/admin/playlists'}>
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
                                        Playlist Name <span className="text-red-500">*</span>
                                    </label>
                                    {errors.title && <p className="text-sm font-medium text-destructive">{errors.title.message}</p>}
                                </div>
                                <Input
                                    id="name"
                                    placeholder="Enter playlist name"
                                    {...register("title", {
                                        required: "Playlist name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Playlist name must be at least 2 characters",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Playlist name must not exceed 50 characters",
                                        },
                                    })}
                                    className={errors.title ? "border-destructive" : ""}
                                />
                                <p className="text-sm text-muted-foreground">The name of the playlist that will be displayed to users.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="bio"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Description
                                    </label>
                                    {errors.description && (
                                        <p className="text-sm font-medium text-destructive">{errors.description.message}</p>
                                    )}
                                </div>
                                <Textarea
                                    id="bio"
                                    placeholder="Enter genre description (optional)"
                                    className={`resize-none min-h-[120px] ${errors.description ? "border-destructive" : ""}`}
                                    {...register("description", {
                                        maxLength: {
                                            value: 500,
                                            message: "Description must not exceed 500 characters",
                                        },
                                    })}
                                />
                                <p className="text-sm text-muted-foreground">A brief bio of the playlist. This is optional.</p>
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
                                    placeholder="Enter playlist cover image url"
                                    {...register("coverImage", {
                                        required: "Cover image is required",
                                        minLength: {
                                            value: 2,
                                            message: "Cover image must be at least 2 characters",
                                        }
                                    })}
                                    className={errors.coverImage ? "border-destructive" : ""}
                                />
                                <p className="text-sm text-muted-foreground">The cover image of the playlist that will be displayed to users.</p>
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
                                                alt="Playlist cover image preview"
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
                                        htmlFor="userId"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        User <span className="text-red-500">*</span>
                                    </label>
                                    {errors.userId && <p className="text-sm font-medium text-destructive">{errors.userId.message}</p>}
                                </div>
                                <Select
                                    onValueChange={(value) => setValue("userId", value)}
                                    {...register("userId")}
                                    value={watch('userId')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select user" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {userData?.map((user) => (
                                            <SelectItem key={user.id} value={user.id?.toString() || ""}>
                                                {user.fullName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground">Select user own the playlist.</p>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className='cursor-pointer'
                                    onClick={() => {
                                        reset()
                                        navigate('/admin/playlists')
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex items-center gap-1 cursor-pointer">
                                    <Save className="h-4 w-4" />
                                    Save Playlist
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageEditPlayist;