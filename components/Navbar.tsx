import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, PlusCircle, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-600 p-2 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-purple-600">
              CultureGuest
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-brand-600 font-medium' : 'text-gray-600 hover:text-brand-500'} transition-colors`}
            >
              Explore
            </Link>
            <Link 
              to="/host" 
              className={`${isActive('/host') ? 'text-brand-600 font-medium' : 'text-gray-600 hover:text-brand-500'} transition-colors`}
            >
              Host an Event
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/host" className="hidden sm:flex items-center gap-2 text-sm font-medium text-brand-600 bg-brand-50 px-4 py-2 rounded-full hover:bg-brand-100 transition-colors">
              <PlusCircle className="w-4 h-4" />
              Create Event
            </Link>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 ring-brand-200">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
