import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { findSpotReviews } from '../../store/reviews';
import { findSingleSpot } from '../../store/singlespot';
import './SpotDetails.css'

export default function SpotDetails() {
    const {spotId} = useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findSingleSpot(spotId))
        dispatch(findSpotReviews(spotId))
        // dispatch()
    }, [dispatch, spotId])
    const singleSpot = useSelector(state => state.singleSpot)
    const spotReviews = useSelector(state => state.reviews)
    console.log('STATE IN COMPONENT', singleSpot)
    if (!Object.entries(singleSpot).length) return null;
    if (!Object.entries(spotReviews).length) return null;

    const featureAlert = () => alert('Feature coming soon')
    return (
    <>
        <div className='spot-details'>
            <h1 className='spot-name'>{singleSpot.name}</h1>
            <h2 className='spot-subtitle'>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h2>
            <div className='detail-images'>

            {singleSpot.SpotImages.map((ele, i) => (
                i < 6 ? <img src={ele.url}
                alt='main'
                key={i}
                className={`detail-image detail-image-${i}`}></img> : null
            ))}

            </div>
            <h1 className='hosted-by'>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</h1>
            <p className='description'>{singleSpot.description}</p>
            <div className='price-review-reserve'>
                <span className='reserve-left'>${singleSpot.price} night</span>
                <span className='reserve-right'>
            {singleSpot.numReviews === 0 ? (<>
            <i className="fa-solid fa-star"></i>
            New!
            </>) : (<>
            <i className="fa-solid fa-star"></i>
            {singleSpot.avgStarRating}
             ●
            {singleSpot.numReviews === 1 ? singleSpot.numReviews + ' Review'
            :singleSpot.numReviews + ' Reviews'}
        </>)}
                </span>
                <button className='reserve-button'
                onClick={featureAlert}>Reserve</button>
            </div>
        </div>
        <hr className='rounded'/>
        <div className='reviews-printed'>
            <h1>{singleSpot.numReviews === 0 ? (<>
            <i className="fa-solid fa-star"></i>
            New!
            </>) : (<>
            <i className="fa-solid fa-star"></i>
            {singleSpot.avgStarRating}
             ●
            {singleSpot.numReviews === 1 ? singleSpot.numReviews + ' Review'
            :singleSpot.numReviews + ' Reviews'}
         </>)}</h1>
            {spotReviews.length ? spotReviews
            .sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt))
            .map((rev, i) => (
                <>
                <h3 className='username-title'
                key={'username-iter'+i}>{rev.User.firstName}</h3>
                <h4 className='review-date'
                key={'created-iter'+i}>
                    {new Intl.DateTimeFormat('en-GB', {
                    year: "numeric",
                    month: "long",
                    timeZone: 'America/Los_Angeles' })
                    .format(Date.parse(rev.createdAt))
                }
                </h4>
                <p className='review-body'
                key={'reviewbody' +i}>{rev.review}</p>
                </>
            )) : <p>Be the first to post a review!</p>}
        </div>
    </>
    )
}
