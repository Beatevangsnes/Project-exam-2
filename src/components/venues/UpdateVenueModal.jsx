import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { createApiKey } from '../../api/auth/apiKey';
import { updateVenue, deleteVenue } from '../../api/auth/venues';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const UpdateVenueModal = ({ isOpen, onClose, venueData, onVenueUpdated, onVenueDeleted }) => {
  const [formData, setFormData] = useState({
    name: venueData.name || '',
    description: venueData.description || '',
    price: venueData.price || '',
    maxGuests: venueData.maxGuests || '',
    wifi: venueData.meta?.wifi || false,
    pets: venueData.meta?.pets || false,
    parking: venueData.meta?.parking || false,
    breakfast: venueData.meta?.breakfast || false,
    address: venueData.location?.address || '',
    zip: venueData.location?.zip || '',
    city: venueData.location?.city || '',
    country: venueData.location?.country || '',
    rating: venueData.rating || 0,
  });

  const [imageFields, setImageFields] = useState(
    venueData.media.map(media => ({ url: media.url, alt: media.alt }))
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (index, e) => {
    const newImageFields = [...imageFields];
    newImageFields[index][e.target.name] = e.target.value;
    setImageFields(newImageFields);
  };

  const handleAddImageField = () => {
    setImageFields([...imageFields, { url: '', alt: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;

      const updatedVenue = await updateVenue(venueData.id, {
        name: formData.name,
        description: formData.description,
        media: imageFields.filter(image => image.url), 
        price: parseFloat(formData.price),
        maxGuests: parseInt(formData.maxGuests),
        rating: parseFloat(formData.rating),
        meta: {
          wifi: formData.wifi,
          pets: formData.pets,
          parking: formData.parking,
          breakfast: formData.breakfast,
        },
        location: {
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          country: formData.country,
        },
      }, apiKey);

      onVenueUpdated(updatedVenue.data);
      onClose();
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;
      await deleteVenue(venueData.id, apiKey);
      onVenueDeleted();
      onClose();
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto mt-20">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-md p-6 mx-4 max-w-lg z-20 relative">
          <button className="absolute top-3 right-3" onClick={onClose}>
            <IoClose size={24} />
          </button>
          <div className="mt-4">
            <h1 className="text-center text-xl font-medium">Update Venue</h1>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Title.."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Description.."
                  required
                />
              </div>
              {imageFields.map((imageField, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    name="url"
                    value={imageField.url}
                    onChange={(e) => handleImageChange(index, e)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Image URL..."
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddImageField} className="mt-2 px-2 py-1 bg-indigo-100 text-indigo-600 rounded-md shadow-md hover:bg-zinc-100">
                Add Image
              </button>
              <div className="flex space-x-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Price.."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Max guests</label>
                  <input
                    type="number"
                    name="maxGuests"
                    value={formData.maxGuests}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Max guests.."
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">This Venue offers</label>
                <div className="flex space-x-4">
                  <div>
                    <input
                      type="checkbox"
                      name="wifi"
                      checked={formData.wifi}
                      onChange={handleChange}
                    />
                    <label className="ml-2 text-sm text-gray-700">Wifi</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="pets"
                      checked={formData.pets}
                      onChange={handleChange}
                    />
                    <label className="ml-2 text-sm text-gray-700">Pets</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="parking"
                      checked={formData.parking}
                      onChange={handleChange}
                    />
                    <label className="ml-2 text-sm text-gray-700">Parking</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="breakfast"
                      checked={formData.breakfast}
                      onChange={handleChange}
                    />
                    <label className="ml-2 text-sm text-gray-700">Breakfast</label>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-700">Location</h2>
                <div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Address..."
                  />
                </div>
                <div className="flex space-x-4">
                  <div>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      placeholder="Post code..."
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      placeholder="City..."
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Country..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select your rating for the venue</label>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value}>
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        checked={parseInt(formData.rating) === value}
                        onChange={handleChange}
                      />
                      <label className="ml-2 text-sm text-gray-700">{value}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded-md shadow-md hover:bg-zinc-100">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md">
                  Update Venue
                </button>
                <button type="button" onClick={handleDelete} className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md shadow-md">
                  Delete Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateVenueModal;
