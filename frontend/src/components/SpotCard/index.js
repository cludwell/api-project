// import spot from "../../../../backend/db/models/spot";

export default function SpotCard({ spot }) {

    return (
        <div className="spot-card">
            <img src={`${spot.previewimg}`} alt='preview' className="spot-image"/>

            <p>{spot.rating}{spot.name}</p>
            <p>{spot.description.slice(50)}</p>
            <p>${spot.price} night</p>
        </div>
    )
}
