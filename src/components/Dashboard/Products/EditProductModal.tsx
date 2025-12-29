import FabricForm from '@/components/Forms/FabricForm'
import FFInput from '@/components/Forms/FFInput'
import FFModal from '@/components/Modal/FFModal'
import { TModalPageProps } from '@/types/global'
import { Button, Grid } from '@mui/material'

const EditProductModal = ({ open, setOpen, id }: TModalPageProps & { id: string }) => {

    const handleSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <FFModal open={open} setOpen={setOpen} title="Edit Product" maxWidth='md'>
            <FabricForm onSubmit={handleSubmit} defaultValues={{
                image1: "",
                image2: "",
                image3: "",
                name: "",
                category: "",
                price: "",
                discountPrice: "",
                stock: "",
                description: ""
            }}>
                {/* Form fields go here */}


                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <FFInput name="image1" label="First img(primary image)" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FFInput name="image2" label="Second img(secondary image optional)" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FFInput name="image3" label="Third img(tertiary image optional)" fullWidth={true} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FFInput name="name" label="Name" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FFInput name="category" label="Category" fullWidth={true} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FFInput name="price" label="Price" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FFInput name="discountPrice" label="Discount Price(optional)" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FFInput name="stock" label="Stock" fullWidth={true} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <FFInput
                            name="description"
                            label="Description"
                            fullWidth={true}
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    sx={{
                        my: 2,
                    }}
                >
                    Update product
                </Button>
            </FabricForm>

        </FFModal >
    )
}

export default EditProductModal