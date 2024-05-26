import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApiKey } from '../../api/auth/apiKey';
import { createVenue } from '../../api/auth/venues';

const AddVenue = ({ onVenueAdded }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    maxGuests: '',
    wifi: false,
    pets: false,
    parking: false,
    breakfast: false,
    address: '',
    zip: '',
    city: '',
    country: '',
    rating: 0,
  });

  const [imageFields, setImageFields] = useState([{ url: '' }]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.maxGuests) newErrors.maxGuests = "Max guests is required";

    imageFields.forEach((imageField, index) => {
      if (!imageField.url) {
        newErrors[`image${index}`] = "Image URL is required";
      } else {
        try {
          new URL(imageField.url);
        } catch (_) {
          newErrors[`image${index}`] = "Invalid URL";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setImageFields([...imageFields, { url: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;

      const newVenue = await createVenue({
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

      onVenueAdded(newVenue.data);
      navigate('/profile'); 
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };

  return (
    <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-md p-6 mx-4 max-w-lg mx-auto z-20 relative">
      <div className="mt-4">
        <h1 className="text-center text-xl font-medium">Create a New Venue</h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              placeholder="Title.."
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              placeholder="Description.."
              required
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          {imageFields.map((imageField, index) => (
            <div key={index} className="flex flex-col mb-2">
              <input
                type="text"
                name="url"
                value={imageField.url}
                onChange={(e) => handleImageChange(index, e)}
                className={`w-full mt-1 p-2 border ${errors[`image${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="Image URL..."
              />
              {errors[`image${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`image${index}`]}</p>}
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
                className={`w-full mt-1 p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="Price.."
                required
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max guests</label>
              <input
                type="number"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border ${errors.maxGuests ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="Max guests.."
                required
              />
              {errors.maxGuests && <p className="text-red-500 text-xs mt-1">{errors.maxGuests}</p>}
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
            <button type="submit" className="px-4 py-2 bg-indigo-100 text-indigo-500 rounded-md shadow-md hover:bg-zinc-100">
              Create Venue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVenue;
