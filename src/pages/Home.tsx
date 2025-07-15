import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { CiSearch } from "react-icons/ci";
import { useProductSearch } from "../hooks/useProductSearch";
import preview1 from "../assets/images/am9.jpg";
import preview2 from "../assets/images/shoe2.jpg";
import preview3 from "../assets/images/wm6.jpg";
import preview4 from "../assets/images/am14.jpg";
import preview5 from "../assets/images/sut6.jpg";
import preview6 from "../assets/images/wm7.jpg";
import preview7 from "../assets/images/shrt2.jpg";
import { MdDoubleArrow, MdExpandMore } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();

  const {
    data: latestData,
    isLoading: latestLoading,
    isError: latestError,
  } = useLatestProductQuery("");

  const {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    categories,
    loadingCategories,
    products: searchedProducts,
    productLoading: searchLoading,
  } = useProductSearch({
    initialSearch: "",
    initialCategory: "",
    initialSort: "",
  });

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} is Added to cart`);
  };

  if (latestError) toast.error("Cannot fetch latest products");

  return (
    <div className="home">
      <div className="home-category">
        <h2>CATEGORY</h2>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          {!loadingCategories &&
            categories.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
        </select>
      </div>

      <div className="home-search">
        <CiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <section></section>

      <div className="hero">
        <div className="hero-images">
          <div className="hero-div">
            <h3>
              New <br />
              Collection
              <br />{" "}
              <span>
                Summmer <br />
                2025
              </span>
            </h3>
            <br />
            <Link to="/search" className="shop-btn">
              Go To Shop <MdDoubleArrow className="sp-icon" />
            </Link>
          </div>
          <img src={preview1} alt="Model 1" />
          <img src={preview2} alt="Model 2" />
          <img src={preview3} alt="Model 3" />
        </div>
      </div>

      <h3 className="this-week-title">
        New This Week
        <Link to="/search" className="findmore">
          See More <MdDoubleArrow className="SM-arr" />
        </Link>
      </h3>

      <div className="main-products">
        {latestLoading ? (
          <Skeleton width="80vw" />
        ) : latestData!.products.length > 0 ? (
          latestData?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photos={i.photos}
            />
          ))
        ) : (
          <p>No latest products found</p>
        )}
      </div>

      <div className="xiv-collections">
        <div className="xiv-header">
          <h3>
            BLANCO Collections <br /> 24-25
          </h3>

          <div className="xiv-actions">
            <div className="sorts">
              Sorts(-)
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Default</option>
                <option value="asc">Price (Low to High)</option>
                <option value="dsc">Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="xiv-categories">
          {["", "outfit", "shirt", "shoes", "belt"].map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat === "" ? "(ALL)" : cat}
            </button>
          ))}
        </div>
        <div className="main-products">
          {searchLoading ? (
            <Skeleton width="80vw" />
          ) : searchedProducts.length > 0 ? (
            searchedProducts
              .slice(0, 6)
              .map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photos={i.photos}
                />
              ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        <Link to="/search" className="more-btn">
          More <br />
          <MdExpandMore className="more-btn-icon" />
        </Link>
      </div>

      <div className="approach">
        <h3>Our Approach to Fashion Desing</h3>
        <p>
          At Elegant Vogue, we blend creativity with craftsmanship to create
          fashion that transcends trends and stands the test of time. Each
          design is meticulously crafted, ensuring the highest quality and
          exquisite finish.
        </p>
        <div className="approach-gallery">
          <img src={preview4} alt="Gallery" />
          <img src={preview5} alt="Gallery" className="sec-img" />
          <img src={preview6} alt="Gallery" />
          <img src={preview7} alt="Gallery" className="fot-img" />
        </div>
      </div>

      <footer className="footer">
        <div className="left">
          <p>Pricing</p>
          <p>About</p>
          <p>Contacts</p>
        </div>
        <div className="center">
          <h4>BLANCO QR</h4>
          <p>Neo-fluid communication™</p>
        </div>
        <div className="right">
          <p>ENG | MM</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
