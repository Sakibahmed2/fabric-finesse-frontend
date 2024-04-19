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
