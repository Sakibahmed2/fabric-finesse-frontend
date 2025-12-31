import FabricForm from '@/components/Forms/FabricForm';
import FFInput from '@/components/Forms/FFInput';
import FFModal from '@/components/Modal/FFModal';
import { TModalPageProps } from '@/types/global';
import { Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useGetSingleCategoryQuery, useUpdateCategoryMutation } from '@/redux/api/categoriesApi';

const EditCategoriesModal = ({ open, setOpen, id }: TModalPageProps & { id: string }) => {
    const { data, isLoading } = useGetSingleCategoryQuery(id, { skip: !id || !open });
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

    const defaultValues = {
        name: data?.data?.name || '',
    };

    const handleSubmit = async (formData: any) => {
        await updateCategory({ id, ...formData });
        setOpen(false);
    };

    return (
        <FFModal open={open} setOpen={setOpen} title="Edit Category" maxWidth="lg">
            <FabricForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <FFInput name="name" label="Category name" fullWidth={true} />
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    disabled={isUpdating}
                    sx={{
                        my: 2,
                    }}
                >
                    {isUpdating ? 'Updating...' : 'Update category'}
                </Button>
            </FabricForm>
        </FFModal>
    );
};

export default EditCategoriesModal;