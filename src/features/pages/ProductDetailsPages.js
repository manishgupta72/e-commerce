import React from "react";
import Navbar from "../navbar/Navbar";
import ProductDetails from "../product/component/ProductDetails";

const ProductDetailsPages = () => {
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
    </div>
  );
};

export default ProductDetailsPages;
