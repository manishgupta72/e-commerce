import React from "react";
import Navbar from "../navbar/Navbar";
import ProductList from "../product/component/ProductList";


const Home = () => {
  return <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
  </div>;
};

export default Home;
