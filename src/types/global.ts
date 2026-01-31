import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  category: {
    _id: string;
    name: string;
  };
  price: number;
  discountPrice?: number;
  description: string;
  images: string[];
  stock: number;
  colors: string[];
  sizes: string[];
};

export type TUserInfo = {
  email: string;
  exp?: number;
  iat?: number;
  role: string;
  userId: string;
};

export type TSidebarItems = {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: TSidebarItems[];
};

type TError = FetchBaseQueryError | SerializedError;

type TResponseData = {
  acknowledged: boolean;
  insertedId: string;
};

export type TResponse = {
  data?: {
    data: TResponseData;
    message: string;
    success: boolean;
  };
  error?: TError;
};

export type TModalPageProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type TCoupon = {
  _id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder: number;
  totalCoupon: number;
  perUserLimit: number;
  redemptions: Array<{
    user: string;
    usedAt: Date;
  }>;
  createdAt: string;
  updatedAt: string;
};
