import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import macbook from "../assets/images/macbook-2.jpg";

const Home = () => {
  const addToCartHandler = () => {};
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        <ProductCard
          productId="kfkkfk"
          name="Macbook"
          price={1299}
          stock={435}
          handler={addToCartHandler}
          photo={macbook}
        />
      </main>
    </div>
  );
};

export default Home;
