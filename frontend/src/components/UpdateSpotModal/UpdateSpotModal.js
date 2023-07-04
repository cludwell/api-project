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
        if (!price) err.price = 'Price must be equal to or greater than 0'
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
            <h2 className='create-spot'>Update Your Spot</h2>
            <h3 className='create-subtitle'>Where's your place located?</h3>
            <p className='guests'>Guests will only get your exact address once they booked a reservation.</p>

            <label className='create-label'>Country</label>
                <span className='errors'>{errors.country}</span>
                <input
                className='create-input create-country'
                type='text'
                value={country}
                placeholder='Country'
                onChange={e => setCountry(e.target.value)}
                ></input>

              <label className='create-label'>Street Address</label>
                <span className='errors'>{errors.address}</span>
              <input
              className='create-input create-address'
                type='text'
                value={address}
                placeholder='Address'
                onChange={e => setStreet(e.target.value)}
                ></input>
            <div className='create-segment'>
               <div>
                <label className='create-half'>City</label>
            <span className='errors'>{errors.city}</span>
                <input
                className='create-input create-city'
                type='text'
                value={city}
                placeholder='City'
                onChange={e => setCity(e.target.value)}
                ></input>
                </div>
            <div>
                <label>State</label>
            <span className='errors'>{errors.state}</span>
                <input
                className='create-input create-state'
                type='text'
                value={state}
                placeholder='State'
                onChange={e => setState(e.target.value)}
                ></input>
                </div>
            <div>
            <label>Latitude </label>
            <span className='errors'>{errors.lat}</span>
                <input
                className='create-lat create-input'
                type='number'
                value={lat}
                placeholder='Latitude'
                onChange={e => setLat(e.target.value)}
                ></input>
                </div>

        <div>
            <label>Longitude</label>
            <span className='errors'>{errors.lng}</span>
                <input
                className='create-input create-lng'
                type='number'
                value={lng}
                placeholder='Longitude'
                onChange={e => setLng(e.target.value)}
                ></input>
            </div>
            </div>
            <hr/>

            <h3 className='create-subtitle'>Describe your place to guests</h3>
            <label
            className='create-label'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.
                <textarea
                className='create-input create-desc'
                type='text'
                value={description}
                placeholder='Please write at least 30 characters'
                rows={'7'}
                cols='50'
                onChange={e => setDesc(e.target.value)}
                ></textarea>
                <p className='errors'>{errors.description}</p>
            </label>
            <hr/>
            <h3 className='create-subtitle create-title'>Create a title for your spot</h3>

            <label className='create-label'>Catch guests' attention with a spot title that highlights what makes your place special.
             </label>
                <input
                className='create-input'
                type='text'
                value={name}
                placeholder='Name of your spot'
                onChange={e => setTitle(e.target.value)}
                ></input>
                <p className='errors'>{errors.name}</p>
            <hr/>
            <h3 className='create-price create-subtitle'>Set a base price for your spot</h3>
            <label className='create-label'>Competetive pricing can help your listing stand out and rank higher in search results.
           </label>
            <input
                className='create-input create-price'
                type='number'
                min={0.00}
                step={0.01}
                value={price}
                placeholder='Price per night (USD)'
                onChange={e => setPrice(e.target.value)}
            ></input>
                <p className='errors'>{errors.price}</p>

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
            type='submit'
            className='submit-button'>Update Your Spot</button>
            </form>
        </div>
    )
}
