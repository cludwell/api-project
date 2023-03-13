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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  // console.log(isLoaded)
  return (
    <>
      <Header isLoaded={isLoaded}/>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/spotsfe/:spotId' component={SpotDetails} />
      </Switch>
    </>
  );
}

export default App;
