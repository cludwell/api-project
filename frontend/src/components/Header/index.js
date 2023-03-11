import Navigation from '../Navigation'
import './Header.css'

function Header({ props }) {
    return (
        <>
        <div className='header'>
            <div className='logo-side'>
            <i class="fa-solid fa-ghost"></i>
            <span className='logo'>scarebnb</span>
            </div>

            <div className='navigation-corner'>
                <span className='scarebnb-home'>Scarebnb your home</span>
                <i class="fa-solid fa-globe"></i>
                <Navigation></Navigation>
            </div>
        </div>
        </>
    )
}

export default Header
