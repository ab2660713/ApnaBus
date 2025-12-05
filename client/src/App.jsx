import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import BusDetailsPage from './pages/BusDetailsPage'
import BookingReviewPage from './pages/BookingReviewPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboard from './pages/AdminDashboard'
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import MyBookingsPage from './pages/MyBookingsPage';
import CheckoutPage from './pages/CheckOutPage';
import AddBusPage from './pages/AddBusPage';
import AllBuses from './pages/AllBuses';
import AllBookings from './pages/AllBooking';
import AllUsers from './pages/AllUsers';
import BusEditPage from './pages/BusEditPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSucessPage';

function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buses" element={<SearchResultsPage />} />
          <Route path="/bus/:id" element={<BusDetailsPage />} />
          <Route path="/booking-review" element={<BookingReviewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/buses" element={<AllBuses />} />
  <Route path="/admin/view-bookings" element={<AllBookings />} />
  <Route path="/admin/view-users" element={<AllUsers />} />
          <Route path='/mybooking' element={<MyBookingsPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='/admin/bus' element={<AddBusPage/>}/>
        <Route path='/admin/bus/:id' element={<BusEditPage/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
        <Route path='/payment-success' element={<PaymentSuccessPage/>}/>
        </Routes>
      </main>

      <Footer/>
      <ToastContainer/>
    </div>
  );
}

export default App;
