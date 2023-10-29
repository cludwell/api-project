import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Landing.css";
import { initialSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import LoadingIcon from "../LoadingIcon";
import luxe from "../../images/icons/luxe.png";
import cabin from "../../images/icons/cabins.png";
import mansions from "../../images/icons/mansions.png";
import boats from "../../images/icons/boats.png";
import natpark from "../../images/icons/natpark.png";
import bednbreak from "../../images/icons/bednbreak.png";
import trending from "../../images/icons/trending.png";
import amazingviews from "../../images/icons/amazing-views.png";
import castles from "../../images/icons/castles.png";
import historical from "../../images/icons/historical.png";
import countryside from "../../images/icons/countryside.png";

export default function Landing() {
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      await dispatch(initialSpots());
      return setHasLoaded(true);
    };
    loadData();
  }, [dispatch]);

  const icons = [
    [luxe, "Luxe"],
    [cabin, "Cabin"],
    [mansions, "Mansions"],
    [boats, "Boats"],
    [natpark, "National Park"],
    [bednbreak, "Bed And Breakfast"],
    [trending, "Trending"],
    [amazingviews, "Amazing Views"],
    [castles, "Castles"],
    [historical, "Historical"],
    [countryside, "Country Side"],
  ];

  //array of spot objects
  const spots = useSelector((state) => state.spots.allSpots);
  let queryData;

  const queryRequest = async (queryString) => {
    setQuery(queryString);
    dispatch(initialSpots(queryString.toLowerCase())).then((res) => {
      queryData = res.Spots.sort(
        (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
      );
    //   console.log("--------------------", queryData);
    });
  };

  if (!hasLoaded) return <LoadingIcon />;
  const data =
    query && queryData
      ? queryData
      : Object.values(spots).sort(
          (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
        );
  return (
    <div className="landing">
      <div className="icon-banner">
        {icons.map((ele, i) => (
          <div
            className="icon-container"
            key={i}
            onClick={() => queryRequest(ele[1])}
          >
            <img
              src={ele[0]}
              alt=""
              className={`banner-icon banner-icons-${i}`}
              key={`img${i}`}
            ></img>
            <div className="icon-title" key={`title${i}`}>
              {ele[1]}
            </div>
          </div>
        ))}
      </div>

      <div className="spot-cards">
        {data.map((spot) => (
          <SpotCard spot={spot} key={spot.id} />
        ))}
      </div>
    </div>
  );
}
