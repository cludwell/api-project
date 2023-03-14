import { useState } from 'react'
import './CreateSpotModal.css'

export default function CreateSpotModal() {
    const [country, setCountry] = useState('Country')
    const [street, setStreet] = useState('Address')
    const [city, setCity] = useState('City')
    const [state, setState] = useState('STATE')
    const [lat, setLat] = useState('Latitude')
    const [lng, setLng] = useState('Longitude')
    const [desc, setDesc] = useState('Please write at least 30 characters')
    const [title, setTitle] = useState('Name of your spot')
    const [price, setPrice] = useState('Price per night (USD)')
    const [prev, setPrev] = useState('Preview Image URL')
    const [img2, setImg2] = useState('Image URL')
    const [img3, setImg3] = useState('Image URL')
    const [img4, setImg4] = useState('Image URL')
    const [img5, setImg5] = useState('Image URL')
    // const [errors, setErrors] = useState({})

    const handleSubmit = e => {
        e.preventDefault();
        // return dispatchEvent()
    }
    const validate = () => {
        const err = {}
        if (country === 'Country' || !country) err.country = 'Country is required'
        if ()
    }
    return (
        <div className='create-spot-modal'>
            <h1 className='create-spot'>Create a New Spot</h1>
            <h2 className='create-subtitle'>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <label>Country
                <input
                type='text'
                value={country}
                onChange={e => setCountry(e.target.value)}
                ></input>
            </label>
            <label>Street Address
                <input
                type='text'
                value={street}
                onChange={e => setStreet(e.target.value)}
                ></input>
            </label>
            <label>City
                <input
                type='text'
                value={city}
                onChange={e => setCity(e.target.value)}
                ></input>
            </label>
            <label>State
                <input
                type='text'
                value={state}
                onChange={e => setState(e.target.value)}
                ></input>
            </label>
            <label>Latitude
                <input
                type='text'
                value={lat}
                onChange={e => setLat(e.target.value)}
                ></input>
            </label>
            <label>Longitude
                <input
                type='text'
                value={lng}
                onChange={e => setLng(e.target.value)}
                ></input>
            </label>
            <hr/>
            <h2 className='create-desc'>Describe your place to guests</h2>
            <label>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.
                <textarea
                type='text'
                value={desc}
                onChange={e => setDesc(e.target.value)}
                ></textarea>
            </label>
            <hr/>
            <h2 className='create-title'>Create a title for your spot</h2>
            <label>Catch guests' attention with a spot title that highlights what makes your place special.
                <input
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
                ></input>
            </label>
            <hr/>
            <h2 className='create-price'>Set a base price for your spot</h2>
            <label>Competetive pricing can help your listing stand out and rank higher in search results.
                <input
                type='text'
                value={price}
                onChange={e => setPrice(e.target.value)}
                ></input>
            </label>
            <hr/>
            <h2>Liven up your spot with photos</h2>
            <label>Submit a link to at least one photo to publish your spot
                <input
                type='url'
                value={prev}
                onChange={e => setPrev(e.target.value)}
                ></input>
            </label>
            <label>Country
                <input
                type='url'
                value={img2}
                onChange={e => setImg2(e.target.value)}
                ></input>
            </label>
            <label>Country
                <input
                type='url'
                value={img3}
                onChange={e => setImg3(e.target.value)}
                ></input>
            </label>
            <label>Country
                <input
                type='url'
                value={img4}
                onChange={e => setImg4(e.target.value)}
                ></input>
            </label>
            <label>Country
                <input
                type='url'
                value={img5}
                onChange={e => setImg5(e.target.value)}
                ></input>
            </label>
            <button
            type='submit'>Create Spot</button>

        </div>
    )
}
