import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { TProduct } from "@/types/global";

type TProps = {
  params: {
    productId: string;
  };
};

export const generateStaticParams = async () => {
  const res = await fetch(
    "http://localhost:5000/api/v1/products"
  );
  const { data } = await res.json();
  return data?.result?.slice(0, 10).map((product: TProduct) => ({
    productId: product._id,
  }));
};

const SingleProductPage = async ({ params }: TProps) => {
  const res = await fetch(
    `http://localhost:5000/api/v1/products/${params.productId}`,
    {
      cache: "no-store",
    }
  );
  const { data } = await res.json();


  return (
    <>
      <ProductDetails product={data} />
    </>
  );
};

export default SingleProductPage;
