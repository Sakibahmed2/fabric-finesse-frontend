"use client";

import { Box, Slider, Stack, Typography } from "@mui/material";

export interface FilterButtonProps {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

export const FilterButton = ({ label, isSelected, onClick }: FilterButtonProps) => (
    <button
        style={{
            padding: '6px 16px',
            border: isSelected ? '2px solid #1976d2' : '1px solid #ccc',
            borderRadius: 4,
            background: isSelected ? '#e3f2fd' : 'white',
            fontWeight: 500,
            fontSize: 15,
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        {label}
    </button>
);

export interface PriceRangeFilterProps {
    priceRange: number[];
    minPrice: number;
    maxPrice: number;
    onChange: (newValue: number[]) => void;
}

export const PriceRangeFilter = ({ priceRange, minPrice, maxPrice, onChange }: PriceRangeFilterProps) => (
    <Box sx={{ mb: 2 }}>
        <Typography fontWeight={600} fontSize={16} mb={1}>PRICE RANGE</Typography>
        <Box px={1}>
            <Slider
                value={priceRange}
                min={minPrice}
                max={maxPrice}
                onChange={(_, newValue) => onChange(newValue as number[])}
                valueLabelDisplay="auto"
                disableSwap
            />
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption">Min: ৳{priceRange[0]}</Typography>
                <Typography variant="caption">Max: ৳{priceRange[1]}</Typography>
            </Stack>
        </Box>
    </Box>
);

export interface CategoryFilterProps {
    categories: Array<{ _id: string; name: string }>;
    selectedCategories: string[];
    onToggle: (categoryId: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategories, onToggle }: CategoryFilterProps) => (
    <Box sx={{ mb: 2 }}>
        <Typography fontWeight={600} fontSize={16} mb={1}>CATEGORY</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((cat) => (
                <FilterButton
                    key={cat._id}
                    label={cat.name}
                    isSelected={selectedCategories.includes(cat._id)}
                    onClick={() => onToggle(cat._id)}
                />
            ))}
        </Box>
    </Box>
);

export interface SizeFilterProps {
    sizes: string[];
    selectedSizes: string[];
    onToggle: (size: string) => void;
}

export const SizeFilter = ({ sizes, selectedSizes, onToggle }: SizeFilterProps) => (
    <Box sx={{ mb: 2 }}>
        <Typography fontWeight={600} fontSize={16} mb={1}>SIZE</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {sizes.map((size) => (
                <FilterButton
                    key={size}
                    label={size}
                    isSelected={selectedSizes.includes(size)}
                    onClick={() => onToggle(size)}
                />
            ))}
        </Box>
    </Box>
);

export interface ColorFilterProps {
    colors: string[];
    selectedColors: string[];
    onToggle: (color: string) => void;
}

export const ColorFilter = ({ colors, selectedColors, onToggle }: ColorFilterProps) => (
    <Box sx={{ mb: 2 }}>
        <Typography fontWeight={600} fontSize={16} mb={1}>COLOR</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {colors.map((color) => (
                <button
                    key={color}
                    style={{
                        padding: '6px 12px',
                        border: selectedColors.includes(color) ? '2px solid #1976d2' : '1px solid #ccc',
                        borderRadius: 4,
                        background: selectedColors.includes(color) ? '#e3f2fd' : 'white',
                        fontWeight: 500,
                        fontSize: 14,
                        cursor: 'pointer',
                        marginBottom: 4,
                    }}
                    onClick={() => onToggle(color)}
                >
                    {color}
                </button>
            ))}
        </Box>
    </Box>
);

export interface ResetFiltersButtonProps {
    onReset: () => void;
}

export const ResetFiltersButton = ({ onReset }: ResetFiltersButtonProps) => (
    <Box sx={{ mb: 2 }}>
        <button
            style={{
                width: '100%',
                padding: '10px 0',
                border: '1px solid #e53935',
                color: '#e53935',
                background: 'white',
                borderRadius: 4,
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
            }}
            onClick={onReset}
        >
            Reset Filters
        </button>
    </Box>
);

export interface FilterHeaderProps {
    title?: string;
}

export const FilterHeader = ({ title = "Filters" }: FilterHeaderProps) => (
    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span style={{ fontSize: 22 }}>🧰</span>
        <Typography fontSize={22} fontWeight={600}>{title}</Typography>
    </Box>
);
