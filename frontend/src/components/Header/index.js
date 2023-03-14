import './Header.css'
import logo from '../../images/purpplanchette.png'
import { Link } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Navigation from '../Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { restoreUser } from '../../store/session'

function Header({ props, isLoaded }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreUser())
    }, [dispatch])
    const user = useSelector(store => store.session.user)
    console.log('HERE IS THE USER', user)
    const yourHome = (<span className='scarebnb-home'>Scarebnb your home</span>)
    const createSpot = <span className='scarebnb-home'>Create a Spot</span>
    return (
        <>
        <div className='header'>

        <div className='logo-side'>
            <Link to={`/`}>
            <img src={logo} alt='logo' className='planchette'/>
            <span className='logo'>scarebnb</span>
            </Link>
        </div>
            <div className='navigation-corner'>
                {typeof user === 'object' ? createSpot : yourHome}

                <i className="fa-solid fa-globe"></i>
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
