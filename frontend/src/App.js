import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import {Route,Routes} from "react-router-dom";
import { Home } from "./components/layout/Home";
// import { Product } from "./components/layout/Product";
import { ProductDetails } from "./components/pages/ProductDetails";
import { Products } from "./components/pages/Products";
function App() {
  return (
      // <div className="w-screen">
      //   <Header />
      //   <div className="h-[1px] w-full bg-gray-200 mt-[56px]"></div>
      //   <Routes>
      //     <Route path="/" element={<Home/>} />
      //     <Route path="/product/:id" element={<ProductDetails />} />
      //   </Routes>
      //     <div className="h-[2px] w-full bg-gray-200 ">

      //     </div>
      //   <Footer />
      // </div>
      <div>
        <Header />
        <div className="h-[1px] w-full bg-gray-200 mt-[56px]"></div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
        </Routes>

        <Footer />
      </div>
  );
}

export default App;
