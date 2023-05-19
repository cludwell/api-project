import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import './Landing.css'
import { initialSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import LoadingIcon from "../LoadingIcon";

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
    //if thunk hasnt returned spot data
    if (!hasLoaded) return <LoadingIcon />

    //array of spot objeccts
    const data = Object.values(spots).sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    // console.log('DATA', data)
    return (
        <div className="spot-cards">
            {data.map(spot => (<SpotCard spot={spot} key={spot.id}/>) )}
        </div>
    )
}
