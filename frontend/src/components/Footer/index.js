import './Footer.css'
import { Link } from 'react-router-dom'
export default function Footer() {

    return (
        <div className="footer-div">
        <h2 className="footer-title">Christian Ludwell
        <Link to={{ pathname: `https://www.linkedin.com/in/christian-ludwell-047b18247/`}} target='_blank'>
        <img
        src='https://i.imgur.com/RqO5mlh.png'
        alt='linkedinlogo'
        className='linkedin-icon'/>
        </Link>
        <Link to={{ pathname: 'https://github.com/cludwell'}} target='_blank'>
        <img
        src='https://i.imgur.com/KTjeA0w.png'
        alt='githubicon'
        className='github-icon'/>
        </Link>
        <span className="portfolio-icon">
        <Link to={{ pathname: 'https://cludwell.github.io/#'}} target='_blank' >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="32" width="32" id="curriculum-vitae" className='portfolio-svg'><g data-name="Curriculum Vitae-Resume-PortFolio-Application-Paper"><path fill="#e6e7e8" d="M54 11v46a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h32v6a2.006 2.006 0 0 0 2 2Z"></path><path fill="#bcbec0" d="M54 11h-6a2.006 2.006 0 0 1-2-2V3Z"></path><path fill="#d8d7da" d="M44 49V19h8v36h-8v-6z"></path><path fill="#ff9811" d="M42 47V17h8v36h-8v-6z"></path><path fill="#d8d7da" d="M40 38.9V41H16v-2.1a6 6 0 0 1 3.56-5.48l2.74-1.22L25 31v-2.68A7.013 7.013 0 0 1 21.08 23H20a2 2 0 0 1 0-4h1v-3a7 7 0 1 1 14 0v3h1a2 2 0 0 1 0 4h-1.08A7.013 7.013 0 0 1 31 28.32V31l2.7 1.2 2.74 1.22A6 6 0 0 1 40 38.9Z"></path><path fill="#3d9ae2" d="M38 36.9V39h-9l-1.82-6.18L28 32l3 1 .7-2.8 2.74 1.22A6 6 0 0 1 38 36.9Z"></path><path fill="#57565c" d="M33 14v2h-.66a3.014 3.014 0 0 1-2.91-2.27L29 12a4 4 0 0 1-4 4h-6v-2a7 7 0 1 1 14 0Z"></path><path fill="#1e81ce" d="M31.7 30.2 31 33l-3-1-1-2 2-1 2.7 1.2z"></path><path fill="#ed1c24" d="M27.18 32.82 29 39h-6l1.82-6.18L26 34l1.18-1.18z"></path><path fill="#ed1c24" d="m27 30 1 2-.82.82L26 34l-1.18-1.18L24 32l1-2h2z"></path><path fill="#1e81ce" d="m25 30-1 2-3 1-.7-2.8L23 29l2 1z"></path><path fill="#3d9ae2" d="M24.82 32.82 23 39h-9v-2.1a6 6 0 0 1 3.56-5.48l2.74-1.22.7 2.8 3-1Z"></path><path fill="#ffb655" d="M36 19a2.006 2.006 0 0 1-2 2h-2v-4h2a2.006 2.006 0 0 1 2 2zm-16-2v4h-2a2 2 0 0 1 0-4z"></path><path fill="#ffc477" d="M29 26v3l-2 1h-2l-2-1v-3h6z"></path><path fill="#ffb655" d="M29 26v2.32a6.958 6.958 0 0 1-6 0V26Z"></path><path fill="#ffc477" d="M32.34 16a3.014 3.014 0 0 1-2.91-2.27L29 12a4 4 0 0 1-4 4h-6v4a7 7 0 0 0 14 0v-4Z"></path><path fill="#ee8700" d="M42 34h5v2h-5zM42 46h5v2h-5zM42 38h3v2h-3zM42 42h3v2h-3zM42 22h5v2h-5zM42 30h3v2h-3zM42 26h3v2h-3zM22 18h2v2h-2zM28 18h2v2h-2z"></path><path fill="#bcbec0" d="M16 44h4v2h-4zM22 44h14v2H22zM16 48h20v2H16zM16 52h8v2h-8zM26 52h10v2H26z"></path></g></svg>
        </Link>
        </span>
        </h2>
        </div>
    )
}
