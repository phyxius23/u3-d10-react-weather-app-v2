import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import DailyForecast from "./components/DailyForecast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/city/:city" element={<DailyForecast />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
