import './Header.css'
import logo from '../../images/purpplanchette.png'
import { Link } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Navigation from '../Navigation'
function Header({ props, isLoaded }) {
    return (
        <>
        <div className='header'>

        <div className='logo-side'>
            <Link to={`/`}>
            <img src={logo} alt='logo' className='planchette'/>
            {/* <i class="fa-solid fa-ghost"></i> */}
            <span className='logo'>scarebnb</span>
            </Link>
        </div>
            <div className='navigation-corner'>
                <span className='scarebnb-home'>Scarebnb your home</span>
                <i class="fa-solid fa-globe"></i>
                <Navigation isLoaded={isLoaded} />
                {isLoaded && (
                    <Switch>
                    </Switch>
                )}
            </div>
        </div>
        </>
    )
}

export default Header
