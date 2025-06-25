"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/auth.css"
import { loginUser } from "../services/userAxios"
import { toast } from "sonner"

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await loginUser(formData)
      if(response.data){
        localStorage.setItem('authToken',response.data.token)
        toast.success('Login successfull')
        navigate('/')
      }else{
        console.log(error)
      }

      setFormData({
        username: "",
        password: "",
      })
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-content">
          <h1>Welcome back to your shopping hub.</h1>
          <p>Continue discovering amazing deals and products you’ll love.</p>
        </div>
        <div className="auth-image">
          <img src='/ecart-2.jpg' alt="Professional working" />
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-header">
            <div className="logo">
              <div className="logo-box">REACT-CART</div>
              <span className="logo-tagline">Ecommerse Platform</span>
            </div>
          </div>

          <div className="auth-form">
            <h2>Sign in</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">User Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter email"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                
                
              </div>

              <button type="submit" className="auth-btn primary" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>


            <div className="auth-footer">
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
