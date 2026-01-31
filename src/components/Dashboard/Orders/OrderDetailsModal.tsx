import FFModal from '@/components/Modal/FFModal';
import { TModalPageProps } from '@/types/global';
import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

type TOrderItem = {
    _id: string;
    product_id: {
        _id: string;
        name: string;
        price: number;
        images: string[];
    };
    quantity: number;
    color?: string;
    size?: string;
};

type TOrder = {
    _id: string;
    order_id: string;
    user_id: {
        _id: string;
        name: string;
        email: string;
    };
    items: TOrderItem[];
    subtotal: number;
    delivery_fee: number;
    discount?: number;
    coupon_code?: string;
    total: number;
    status: string;
    address: string;
    createdAt: string;
    updatedAt: string;
};

interface OrderDetailsModalProps extends TModalPageProps {
    order: TOrder | null;
}

const OrderDetailsModal = ({ open, setOpen, order }: OrderDetailsModalProps) => {
    if (!order) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'confirmed':
                return 'info';
            case 'delivered':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <FFModal open={open} setOpen={setOpen} title="Order Details" maxWidth="lg" fullWidth>
            <Box>
                {/* Order Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Box>
                        <Typography variant="h6" fontWeight={600}>
                            {order.order_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                            <CalendarTodayIcon fontSize="small" />
                            {formatDate(order.createdAt)}
                        </Typography>
                    </Box>
                    <Chip
                        label={order.status.toUpperCase()}
                        color={getStatusColor(order.status)}
                        sx={{ fontWeight: 600 }}
                    />
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {/* Customer Information */}
                <Box mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon /> Customer Information
                    </Typography>
                    <Box sx={{ pl: 4 }}>
                        <Typography variant="body2" mb={0.5}>
                            <strong>Name:</strong> {order.user_id?.name || 'N/A'}
                        </Typography>
                        <Typography variant="body2" mb={0.5}>
                            <strong>Email:</strong> {order.user_id?.email || 'N/A'}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Delivery Address */}
                <Box mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon /> Delivery Address
                    </Typography>
                    <Box sx={{ pl: 4 }}>
                        <Typography variant="body2">{order.address}</Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Order Items */}
                <Box mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalShippingIcon /> Order Items
                    </Typography>
                    <Stack spacing={2}>
                        {order.items.map((item, index) => (
                            <Box
                                key={item._id || index}
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    p: 2,
                                    bgcolor: '#f5f5f5',
                                    borderRadius: 1,
                                }}
                            >
                                {item.product_id?.images?.[0] && (
                                    <Image
                                        src={item.product_id.images[0]}
                                        width={60}
                                        height={60}
                                        alt={item.product_id.name}
                                        style={{ borderRadius: 4, objectFit: 'cover' }}
                                    />
                                )}
                                <Box sx={{ flex: 1 }}>
                                    <Typography fontWeight={600} mb={0.5}>
                                        {item.product_id?.name || 'Product'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                                        Quantity: {item.quantity}
                                    </Typography>
                                    {(item.color || item.size) && (
                                        <Typography variant="body2" color="text.secondary">
                                            {item.color && (
                                                <span>
                                                    Color: <b style={{ textTransform: 'capitalize' }}>{item.color}</b>
                                                </span>
                                            )}
                                            {item.color && item.size && <span> | </span>}
                                            {item.size && (
                                                <span>
                                                    Size: <b style={{ textTransform: 'capitalize' }}>{item.size}</b>
                                                </span>
                                            )}
                                        </Typography>
                                    )}
                                </Box>
                                <Box>
                                    <Typography fontWeight={600}>
                                        ৳ {((item.product_id?.price || 0) * item.quantity).toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Order Summary */}
                <Box>
                    <Typography variant="subtitle1" fontWeight={600} mb={2}>
                        Order Summary
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">Subtotal:</Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    ৳ {order.subtotal?.toFixed(2) || '0.00'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">Delivery Fee:</Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    ৳ {order.delivery_fee?.toFixed(2) || '0.00'}
                                </Typography>
                            </Box>
                            {order.discount && order.discount > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'success.main' }}>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <LocalOfferIcon fontSize="small" />
                                        Discount {order.coupon_code && `(${order.coupon_code})`}:
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        - ৳ {order.discount.toFixed(2)}
                                    </Typography>
                                </Box>
                            )}
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
                                <Typography variant="h6" fontWeight={700}>
                                    Total:
                                </Typography>
                                <Typography variant="h6" fontWeight={700} color="primary">
                                    ৳ {order.total.toFixed(2) || '0.00'}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </FFModal>
    );
};

export default OrderDetailsModal;
