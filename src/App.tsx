import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/api/userAPI";
import ProtectedRoute from "./components/ProtectedRoute";
import { RootState } from "./redux/store";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Checkout = lazy(() => import("./pages/Checkout"));

//Admin routes importing
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Discount = lazy(() => import("./pages/admin/discount"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);
const DiscountManagement = lazy(
  () => import("./pages/admin/management/discountmanagement")
);
const NewDiscount = lazy(() => import("./pages/admin/management/newdiscount"));

const App = () => {
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user && user.uid) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);

  // if (loading) return <Loader />;

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Header user={user} />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={
              // <ProtectedRoute isAuthenticated={user ? false : true}>
              <Login />
              // </ProtectedRoute>
            }
          />
          <Route
          // element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>
          //Admin routes // Rotues
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "user" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/discount" element={<Discount />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />

            <Route path="/admin/discount/new" element={<NewDiscount />} />

            <Route
              path="/admin/discount/:id"
              element={<DiscountManagement />}
            />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
