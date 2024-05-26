import React from 'react';
import '../../App.css'; 

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Venues', href: '/venues' },
    { name: 'Profile', href: '/profile' },
  ],
  contact: [
    {
      type: 'Email',
      value: 'contact@holidaze.com',
    },
    {
      type: 'Phone',
      value: '+123 456 7890',
    },
    {
      type: 'Address',
      value: '123 Holidaze Street, City, Country',
    },
  ],
};

export default function Footer() {
  return (
    <footer className="footer-gradient border-t border-neutral-200">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="flex flex-wrap justify-center space-x-6 sm:space-x-12 mb-6" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-3">
              <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex flex-col sm:flex-row sm:justify-center sm:space-x-10 space-y-6 sm:space-y-0">
          {navigation.contact.map((item) => (
            <div key={item.type} className="text-center text-gray-600 flex-1">
              <span className="block text-sm leading-6 font-medium">{item.type}</span>
              <span className="block text-sm leading-6">{item.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2024 Holidaze, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
