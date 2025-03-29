import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const Linecharts = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        <section>
          <LineChart
            data={[200, 444, 556, 778, 445, 990, 1444, 256, 447, 1000, 1200]}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            backgroundColor="rgb(53, 162, 255, 0.5)"
            labels={months}
          />
          <h2>Active User</h2>
        </section>

        <section>
          <LineChart
            data={[
              2400, 1444, 4556, 6778, 9445, 4990, 14440, 5256, 6447, 1900,
              13300,
            ]}
            label="Products"
            borderColor={"hsl(269, 80%,40%)"}
            backgroundColor={"hsla(269, 80%, 40%,0.4)"}
            labels={months}
          />
          <h2>Total Products (SKU)</h2>
        </section>

        <section>
          <LineChart
            data={[
              2400, 1444, 4556, 6778, 9445, 4990, 14440, 5256, 6447, 1900,
              13300,
            ]}
            label="Revenue"
            borderColor={"hsl(129, 80%,40%)"}
            backgroundColor={"hsla(129, 80%, 40%,0.4)"}
            labels={months}
          />
          <h2>Total Revenue</h2>
        </section>

        <section>
          <LineChart
            data={[
              9600, 1334, 5556, 6678, 6545, 4770, 12230, 4256, 6747, 2300,
              13300,
            ]}
            label="Discount"
            borderColor={"hsl(29, 80%,40%)"}
            backgroundColor={"hsla(29, 80%, 40%,0.4)"}
            labels={months}
          />
          <h2>Discount Allotted</h2>
        </section>
      </main>
    </div>
  );
};

export default Linecharts;
