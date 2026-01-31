import FabricForm from '@/components/Forms/FabricForm';
import FFInput from '@/components/Forms/FFInput';
import FFSelect from '@/components/Forms/FFSelect';
import FFModal from '@/components/Modal/FFModal';
import { useCreateCouponMutation } from '@/redux/api/couponApi';
import { TModalPageProps } from '@/types/global';
import { Button, Grid } from '@mui/material';
import { toast } from 'sonner';

const AddCouponModal = ({ open, setOpen }: TModalPageProps) => {
    const [createCoupon] = useCreateCouponMutation();

    const handleSubmit = async (data: any) => {
        const toastId = toast.loading("Creating coupon...");

        try {
            const payload = {
                code: data.code.trim().toUpperCase(),
                type: data.type,
                value: parseFloat(data.value),
                minOrder: parseFloat(data.minOrder) || 0,
                totalCoupon: parseInt(data.totalCoupon),
                perUserLimit: parseInt(data.perUserLimit) || 1,
            };

            const res = await createCoupon(payload).unwrap();
            if (res?.success) {
                toast.success("Coupon created successfully!", { id: toastId });
                setOpen(false);
            } else {
                toast.error("Failed to create coupon.", { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong!", { id: toastId });
            console.log(err);
        }
    };

    return (
        <FFModal open={open} setOpen={setOpen} title="Add Coupon" maxWidth="md">
            <FabricForm
                onSubmit={handleSubmit}
                defaultValues={{
                    code: '',
                    type: 'percentage',
                    value: '',
                    minOrder: '0',
                    totalCoupon: '',
                    perUserLimit: '1',
                }}
            >
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
                <Button type="submit" fullWidth sx={{ my: 2 }}>
                    Create Coupon
                </Button>
            </FabricForm>
        </FFModal>
    );
};

export default AddCouponModal;
