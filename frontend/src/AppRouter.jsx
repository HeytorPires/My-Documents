import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./home";
import Forms from "./forms";
import Update from "./update";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/update/:id" element={<Update />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
