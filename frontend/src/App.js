import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import Checkout from "./Pages/Checkout";
import Shop from "./Pages/Shop";
import Admin from "./Pages/Admin";
import ProductsContext from "./Store/ProductContext";
import Testing from "./Pages/Testing";
import Product from "./Pages/Product";
import Error from "./Pages/Error";
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import AddProduct from "./Pages/Admin/AddProduct"
import ResetPassword from "./Pages/ResetPassword"
import Confirm from './Pages/ConfirmPassword';
import ChangePassword from './Pages/ChangePassword';
import WelcomeResetPassword from './Pages/WelcomeResetPassword'
function App() {
  return (
    <BrowserRouter>
      <ProductsContext>
        <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path={`/Product/:productID`} element={<Product />} />
          <Route path="/CheckOut" element={<Checkout />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Testing" element={<Testing />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Confirm" element={<Confirm />} />
          <Route path="/ChangePassword/:id" element={<ChangePassword />} />
          <Route path="/Welcome" element={<WelcomeResetPassword />} />
          <Route path="*" element={<Error />} />
          </Routes>
        <Footer />
      </ProductsContext>
    </BrowserRouter>
  );
}

export default App;
