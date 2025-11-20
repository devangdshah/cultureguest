import React, { useState, useMemo } from 'react';
import { Search, MapPin } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { Event, EventCategory } from '../types';

// Mock Data
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Traditional Punjabi Wedding',
    hostName: 'Simran Kaur',
    category: EventCategory.WEDDING,
    date: '2024-06-15',
    location: 'Amritsar, India',
    price: 50,
    capacity: 20,
    bookedCount: 12,
    description: 'Join us for the Anand Karaj ceremony followed by a vibrant langar (community lunch). Experience the colors, music, and spirituality of a Sikh wedding.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    highlights: ['Turban Tying Experience', 'Traditional Lunch', 'Folk Dance']
  },
  {
    id: '2',
    title: 'Kyoto Tea Ceremony & Kimono Dressing',
    hostName: 'Akira Tanaka',
    category: EventCategory.OTHER,
    date: '2024-05-20',
    location: 'Kyoto, Japan',
    price: 120,
    capacity: 6,
    bookedCount: 2,
    description: 'A private tea ceremony in a historic machiya. Includes kimono rental and dressing assistance.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    highlights: ['Matcha Preparation', 'Kimono Wear', 'Zen Garden View']
  },
  {
    id: '3',
    title: 'Baby Shower (Godh Bharai)',
    hostName: 'Priya & Rahul',
    category: EventCategory.BABY_SHOWER,
    date: '2024-07-01',
    location: 'Mumbai, India',
    price: 35,
    capacity: 15,
    bookedCount: 5,
    description: 'Celebrate the upcoming arrival of our baby with traditional Indian games, music, and a magnificent vegetarian feast.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    highlights: ['Henna Application', 'Traditional Games', 'Sweet Box Gift']
  },
  {
    id: '4',
    title: 'Coming of Age Ceremony (Seijin no Hi)',
    hostName: 'Yuki Sato',
    category: EventCategory.COMING_OF_AGE,
    date: '2024-01-08',
    location: 'Tokyo, Japan',
    price: 80,
    capacity: 10,
    bookedCount: 8,
    description: 'Witness the colorful Seijin no Hi celebration at a local shrine. We will guide you through the rituals and photography.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    highlights: ['Shrine Visit', 'Local Street Food', 'Photo Session']
  },
  {
    id: '5',
    title: 'Mundan Ceremony on the Ganges',
    hostName: 'Amit Sharma',
    category: EventCategory.MUNDAN,
    date: '2024-08-10',
    location: 'Varanasi, India',
    price: 25,
    capacity: 30,
    bookedCount: 10,
    description: 'Be part of a sacred Mundan (first head shaving) ceremony for our son on the banks of the Ganges. A deeply spiritual experience.',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    highlights: ['Boat Ride', 'Ceremonial Rituals', 'Prasad Distribution']
  },
   {
    id: '6',
    title: 'Tuscan Vineyard Harvest Dinner',
    hostName: 'Giulia Ricci',
    category: EventCategory.DINNER_PARTY,
    date: '2024-09-25',
    location: 'Siena, Italy',
    price: 95,
    capacity: 25,
    bookedCount: 15,
    description: 'Celebrate the grape harvest with a long-table dinner in our vineyard. Authentic family recipes and free-flowing wine.',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    highlights: ['Wine Tasting', 'Live Accordion', 'Farm-to-Table']
  }
];

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <img 
            src="https://picsum.photos/1600/900?grayscale&blur=2" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Don't just visit. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-purple-400">
              Belong.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 font-light">
            Join local weddings, baby showers, and cultural ceremonies. 
            Experience the world through its celebrations.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white p-2 rounded-full shadow-2xl max-w-2xl mx-auto flex items-center">
            <div className="pl-4 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              placeholder="Search by event or location (e.g. 'Wedding in India')"
              className="w-full px-4 py-3 rounded-full focus:outline-none text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Filters */}
        <div className="flex overflow-x-auto pb-4 gap-3 mb-8 no-scrollbar">
          {['All', ...Object.values(EventCategory)].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category 
                  ? 'bg-brand-600 text-white shadow-md transform scale-105' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchTerm ? `Results for "${searchTerm}"` : 'Upcoming Celebrations'}
          </h2>
          <span className="text-sm text-gray-500">{filteredEvents.length} experiences found</span>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
