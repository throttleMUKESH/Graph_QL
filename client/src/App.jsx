
import { Routes, Route, Navigate } from "react-router-dom";
import { GET_AUTHENTICATED_USER } from "./GraphQL/queries/user.query";

import "./App.css";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundePage from "./pages/NotFoundePage";

// components
import Header from "./components/Header";
import { useQuery } from "@apollo/client";


function App() {
const authUser = true;
const {loading, data, error} = useQuery(GET_AUTHENTICATED_USER);
console.log("Authenticated User:", data)
console.log("laoding:", loading);
console.log("error:", error);

  return (
    <>
       {data?.authUser && <Header/>}
        <Routes>
          <Route path="/" element={data.authUser ? <HomePage /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!data.authUser ? <LoginPage/> : <Navigate to="/"/>} />
          <Route path="/signup" element={!data.authUser ? <SignUpPage />: <Navigate to="/"/>} />
          <Route path="/transaction/:id" element={<TransactionPage />} />
          <Route path="*" element={<NotFoundePage />} />
        </Routes>
      
    </>
  );
}

export default App;
