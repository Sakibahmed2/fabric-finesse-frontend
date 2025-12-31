import FabricForm from '@/components/Forms/FabricForm'
import FFInput from '@/components/Forms/FFInput'
import FFModal from '@/components/Modal/FFModal'
import { useCreateCategoriesMutation } from '@/redux/api/categoriesApi'
import { TModalPageProps } from '@/types/global'
import { Button, Grid } from '@mui/material'
import { toast } from 'sonner'

const AddCategoriesModal = ({ open, setOpen }: TModalPageProps) => {

    const [createCategory] = useCreateCategoriesMutation();

    const handleSubmit = async (data: any) => {
        const toastId = toast.loading("Creating category...");

        try {
            // Only name is required and must be unique (handled by backend)
            const payload = {
                name: data.name.trim(),
            };

            const res = await createCategory(payload).unwrap();
            if (res?.success) {
                toast.success("Category created successfully!", { id: toastId });
                setOpen(false);
            } else {
                toast.error("Failed to create category.", { id: toastId });
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <FFModal open={open} setOpen={setOpen} title="Add Category" maxWidth='lg'>
            <FabricForm onSubmit={handleSubmit} defaultValues={{ name: '' }}>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <FFInput name="name" label="Category Name" fullWidth={true} required />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    sx={{ my: 2 }}
                >
                    Create category
                </Button>
            </FabricForm>

        </FFModal >
    )
}

export default AddCategoriesModal