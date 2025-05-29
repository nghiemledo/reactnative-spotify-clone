import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getPodcastCategoryById, putPodcastCategoryData } from '@/store/podcast-category/podcast-category.actions';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { ArrowLeft, Save } from 'lucide-react';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

interface FormValues {
    name: string;
    description: string;
}

const ManageEditPodcastCategory: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { podcastCategoryDetail, loading } = useAppSelector((state: RootState) => state.podcastCategory);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormValues>({
        defaultValues: {
            name: '',
            description: '',
        },
    });

    useEffect(() => {
        if (id) {
            dispatch(getPodcastCategoryById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (podcastCategoryDetail) {
            setValue('name', podcastCategoryDetail.name);
            setValue('description', podcastCategoryDetail.description || '');
        }
    }, [podcastCategoryDetail, setValue]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!id) return;
        const payload = {
            id,
            name: data.name,
            description: data.description,
            createdAt: podcastCategoryDetail?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        try {
            await dispatch(putPodcastCategoryData(payload)).unwrap();
            toast('Success!', {
                description: 'Category has been updated successfully.',
            });
            navigate('/admin/podcast-categories');
        } catch {
            toast('Error', {
                description: 'Failed to update category. Please try again.',
            });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Edit Podcast Category</h1>
                <div className="flex items-center space-x-2">
                    <Button asChild variant={'outline'}>
                        <Link to={'/admin/podcast-categories'}>
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
                                        Category Name <span className="text-red-500">*</span>
                                    </label>
                                    {errors.name && (
                                        <p className="text-sm font-medium text-destructive">{errors.name.message}</p>
                                    )}
                                </div>
                                <Input
                                    id="name"
                                    placeholder="Enter category name"
                                    {...register('name', {
                                        required: 'Category name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Category name must be at least 2 characters',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Category name must not exceed 50 characters',
                                        },
                                    })}
                                    className={errors.name ? 'border-destructive' : ''}
                                />
                                <p className="text-sm text-muted-foreground">
                                    The name of the podcast category that will be displayed to users.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="description"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Description
                                    </label>
                                    {errors.description && (
                                        <p className="text-sm font-medium text-destructive">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>
                                <Textarea
                                    id="description"
                                    placeholder="Enter category description (optional)"
                                    className={`resize-none min-h-[120px] ${errors.description ? 'border-destructive' : ''}`}
                                    {...register('description', {
                                        maxLength: {
                                            value: 500,
                                            message: 'Description must not exceed 500 characters',
                                        },
                                    })}
                                />
                                <p className="text-sm text-muted-foreground">
                                    A brief description of the podcast category. This is optional.
                                </p>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        reset();
                                        navigate('/admin/podcast-categories');
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex items-center gap-1 cursor-pointer">
                                    <Save className="h-4 w-4" />
                                    Update Category
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageEditPodcastCategory;