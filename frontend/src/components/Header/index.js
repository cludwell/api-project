import "./Header.css";
import logo from "../../images/board.png";
import { Link } from "react-router-dom";
// import { Switch } from "react-router-dom";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { restoreUser } from "../../store/session";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateSpotModal from "../CreateSpotModal";
import { useState } from "react";

function Header({ isLoaded }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  const user = useSelector((store) => store.session.user);
  const yourHome = <span className="scarebnb-home">Scarebnb your home</span>;

  return (
    <div id="header-90">
      <div className="header">
        <div className="logo-side">
          <Link to={`/`}>
            <img src={logo} alt="logo" className="planchette" />
          </Link>

          <Link to={`/`} className="logo">
            <span className="logo">scarebnb</span>
          </Link>
        </div>
        <div className="navigation-corner">
          {user ? (
            <OpenModalMenuItem
              itemText={`Create a Spot`}
              onClick={openMenu}
              onItemClick={closeMenu}
              modalComponent={<CreateSpotModal />}
            />
          ) : (
            yourHome
          )}
          <div className="header-globe">
            <i className="fa-solid fa-globe"></i>
          </div>
          <Navigation isLoaded={isLoaded} />
        </div>
      </div>
    </div>
  );
}

export default Header;
