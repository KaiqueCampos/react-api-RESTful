import { Route, Routes } from "react-router-dom";
import { Repo } from "./pages/repo";
import { Repos } from "./pages/repos";

import './global.scss'

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Repos />} />
      <Route path='/repos/*' element={<Repo />} />
    </Routes>
  )
}