import { useRating } from "6pp";
import { FaRegStar, FaStar } from "react-icons/fa";

const RatingsComponent = ({ value = 0 }: { value: number }) => {
  const { Ratings } = useRating({
    IconFilled: <FaStar />,
    IconOutline: <FaRegStar />,
    value,
    styles: {
      fontSize: "1.7rem",
      color: "#f0c14b",
      justifyContent: "flex-start",
    },
  });

  return <Ratings />;
};

export default RatingsComponent;
