import { useSelector } from "react-redux"
import SpotCard from "../SpotCard"

export default function Landing() {
    const spots = useSelector(state => state.spots)
    return (
       <div className="landing">
        {/* {spots.foreach(spot => (
            <SpotCard spot={spot}
        ))} */}
       </div>
    )
}
