import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import {Route,Routes} from "react-router-dom";
import { Home } from "./components/layout/Home";
import { Product } from "./components/layout/Product";
function App() {
  return (
      <>
        <Header />
        <div className="h-[1px] w-full bg-gray-200 mt-[56px]"></div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product" element={<Product />} />
        </Routes>
        <div className="h-[2px] w-full bg-gray-200 "></div>

        <Footer />
      </>
  );
}

export default App;
