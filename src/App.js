
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
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
        
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          {/* Clothing Style Categories - Protected */}
          <Route path="clothes" element={<ProtectedRoute><Clothes /></ProtectedRoute>} />
          <Route path="modern" element={<ProtectedRoute><Modern /></ProtectedRoute>} />
          <Route path="classy" element={<ProtectedRoute><Classy /></ProtectedRoute>} />
          <Route path="wedding" element={<ProtectedRoute><Wedding /></ProtectedRoute>} />
          <Route path="casual" element={<ProtectedRoute><Casual /></ProtectedRoute>} />
          <Route path="kids" element={<ProtectedRoute><Kids /></ProtectedRoute>} />
          <Route path="Login" element={<Login />} />
          <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
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
