import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteReviewById } from '../../store/reviews';
import './PostReviewModal.css'

export default function PostReviewModal({ spotId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();
    const [stars, setStars] = useState(0)
    const [review, setReview] = useState('')
    const [errors, setErrors] = useState({});
    const [disable, setDisable] = useState()

    useEffect(() => review.length < 10 ? setDisable(true) : setDisable(true), [review])

    const validate = () => {
        const err = {}
        if (stars < 1 || stars > 5) err.stars = 'Stars must be an integer from 1 to 5'
        if (review)
        setErrors(err)
    }

    const handleSubmit = e => {
        e.preventDefault();
        validate();

        if (Object.values(errors).length) return

        dispatch(deleteReviewById({review, stars}))
        .then(closeModal())
        .catch(async res => {
            const data = await res.json();
            if (data && data.errors) setErrors(Object.values(data.errors))
        })
        .then(history.pushState(`/spotsfe/${spotId}`))
    }

    return (
        <div className='post-review-modal'>
            <form className='post-review-form'
            onSubmit={handleSubmit}>
                <h3>How was your stay? </h3>
                <p className='errors'>{errors.message}</p>
            <textarea
            type='text'
            value={review}
            placeholder='Leave your review here...'
            onChange={e => setReview(e.target.value)}
            />
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
