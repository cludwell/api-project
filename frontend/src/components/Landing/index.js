import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import './Landing.css'
import { initialSpots } from "../../store/spots";
import SpotCard from "../SpotCard";

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
    if (!spots) return null

    //array of spot objeccts
    const data = Object.values(spots).sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    // console.log('DATA', data)
    return (
        <>
        <div className="spot-cards">
            {data.map(spot => (

//must have a preview image to be displayed
                spot.previewImage !== "No preview available yet" ?
                (<SpotCard spot={spot}
                key={spot.id}/>)
                : null
        ))}
        </div>

        </>
    )
}
