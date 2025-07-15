import { useState, useEffect } from "react";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";

export interface UseProductSearchOptions {
  initialSearch?: string;
  initialCategory?: string;
  initialSort?: string;
  initialMaxPrice?: number;
  initialPage?: number;
  initialSize?: string;
}

export const useProductSearch = ({
  initialSearch = "",
  initialCategory = "",
  initialSort = "",
  initialMaxPrice = 1000000,
  initialPage = 1,
  initialSize = "",
}: UseProductSearchOptions = {}) => {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError: categoriesError,
    error: categoriesErrObj,
  } = useCategoriesQuery("");

  const {
    data: searchedData,
    isLoading: productLoading,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
    size,
  });

  useEffect(() => {
    if (categoriesError) {
      const err = categoriesErrObj as CustomError;
      toast.error(err?.data?.message || "Failed to load categories");
    }
  }, [categoriesError, categoriesErrObj]);

  useEffect(() => {
    if (productIsError) {
      const err = productError as CustomError;
      toast.error(err?.data?.message || "Failed to load products");
    }
  }, [productIsError, productError]);

  const totalPages = searchedData?.totalPage ?? 1;
  const isPrevPage = page > 1;
  const isNextPage = page < totalPages;

  const goToNextPage = () => {
    if (isNextPage) setPage((p) => p + 1);
  };
  const goToPrevPage = () => {
    if (isPrevPage) setPage((p) => p - 1);
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    maxPrice,
    setMaxPrice,
    page,
    setPage,
    size,
    setSize,
    categories: categoriesResponse?.categories || [],
    loadingCategories,
    products: searchedData?.products || [],
    productLoading,
    totalPages,
    isPrevPage,
    isNextPage,
    goToNextPage,
    goToPrevPage,
  };
};
