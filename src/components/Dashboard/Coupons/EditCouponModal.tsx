import FabricForm from '@/components/Forms/FabricForm';
import FFInput from '@/components/Forms/FFInput';
import FFSelect from '@/components/Forms/FFSelect';
import FFModal from '@/components/Modal/FFModal';
import { TModalPageProps } from '@/types/global';
import { Button, Grid } from '@mui/material';
import { useGetCouponByIdQuery, useUpdateCouponMutation } from '@/redux/api/couponApi';
import { toast } from 'sonner';

const EditCouponModal = ({ open, setOpen, id }: TModalPageProps & { id: string }) => {
    const { data, isLoading } = useGetCouponByIdQuery(id, { skip: !id || !open });
    const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();

    const coupon = data?.data;

    const defaultValues = {
        code: coupon?.code || '',
        type: coupon?.type || 'percentage',
        value: coupon?.value?.toString() || '',
        minOrder: coupon?.minOrder?.toString() || '0',
        totalCoupon: coupon?.totalCoupon?.toString() || '',
        perUserLimit: coupon?.perUserLimit?.toString() || '1',
    };

    const handleSubmit = async (formData: any) => {
        const toastId = toast.loading("Updating coupon...");

        try {
            const payload = {
                id,
                code: formData.code.trim().toUpperCase(),
                type: formData.type,
                value: parseFloat(formData.value),
                minOrder: parseFloat(formData.minOrder) || 0,
                totalCoupon: parseInt(formData.totalCoupon),
                perUserLimit: parseInt(formData.perUserLimit) || 1,
            };

            const res = await updateCoupon(payload).unwrap();
            if (res?.success) {
                toast.success("Coupon updated successfully!", { id: toastId });
                setOpen(false);
            } else {
                toast.error("Failed to update coupon.", { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong!", { id: toastId });
            console.log(err);
        }
    };

    return (
        <FFModal open={open} setOpen={setOpen} title="Edit Coupon" maxWidth="md">
            {!isLoading && coupon && (
                <FabricForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FFInput
                                name="code"
                                label="Coupon Code"
                                fullWidth={true}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FFSelect
                                name="type"
                                label="Discount Type"
                                fullWidth={true}
                                required
                                options={[
                                    { value: 'percentage', label: 'Percentage' },
                                    { value: 'fixed', label: 'Fixed Amount' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FFInput
                                name="value"
                                label="Discount Value"
                                type="number"
                                fullWidth={true}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FFInput
                                name="minOrder"
                                label="Minimum Order Amount"
                                type="number"
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FFInput
                                name="totalCoupon"
                                label="Total Coupons Available"
                                type="number"
                                fullWidth={true}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FFInput
                                name="perUserLimit"
                                label="Per User Limit"
                                type="number"
                                fullWidth={true}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isUpdating}
                        sx={{ my: 2 }}
                    >
                        {isUpdating ? 'Updating...' : 'Update Coupon'}
                    </Button>
                </FabricForm>
            )}
        </FFModal>
    );
};

export default EditCouponModal;
