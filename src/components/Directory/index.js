import React from 'react';

import shopHerencia from '../../assets/images/homepage-hcg.jpg';
import shopKosiuko from '../../assets/images/homepage-ksk.jpg';
import './styles.scss';

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrapper">
                <div className="item item--hcg">
                    <a href="#dsa">
                        Shop Herencia
                    </a>
                </div>
                <div className="item item--ksk">
                    <a href="#dsa">
                        Shop Kosiuko
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Directory;