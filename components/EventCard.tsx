import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Tag } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-brand-700 shadow-sm">
          ${event.price} <span className="text-gray-500 font-normal">/ guest</span>
        </div>
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1">
          <Tag className="w-3 h-3" />
          {event.category}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
            {event.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{event.location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
            <Calendar className="w-4 h-4 text-brand-500" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
            <Users className="w-4 h-4 text-brand-500" />
            <span>{event.capacity - event.bookedCount} spots left</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600">
              {event.hostName.charAt(0)}
            </div>
            <span className="text-sm text-gray-600">Hosted by {event.hostName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
