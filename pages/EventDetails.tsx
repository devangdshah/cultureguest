import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Share2, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Event, EventCategory } from '../types';
import { CulturalGuide } from '../components/CulturalGuide';

// Re-using mock data for simplicity. In a real app, fetch by ID.
const MOCK_EVENTS: Record<string, Event> = {
  '1': {
    id: '1',
    title: 'Traditional Punjabi Wedding',
    hostName: 'Simran Kaur',
    category: EventCategory.WEDDING,
    date: '2024-06-15',
    location: 'Amritsar, India',
    price: 50,
    capacity: 20,
    bookedCount: 12,
    description: 'Join us for the Anand Karaj ceremony followed by a vibrant langar (community lunch). Experience the colors, music, and spirituality of a Sikh wedding. You will be treated like family, participate in the Bhangra dance, and enjoy authentic homemade Punjabi cuisine.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    highlights: ['Turban Tying Experience', 'Traditional Lunch', 'Folk Dance', 'Photography included']
  },
  // Fallback for demo if ID doesn't match
  'default': {
    id: '99',
    title: 'Sample Cultural Event',
    hostName: 'Local Host',
    category: EventCategory.FESTIVAL,
    date: '2024-12-01',
    location: 'Global Village',
    price: 40,
    capacity: 10,
    bookedCount: 0,
    description: 'A wonderful cultural experience waiting for you.',
    imageUrl: 'https://picsum.photos/800/600?random=99',
    highlights: ['Fun', 'Food', 'Culture']
  }
};

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = MOCK_EVENTS[id || ''] || MOCK_EVENTS['1']; // Default to first event if not found (for demo robustness)
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleBook = () => {
    setBookingStatus('processing');
    // Simulate API call
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Image */}
      <div className="h-[40vh] md:h-[50vh] relative w-full overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
            <Link to="/" className="bg-white/80 backdrop-blur-md hover:bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-900 transition-colors">
                ← Back to Explore
            </Link>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
             <button className="bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors text-gray-700">
                <Share2 className="w-5 h-5" />
            </button>
            <button className="bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors text-gray-700">
                <Heart className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">
                        {event.category}
                    </span>
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {event.location}
                    </span>
                </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
              
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold text-xl">
                    {event.hostName.charAt(0)}
                </div>
                <div>
                    <p className="text-sm text-gray-500">Hosted by</p>
                    <p className="font-medium text-gray-900">{event.hostName}</p>
                </div>
              </div>

              <div className="py-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About this celebration</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              <div className="py-6 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI Section */}
            <CulturalGuide eventType={event.category} location={event.location} />
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-3xl font-bold text-gray-900">${event.price}</span>
                  <span className="text-gray-500"> / person</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {event.capacity - event.bookedCount} spots left
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-700">
                        <Calendar className="w-5 h-5 text-brand-500" />
                        <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Confirmed</span>
                </div>
              </div>

              {bookingStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-green-800 mb-1">Booking Requested!</h4>
                  <p className="text-sm text-green-700">The host will confirm your spot shortly.</p>
                </div>
              ) : (
                <button 
                  onClick={handleBook}
                  disabled={bookingStatus === 'processing'}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${
                    bookingStatus === 'processing' 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg hover:shadow-brand-200'
                  }`}
                >
                  {bookingStatus === 'processing' ? 'Processing...' : 'Request to Join'}
                </button>
              )}
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-3 h-3" />
                <span>Secure payment via CultureGuest</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
