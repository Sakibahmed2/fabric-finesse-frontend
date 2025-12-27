
import Footer from "@/components/Sheard/Footer/Footer";
import Navbar from "@/components/Sheard/Navbar/Navbar";
import { Badge, Box, IconButton, Drawer, useMediaQuery } from "@mui/material";
import { ReactNode, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "@/components/ui/CartModal";


const CommonLayout = ({ children }: { children: ReactNode }) => {


  return (
    <>
      <Navbar />
      {children}

      <CartModal />

      <Footer />
    </>
  );
};

export default CommonLayout;
