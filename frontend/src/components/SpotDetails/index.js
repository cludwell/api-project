import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { findSpotReviews } from '../../store/reviews';
import { restoreUser } from '../../store/session';
import { findSingleSpot } from '../../store/singlespot';
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './SpotDetails.css'
import { useRef } from 'react';
import PostReviewModal from '../PostReviewModal';
import LoadingIcon from '../LoadingIcon';
import Map from './Map';
import { bookingsBySpotId, createBookingRequest } from '../../store/bookings';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export default function SpotDetails() {
    const today = new Date().toISOString().slice(0, -14)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const { spotId } = useParams()
    const dispatch = useDispatch();
    const [ hasLoaded, setHasLoaded ] = useState(false)
    const [ checkin, setCheckin ] = useState(today)
    const [ checkout, setCheckout ] = useState(tomorrow)
    const history = useHistory()
    // const [ hasSubmitted, setHasSubmitted ] = useState(false)
    // const [ adults, setAdults ] = useState(1)
    // const [ children, setChildren ] = useState(0)
    // const [ infants, setInfants ] = useState(0)
    // const [ pets, setPets ] = useState(0)
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
            await dispatch(bookingsBySpotId(spotId))
            return setHasLoaded(true)
        }
        dispatch(restoreUser());
        loadData()
    }, [dispatch, spotId])


    const bookings = useSelector(state => state.bookings.allBookings.Bookings)
    //slices of state
    const singleSpot = useSelector(state => state.singleSpot)
    const spotReviews = useSelector(state => state.reviews)
    const user = useSelector(store => store.session.user)
    const averageRating = spotReviews.length >= 1 ? spotReviews.reduce((acc, ele) => acc + ele.stars, 0) / spotReviews.length : 'New!'
    const staySeconds = (Date.parse(checkout) - Date.parse(checkin))
    let stayDuration = Math.floor(staySeconds/ (3600*24)) / 1000
    const baseCost = (singleSpot.price * stayDuration).toFixed(0)
    const serviceFee = (singleSpot.price * stayDuration * .1).toFixed(0)
    const unavailable = bookings?.map(ele => ({ start: new Date(ele.startDate), end: new Date(ele.endDate) }));
    const total = parseInt(baseCost) + parseInt(serviceFee) + 20

    const reviewLogic = () => {
       return singleSpot.numReviews === 0 ? (
         <>
            <i className="fa-solid fa-star star"></i>
            New!
        </>) : (
        <>
            <i className="fa-solid fa-star star"></i>
            {averageRating} ●
            {singleSpot.numReviews === 1 ? ` ${singleSpot.numReviews} Review`
            : ` ${singleSpot.numReviews} Reviews`}
        </>
        )}

    if (!hasLoaded) return <LoadingIcon />;

    const handleCheckin = date => {
        setCheckin(new Date(date))
        if (date  >= new Date(checkout)) setCheckout(new Date(Date.parse(date) + 86400000))
    }

    const onSubmit = async e => {
        e.preventDefault()
        const booking = await dispatch(createBookingRequest({startDate: checkin, endDate: checkout, spotId: spotId, cost: total}))
        history.push(`/bookings/${booking.id}`)
    }

    return (
    <div className='spot-details-page'>
    <div className='spot-details-90'>
        <div className='spot-details'>
            <h1 className='spot-name'>{singleSpot.name}</h1>
            <h5>{reviewLogic()} ● {singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h5>
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
            <div className='description-text'>
            <div className='spot-accolades'>
            <hr></hr>

            <div className='dedicated-workspace spot-accolade'>
                <div className='icon'><i className="fa-solid fa-house-laptop"></i></div>
                <div className='accolade-text'>
                <div className='bold-text'>Dedicated Workspace</div>
                <div className='accolade-grey-text'>A room with wifi that's well-suited for working</div>
                </div>
            </div>
            <div className='self-checkin spot-accolade'>
                <div className='icon'><i className="fa-solid fa-door-open"></i></div>
                <div className='accolade-text'>
                <div className='bold-text'>Self Check In</div>
                <div className='accolade-grey-text'>Check yourself in with the keypad</div>
                </div>
            </div>
            <div className='self-checkin spot-accolade'>
                <div className='icon'><i className="fa-regular fa-calendar"></i></div>
                <div className='accolade-text'>
                <div className='bold-text'>Free cancellation</div>
                {/* <div className='accolade-grey-text'>A room with wifi that's well-suited for working</div> */}
                </div>
            </div>

            <hr></hr>
            </div>
            <p className='description'>{singleSpot.description}</p>
            <hr></hr>
            <h3>What this place offers</h3>

            <div className='spot-offers'>
            <i className="fa-solid fa-mountain"></i>
            <span>Wonderful views</span>
            </div>

            <div className='spot-offers'>
            <i className="fa-solid fa-kitchen-set"></i>
            <span>Kitchen</span>
            </div>

            <div className='spot-offers'>
            <i className="fa-solid fa-wifi"></i>
            <span>Wifi</span>
            </div>

            <div className='spot-offers'>
            <i className="fa-solid fa-car"></i>
            <span>Free on-site parking</span>
            </div>

            </div>
            <div className='price-review-reserve'>
                <div className='reserve-text'>
                <span className='reserve-left'>
                    <span className='reserve-left-price'>${singleSpot.price} </span>  <span className='reserve-night'>night</span>
                </span>
                <span className='reserve-right'>
            {reviewLogic()}
                </span>
              </div>

              <form className='reserve-spot' onSubmit={onSubmit}>

                <div className='all-but-button'>

                <div className='reserve-container checkin'>
                <label className='reserve-checkin'>CHECK-IN</label>
                <DatePicker
                className='reserve-start-date'
                type='date'
                dateFormat='yyyy/MM/dd'
                selected={checkin ? new Date(checkin) : new Date()}
                scrollableMonthYearDropdown
                excludeDateIntervals={unavailable}
                onChange={date => handleCheckin(date)}
                minDate={new Date()}
                />

                </div>
                <div className='reserve-container checkout'>
                <label className='reserve-checkout'>CHECKOUT</label>
                <DatePicker
                className='reserve-end-date'
                type='date'
                dateFormat={'yyyy/MM/dd'}
                selected={checkout ? new Date(checkout) : null}
                scrollableMonthYearDropdown
                excludeDateIntervals={unavailable}
                onChange={date => setCheckout(date)}
                minDate={checkin}
                />
                </div>

                </div>

                <button className='reserve-button' disabled={user ? false : true}>Reserve</button>
              </form>
                <p className='reserve-grey-text'>You won't be charged yet </p>
                <table className='reserve-breakdown'>
                <tbody>
                    <tr>
                        <td className='reserve-item'>{singleSpot.price} x {stayDuration} nights</td>
                        <td className='reserve-item-cost'>${baseCost}</td>
                    </tr>
                    <tr>
                        <td className='reserve-item'>Cleaning fee</td>
                        <td className='reserve-item-cost'>$20</td>
                    </tr>
                    <tr>
                        <td className='reserve-item'>Scarebnb service fee</td>
                        <td className='reserve-item-cost'>${serviceFee}</td>
                    </tr>
                </tbody>
                </table>
                <hr className='reserve-hr'></hr>
                <div className='reserve-total-before-taxes'><span>Total Before Taxes</span> <span className='reserve-total-price'>${total}</span></div>



            </div>
        </div>

        </div>

        <hr className='rounded'/>
        <div className='reviews-printed'>
            <h4>{reviewLogic()}
         </h4>
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

                <div className='review-user-info' key={`review-user-info${i}`}>
                <img src='https://i.imgur.com/mMEwXsu.png' alt='user-icon' key={`icon${i}`} className='user-icon'/>

                <div className='review-text'>
                <div className='username-title' key={'username-iter'+i}>{rev.User.firstName}</div>
                <div className='review-date' key={'created-iter'+i}>
                    {new Intl.DateTimeFormat('en-GB', {
                    year: "numeric",
                    month: "long",
                    timeZone: 'America/Los_Angeles' })
                    .format(Date.parse(rev.createdAt))
                }
                </div>

                </div>
                </div>

                <span className='review-body' key={'reviewbody' +i}>{rev.review}</span>
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
                {/* <hr className='review-divider'></hr> */}
            </div>

            )) : user && singleSpot.Owner.id !==  user.id ? <p>Be the first to post a review!</p>
                : null}
        </div>
        <hr></hr>
        <h4>Where you'll be</h4>
        <h5 className='grey where-youll-be'>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h5>
        <Map spot={singleSpot} />
        <hr></hr>
    </div>
    </div>
    )
}
