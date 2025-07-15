import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { GrPrevious } from "react-icons/gr";

const sizes = ["S", "M", "L", "XL", "XXL"];

type FilterProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
  loadingCategories: boolean;
};

const Filter: React.FC<FilterProps> = ({
  category,
  setCategory,
  sort,
  setSort,
  maxPrice,
  setMaxPrice,
  size,
  setSize,
  categories,
  loadingCategories,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <BiMenuAltLeft />
        </button>
      )}
      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "70vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <h2>
          FILTER{" "}
          {phoneActive && (
            <button id="close-sidebar" onClick={() => setShowModal(false)}>
              <GrPrevious />
            </button>
          )}
        </h2>

        <div className="filter-group">
          <h4>Size</h4>
          <div className="size-options">
            {sizes.map((s) => (
              <button
                key={s}
                className={size === s ? "active" : ""}
                onClick={() => setSize(size === s ? "" : s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div className="filter-group">
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {!loadingCategories &&
              categories.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
        </div>

        <div className="filter-group">
          <h4>Price Range</h4>
          <p>Max Price: {maxPrice || ""}</p>
          <input
            type="range"
            min={5000}
            max={1000000}
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
            }}
          />
        </div>
      </aside>
    </>
  );
};

export default Filter;
