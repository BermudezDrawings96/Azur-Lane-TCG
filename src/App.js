import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// layouts
import View from "./layout/View";

// views
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<View />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
