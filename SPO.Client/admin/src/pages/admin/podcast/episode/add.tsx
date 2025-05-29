import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { postPodcastEpisodeData } from '@/store/podcast-episode/podcast-episode.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FormValues {
    title: string;
    description: string;
    duration: number;
    audioUrl: string;
    showId: string;
}

const ManageAddPodcastEpisode: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { podcastShowData } = useAppSelector((state: RootState) => state.podcastShow);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            duration: 0,
            audioUrl: "",
            showId: "",
        },
    });
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const payload = {
            ...data,
        };
        try {
            await dispatch(postPodcastEpisodeData(payload)).unwrap();
            toast("Success!", {
                description: "Podcast episode has been created successfully.",
            })
            navigate("/admin/podcast-episodes")
        } catch {
            toast("Error", {
                description: "Failed to create episodes. Please try again.",
            })
        }
    }
    return (
        <div className='container mx-auto'>
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Add Podcast Episode</h1>
                <div className="flex items-center space-x-2 cursor-not-allowed">
                    <Button
                        asChild
                        variant={'outline'}
                    >
                        <Link to={'/admin/podcast-episodes'}>
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
                                    Episode Name <span className="text-red-500">*</span>
                                </label>
                                {errors.title && <p className="text-sm font-medium text-destructive">{errors.title.message}</p>}
                            </div>
                            <Input
                                id="name"
                                placeholder="Enter episode name"
                                {...register("title", {
                                    required: "Episode name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Episode name must be at least 2 characters",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Episode name must not exceed 50 characters",
                                    },
                                })}
                                className={errors.title ? "border-destructive" : ""}
                            />
                            <p className="text-sm text-muted-foreground">The name of the episode that will be displayed to users.</p>
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
                                {...register("description")}
                            />
                            <p className="text-sm text-muted-foreground">A brief description of the episode. This is optional.</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="userId"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Podcast Show <span className="text-red-500">*</span>
                                </label>
                                {errors.showId && <p className="text-sm font-medium text-destructive">{errors.showId.message}</p>}
                            </div>
                            <Select
                                onValueChange={(value) => setValue("showId", value)}
                                {...register("showId")}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select show" />
                                </SelectTrigger>
                                <SelectContent>
                                    {podcastShowData?.map((show) => (
                                        <SelectItem key={show.id} value={show.id?.toString() || ""}>
                                            {show.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-muted-foreground">Select podcast show own the playlist.</p>
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
                                    reset()
                                    navigate('/admin/podcast-episodes')
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="flex items-center gap-1 cursor-pointer">
                                <Save className="h-4 w-4" />
                                Save Episode
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageAddPodcastEpisode;