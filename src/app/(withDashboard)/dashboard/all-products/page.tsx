import DashboardTable from "@/components/ui/DashboardPage/AllProducts/Table";

const DashboardAllProductPage = async () => {
  const res = await fetch(
    `https://style-sync-backend.vercel.app/api/v1/products`
  );
  const { data } = await res.json();

  return (
    <div>
      <DashboardTable product={data} />
    </div>
  );
};

export default DashboardAllProductPage;
