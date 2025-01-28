import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import NewPage from "./components/NewPage";

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
