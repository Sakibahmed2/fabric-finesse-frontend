"use client";

import ClothCard from "@/components/ui/ClothCard";
import FFLoading from "@/components/ui/Loading/FFLoading";
import { useGetAllCategoriesQuery } from "@/redux/api/categoriesApi";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { TProduct } from "@/types/global";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";


const ProductsPage = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 99999]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const params = useSearchParams()

  const category = params.get('category');

  if (category && !selectedCategories.includes(category)) {
    setSelectedCategories([category]);
  }

  // Reset filter handler
  const handleResetFilters = () => {
    setPriceRange([0, 99999]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSearchTerm("");
    setActiveSearch("");
    setSortOrder("newest");
    setPage(1);
  };
  const queryParams: any = {
    category: selectedCategories,
    colors: selectedColors,
    sizes: selectedSizes,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    page,
    limit,
  };
  if (activeSearch) {
    queryParams.search = activeSearch;
    queryParams.searchFields = ["name"];
  }
  if (sortOrder) {
    queryParams.sortBy = "createdAt";
    queryParams.sortOrder = sortOrder === "newest" ? "desc" : "asc";
  }
  const { data: products, error, isLoading } = useGetAllProductsQuery(queryParams);
  const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoriesQuery({})
  const { data: filterProducts } = useGetAllProductsQuery({});

  if (isLoading || categoriesLoading) return <FFLoading />

  const data = products?.data?.result as TProduct[]
  const categories = categoriesData?.data?.result || [];
  const productForFilters = filterProducts?.data?.result as TProduct[]

  // Price range fixed to 0-99999
  const minPrice = 0;
  const maxPrice = 99999;

  const colors = productForFilters?.flatMap(product => product.colors);
  const uniqueColors = Array.from(new Set(colors));

  const sizes = productForFilters?.flatMap(product => product.sizes);
  const uniqueSizes = Array.from(new Set(sizes));


  return (
    <Box sx={{
      mt: 2,
      mb: 10,
      maxWidth: {
        md: '85%',
        xs: '100%'
      },
      mx: 'auto',
      px: {
        md: 0,
        xs: 1
      }
    }}>
      <Stack
        direction={{ md: "row" }}
        gap={5}
      >

        {/* Responsive Filters */}
        {!isMobile && (
          <Box sx={{ width: { md: 270 }, minWidth: 320, height: '100%', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto', position: 'sticky', top: 80, scrollbarWidth: 'none' }}>
            <Box sx={{ bgcolor: '#fafafa', borderRadius: 2, p: 2 }}>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ fontSize: 22 }}>🧰</span>
                <Typography fontSize={22} fontWeight={600}>Filters</Typography>
              </Box>
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
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </button>
              </Box>

              {/* PRICE RANGE Section */}
              <Box sx={{ mb: 2 }}>
                <Typography fontWeight={600} fontSize={16} mb={1}>PRICE RANGE</Typography>
                <Box px={1}>
                  <Slider
                    value={priceRange}
                    min={minPrice}
                    max={maxPrice}
                    onChange={(_, newValue) => setPriceRange(newValue as number[])}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption">Min: ৳{priceRange[0]}</Typography>
                    <Typography variant="caption">Max: ৳{priceRange[1]}</Typography>
                  </Stack>
                </Box>
              </Box>
              {/* CATEGORY Section */}
              <Box sx={{ mb: 2 }}>
                <Typography fontWeight={600} fontSize={16} mb={1}>CATEGORY</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {categories.map((cat: any) => (
                    <button
                      key={cat._id}
                      style={{
                        padding: '6px 16px',
                        border: selectedCategories.includes(cat._id) ? '2px solid #1976d2' : '1px solid #ccc',
                        borderRadius: 4,
                        background: selectedCategories.includes(cat._id) ? '#e3f2fd' : 'white',
                        fontWeight: 500,
                        fontSize: 15,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setSelectedCategories(prev =>
                          prev.includes(cat._id)
                            ? prev.filter(c => c !== cat._id)
                            : [...prev, cat._id]
                        );
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </Box>
              </Box>
              {/* SIZE Section */}
              <Box sx={{ mb: 2 }}>
                <Typography fontWeight={600} fontSize={16} mb={1}>SIZE</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {uniqueSizes.map(size => (
                    <button
                      key={size}
                      style={{
                        padding: '6px 16px',
                        border: selectedSizes.includes(size) ? '2px solid #1976d2' : '1px solid #ccc',
                        borderRadius: 4,
                        background: selectedSizes.includes(size) ? '#e3f2fd' : 'white',
                        fontWeight: 500,
                        fontSize: 15,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setSelectedSizes(prev =>
                          prev.includes(size)
                            ? prev.filter(s => s !== size)
                            : [...prev, size]
                        );
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </Box>
              </Box>
              {/* COLOR Section */}
              <Box sx={{ mb: 2 }}>
                <Typography fontWeight={600} fontSize={16} mb={1}>COLOR</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {uniqueColors.map(color => (
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
                      onClick={() => {
                        setSelectedColors(prev =>
                          prev.includes(color)
                            ? prev.filter(c => c !== color)
                            : [...prev, color]
                        );
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {isMobile && (
          <>

            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}
              PaperProps={{ sx: { width: '100vw', maxWidth: '100vw', bgcolor: '#fafafa' } }}>
              <Box sx={{ width: '100vw', height: '100vh', overflowY: 'auto', p: 2 }}>
                <Stack alignItems={'end'}>
                  <IconButton sx={{
                    mb: -2,
                    mt: -2
                  }}
                    onClick={() => setDrawerOpen(false)}
                  >
                    X
                  </IconButton>
                </Stack>

                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span style={{ fontSize: 22 }}>🧰</span>
                  <Typography fontSize={22} fontWeight={600}>Filters</Typography>
                </Box>
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
                    onClick={handleResetFilters}
                  >
                    Reset Filters
                  </button>
                </Box>
                {/* PRICE RANGE Section */}
                <Box sx={{ mb: 2 }}>
                  <Typography fontWeight={600} fontSize={16} mb={1}>PRICE RANGE</Typography>
                  <Box px={1}>
                    <Slider
                      value={priceRange}
                      min={minPrice}
                      max={maxPrice}
                      onChange={(_, newValue) => setPriceRange(newValue as number[])}
                      valueLabelDisplay="auto"
                      disableSwap
                    />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="caption">Min: ৳{priceRange[0]}</Typography>
                      <Typography variant="caption">Max: ৳{priceRange[1]}</Typography>
                    </Stack>
                  </Box>
                </Box>
                {/* CATEGORY Section */}
                <Box sx={{ mb: 2 }}>
                  <Typography fontWeight={600} fontSize={16} mb={1}>CATEGORY</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {categories.map((cat: any) => (
                      <button
                        key={cat._id}
                        style={{
                          padding: '6px 16px',
                          border: selectedCategories.includes(cat._id) ? '2px solid #1976d2' : '1px solid #ccc',
                          borderRadius: 4,
                          background: selectedCategories.includes(cat._id) ? '#e3f2fd' : 'white',
                          fontWeight: 500,
                          fontSize: 15,
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setSelectedCategories(prev =>
                            prev.includes(cat._id)
                              ? prev.filter(c => c !== cat._id)
                              : [...prev, cat._id]
                          );
                        }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </Box>
                </Box>
                {/* SIZE Section */}
                <Box sx={{ mb: 2 }}>
                  <Typography fontWeight={600} fontSize={16} mb={1}>SIZE</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {uniqueSizes.map(size => (
                      <button
                        key={size}
                        style={{
                          padding: '6px 16px',
                          border: selectedSizes.includes(size) ? '2px solid #1976d2' : '1px solid #ccc',
                          borderRadius: 4,
                          background: selectedSizes.includes(size) ? '#e3f2fd' : 'white',
                          fontWeight: 500,
                          fontSize: 15,
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setSelectedSizes(prev =>
                            prev.includes(size)
                              ? prev.filter(s => s !== size)
                              : [...prev, size]
                          );
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </Box>
                </Box>
                {/* COLOR Section */}
                <Box sx={{ mb: 2 }}>
                  <Typography fontWeight={600} fontSize={16} mb={1}>COLOR</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {uniqueColors.map(color => (
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
                        onClick={() => {
                          setSelectedColors(prev =>
                            prev.includes(color)
                              ? prev.filter(c => c !== color)
                              : [...prev, color]
                          );
                        }}
                      >
                        {color}
                      </button>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Drawer>
          </>
        )}

        {/* Product card */}
        <Box
          mt={{ xs: 4, md: 0 }}
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Box mt={5} >

            {/* Searching and sorting */}
            <Stack direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", sm: "flex-end" }}
              spacing={2}
              maxWidth={"100%"}
            >

              {/* Search Field */}
              <Stack direction="row" spacing={1} sx={{
                flex: 1, maxWidth: {
                  md: '40%', xs: '100%'
                }, alignItems: 'flex-end'
              }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search products"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  size="small"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setActiveSearch(searchTerm);
                    }
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{ minWidth: 40, px: 2, height: '40px' }}
                  onClick={() => setActiveSearch(searchTerm)}
                >
                  Search
                </Button>
              </Stack>


              {/* Sort Field */}
              <Stack direction={"row"} justifyContent={'space-between'}>
                <Box sx={{
                  maxWidth: {
                    md: 200, xs: '40%',
                  },
                }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                      labelId="sort-label"
                      value={sortOrder}
                      label="Sort By"
                      onChange={e => setSortOrder(e.target.value)}
                    >
                      <MenuItem value="newest">Newest</MenuItem>
                      <MenuItem value="oldest">Oldest</MenuItem>
                    </Select>
                  </FormControl>

                </Box>
                {isMobile && (<Button variant="contained" onClick={() => setDrawerOpen(true)}>
                  Filter
                  <FilterAltIcon sx={{ ml: 1 }} />
                </Button>)}
              </Stack>
            </Stack>


            <Typography component="p" sx={{
              textAlign: "end",
              my: 1,
              color: 'text.secondary',
              fontSize: {
                xs: 14, md: 16
              }
            }}>
              Show 1-12 of {data?.length} item(s)
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{ width: "100%" }}
            >
              {data?.map((product: any) => (
                <Grid item xs={6} md={4} lg={3} key={product._id} display="flex" justifyContent="center">
                  <ClothCard key={product._id} product={product} />
                </Grid>
              ))}
              {
                data?.length === 0 && (
                  <Box sx={{ width: '100%', textAlign: 'center', py: 5 }}>
                    <Typography variant="h6">No products found.</Typography>
                  </Box>
                )
              }
            </Grid>
            {/* Pagination */}
            {products?.data?.pagination?.total && products?.data?.pagination?.total > limit && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={Math.ceil(products.data.pagination.total / limit)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    </Box >
  );
}

export default ProductsPage;