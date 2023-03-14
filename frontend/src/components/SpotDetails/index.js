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
    }, [dispatch, spotId])
    const singleSpot = useSelector(state => state.singleSpot)
    const spotReviews = useSelector(state => state.reviews)
    console.log('STATE IN COMPONENT', spotReviews)
    // console.log('WHAT IS IT', Object.entries(spotReviews))
    if (!Object.entries(singleSpot).length) return null;
    if (!Object.entries(spotReviews).length) return null;
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
                <i className="fa-solid fa-star"></i>
                {singleSpot.avgStarRating}
                <i className="fa-solid fa-hashtag"></i>
                <i className="fa-solid fa-ghost"></i>
                {singleSpot.numReviews}</span>
                <button className='reserve-button'>Reserve</button>
            </div>
        </div>
        <hr className='rounded'/>
        <div className='reviews-printed'>
            {spotReviews.length ? spotReviews.map((rev, i) => (
                <>
                <h3 className='username-title'
                key={'username'+i}>{rev.User.firstName}</h3>
                <h4 className='review-date'
                key={'created'+i}>{rev.createdAt.slice(0, 10)}</h4>
                <p className='review-body'
                key={'reviewbody' +i}>{rev.review}</p>
                </>
            )) : null}
        </div>
    </>
    )
}
