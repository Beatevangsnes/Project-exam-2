import React, { useState, useEffect } from "react";
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { createApiKey } from "../../api/auth/apiKey";
import { createBooking, getBookingsByVenueId } from "../../api/auth/bookings";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const BookingForm = ({ price, venueId, maxGuests }) => {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const navigate = useNavigate();
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: 'selection'
  });
  const [guests, setGuests] = useState(1);
  const [total, setTotal] = useState(0);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (isLoggedIn) {
          const apiKeyData = await createApiKey("User profile key");
          const apiKey = apiKeyData.data.key;
          const venueData = await getBookingsByVenueId(venueId, apiKey);
          const { bookings } = venueData.data;
          setUnavailableDates(
            bookings.flatMap((booking) => {
              const range = [];
              let currentDate = new Date(booking.dateFrom);
              const endDate = new Date(booking.dateTo);
              while (currentDate <= endDate) {
                range.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
              }
              return range;
            })
          );
        }
      } catch (error) {
        console.error("Error fetching venue bookings:", error);
      }
    };

    if (venueId) {
      fetchBookings();
    }
  }, [venueId, isLoggedIn]);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const calculateDays = () => {
    const start = new Date(selectionRange.startDate);
    const end = new Date(selectionRange.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const difference = (end - start) / (1000 * 60 * 60 * 24);
    return Math.max(0, difference);
  };

  const calculateTotalPrice = () => {
    const days = calculateDays();
    const calculatedPrice = price * (days === 0 ? 1 : days);
    return calculatedPrice;
  };

  useEffect(() => {
    setTotal(calculateTotalPrice());
  }, [selectionRange, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newVenueId = venueId.startsWith("/venue/")
      ? venueId.substring(7)
      : venueId;

    const newData = {
      dateFrom: selectionRange.startDate.toISOString().split("T")[0],
      dateTo: selectionRange.endDate.toISOString().split("T")[0],
      guests: Number(guests),
      venueId: newVenueId,
    };

    try {
      if (isLoggedIn) {
        const apiKeyData = await createApiKey("User profile key");
        const apiKey = apiKeyData.data.key;
        await createBooking(newData, apiKey);
        navigate("/profile");
      } else {
        alert("You must be logged in to make a booking.");
      }
    } catch (error) {
      if (error.message.includes("409")) {
        setErrorMessage("Selected dates are already booked. Please choose different dates.");
      } else {
        console.error("Error creating booking:", error);
      }
    }
  };

  const handleGuestsChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1) {
      setGuests(1);
    } else if (value > maxGuests) {
      setGuests(maxGuests);
    } else {
      setGuests(value);
    }
  };

  return (
    <div className="venue-details-right mb-8 mt-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h3 className="font-normal text-xl">Booking calendar</h3>
          <div className="flex items-center justify-center gap-2 rounded-md bg-white w-full py-2">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
              disabledDates={unavailableDates}
              rangeColors={['#3f51b5']}
            />
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center gap-1 mb-1">
            <p>Guests</p>
          </div>
          <input
            type="number"
            placeholder="Guests"
            value={guests}
            onChange={handleGuestsChange}
            min={1}
            max={maxGuests}
            className="flex h-9 items-center rounded-md border pl-5 pr-4 focus:outline-none"
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="mt-4 flex">
          <button
            type="submit"
            className="mb-5 rounded-md bg-indigo-100 text-indigo-600 px-8 py-2 font-normal hover:bg-zinc-100"
          >
            Book now
          </button>
        </div>
      </form>
      <div className="mr-3 flex justify-between border-b pb-2">
        <p>
          ${price} x {calculateDays()} nights
        </p>
        <p>${total}</p>
      </div>
      <div className="mr-3 mt-4 flex justify-between font-bold">
        <p>Total</p>
        <p>${total}</p>
      </div>
    </div>
  );
};

export default BookingForm;
