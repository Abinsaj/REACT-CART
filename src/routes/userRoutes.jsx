import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Registration from "../pages/Registration"
import ProductDetails from "../pages/ProductDetails"
import PrivateRoute from "../components/PrivateRoute"

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />

      </Routes>
    </>
  )
}

export default UserRoutes
