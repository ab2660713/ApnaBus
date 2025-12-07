import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { useState } from "react";
import Button from "./ui/Button";
import { Menu, X, User } from "lucide-react";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">

        {/* LEFT LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-wide">
            ApnaBus
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">

          {user?.isAdmin ? (
            <>
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Home
              </Link>
              <Link to="/buses" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Buses
              </Link>
              <Link to="/mybooking" className="text-gray-700 hover:text-blue-600 font-medium transition">
                My Bookings
              </Link>
            </>
          )}

          {/* PROFILE DROPDOWN */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
              >
                <User className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-gray-700">{user.name}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-lg overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE NAV MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col gap-4 p-4">

            {user?.isAdmin ? (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                  Home
                </Link>
                <Link to="/buses" className="text-gray-700 hover:text-blue-600 font-medium">
                  Buses
                </Link>
                <Link to="/mybooking" className="text-gray-700 hover:text-blue-600 font-medium">
                  My Bookings
                </Link>
              </>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold text-left"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="font-medium text-blue-600">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
