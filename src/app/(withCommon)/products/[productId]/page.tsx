import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { TProduct } from "@/types/global";
import { Metadata, ResolvingMetadata } from "next";

type TProps = {
  params: {
    productId: string;
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Fetch product data - reusable function
async function getProduct(productId: string): Promise<TProduct | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata(
  { params }: TProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProduct(params.productId);

  if (!product) {
    return {
      title: "Product Not Found | Fabric Finesse",
      description: "The requested product could not be found.",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.name} | Fabric Finesse`,
    description: product.description?.slice(0, 160) || `Shop ${product.name} at Fabric Finesse. Premium quality fabrics at great prices.`,
    keywords: [
      product.name,
      product.category?.name || "fabric",
      "fabric finesse",
      "premium fabric",
      "buy fabric online",
    ].filter(Boolean),
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160) || `Shop ${product.name} at Fabric Finesse`,
      images: product.images?.[0]
        ? [{ url: product.images[0], alt: product.name }, ...previousImages]
        : previousImages,
      type: "website",
      siteName: "Fabric Finesse",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description?.slice(0, 160) || `Shop ${product.name} at Fabric Finesse`,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
    alternates: {
      canonical: `/products/${params.productId}`,
    },
  };
}

export const generateStaticParams = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    const { data } = await res.json();
    return data?.result?.slice(0, 10).map((product: TProduct) => ({
      productId: product._id,
    })) || [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
};

const SingleProductPage = async ({ params }: TProps) => {
  const product = await getProduct(params.productId);

  return (
    <>
      <ProductDetails product={product as any} />
    </>
  );
};

export default SingleProductPage;
