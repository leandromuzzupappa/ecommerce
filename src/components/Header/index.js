import React from 'react';

import './styles.scss';
import Logo from '../../assets/images/logo_outlet.svg';

const Header = props => {
    return (
        <header className="header">
            <div className="wrapper">
                <div className="logo">
                    <img src={Logo} alt="Kosiko Outlet"/>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="#dsa">E-shop</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;