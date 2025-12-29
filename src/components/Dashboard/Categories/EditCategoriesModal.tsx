import FabricForm from '@/components/Forms/FabricForm'
import FFInput from '@/components/Forms/FFInput'
import FFModal from '@/components/Modal/FFModal'
import { TModalPageProps } from '@/types/global'
import { Button, Grid } from '@mui/material'

const EditCategoriesModal = ({ open, setOpen, id }: TModalPageProps & { id: string }) => {

    const handleSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <FFModal open={open} setOpen={setOpen} title="Add Category" maxWidth='lg'>
            <FabricForm onSubmit={handleSubmit} defaultValues={{
                name: ''
            }}>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <FFInput name="name" label="Category name" fullWidth={true} />
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    sx={{
                        my: 2,
                    }}
                >
                    Create category
                </Button>
            </FabricForm>

        </FFModal >
    )
}

export default EditCategoriesModal