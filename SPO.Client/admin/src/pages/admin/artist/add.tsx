import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { postArtistData } from '@/store/artist/artist.actions';
import { useAppDispatch } from '@/store/store';
import { ArrowLeft, Save } from 'lucide-react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FormValues {
    name: string;
    bio: string;
    urlAvatar: string;
}

const ManageAddArtist: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [imageError, setImageError] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            bio: "",
            urlAvatar: ""
        },
    });
    const urlAvatar = watch('urlAvatar');
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const payload = {
            ...data,
        };
        try {
            await dispatch(postArtistData(payload)).unwrap();
            toast("Success!", {
                description: "Artist has been created successfully.",
            })
            navigate("/admin/artists")
        } catch {
            toast("Error", {
                description: "Failed to create artist. Please try again.",
            })
        }
    }
    return (
        <div className='container mx-auto'>
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Add Artist</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        asChild
                        variant={'outline'}
                    >
                        <Link to={'/admin/artists'}>
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Artist Name <span className="text-red-500">*</span>
                                </label>
                                {errors.name && <p className="text-sm font-medium text-destructive">{errors.name.message}</p>}
                            </div>
                            <Input
                                id="name"
                                placeholder="Enter artist name"
                                {...register("name", {
                                    required: "Artist name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Artist name must be at least 2 characters",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Artist name must not exceed 50 characters",
                                    },
                                })}
                                className={errors.name ? "border-destructive" : ""}
                            />
                            <p className="text-sm text-muted-foreground">The name of the genre that will be displayed to users.</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="bio"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Bio
                                </label>
                                {errors.bio && (
                                    <p className="text-sm font-medium text-destructive">{errors.bio.message}</p>
                                )}
                            </div>
                            <Textarea
                                id="bio"
                                placeholder="Enter genre description (optional)"
                                className={`resize-none min-h-[120px] ${errors.bio ? "border-destructive" : ""}`}
                                {...register("bio", {
                                    maxLength: {
                                        value: 500,
                                        message: "Bio must not exceed 500 characters",
                                    },
                                })}
                            />
                            <p className="text-sm text-muted-foreground">A brief bio of the artist. This is optional.</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="avatar"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Artist Avatar <span className="text-red-500">*</span>
                                </label>
                                {errors.urlAvatar && <p className="text-sm font-medium text-destructive">{errors.urlAvatar.message}</p>}
                            </div>
                            <Input
                                id="avatar"
                                placeholder="Enter artist url avatar"
                                {...register("urlAvatar", {
                                    required: "Artist avatar is required",
                                    minLength: {
                                        value: 2,
                                        message: "Artist avatar must be at least 2 characters",
                                    }
                                })}
                                className={errors.urlAvatar ? "border-destructive" : ""}
                            />
                            <p className="text-sm text-muted-foreground">The avatar of the artist that will be displayed to users.</p>
                            {urlAvatar && (
                                <div className="mt-2">
                                    <p className="text-sm font-medium">Image Preview:</p>
                                    {imageError ? (
                                        <p className="text-sm text-destructive">
                                            Unable to load image. Please check the URL.
                                        </p>
                                    ) : (
                                        <img
                                            src={urlAvatar}
                                            alt="Artist avatar preview"
                                            className="mt-2 h-32 w-32 object-cover rounded-md border"
                                            onError={() => setImageError(true)}
                                            onLoad={() => setImageError(false)}
                                        />
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className='cursor-pointer'
                                onClick={() => {
                                    reset()
                                    navigate('/admin/artists')
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="flex items-center gap-1 cursor-pointer">
                                <Save className="h-4 w-4" />
                                Save Artist
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageAddArtist;