
import Footer from "@/components/Sheard/Footer/Footer";
import NewNav from "@/components/Sheard/NavV2/NewNav";
import CartModal from "@/components/ui/CartModal";
import { ReactNode } from "react";


const CommonLayout = ({ children }: { children: ReactNode }) => {


  return (
    <>
      {/* <Navbar /> */}

      <NewNav />

      {children}

      <CartModal />

      <Footer />
    </>
  );
};

export default CommonLayout;
