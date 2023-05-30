import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { findSpotReviews } from '../../store/reviews';
import { restoreUser } from '../../store/session';
import { findSingleSpot } from '../../store/singlespot';
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './SpotDetails.css'
import { useRef } from 'react';
import PostReviewModal from '../PostReviewModal';
import LoadingIcon from '../LoadingIcon';

export default function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch();
    const [ hasLoaded, setHasLoaded ] = useState(false)
    const [ checkin, setCheckin ] = useState()
    const [ checkout, setCheckout ] = useState()
    const [ adults, setAdults ] = useState(1)
    const [ children, setChildren ] = useState(0)
    const [ infants, setInfants ] = useState(0)
    const [ pets, setPets ] = useState(0)
    //modal functionality
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef();
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = e =>{
            if(!ulRef.current.contains(e.target)) setShowMenu(false)
        }
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])
    const closeMenu = () => setShowMenu(false)

    useEffect(() => {
        const loadData = async () => {
            await dispatch(findSingleSpot(spotId));
            await dispatch(findSpotReviews(spotId));
            return setHasLoaded(true)
        }
        dispatch(restoreUser());
        loadData()
    }, [dispatch, spotId])


    //slices of state
    const singleSpot = useSelector(state => state.singleSpot)
    const spotReviews = useSelector(state => state.reviews)
    const user = useSelector(store => store.session.user)
    const averageRating = spotReviews.length >= 1 ? spotReviews.reduce((acc, ele) => acc + ele.stars, 0) / spotReviews.length : 'New!'

    if (!hasLoaded) return <LoadingIcon />;

    return (
    <div className='spot-details-page'>
    <div className='spot-details-90'>
        <div className='spot-details'>
            <h1 className='spot-name'>{singleSpot.name}</h1>
            <h2 className='spot-subtitle'>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h2>
            <div className='detail-space'>

            <div className='detail-images-left'>
            <img src={singleSpot && singleSpot.SpotImages && singleSpot?.SpotImages[0]?.url }
                alt='main'
                key={`detail-image-1`}
                className={`detail-image detail-image-0`}></img>
            </div>
            <div className='detail-images-right'>
            {singleSpot.SpotImages.map((ele, i) => (
                //only display the first 5 images
                i > 0 && i < 5 ? <img src={ele.url}
                alt='main'
                key={`detail-image-${i}`}
                className={`detail-image detail-image-${i}`}></img> : null
            ))}
            </div>

            </div>
            <h1 className='hosted-by'>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</h1>
            <div className='description'>
            <p className='description'>{singleSpot.description}</p>
            <div className='price-review-reserve'>
                <div className='reserve-text'>
                <span className='reserve-left'>${singleSpot.price} night</span>
                <span className='reserve-right'>
            { //either the spot is new with no reviews, or numReviews is displayed
            singleSpot.numReviews === 0 ? (<>
            <i className="fa-solid fa-star star review-title-star"></i>
            New!
            </>) : (<>
            <i className="fa-solid fa-star star review-title-star"></i>
            {averageRating}
             ●
            { //either plural or singular number of reviews
            singleSpot.numReviews === 1 ? singleSpot.numReviews + ' Review'
            :singleSpot.numReviews + ' Reviews'}
        </>)}
                </span>
              </div>

              <form className='reserve-spot'>

                <div className='all-but-button'>

                <div className='reserve-container checkin'>
                <label className='reserve-checkin'>CHECK-IN</label>
                <input className='reserve-start-date' type='date' value={checkin} on onChange={e => setCheckin(e.target.value)}></input>
                </div>
                <div className='reserve-container checkout'>
                <label className='reserve-checkout'>CHECKOUT</label>
                <input className='reserve-end-date' type='date' value={checkout} onChange={e => setCheckout(e.target.value)}></input>
                </div>

                </div>

                <button className='reserve-button' >Reserve</button>
                {}
              </form>
            </div>
        </div>

        </div>

        <hr className='rounded'/>
        <div className='reviews-printed'>
            <h1>{singleSpot.numReviews === 0 ? (
        <>
            <i className="fa-solid fa-star star"></i>
            New!
        </>
            ) : (
         <>
            <i className="fa-solid fa-star star"></i>
            {averageRating}
             ●
            {singleSpot.numReviews === 1 ? singleSpot.numReviews + ' Review'
            :singleSpot.numReviews + ' Reviews'}
         </>
         )}
         </h1>
            {//ternary logic for if user is logged in and has no review for this spot but also there are no reviews yet
            user && user.id !== singleSpot.ownerId && !spotReviews.length ?
            (<OpenModalMenuItem
                className="post-review-button"
                itemText={`Post Your Review`}
                onClick={openMenu}
                onItemClick={closeMenu}
                modalComponent={<PostReviewModal spotId={singleSpot.id}/>}/>)
            //if user is logged, doesnt own spot but there are reviews, check to see if user has posted a review already
                : user && user.id !== singleSpot.ownerId && !spotReviews.some(r => r.userId === user.id) ?
            (<OpenModalMenuItem
                className="post-review-button"
                itemText={`Post Your Review`}
                onClick={openMenu}
                onItemClick={closeMenu}
                modalComponent={<PostReviewModal spotId={singleSpot.id}/>}/>)
                : null
            }
            {spotReviews && spotReviews.length ? spotReviews
            .sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt))
            .map((rev, i) => (

            <div className='review-container' key={`review-container${i}`}>
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
                <p className='review-body' key={'reviewbody' +i}>{rev.review}</p>
                {//ternary logic for review-owner to delete review
                user && user.id === rev.userId ? (
                <OpenModalMenuItem
                itemText={`Delete`}
                onClick={openMenu}
                onItemClick={closeMenu}
                modalComponent={<DeleteReviewModal spotId={singleSpot.id} reviewId={rev.id} />}
                key={`review-delete-button${rev.id}`}
                />

                ) : null}
                <hr className='review-divider'></hr>
            </div>

            )) : user && singleSpot.Owner.id !==  user.id ? <p>Be the first to post a review!</p>
                : null}
        </div>
    </div>
    </div>
    )
}
