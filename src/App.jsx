import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Favorites from "./pages/Favorites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [currentPageNo, setCurrentPageNo] = useState(() => {
    return Number(localStorage.getItem("currentPageNo")) || 1;
  });

  return (
    <>
      <BrowserRouter>
        <Navbar setCurrentPageNo={setCurrentPageNo}/>
        <Routes>
          <Route
            path="/"
            element={<Home search={search} setSearch={setSearch} currentPageNo={currentPageNo} setCurrentPageNo={setCurrentPageNo} />}
          />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
