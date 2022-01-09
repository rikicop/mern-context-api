import { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import axios from "axios";
import "./styles.css";
import SingleProduct from "./SingleProduct";
import Filters from "./Filters";
const Home = () => {
  const [productos, setProductos] = useState([]);
  const {
    state,
    prdState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    //será esto(state.products) o productos del usestate
    let sortedProducts = state.products;

    if (sort) {
      //.sort() is a method of Array that sorts the array
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedProducts;
  };
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        /* setProductos(res.data); */
        state.products = res.data;
        setProductos(state.products);
      })
      .catch((err) => console.log(err));
  }, [state]);
  console.log("state.products: ", productos);
  /* setProductos(state.products); */

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
