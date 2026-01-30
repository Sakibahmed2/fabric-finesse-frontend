"use client";

import { useGetAllCategoriesQuery } from "@/redux/api/categoriesApi";
import { Box, Container, Stack, Typography } from "@mui/material";
import FFLoading from "../../Loading/FFLoading";
import Link from "next/link";

const TopCategories = () => {

  const { data, isLoading } = useGetAllCategoriesQuery({})

  if (isLoading) return <FFLoading />

  const categories = (data?.data?.result || []).slice(0, 12);

  return (

    <Container>
      <Stack direction={"column"} sx={{
        mt: 10
      }}>

        <Box
          sx={{
            overflow: "hidden",
          }}
        >
          <Container>
            <Stack direction={"column"}>
              <Box textAlign={"center"}>
                <Typography variant="h4" component="h1" fontWeight={600}>
                  Top Categories
                </Typography>
                <Typography
                  component="p"
                  width={{
                    md: 700,
                  }}
                  margin={"0 auto"}
                >
                  Discover Fashion Essentials: Dive into our top categories and
                  explore essential pieces that define your wardrobe. From versatile
                  basics to statement pieces.
                </Typography>
              </Box>
              {/* Show top 12 categories in a responsive grid */}
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4 mt-6 items-center">
                {
                  categories.map((category: any) => (
                    <Link href={`/products/?category=${category._id}`} key={category._id} className="border border-gray-300 px-2 py-1 lg:px-4 lg:py-2 rounded-[2px] cursor-pointer bg-[#1B9C85]/10 hover:bg-[#1B9C85] transition duration-300 hover:text-white text-center text-sm lg:text-lg">
                      {category.name}
                    </Link>
                  ))
                }
              </div>
            </Stack>
          </Container>
        </Box>

      </Stack>
    </Container>

  );
};

export default TopCategories;
