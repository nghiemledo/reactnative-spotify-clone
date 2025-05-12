import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getGenreById, putGenreData } from '@/store/genre/genre.actions';
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

const ManageEditGenre: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { genreDetail, loading } = useAppSelector((state: RootState) => state.genre);

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
            dispatch(getGenreById(id));
        }
    }, [dispatch, id]);

    // Populate form with genre data when genreDetail is available
    useEffect(() => {
        if (genreDetail) {
            setValue('name', genreDetail.name);
            setValue('description', genreDetail.description || '');
        }
    }, [genreDetail, setValue]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!id) return;
        const payload = {
            id,
            name: data.name,
            description: data.description,
            createdAt: genreDetail?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        try {
            await dispatch(putGenreData(payload)).unwrap();
            toast('Success!', {
                description: 'Genre has been updated successfully.',
            });
            navigate('/admin/genres');
        } catch {
            toast('Error', {
                description: 'Failed to update genre. Please try again.',
            });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="mb-5 flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Edit Genre</h1>
                <div className="flex items-center space-x-2">
                    <Button asChild variant={'outline'}>
                        <Link to={'/admin/genres'}>
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>
            </div>
            <Card>
                <CardContent className="pt-6">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Genre Name <span className="text-red-500">*</span>
                                    </label>
                                    {errors.name && (
                                        <p className="text-sm font-medium text-destructive">{errors.name.message}</p>
                                    )}
                                </div>
                                <Input
                                    id="name"
                                    placeholder="Enter genre name"
                                    {...register('name', {
                                        required: 'Genre name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Genre name must be at least 2 characters',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Genre name must not exceed 50 characters',
                                        },
                                    })}
                                    className={errors.name ? 'border-destructive' : ''}
                                />
                                <p className="text-sm text-muted-foreground">
                                    The name of the genre that will be displayed to users.
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
                                    placeholder="Enter genre description (optional)"
                                    className={`resize-none min-h-[120px] ${errors.description ? 'border-destructive' : ''}`}
                                    {...register('description', {
                                        maxLength: {
                                            value: 500,
                                            message: 'Description must not exceed 500 characters',
                                        },
                                    })}
                                />
                                <p className="text-sm text-muted-foreground">
                                    A brief description of the genre. This is optional.
                                </p>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        reset();
                                        navigate('/admin/genres');
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex items-center gap-1 cursor-pointer">
                                    <Save className="h-4 w-4" />
                                    Update Genre
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageEditGenre;