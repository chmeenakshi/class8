import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Components/Home";
import TeamMatches from "./Components/TeamMatch";
import NotFound from "./Components/NotFound";

import "./App.css";


const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/team-matches/:id" element={<TeamMatches/>} />
        <Route element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
