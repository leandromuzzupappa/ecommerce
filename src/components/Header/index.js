import React from 'react';
import {Link} from 'react-router-dom';

import './styles.scss';
import Logo from '../../assets/images/logo_outlet.svg';

const Header = props => {
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
                                E-SHOPP
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="helperNav">
                    <ul>
                        <li>
                            <Link to="/registration">
                                Registration
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;