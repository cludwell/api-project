import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createSpotBackEnd } from '../../store/spots'
import { createSpotImageBackEnd } from '../../store/spotImages'
import './CreateSpotModal.css'

export default function CreateSpotModal() {
    const [country, setCountry] = useState('Country')
    const [address, setStreet] = useState('Address')
    const [city, setCity] = useState('City')
    const [state, setState] = useState('STATE')
    const [lat, setLat] = useState('Latitude')
    const [lng, setLng] = useState('Longitude')
    const [description, setDesc] = useState('Please write at least 30 characters')
    const [name, setTitle] = useState('Name of your spot')
    const [price, setPrice] = useState('Price per night (USD)')
    const [prev, setPrev] = useState('Preview Image URL')
    const [img2, setImg2] = useState('Image URL')
    const [img3, setImg3] = useState('Image URL')
    const [img4, setImg4] = useState('Image URL')
    const [img5, setImg5] = useState('Image URL')
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();

    const validate = () => {
        const err = {}
        if (country === 'Country' || !country) err.country = 'Country is required'
        if (address === 'Street' || !address) err.address = 'Address is required'
        if (city === 'City' || !city) err.city = 'City is required'
        if (state === 'state' || !state) err.state = 'State is required'
        if (lat === 'Latitude' || !lat) err.lat = 'Latitude is required'
        if (lng === 'Longitude' || !lng) err.lng = 'Longitude is required'
        if (description.length < 30 || description === 'Please write at least 30 characters' || !description) err.description = 'Description needs a minimum of 30 characters'
        if (name.length < 4 || !name || name === 'Name of your spot') err.name = 'Name is required'

        if ((prev === 'Image URL' || !prev) && (!prev.endsWith('.png') || !prev.endsWith('.jpg') || !prev.endsWith('.jpeg')) ) err.prev = 'Preview Image is required'
        if ((img2 !== 'Image URL') && (!img2.endsWith('.png') || !img2.endsWith('.jpg') || !img2.endsWith('.jpeg')) ) err.img2 = 'Image URL must end in .png, .jpg, or .jpeg'
        if ((img3 !== 'Image URL') && (!img3.endsWith('.png') || !img3.endsWith('.jpg') || !img3.endsWith('.jpeg')) ) err.img3 = 'Image URL must end in .png, .jpg, or .jpeg'
        if ((img4 !== 'Image URL') && (!img4.endsWith('.png') || !img4.endsWith('.jpg') || !img4.endsWith('.jpeg')) ) err.img4 = 'Image URL must end in .png, .jpg, or .jpeg'
        if ((img5 !== 'Image URL') && (!img5.endsWith('.png') || !img5.endsWith('.jpg') || !img5.endsWith('.jpeg')) ) err.img5 = 'Image URL must end in .png, .jpg, or .jpeg'
        setErrors(err)
    }

    const handleSubmit = e => {
        e.preventDefault();
        validate();
        if (!errors.length) {
            console.log('SENDING FIRST DISPATCH')
            dispatch(createSpotBackEnd({ country, address, state, city, lat, lng, description, name, price}))
            .catch(async (res) => {
            const data = await res.json();
            console.log('RESPONSE FROM CREATE SPOT', data)
            if (data && data.errors) setErrors(data.errors);
            else {
                [ prev, img2, img3, img4, img5 ].forEach(image => {
                    console.log(image)
                    if (image) dispatch(createSpotImageBackEnd(data.id, {image, "preview": true}))
                })
            }
        })
        }
    }
    return (
        <div className='create-spot-modal'>
            <form onSubmit={handleSubmit} >
            <h1 className='create-spot'>Create a New Spot</h1>
            <h2 className='create-subtitle'>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <label>Country
                <span className='errors'>{errors.country}</span>
                <input
                type='text'
                value={country}
                onChange={e => setCountry(e.target.value)}
                ></input>
            </label>
            <label>Street Address
                <span className='errors'>{errors.street}</span>
                <input
                type='text'
                value={address}
                onChange={e => setStreet(e.target.value)}
                ></input>
            </label>
            <label>City
            <span className='errors'>{errors.city}</span>
                <input
                type='text'
                value={city}
                onChange={e => setCity(e.target.value)}
                ></input>
            </label>
            <label>State
            <span className='errors'>{errors.state}</span>
                <input
                type='text'
                value={state}
                onChange={e => setState(e.target.value)}
                ></input>
            </label>
            <label>Latitude
            <span className='errors'>{errors.lat}</span>
                <input
                type='text'
                value={lat}
                onChange={e => setLat(e.target.value)}
                ></input>
            </label>
            <label>Longitude
            <span className='errors'>{errors.lng}</span>
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
                value={description}
                onChange={e => setDesc(e.target.value)}
                ></textarea>
                <p className='errors'>{errors.desc}</p>
            </label>
            <hr/>
            <h2 className='create-title'>Create a title for your spot</h2>
            <label>Catch guests' attention with a spot title that highlights what makes your place special.
                <input
                type='text'
                value={name}
                onChange={e => setTitle(e.target.value)}
                ></input>
                <p className='errors'>{errors.title}</p>

            </label>
            <hr/>
            <h2 className='create-price'>Set a base price for your spot</h2>
            <label>Competetive pricing can help your listing stand out and rank higher in search results.
                <input
                type='text'
                value={price}
                onChange={e => setPrice(e.target.value)}
                ></input>
                <p className='errors'>{errors.price}</p>
            </label>
            <hr/>
            <h2>Liven up your spot with photos</h2>
            <label>Submit a link to at least one photo to publish your spot
                <input
                type='url'
                value={prev}
                onChange={e => setPrev(e.target.value)}
                ></input>
                <p className='errors'>{errors.prev}</p>
            </label>
            <label>
                <input
                type='url'
                value={img2}
                onChange={e => setImg2(e.target.value)}
                ></input>
                <p className='errors'>{errors.img2}</p>
            </label>
            <label>
                <input
                type='url'
                value={img3}
                onChange={e => setImg3(e.target.value)}
                ></input>
                <p className='errors'>{errors.img3}</p>
            </label>
            <label>
                <input
                type='url'
                value={img4}
                onChange={e => setImg4(e.target.value)}
                ></input>
                <p className='errors'>{errors.img4}</p>
            </label>
            <label>
                <input
                type='url'
                value={img5}
                onChange={e => setImg5(e.target.value)}
                ></input>
                <p className='errors'>{errors.img5}</p>
            </label>
            <button
            type='submit'>Create Spot</button>
            </form>
        </div>
    )
}
