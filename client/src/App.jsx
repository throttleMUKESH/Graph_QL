import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundePage from "./pages/NotFoundePage";

// components
import Header from "./components/Header";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Header> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/transaction/:id" element={<TransactionPage />} />
          <Route path="*" element={<NotFoundePage />} />
        </Routes>
      {/* </Header> */}
    </>
  );
}

export default App;
