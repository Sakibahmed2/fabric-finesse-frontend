"use client";

import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export interface ProductsToolbarProps {
    totalProducts: number;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: () => void;
    sortOrder: string;
    onSortChange: (value: string) => void;
    isMobile?: boolean;
    onFilterClick?: () => void;
}

const ProductsToolbar = ({
    totalProducts,
    searchTerm,
    onSearchChange,
    onSearchSubmit,
    sortOrder,
    onSortChange,
    isMobile = false,
    onFilterClick,
}: ProductsToolbarProps) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearchSubmit();
        }
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
            gap={2}
        >
            <Stack direction="row" alignItems="center" gap={1}>
                {isMobile && onFilterClick && (
                    <IconButton
                        onClick={onFilterClick}
                        sx={{ border: '1px solid #ccc', borderRadius: 1 }}
                    >
                        <FilterAltIcon />
                    </IconButton>
                )}
                <Typography variant="body1" fontWeight={500}>
                    {totalProducts} products found
                </Typography>
            </Stack>

            <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
                {/* Search */}
                <TextField
                    size="small"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{
                        minWidth: 180,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                        }
                    }}
                />

                {/* Sort */}
                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortOrder}
                        label="Sort By"
                        onChange={(e: SelectChangeEvent) => onSortChange(e.target.value)}
                    >
                        <MenuItem value="newest">Newest First</MenuItem>
                        <MenuItem value="oldest">Oldest First</MenuItem>
                        <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                        <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </Stack>
    );
};

export default ProductsToolbar;
