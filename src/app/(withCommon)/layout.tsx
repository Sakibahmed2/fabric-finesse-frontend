import Footer from "@/components/Sheard/Footer/Footer";
import Navbar from "@/components/Sheard/Navbar/Navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default CommonLayout;
