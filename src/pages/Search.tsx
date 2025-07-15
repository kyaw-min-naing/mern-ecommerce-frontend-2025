import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { useProductSearch } from "../hooks/useProductSearch";
import { CiSearch } from "react-icons/ci";
import Filter from "../components/Filter";

const Search = () => {
  const {
    category,
    setCategory,
    sort,
    setSort,
    maxPrice,
    setMaxPrice,
    size,
    setSize,
    search,
    setSearch,
    products,
    productLoading,
    page,
    isPrevPage,
    isNextPage,
    goToNextPage,
    goToPrevPage,
    categories,
    loadingCategories,
  } = useProductSearch({
    initialSearch: "",
    initialCategory: "",
    initialSort: "",
    initialMaxPrice: 1000000,
    initialPage: 1,
    initialSize: "",
  });

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} is Added to cart`);
  };

  return (
    <div className="product-container">
      <Filter
        size={size}
        setSize={setSize}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        categories={categories}
        loadingCategories={loadingCategories}
      />
      <div className="product-search-page">
        <main>
          <h1>Products</h1>

          <div className="search-sort">
            <div className="search-input">
              <CiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="search-product-list">
            {productLoading ? (
              <Skeleton length={10} />
            ) : (
              products.map((i) => (
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
            )}
          </div>
          <article className="table-pagination">
            <button disabled={!isPrevPage} onClick={goToPrevPage}>
              Prev
            </button>
            <span>Page {page}</span>
            <button disabled={!isNextPage} onClick={goToNextPage}>
              Next
            </button>
          </article>

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
        </main>
      </div>
    </div>
  );
};

export default Search;
