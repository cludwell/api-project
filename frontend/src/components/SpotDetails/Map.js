import { useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import LoadingIcon from '../LoadingIcon'
import './Map.css'
export default function Map({ spot }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })
    const center = useMemo(() => ({lat: parseInt(spot.lat), lng: parseInt(spot.lng)}), [spot.lat, spot.lng])
    if (!isLoaded) return <LoadingIcon />
    if (loadError) return <div>Error loading GoogleMap</div>
    return (
        <GoogleMap zoom={12} center={center} mapContainerClassName='google-map'>
        <Marker position={center} />
        </GoogleMap>
    )
}
