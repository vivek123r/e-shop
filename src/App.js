import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Clothes from "./pages/screens/Clothes";
import Books from "./pages/screens/Books";
import Electronics from "./pages/screens/Electronics";
import Accessories from "./pages/screens/Accessories";
import Shoes from "./pages/screens/Shoes";
import Toys from "./pages/screens/Toys";

import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          {/* Category Routes */}
          <Route path="clothes" element={<Clothes />} />
          <Route path="books" element={<Books />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="shoes" element={<Shoes />} />
          <Route path="toys" element={<Toys />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
