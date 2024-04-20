"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Rating, Stack, Typography } from "@mui/material";
import { TProduct } from "@/types/global";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DashboardTable = ({ product }: { product: TProduct[] }) => {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((item, index) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{item.title}</StyledTableCell>
                <StyledTableCell align="left">
                  {item.sale ? (
                    <Stack direction={"row"} gap={1}>
                      <Typography
                        fontWeight={600}
                        sx={{
                          textDecoration: "line-through",
                          color: "red",
                        }}
                      >
                        ৳ {item.price}{" "}
                      </Typography>
                      <Typography fontWeight={600}>
                        ৳ {item.salePrice}{" "}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography fontWeight={600}>৳ {item.price}</Typography>
                  )}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Rating name="read-only" value={item.rating} readOnly />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashboardTable;
