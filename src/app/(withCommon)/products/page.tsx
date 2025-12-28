"use client";

import ClothCard from "@/components/ui/ClothCard";
import FFLoading from "@/components/ui/Loading/FFLoading";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { TProduct } from "@/types/global";
import {
  Box,
  Checkbox,
  Container,
  Grid,
  Stack,
  Typography,
  Drawer,
  Button,
  useMediaQuery,
  IconButton
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useState } from "react";

const ProductsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: products, error, isLoading } = useGetAllProductsQuery({})

  if (isLoading) return <FFLoading />

  const data = products?.data as TProduct[]

  console.log({ data })

  return (
    <Box my={10}>
      <Container sx={{
        maxWidth: '1800px'
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
                    onClick={() => {/* Add reset logic here */ }}
                  >
                    Reset Filters
                  </button>
                </Box>
                {/* SIZE Section */}
                <Box sx={{ mb: 2 }}>
                  <Typography fontWeight={600} fontSize={16} mb={1}>SIZE</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['28', '30', '32', '34', '36', 'L', 'M', 'XL', 'XXL'].map(size => (
                      <button
                        key={size}
                        style={{
                          padding: '6px 16px',
                          border: '1px solid #ccc',
                          borderRadius: 4,
                          background: 'white',
                          fontWeight: 500,
                          fontSize: 15,
                          cursor: 'pointer',
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
                    {['Ash', 'Beige', 'Black', 'Burgundy', 'Charcoal', 'Charcoal Gray', 'Cream', 'Dark Blue', 'Dark Brown', 'Deep Blue', 'Gray', 'Green/White', 'Grey', 'Grey Heather', 'Jet Black', 'Light Blue'].map(color => (
                      <button
                        key={color}
                        style={{
                          padding: '6px 12px',
                          border: '1px solid #ccc',
                          borderRadius: 4,
                          background: 'white',
                          fontWeight: 500,
                          fontSize: 14,
                          cursor: 'pointer',
                          marginBottom: 4,
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

              <Button variant="contained" sx={{ mb: 2 }} onClick={() => setDrawerOpen(true)}>
                Filter
              </Button>
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
                      onClick={() => {/* Add reset logic here */ }}
                    >
                      Reset Filters
                    </button>
                  </Box>
                  {/* SIZE Section */}
                  <Box sx={{ mb: 2 }}>
                    <Typography fontWeight={600} fontSize={16} mb={1}>SIZE</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {['28', '30', '32', '34', '36', 'L', 'M', 'XL', 'XXL'].map(size => (
                        <button
                          key={size}
                          style={{
                            padding: '6px 16px',
                            border: '1px solid #ccc',
                            borderRadius: 4,
                            background: 'white',
                            fontWeight: 500,
                            fontSize: 15,
                            cursor: 'pointer',
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
                      {['Ash', 'Beige', 'Black', 'Burgundy', 'Charcoal', 'Charcoal Gray', 'Cream', 'Dark Blue', 'Dark Brown', 'Deep Blue', 'Gray', 'Green/White', 'Grey', 'Grey Heather', 'Jet Black', 'Light Blue'].map(color => (
                        <button
                          key={color}
                          style={{
                            padding: '6px 12px',
                            border: '1px solid #ccc',
                            borderRadius: 4,
                            background: 'white',
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: 'pointer',
                            marginBottom: 4,
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
            mt={{
              xs: 4,
              md: 0,
            }}
          >
            <Typography variant="h4" component="h1" fontWeight={600}>
              Our Collection Of Products
            </Typography>
            <Typography component="p" fontWeight={600} mt={2}>
              Show 1-12 of {data?.length} item(s)
            </Typography>
            <Typography
              component="p"
              width={{ md: "70%" }}
              mt={{ xs: 4, md: 0 }}
              sx={{ flex: 1 }}
            >
              A flash sale is a brief, high-energy promotion offering steep discounts on select items for a limited time. Its a rapid-fire shopping spree, enticing consumers with fleeting bargains and a sense of urgency.
            </Typography>
            <Box mt={5}>
              {/* <div className="grid md:grid-cols-3 gap-10 ">
               
              </div> */}

              <Grid container spacing={2}>
                {data?.map((product: TProduct) => (
                  <Grid item xs={6} md={4} key={product._id}>
                    <ClothCard key={product._id} product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductsPage;
