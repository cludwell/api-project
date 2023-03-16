import './DeleteSpotModal.css'

export default function DeleteSpotModal() {
    
    return (
        <div className='delete-modal'>
            <h1 className='delete-title'>Confirm Delete</h1>
            <button className='green-button'>Yes</button>
            <button className='grey-button'>No (Keep Spot)
            </button>
        </div>
    )
}
