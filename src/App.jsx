import ManageJob from "./components/ManageJob";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./styles/style.css";
import { Routes, Route } from "react-router-dom";
import Inrernship from "./pages/Inrernship";
import FullTime from "./pages/FullTime";
import Remote from "./pages/Remote";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
        <Sidebar />
        <div className="lg:pl-[14rem]  mt-[5.8125rem]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/internship" element={<Inrernship />} />
            <Route path="/fulltime" element={<FullTime />} />
            <Route path="/remote" element={<Remote />} />
            <Route path="/job/:type" element={<ManageJob />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
