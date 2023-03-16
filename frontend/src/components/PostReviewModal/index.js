import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './PostReviewModal.css'

export default function PostReviewModal({ spotId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const history = useHistory();
    
    const validate = () => {
        const err = {};
        setErrors(err)
    }

    const handleSubmit = e => {
        e.preventDefault();
        validate();

        if (Object.values(errors).length) return

        closeModal()
        history.pushState(`/spotsfe/${spotId}`)
    }

    return (
        <div className='post-review-modal'>


        </div>
    )
}
