import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { postReviewById } from '../../store/reviews';
import './PostReviewModal.css'
import { restoreUser } from '../../store/session';

export default function PostReviewModal({ spotId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();
    const [stars, setStars] = useState('')
    const [review, setReview] = useState('')
    const [errors, setErrors] = useState({});
    const [disable, setDisable] = useState(true)

    useEffect(() => {
    if (review.length > 10) setDisable(false)
    else setDisable(true)
    }, [review])

    useEffect(()=> {
        dispatch(restoreUser())
    }, [dispatch])

    const user = useSelector(store => store.session.user)
    const validate = () => {
        const err = {}
        if (stars < 1 || stars > 5) err.stars = 'Stars must be an integer from 1 to 5'
        if (review.length < 10) err.review = 'Review must be at least 10 characters'
        setErrors(err)
    }

    const handleSubmit = e => {
        e.preventDefault();
        validate();

        if (Object.values(errors).length) return

        dispatch(postReviewById({review, stars, userId: user.id, spotId}))
        .then(closeModal())
        .catch(async res => {
            const data = await res;
            if (data && data.errors) setErrors(Object.values(data.errors))
        })
        .then(history.push(`/spotsfe/${spotId}`))
    }

    return (
        <div className='post-review-modal'>
            <form className='post-review-form'
            onSubmit={handleSubmit}>
                <h3>How was your stay? </h3>
                <p className='errors'>{errors.message}</p>
                <p className='errors'>{errors.stars}</p>
                <p className='errors'>{errors.review}</p>
            <textarea
            type='text'
            value={review}
            placeholder='Leave your review here...'
            onChange={e => setReview(e.target.value)}
            />
                <input
                type='number'
                min={0}
                max={5}
                value={stars}
                onChange={e => setStars(e.target.value)} ></input>
              <div className="rating-input">
              {[1, 2, 3, 4, 5].map((ele, i) => (
                    <div className={ stars >= ele ? `filled` : `empty`}
                    onMouseEnter={() => setStars(ele)}
                    onMouseLeave={() => setStars(stars)}
                    onClick={() => setStars(ele)}
                    key={i} >
                    <i className="fa-solid fa-star" key={ele}></i>
                    </div>
                ))}
            </div>
            <button className='sbumit-button'
            disabled={disable}>Submit Your Review</button>
            </form>
        </div>
    )
}
