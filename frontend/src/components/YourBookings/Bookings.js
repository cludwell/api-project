import "./YourBookings.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import BookingMap from "./BookingMap";
export default function Bookings({ book, i }) {
  return (
    <div
      className={i % 2 === 0 ? "booking" : "grey-booking booking"}
      key={`container${i}`}
    >
      <div className="booking-row" key={`bookingrow${i}`}>
        <div className="booking-text" key={`bookingtext${i}`}>
          <div className="booking-times" key={`bookingtimes${i}`}>
            <div className="booking-checkin" key={`bookingcheckin${i}`}>
              <div
                className="booking-checkin-deets checkin-day"
                key={`bookingcheckindeets${i}`}
              >
                {new Date(book.startDate).toString().split(" ")[0]}
              </div>
              <div
                className="booking-checkin-deets checkin-month-day"
                key={`bookingcheckindeetsmonthday${i}`}
              >
                {new Date(book.startDate).toString().slice(3, 11)}
              </div>
              <div
                className="booking-checkin-deets checkin-year"
                key={`bookingcheckindeetsyear${i}`}
              >
                {new Date(book.startDate).toString().slice(11, 15)}
              </div>
            </div>
            <div className="booking-checkout" key={`bookingcheckout${i}`}>
              <div
                className="booking-checkout-deets checkout-day"
                key={`bookingcheckoutday${i}`}
              >
                {new Date(book.endDate).toString().split(" ")[0]}
              </div>
              <div
                className="booking-checkout-deets checkout-month-day"
                key={`bookingcheckoutdeetsmonth${i}`}
              >
                {new Date(book.endDate).toString().slice(3, 11)}
              </div>
              <div
                className="booking-checkout-deets checkout-year"
                key={`bookingcheckoutyear${i}`}
              >
                {new Date(book.endDate).toString().slice(11, 15)}
              </div>
            </div>
          </div>
          <div className="booking-address" key={`bookingaddress${i}`}>
            <NavLink to={`/spots/${book.Spot.id}`}>
              <div className="booking-spot-name" key={`bookingname${i}`}>
                {book.Spot.name}
              </div>
            </NavLink>
            <div key={`spotaddress${i}`}>{book.Spot.address} </div>
            <div key={`spotcitystate${i}`}>
              {book.Spot.city} {book.Spot.state}, {book.Spot.country}{" "}
            </div>
          </div>
        </div>
        <BookingMap spot={book.Spot} key={`map${i}`} />
      </div>
    </div>
  );
}
