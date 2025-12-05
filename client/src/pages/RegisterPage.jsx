import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import { Card } from "../components/ui/card";
import Button from "../components/ui/Button";

function RegisterPage() {
  const {user,isLoading,isSuccess,isError,message}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    name:"",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: ""
  })
  
  const { name, email, password, confirmPassword, age, phone, gender } = formData
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords Not Match!")
    } else {
      dispatch(registerUser(formData))
    }
  }



  useEffect(() => {

    if (user&&isSuccess) {
      navigate("/")
    }

    if (isError && message) {
      toast.error(message)
    }

  }, [user, isError, message])


  if (isLoading) {
    return (
      <h1 className="text-center font-bold text-gray-400 text-6xl my-4">Loading...</h1>
    )
  }
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join BusGo for easy bus booking</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
              name="name"
              value={name}
              onChange={handleChange}
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
              name="email"
              value={email}
              onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
              name="phone"
              value={phone}
              onChange={handleChange}
               type="phone"
                placeholder="Enter mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Gender
            </label>
            <input
              name="gender"
              value={gender}
              onChange={handleChange}
              type='text'
              placeholder="Enter Your Gender"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Age
            </label>
            <input
              name="age"
              value={age}
              onChange={handleChange}
              type='number'
              placeholder="Enter Your Age"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
              name="password"
              value={password}
              onChange={handleChange}
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 ">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

           
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default RegisterPage;
