import { FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";
import { useFileHandler } from "6pp";

const Newproduct = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(5000);
  const [stock, setStock] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const photos = useFileHandler("multiple", 10, 5);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!name || !price || stock < 0 || !category) {
        console.log("Missing required fields!");
        return;
      }

      if (!photos.file || photos.file.length === 0) return;

      const formData = new FormData();

      formData.set("name", name);
      formData.set("description", description);
      formData.set("price", price.toString());
      formData.set("stock", stock.toString());
      formData.set("category", category);

      photos.file.forEach((file) => {
        formData.append("photos", file);
      });

      const res = await newProduct({ id: user!._id!, formData });
      console.log("API response:", res);

      responseToast(res, navigate, "/admin/product");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                required
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input
                required
                type="file"
                multiple
                onChange={photos.changeHandler}
                accept="image/*"
              />
            </div>

            {photos.error && <p>{photos.error}</p>}

            {photos.preview &&
              photos.preview.map((img, i) => (
                <img key={i} src={img} alt={`Preview ${i + 1}`} />
              ))}

            <button disabled={isLoading} type="submit">
              Create
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Newproduct;
