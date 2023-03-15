import { Route, Routes } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Profile from "./pages/User/profile"
import Header from "./pages/Header/Header"
import Layot from "./pages/Header/Layout"
import Index from "./pages/Auth/IndexPage"
import { useState } from "react"
function App() {
  let [darkMode, setDarkMode] = useState(Boolean)
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<Layot darkMode={darkMode} setDarkMode={setDarkMode} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/sadmclskmcdlskm" element={<Header darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/index" element={<Index />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
