import { useGetUserOrderQuery } from '@/redux/api/ordersApi';
import { getUserInfo } from '@/services/authService';
import { Box, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import FFLoading from '../../Loading/FFLoading';

const UserProfileOrder = () => {
    const userInfo = getUserInfo();
    const { data, isLoading } = useGetUserOrderQuery(userInfo?.userId as string);

    if (isLoading) {
        return <FFLoading />;
    }


    let orderData = data?.data;
    if (!Array.isArray(orderData)) {
        orderData = orderData ? [orderData] : [];
    }

    return (
        <Box sx={{ mx: 'auto', mt: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Typography variant="h6" mb={2}>My Orders</Typography>
            {orderData.length === 0 ? (
                <Typography color="text.secondary">No orders found.</Typography>
            ) : (
                orderData?.map((order: any) => (
                    <Box key={order._id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                        <Typography variant="subtitle2" mb={1}>Order ID: {order.order_id}</Typography>
                        <Typography variant="body2" mb={1}>Placed: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                        <Typography variant="body2" mb={1}>Status: <Chip label={order.status} color={order.status === 'pending' ? 'warning' : 'success'} size="small" /></Typography>
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