import { useGetUserOrderQuery, useInitPaymentMutation } from '@/redux/api/ordersApi';
import { getUserInfo } from '@/services/authService';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import FFLoading from '../../Loading/FFLoading';
import { useState } from 'react';
import { toast } from 'sonner';

const UserProfileOrder = () => {
    const userInfo = getUserInfo();
    const { data, isLoading } = useGetUserOrderQuery(userInfo?.userId as string);
    const [initPayment] = useInitPaymentMutation();
    const [payingOrderId, setPayingOrderId] = useState<string | null>(null);

    if (isLoading) {
        return <FFLoading />;
    }


    let orderData = data?.data;
    if (!Array.isArray(orderData)) {
        orderData = orderData ? [orderData] : [];
    }

    const getPaymentStatusLabel = (status?: string) => {
        const normalizedStatus = (status || 'unpaid').toLowerCase();

        switch (normalizedStatus) {
            case 'paid':
                return 'Paid';
            case 'failed':
                return 'Failed';
            case 'cancelled':
                return 'Cancelled';
            case 'pending':
                return 'Pending';
            default:
                return 'Unpaid';
        }
    };

    const getPaymentStatusColor = (status?: string) => {
        const normalizedStatus = (status || 'unpaid').toLowerCase();

        if (normalizedStatus === 'paid') return 'success';
        if (normalizedStatus === 'failed' || normalizedStatus === 'cancelled') return 'error';
        return 'warning';
    };

    const canRetryPayment = (status?: string) => {
        const normalizedStatus = (status || 'unpaid').toLowerCase();
        return normalizedStatus !== 'paid';
    };

    const getPaymentActionLabel = (status?: string) => {
        const normalizedStatus = (status || 'unpaid').toLowerCase();
        return normalizedStatus === 'failed' || normalizedStatus === 'cancelled' ? 'Retry Payment' : 'Pay Now';
    };

    const handlePayNow = async (orderId: string) => {
        const toastId = toast.loading('Initializing payment...');
        setPayingOrderId(orderId);

        try {
            const paymentResponse: any = await initPayment(orderId).unwrap();
            const gatewayUrl = paymentResponse?.data?.gatewayUrl;

            if (!paymentResponse?.success || !gatewayUrl) {
                throw new Error(paymentResponse?.message || 'SSLCommerz init failed');
            }

            toast.success('Redirecting to payment gateway...', { id: toastId });
            window.location.href = gatewayUrl;
        } catch (error: any) {
            const message = error?.data?.message || error?.message || 'Unable to initialize payment';
            toast.error(message, { id: toastId });
        } finally {
            setPayingOrderId(null);
        }
    };

    return (
        <Box sx={{ mx: 'auto', mt: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Typography variant="h6" mb={2}>My Orders</Typography>
            {orderData.length === 0 ? (
                <Typography color="text.secondary">No orders found.</Typography>
            ) : (
                orderData?.map((order: any) => (
                    <Box key={order._id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1, bgcolor: '#fafafa', boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                        <Typography variant="subtitle2" mb={1}>Order ID: {order.order_id}</Typography>
                        <Typography variant="body2" mb={1}>Placed: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                        <Typography variant="body2" mb={1}>Status: <Chip label={order.status} color={order.status === 'pending' ? 'warning' : 'success'} size="small" /></Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ xs: 'flex-start', sm: 'center' }} mb={1}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="body2">Payment:</Typography>
                                <Chip
                                    label={getPaymentStatusLabel(order.payment_status)}
                                    color={getPaymentStatusColor(order.payment_status)}
                                    size="small"
                                />
                            </Stack>
                            {canRetryPayment(order.payment_status) && (
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => handlePayNow(order._id)}
                                    disabled={payingOrderId === order._id}
                                >
                                    {payingOrderId === order._id ? 'Redirecting...' : getPaymentActionLabel(order.payment_status)}
                                </Button>
                            )}
                        </Stack>
                        <Typography variant="body2" mb={1}>Address: {order.address}</Typography>
                        <Box sx={{ mt: 1 }}>
                            {order.items.map((item: any, idx: number) => (
                                <Box key={item.product_id?._id || idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, p: 1, bgcolor: '#fafafa', borderRadius: 1 }}>
                                    {item.product_id?.images && item.product_id.images[0] && (
                                        <Image src={item.product_id.images[0]} alt={item.product_id.name} width={50} height={50} style={{ borderRadius: 4, objectFit: 'cover' }} />
                                    )}
                                    <Box>
                                        <Typography fontWeight={500}>{item.product_id?.name || 'Product'}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                            {item.color && <span> | Color: <b style={{ textTransform: 'capitalize' }}>{item.color}</b></span>}
                                            {item.size && <span> | Size: <b style={{ textTransform: 'capitalize' }}>{item.size}</b></span>}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Price: ৳ {item.product_id?.price}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Subtotal: ৳ {order.subtotal}</Typography>
                            <Typography variant="body2">Delivery Fee: ৳ {order.delivery_fee}</Typography>
                            <Typography variant="body2" fontWeight={600}>Total: ৳ {order.total}</Typography>
                        </Box>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default UserProfileOrder;