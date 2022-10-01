import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/specific/Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import "./App.less";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/properties" element={<Properties />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
