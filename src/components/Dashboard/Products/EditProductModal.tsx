import FabricForm from '@/components/Forms/FabricForm'
import FFInput from '@/components/Forms/FFInput'
import FFModal from '@/components/Modal/FFModal'
import { TModalPageProps } from '@/types/global'
import { Button, Grid } from '@mui/material'
import { useGetAllCategoriesQuery } from '@/redux/api/categoriesApi';
import FFSelect from '@/components/Forms/FFSelect';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/redux/api/productsApi'
import { toast } from 'sonner'

const EditProductModal = ({ open, setOpen, id }: TModalPageProps & { id: string }) => {
    const { data: categoriesData } = useGetAllCategoriesQuery({});
    const categories = categoriesData?.data?.result || [];
    const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colorOptions = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple'];

    const { data, isLoading } = useGetProductByIdQuery(id);
    const [updateProduct] = useUpdateProductMutation();

    if (isLoading) {
        return null; // or a loading spinner
    }

    const product = data?.data



    const handleSubmit = async (data: any) => {
        const toastId = toast.loading("Updating product...");
        try {
            // Convert images fields to array
            const images = [data.image1, data.image2, data.image3].filter(Boolean);
            const payload = {
                name: data.name,
                slug: data.name.toLowerCase().replace(/\s+/g, '-'),
                category: data.category,
                price: Number(data.price),
                discountPrice: data.discountPrice ? Number(data.discountPrice) : 0,
                description: data.description,
                images,
                stock: Number(data.stock),
                sizes: data.sizes || [],
                colors: data.colors || [],
            };

            const res = await updateProduct({ id, ...payload }).unwrap();
            if (res?.success) {
                toast.success("Product updated successfully!", { id: toastId });
                setOpen(false);
            } else {
                toast.error("Failed to update product.", { id: toastId });
            }

        } catch (err) {
            console.log(err)
        }
    }

    // Prefill form with product data
    const defaultValues = {
        image1: product?.images?.[0] || "",
        image2: product?.images?.[1] || "",
        image3: product?.images?.[2] || "",
        name: product?.name || "",
        category: product?.category?._id || "",
        price: product?.price || "",
        discountPrice: product?.discountPrice || "",
        stock: product?.stock || "",
        description: product?.description || "",
        sizes: product?.sizes || [],
        colors: product?.colors || [],
    };

    return (
        <FFModal open={open} setOpen={setOpen} title="Edit Product" maxWidth='md'>
            <FabricForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FFSelect
                            name="sizes"
                            label="Sizes (multi-select)"
                            options={sizeOptions.map(s => ({ label: s, value: s }))}
                            required
                            multiple
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FFSelect
                            name="colors"
                            label="Colors (multi-select)"
                            options={colorOptions.map(c => ({ label: c, value: c }))}
                            required
                            multiple
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FFInput name="image1" label="Image 1 (required)" fullWidth={true} required />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FFInput name="image2" label="Image 2 (optional)" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FFInput name="image3" label="Image 3 (optional)" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FFInput name="name" label="Name" fullWidth={true} required />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FFSelect
                            name="category"
                            label="Category"
                            options={categories.map((cat: any) => ({ label: cat.name, value: cat._id }))}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FFInput name="price" label="Price" type="number" fullWidth={true} required />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FFInput name="discountPrice" label="Discount Price (optional)" type="number" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FFInput name="stock" label="Stock" type="number" fullWidth={true} required />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <FFInput
                            name="description"
                            label="Description"
                            fullWidth={true}
                            multiline
                            rows={4}
                            required
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