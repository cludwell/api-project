import { useEffect, useState } from "react";
import "./YourBookings.css";
import { useDispatch, useSelector } from "react-redux";
import { userBookingsRequest } from "../../store/bookings";
import LoadingIcon from "../LoadingIcon";
import Bookings from "./Bookings";

export default function YourBookings() {
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      await dispatch(userBookingsRequest());
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch]);
  const bookings = useSelector((state) => state.bookings.userBookings.Bookings);
  const upcomingBookings = bookings
    ?.filter((b) => new Date(b.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const pastBookings = bookings
    ?.filter((b) => new Date(b.startDate) < new Date())
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  if (!hasLoaded) return <LoadingIcon />;

  return (
    <div className="your-bookings">
      <div className="your-bookings-content">
        <h3>Upcoming Reservations</h3>
        <hr></hr>
        {upcomingBookings.length ? (
          upcomingBookings.map((book, i) => <Bookings i={i} book={book} />)
        ) : (
          <h4>Go book a trip!</h4>
        )}
        <h3>Past Reservations</h3>
        <hr></hr>
        {pastBookings.length ? (
          pastBookings.map((book, i) => <Bookings i={i} book={book} />)
        ) : (
          <h4>Nothing here yet!</h4>
        )}
      </div>
    </div>
  );
}
