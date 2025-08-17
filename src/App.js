
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Clothes from "./pages/screens/Clothes";
import Modern from "./pages/screens/Modern";
import Classy from "./pages/screens/Classy";
import Wedding from "./pages/screens/Wedding";
import Casual from "./pages/screens/Casual";
import Kids from "./pages/screens/Kids";
import Cart from "./pages/screens/cart";
import Tailers from "./pages/screens/Tailers";
import Login from "./pages/screens/login";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import AuthDebug from "./components/AuthDebug";
import './App.css';
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AuthDebug />
          <Routes>
            <Route path="/" element={<Layout />}>
        
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          {/* Clothing Style Categories - Protected */}
          <Route path="clothes" element={<Clothes />} />
          <Route path="modern" element={<Modern />} />
          <Route path="classy" element={<Classy />} />
          <Route path="wedding" element={<Wedding />} />
          <Route path="casual" element={<Casual />} />
          <Route path="kids" element={<Kids />} />
          <Route path="Login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="tailers" element={<Tailers />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  )
}
export default App;
