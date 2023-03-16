import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSpotData } from '../../store/spots'
// import { createSpotImageBackEnd } from '../../store/spotImages'
import './UpdateSpotModal.css'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { findSingleSpot } from '../../store/singlespot'

export default function UpdateSpotModal({ spot }) {

    //spotimages not attached with spot state passed as props
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findSingleSpot(spot.id))
    }, [dispatch, spot.id])
    const updateSpot = useSelector(state => state.singleSpot)

    //this will be used when updating images is added

    // const spotImgArray = updateSpot.SpotImages.map(img => img.url)
    // console.log(spotImgArray)
    // const spotImage2 = spotImgArray[1] ? spotImgArray[1] : ''
    // const spotImage3 = spotImgArray[2] ? spotImgArray[2] : ''
    // const spotImage4 = spotImgArray[3] ? spotImgArray[3] : ''
    // const spotImage5 = spotImgArray[4] ? spotImgArray[4] : ''

    const [country, setCountry] = useState(spot.country)
    const [address, setStreet] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [description, setDesc] = useState(spot.description)
    const [name, setTitle] = useState(spot.name)
    const [price, setPrice] = useState(spot.price)
    // const [prev, setPrev] = useState(spot.previewImage)
    // const [img2, setImg2] = useState(spotImage2)
    // const [img3, setImg3] = useState(spotImage3)
    // const [img4, setImg4] = useState(spotImage4)
    // const [img5, setImg5] = useState(spotImage5)
    const [errors, setErrors] = useState({})
    const history = useHistory();
    const { closeModal } = useModal();


    //handling validation errors
    const validate = () => {
        const err = {}
        //most fields must have data
        if (!country) err.country = 'Country is required'
        if (!address) err.address = 'Address is required'
        if (!city) err.city = 'City is required'
        if (!state) err.state = 'State is required'
        if (!lat) err.lat = 'Latitude is required'
        if (!lng) err.lng = 'Longitude is required'
        if (description.length < 30 || !description) err.description = 'Description needs a minimum of 30 characters'
        if (name.length < 4 || !name) err.name = 'Name is required'

        //want logic to accept default or empty string
        //otherwise url must be a url
        // if (!prev || (!prev.endsWith('.png') || !prev.endsWith('.jpg') || !prev.endsWith('.jpeg')) ) err.prev = 'Preview Image is required'
        // if (img2 && (!img2.endsWith('.png') || !img2.endsWith('.jpg') || !img2.endsWith('.jpeg')) ) err.img2 = 'Image URL must end in .png, .jpg, or .jpeg'
        // if (img3 && (!img3.endsWith('.png') || !img3.endsWith('.jpg') || !img3.endsWith('.jpeg')) ) err.img3 = 'Image URL must end in .png, .jpg, or .jpeg'
        // if (img4 && (!img4.endsWith('.png') || !img4.endsWith('.jpg') || !img4.endsWith('.jpeg')) ) err.img4 = 'Image URL must end in .png, .jpg, or .jpeg'
        // if (img5 && (!img5.endsWith('.png') || !img5.endsWith('.jpg') || !img5.endsWith('.jpeg')) ) err.img5 = 'Image URL must end in .png, .jpg, or .jpeg'
        setErrors(err)
    }

    //upon submission, do this
    const handleSubmit = async e => {
        e.preventDefault();
        validate();

        if (Object.values(errors).length) return;
        await dispatch(updateSpotData({ id: updateSpot.id, country, address, state, city, lat, lng, description, name, price }))
            .then(res =>{
                const clone = res.clone();
                if (clone.ok) return clone.json();
            })
            // .then(closeModal())
            .then(data => history.push(`/spotsfe/${data.id}`))
            .then(closeModal())

        //image updates are optional, would have to write put for each image url

        // dispatch(createSpotImageBackEnd(spot?.id, {url: prev, "preview": true}))
        // if (img2) dispatch(createSpotImageBackEnd(spot?.id, {url: img2, "preview": true}))
        // if (img3) dispatch(createSpotImageBackEnd(spot?.id, {url: img3, "preview": true}))
        // if (img4) dispatch(createSpotImageBackEnd(spot?.id, {url: img4, "preview": true}))
        // if (img5) dispatch(createSpotImageBackEnd(spot?.id, {url: img5, "preview": true}))


    }
    return (
        <div className='create-spot-modal'>
            <form onSubmit={handleSubmit} >
            <h1 className='create-spot'>Update Your Spot</h1>
            <h2 className='create-subtitle'>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <label>Country
                <span className='errors'>{errors.country}</span>
                <input
                type='text'
                value={country}
                placeholder='Country'
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
                type='number'
                value={lat}
                onChange={e => setLat(e.target.value)}
                ></input>
            </label>
            <label>Longitude
            <span className='errors'>{errors.lng}</span>
                <input
                type='number'
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
                placeholder='Please write at least 30 characters'
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
                placeholder='Name of your spot'
                onChange={e => setTitle(e.target.value)}
                ></input>
                <p className='errors'>{errors.title}</p>

            </label>
            <hr/>
            <h2 className='create-price'>Set a base price for your spot</h2>
            <label>Competetive pricing can help your listing stand out and rank higher in search results.
            <input
                type='number'
                min={0.00}
                step={0.01}
                value={price}
                placeholder='Price per night (USD)'
                onChange={e => setPrice(e.target.value)}
                ></input>
                <p className='errors'>{errors.price}</p>
            </label>
            <hr/>
            {/* <h2>Liven up your spot with photos</h2>
            <label>Submit a link to at least one photo to publish your spot
                <input
                type='text'
                value={prev}
                placeholder='Preview Image URL'
                onChange={e => setPrev(e.target.value)}
                ></input>
                <p className='errors'>{errors.prev}</p>
            </label>
            <label>
                <input
                type='url'
                value={img2}
                placeholder='Image URL'
                onChange={e => setImg2(e.target.value)}
                ></input>
                <p className='errors'>{errors.img2}</p>
            </label>
            <label>
                <input
                type='url'
                value={img3}
                placeholder='Image URL'
                onChange={e => setImg3(e.target.value)}
                ></input>
                <p className='errors'>{errors.img3}</p>
            </label>
            <label>
                <input
                type='url'
                value={img4}
                placeholder='Image URL'
                onChange={e => setImg4(e.target.value)}
                ></input>
                <p className='errors'>{errors.img4}</p>
            </label>
            <label>
                <input
                type='url'
                value={img5}
                placeholder='Image URL'
                onChange={e => setImg5(e.target.value)}
                ></input>
                <p className='errors'>{errors.img5}</p>
            </label> */}
            <button
            type='submit'>Update Your Spot</button>
            </form>
        </div>
    )
}
