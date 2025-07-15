import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/Loader";
import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../../redux/store";
import { RootState } from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useFetchData } from "6pp";
import { SingleDiscountResponse } from "../../../types/api-types";

const DiscountManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading: isLoading,
    data,
    error,
  } = useFetchData<SingleDiscountResponse>({
    url: `${server}/api/v1/payment/coupon/${id}?id=${user?._id}`,
    dependencyProps: user?._id ? [user?._id] : [],
  });

  if (error) {
    toast.error(error);
  }

  const [btnLoading, setBtnLoading] = useState(false);

  const [code, setCode] = useState("");
  const [amount, setAmount] = useState(0);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBtnLoading(true);

    try {
      const { data } = await axios.put(
        `${server}/api/v1/payment/coupon/${id}?id=${user?._id}`,
        {
          code,
          amount: amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setCode("");
        setAmount(0);
        navigate("/admin/discount");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setCode(data.coupon.code);
      setAmount(data.coupon.amount);
    }
  }, [data]);

  const deleteHandler = async () => {
    setBtnLoading(true);

    try {
      const { data } = await axios.delete(
        `${server}/api/v1/payment/coupon/${id}?id=${user?._id}`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/admin/discount");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Code</label>
                  <input
                    required
                    type="text"
                    placeholder="Coupon Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>

                <div>
                  <label>Price</label>
                  <input
                    required
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>

                <button disabled={btnLoading} type="submit">
                  Update
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default DiscountManagement;
