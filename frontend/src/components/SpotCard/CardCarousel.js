import { useEffect, useState } from 'react'
import './CardCarousel.css'

export default function CardCarousel({ images, chosenImage, setChosenImage }) {
    const [ current, setCurrent ] = useState(0)
    const nextImage = () => {
        setCurrent(current + 1)
        setChosenImage(current + 1)
    }
    const prevImage = () => {
        setCurrent(current - 1)
        setChosenImage(current - 1)
    }
    useEffect(() => {
        setCurrent(chosenImage ? chosenImage
            : chosenImage === 0 ? 0
            : current)
    }, [chosenImage, current])

    return (
    <div className='card-carousel'>

    <div className='left-arrow' onClick={prevImage}>
    <i className="fa-solid fa-circle-left"/>
    </div>

    <div className='right-arrow' onClick={nextImage}>
    <i className="fa-solid fa-circle-right"/>
    </div>

    {images.map((img, i) => (
        <>
        <div className={i === current ? 'slide active' : 'slide'} key={`carousel${i}`}>
            {i === current && (
                <img src={img.url} className='slider-images' alt='' key={`img${i}`} />
            )}
        </div>
        <span className={i === current ? 'dot-ticker-chosen' : 'dot-ticker'}>•</span>
        </>
    ))}

    </div>
    )
}
