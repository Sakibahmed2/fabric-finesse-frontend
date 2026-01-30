"use client";

import { Box } from "@mui/material";
import {
    FilterHeader,
    ResetFiltersButton,
    PriceRangeFilter,
    CategoryFilter,
    SizeFilter,
    ColorFilter,
} from "./FilterComponents";

export interface ProductFiltersProps {
    priceRange: number[];
    onPriceRangeChange: (newValue: number[]) => void;
    minPrice?: number;
    maxPrice?: number;
    categories: Array<{ _id: string; name: string }>;
    selectedCategories: string[];
    onCategoryToggle: (categoryId: string) => void;
    sizes: string[];
    selectedSizes: string[];
    onSizeToggle: (size: string) => void;
    colors: string[];
    selectedColors: string[];
    onColorToggle: (color: string) => void;
    onResetFilters: () => void;
}

const ProductFiltersSidebar = ({
    priceRange,
    onPriceRangeChange,
    minPrice = 0,
    maxPrice = 99999,
    categories,
    selectedCategories,
    onCategoryToggle,
    sizes,
    selectedSizes,
    onSizeToggle,
    colors,
    selectedColors,
    onColorToggle,
    onResetFilters,
}: ProductFiltersProps) => {
    return (
        <Box sx={{ bgcolor: '#fafafa', borderRadius: 2, p: 2 }}>
            <FilterHeader />

            <ResetFiltersButton onReset={onResetFilters} />

            <PriceRangeFilter
                priceRange={priceRange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onChange={onPriceRangeChange}
            />

            <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onToggle={onCategoryToggle}
            />

            <SizeFilter
                sizes={sizes}
                selectedSizes={selectedSizes}
                onToggle={onSizeToggle}
            />

            <ColorFilter
                colors={colors}
                selectedColors={selectedColors}
                onToggle={onColorToggle}
            />
        </Box>
    );
};

export default ProductFiltersSidebar;
