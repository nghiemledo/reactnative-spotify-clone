import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { postPodcastShowData } from '@/store/podcast-show/podcast-show.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { ArrowLeft, Save } from 'lucide-react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FormValues {
    title: string;
    creator: string;
    description: string;
    coverImage: string;
    categoryId: string;
}

const ManageAddPodcastShow: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [imageError, setImageError] = useState(false);
    const { podcastCategoryData } = useAppSelector((state: RootState) => state.podcastCategory);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            creator: "",
            description: "",
            coverImage: "",
            categoryId: ""
        },
    });
    const coverImage = watch('coverImage');
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const payload = {
            ...data,
        };
        try {
            await dispatch(postPodcastShowData(payload)).unwrap();
            toast("Success!", {
                description: "Podcast show has been created successfully.",
            })
            navigate("/admin/podcast-shows")
        } catch {
            toast("Error", {
                description: "Failed to create playlist. Please try again.",
            })
        }
    }
    return (
        <div className='container mx-auto'>
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Add Podcast Show</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        asChild
                        variant={'outline'}
                    >
                        <Link to={'/admin/podcast-shows'}>
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
                                    Show Name <span className="text-red-500">*</span>
                                </label>
                                {errors.title && <p className="text-sm font-medium text-destructive">{errors.title.message}</p>}
                            </div>
                            <Input
                                id="name"
                                placeholder="Enter show name"
                                {...register("title", {
                                    required: "Show name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Show name must be at least 2 characters",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Show name must not exceed 50 characters",
                                    },
                                })}
                                className={errors.title ? "border-destructive" : ""}
                            />
                            <p className="text-sm text-muted-foreground">The name of the podcast show that will be displayed to users.</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="creator"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Creator <span className="text-red-500">*</span>
                                </label>
                                {errors.creator && <p className="text-sm font-medium text-destructive">{errors.creator.message}</p>}
                            </div>
                            <Input
                                id="creator"
                                placeholder="Enter creator"
                                {...register("title", {
                                    required: "Creator is required",
                                    minLength: {
                                        value: 2,
                                        message: "Creator must be at least 2 characters",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Creator must not exceed 50 characters",
                                    },
                                })}
                                className={errors.title ? "border-destructive" : ""}
                            />
                            <p className="text-sm text-muted-foreground">The creator the podcast show that will be displayed to users.</p>
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
                                    htmlFor="categoryId"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Category <span className="text-red-500">*</span>
                                </label>
                                {errors.categoryId && <p className="text-sm font-medium text-destructive">{errors.categoryId.message}</p>}
                            </div>
                            <Select
                                onValueChange={(value) => setValue("categoryId", value)}
                                {...register("categoryId")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {podcastCategoryData?.map((cate) => (
                                        <SelectItem key={cate.id} value={cate.id?.toString() || ""}>
                                            {cate.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-muted-foreground">Select category own the playlist.</p>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className='cursor-pointer'
                                onClick={() => {
                                    reset()
                                    navigate('/admin/podcast-shows')
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="flex items-center gap-1 cursor-pointer">
                                <Save className="h-4 w-4" />
                                Save Show
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageAddPodcastShow;