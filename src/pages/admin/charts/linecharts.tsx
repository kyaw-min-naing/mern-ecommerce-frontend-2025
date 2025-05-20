import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { useLineQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { getLastMonths } from "../../../utils/features";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../../components/Loader";

const { last12Months: months } = getLastMonths();

const Linecharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const userId = user?._id ?? "";

  const skip = !userId;
  const { isLoading, data, isError, error } = useLineQuery(userId, { skip });

  const products = data?.charts.products || [];
  const users = data?.charts.users || [];
  const revenue = data?.charts.revenue || [];
  const discount = data?.charts.discount || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <LineChart
                data={users}
                label="Users"
                borderColor="rgb(53, 162, 255)"
                backgroundColor="rgb(53, 162, 255, 0.5)"
                labels={months}
              />
              <h2>Active User</h2>
            </section>

            <section>
              <LineChart
                data={products}
                label="Products"
                borderColor={"hsl(269, 80%,40%)"}
                backgroundColor={"hsla(269, 80%, 40%,0.4)"}
                labels={months}
              />
              <h2>Total Products (SKU)</h2>
            </section>

            <section>
              <LineChart
                data={revenue}
                label="Revenue"
                borderColor={"hsl(129, 80%,40%)"}
                backgroundColor={"hsla(129, 80%, 40%,0.4)"}
                labels={months}
              />
              <h2>Total Revenue</h2>
            </section>

            <section>
              <LineChart
                data={discount}
                label="Discount"
                borderColor={"hsl(29, 80%,40%)"}
                backgroundColor={"hsla(29, 80%, 40%,0.4)"}
                labels={months}
              />
              <h2>Discount Allotted</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Linecharts;
