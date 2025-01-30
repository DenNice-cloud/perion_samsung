import { Routes, Route, HashRouter } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import NewPage from "./components/pages/NewPage";
import React from "react";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/NewPage"
          element={<NewPage />}
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
