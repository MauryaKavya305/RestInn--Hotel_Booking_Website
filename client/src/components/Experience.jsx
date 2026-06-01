import React from 'react';
import { Star, Quote } from 'lucide-react'; // Added Quote for a nice design touch
import { testimonials } from '../assets/assets.js'; // Importing your testimonial data

const Experiences = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-bold mb-2">Guest Experiences</h2>
        <p className="text-gray-600 mb-12">What our global community has to say about their stays.</p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-8 rounded-3xl shadow-sm transition-all duration-300 flex flex-col items-center group"
            >
              {/* Decorative Quote Icon */}
              <Quote className="text-blue-100 w-10 h-10 mb-4 group-hover:text-blue-200 transition-colors" />

              {/* Dynamic Star Rating Logic */}
              <div className="flex text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-gray-200'}`} 
                  />
                ))}
              </div>

              {/* The Review Text */}
              <p className="text-gray-600 italic leading-relaxed mb-8">
                "{item.review}"
              </p>

              {/* Reviewer Profile Section */}
              <div className="mt-auto flex items-center gap-4 border-t border-gray-100 pt-6 w-full justify-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-50" 
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 leading-none">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;