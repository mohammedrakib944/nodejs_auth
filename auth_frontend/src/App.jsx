import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/Login";
import Products from "../pages/Products";
// import PrivateRoutes from "../utils/PrivateRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route element={<PrivateRoutes />}> */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
