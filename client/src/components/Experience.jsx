import React from 'react';
import { Star } from 'lucide-react';

const Experiences = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Guest Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((rev) => (
            <div key={rev} className="bg-white p-8 rounded-2xl shadow-sm italic text-gray-600">
              <div className="flex text-yellow-500 mb-4 justify-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              "The stay at RestInn was phenomenal. The process was seamless and properties were luxury defined."
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">S</div>
                <span className="font-bold text-gray-900 not-italic">Sarah J.</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;