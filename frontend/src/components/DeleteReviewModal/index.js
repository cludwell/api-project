import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./DeleteReviewModal.css";
import { deleteReviewById } from "../../store/reviews";
import { useDispatch } from "react-redux";
export default function DeleteReviewModal({ reviewId, spotId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDeletion = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewById(reviewId))
      .then(closeModal())
      .then(history.push(`/spotsfe/${spotId}`));
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    closeModal();
  };
  return (
    <div className="delete-modal">
      <h1 className="delete-title">Confirm Delete</h1>
      <h3>Are you sure you want to delete this review?</h3>
      <hr></hr>
      <button className="green-button" onClick={handleDeletion}>
        Yes
      </button>
      <button className="grey-button" onClick={handleGoBack}>
        No (Keep Spot)
      </button>
    </div>
  );
}
