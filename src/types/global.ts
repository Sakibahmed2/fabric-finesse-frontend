import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TProduct = {
  _id?: string;
  image: string;
  title: string;
  rating: number;
  price: number;
  brand: string;
  description: string;
  sale?: boolean;
  salePrice?: number | null;
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
