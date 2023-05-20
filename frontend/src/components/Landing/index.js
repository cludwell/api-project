import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import './Landing.css'
import { initialSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import LoadingIcon from "../LoadingIcon";
import luxe from '../../images/icons/luxe.png'
import cabin from '../../images/icons/cabins.png'
import mansions from '../../images/icons/mansions.png'
import boats from '../../images/icons/boats.png'
import natpark from '../../images/icons/natpark.png'
import bednbreak from '../../images/icons/bednbreak.png'
import trending from '../../images/icons/trending.png'
import amazingviews from '../../images/icons/amazing-views.png'
import castles from '../../images/icons/castles.png'
import historical from '../../images/icons/historical.png'
import countryside from '../../images/icons/countryside.png'
export default function Landing() {
    const dispatch = useDispatch();
    const [ hasLoaded, setHasLoaded ] = useState(false)
    useEffect(() => {
        const loadData = async () => {
            await dispatch(initialSpots())
            return setHasLoaded(true)
        }
        loadData()
    })
    const spots = useSelector(state => state.spots.allSpots)

    if (!hasLoaded) return <LoadingIcon />

    //array of spot objeccts
    const data = Object.values(spots).sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    return (
        <div className="landing">
        <div className="icon-banner">
        {[[luxe, 'Luxe'],
        [cabin, 'Cabin'],
        [mansions, 'Mansions'],
        [boats, 'Boats'],
        [natpark, 'National Park'],
        [bednbreak, 'Bead And Breakfast'],
        [trending, 'Trending'],
        [amazingviews, 'Amazing Views'],
        [castles, 'Castles'],
        [historical, 'Historical'],
        [countryside, 'Country Side']  ].map((ele, i) => (
        <div className="icon-container" key={i}>
        <img src={ele[0]} alt="" className={`banner-icon banner-icons-${i}`}  key={i}></img>
        <div className="icon-title" key={i}>{ele[1]}</div>
        </div>

        )) }

        </div>

        <div className="spot-cards">

            {data.map(spot => (<SpotCard spot={spot} key={spot.id}/>) )}
        </div>
        </div>
    )
}
