import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import defaultImage from '../../assets/default-image.png'; 
const VenueImageModal = ({ isOpen, onClose, images }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto mt-24">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <div className="mt-2 max-h-screen overflow-y-auto">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.alt || `Venue image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-md mb-4"
                    onError={(e) => e.target.src = defaultImage}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default VenueImageModal;
