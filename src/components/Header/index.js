import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utils';

import './styles.scss';
import Logo from '../../assets/images/logo_outlet.svg';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const Header = props => {
    const { currentUser } = useSelector(mapState); 
    return (
        <header className="header">
            <div className="wrapper">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Kosiko Outlet"/>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/#thisGonnaBeMyEshop">
                                E-SHOPP KSK
                            </Link>
                        </li>

                    </ul>
                </nav>
                <div className="helperNav">
                    {currentUser && (
                        <ul>
                            <li>
                                <Link to="/dashboard">
                                    My account
                                </Link>
                            </li>
                            <li>
                                <span onClick={() => auth.signOut()}>
                                    Logout
                                </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/registration">
                                    Registration
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
}

export default Header;