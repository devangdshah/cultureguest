import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { EventDetails } from './pages/EventDetails';
import { HostEvent } from './pages/HostEvent';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/host" element={<HostEvent />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-purple-600 mb-4 block">
                CultureGuest
              </span>
              <p className="text-gray-500 max-w-xs">
                Connecting curious travelers with authentic local celebrations. Make the world feel a little smaller.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About Us</li>
                <li>How it Works</li>
                <li>Safety & Trust</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help Center</li>
                <li>Cancellation Options</li>
                <li>Host Concern</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
            © 2024 CultureGuest Inc. All rights reserved.
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
