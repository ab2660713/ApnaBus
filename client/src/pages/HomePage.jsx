import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import MobileNav from '../components/MobileNav';
import { getAllBuses } from '../features/bus/busSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import heroBg from '../assets/hero-bg.jpg';
function HomePage() {
  const { buses, busLoading } = useSelector(state => state.bus);
  const { user } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getAllBuses());
  }, [user]);

  if (busLoading) {
    return (
      <h1 className="text-center font-bold text-gray-400 text-6xl my-4">
        Loading...
      </h1>
    );
  }

  // STATIC FEATURED ROUTES
  const featuredRoutes = [
    { from: 'Mumbai', to: 'Pune', price: 450, duration: '3h 30m' },
    { from: 'Delhi', to: 'Jaipur', price: 550, duration: '5h 15m' },
    { from: 'Bangalore', to: 'Chennai', price: 750, duration: '6h 45m' },
    { from: 'Hyderabad', to: 'Vijayawada', price: 400, duration: '4h 20m' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header />

      {/* HERO SECTION */}
      <section
  className="bg-cover bg-center text-white py-20"
  style={{ backgroundImage: `url(${heroBg})` }}

>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center rounded-xl p-10">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Book Your Bus Tickets
    </h1>
    <p className="text-xl text-white/90 mb-8">
      Fast, Easy & Secure Bus Booking Experience
    </p>
    <Link to="/buses">
      <Button size="lg" variant="secondary">
        Start Booking Now
      </Button>
    </Link>
  </div>
</section>


      {/* SEARCH + FEATURED */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchForm />

        {/* FEATURED ROUTES */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Routes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRoutes.map((route, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    {route.from}
                  </span>

                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>

                  <span className="text-lg font-semibold text-gray-900">
                    {route.to}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{route.price}
                  </span>
                  <span className="text-sm text-gray-500">{route.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INFO CARDS */}
        <section className="mt-16 bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">100% secure payment methods</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Great deals and discounts</p>
            </div>
          </div>
        </section>
      </div>

      <MobileNav />
    </div>
  );
}

export default HomePage;
