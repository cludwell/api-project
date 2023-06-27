import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
// import Navigation from "./components/Navigation";
import Header from "./components/Header";
import './index.css'
import Landing from "./components/Landing";
// import Route from "express/lib/router/route";
import { Route } from "react-router-dom";
import SpotDetails from './components/SpotDetails'
import ManageSpots from "./components/ManageSpots";
import YourBookings from "./components/YourBookings";
import ReservationConfirmation from "./components/ReservationConfirmation";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    <>
      <Header isLoaded={isLoaded}/>
      <Switch>
        <Route path='/spotsfe/:spotId' component={SpotDetails}/>
        <Route exact={true} path='/manage-spots' component={ManageSpots} />
        <Route exact={true} path='/' component={Landing}/>
        <Route exact={true} path='/bookings' component={YourBookings} />
        <Route exact={true} path='/bookings/:bookingId' component={ReservationConfirmation} />
        <Route exact={true} path='/bookings' component={YourBookings} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
