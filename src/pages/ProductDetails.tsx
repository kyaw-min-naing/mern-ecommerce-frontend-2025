import { Navigate, useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { Skeleton } from "../components/Loader";
import { MyntraCarousel, Slider, CarouselButtonType } from "6pp";
import { useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import RatingsComponent from "../components/Ratings";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";

const ProductDetails = () => {
  const params = useParams();
  console.log(params);

  const { isLoading, isError, data } = useProductDetailsQuery(params.id!);

  console.log(data);

  const [carouselOpen, setCarouselOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const increment = () => {
    if (data!.product.stock < quantity + 1)
      return toast.error(`${data!.product.stock} available only`);
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    if (cartItem.quantity > cartItem.stock)
      return toast.error("Quantity exceeds stock");
    dispatch(addToCart(cartItem));
    toast.success(`${cartItem.name} is Added to cart`);
  };

  if (isError) return <Navigate to="/not-found" replace />;

  return (
    <div className="product-details">
      {isLoading ? (
        <ProductLoader />
      ) : (
        <>
          <main>
            <section className="product-image">
              {!isMobile && (
                <>
                  <Slider
                    showThumbnails
                    showNav={false}
                    onClick={() => setCarouselOpen(true)}
                    images={data?.product.photos.map((i) => i.url) || []}
                  />
                  {carouselOpen && (
                    <MyntraCarousel
                      NextButton={NextButton}
                      PrevButton={PrevButton}
                      setIsOpen={setCarouselOpen}
                      images={data?.product.photos.map((i) => i.url) || []}
                    />
                  )}
                </>
              )}
              {isMobile && (
                <img
                  src={data?.product.photos[0].url}
                  alt={data?.product.name}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
            </section>

            <section className="product-details-info">
              <h1>{data?.product?.name}</h1>
              <code>{data?.product?.category}</code>
              <RatingsComponent value={data?.product?.ratings || 0} />
              <h3>${data?.product?.price}</h3>
              <article>
                <div>
                  <button onClick={decrement}>-</button>
                  <span>{quantity}</span>
                  <button onClick={increment}>+</button>
                </div>
                <button
                  onClick={() =>
                    addToCartHandler({
                      productId: data!.product._id,
                      name: data!.product.name,
                      price: data!.product.price,
                      photo: data?.product.photos[0].url || "",
                      stock: data!.product.stock,
                      quantity,
                    })
                  }
                >
                  Add to Cart
                </button>
              </article>
              <p>{data?.product?.description}</p>
            </section>
          </main>
        </>
      )}
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

const ProductLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        border: "1px solid #f1f1f1",
        height: "80vh",
      }}
    >
      <section style={{ width: "100%", height: "100%" }}>
        <Skeleton
          width="100%"
          containerHeight="100%"
          height="100%"
          length={1}
        />
      </section>

      <section
        style={{
          width: "100%",
          // border: "1px solid blue",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          padding: "2rem",
        }}
      >
        <Skeleton width="100%" length={3} />
        <Skeleton width="100%" length={4} />
        <Skeleton width="100%" length={4} />
      </section>
    </div>
  );
};

const NextButton: CarouselButtonType = ({ onClick }) => (
  <button className="prev-next-button" onClick={onClick}>
    <FaArrowRightLong />
  </button>
);

const PrevButton: CarouselButtonType = ({ onClick }) => (
  <button className="prev-next-button" onClick={onClick}>
    <FaArrowLeftLong />
  </button>
);

export default ProductDetails;
