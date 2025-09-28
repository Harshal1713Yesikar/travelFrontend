import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id}>
          <h3>{b.name}</h3>
          <p>{b.description}</p>
          <p>₹{b.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
