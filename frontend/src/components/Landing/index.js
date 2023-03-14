import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import './Landing.css'
import { initialSpots } from "../../store/spots";
import SpotCard from "../SpotCard";

export default function Landing() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initialSpots())
    }, [dispatch])
    const spots = useSelector(state => state.spots.allSpots)
    console.log('HERE IN LANDING COMP', spots)
    if (!spots) return null
    const data = Object.values(spots)
    // console.log('DATA ARRAY IS WORKING', data)
    return (
        <>

        <div className="spot-cards">
            {data.map(spot => (
                <SpotCard spot={spot}
                key={spot.id}/>
        ))}
        </div>

        </>
    )
}
