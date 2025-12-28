import React, { useState } from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';

// Dummy order data
const initialOrders = [
    {
        id: 'ORD-001',
        product: 'Cotton Shirt',
        date: '2025-12-20',
        status: 'pending',
    },
    {
        id: 'ORD-002',
        product: 'Denim Jeans',
        date: '2025-12-15',
        status: 'canceled',
    },
    {
        id: 'ORD-003',
        product: 'Silk Scarf',
        date: '2025-12-10',
        status: 'pending',
    },
];

const UserProfileOrder = () => {
    const [orders, setOrders] = useState(initialOrders);

    const handleToggleStatus = (id: string) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id && order.status === 'pending'
                    ? { ...order, status: 'canceled' }
                    : order
            )
        );
    };

    return (
        <Box sx={{ mx: 'auto', mt: 3, bgcolor: '#fff', borderRadius: 2 }}>
            <Typography variant="h6" mb={2}>My Orders</Typography>
            {orders.length === 0 ? (
                <Typography color="text.secondary">No orders found.</Typography>
            ) : (
                orders.map((order) => (
                    <Box key={order.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="subtitle2">Order ID: {order.id}</Typography>
                            <Typography variant="body2">Product: {order.product}</Typography>
                            <Typography variant="body2">Date: {order.date}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
                            <Chip
                                label={order.status === 'pending' ? 'Pending' : 'Canceled'}
                                color={order.status === 'pending' ? 'warning' : 'error'}
                                size="small"
                            />
                            {order.status === 'pending' && (
                                <Button variant="text" color="error" size="small" onClick={() => handleToggleStatus(order.id)}>
                                    Cancel Order
                                </Button>
                            )}
                        </Box>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default UserProfileOrder;