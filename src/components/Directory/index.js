import React from 'react';

import './styles.scss';

const Directory = props => {
    return (
        <div className="directory">
            <div className="item item--hcg">
                <a href="#hcg">
                    Shop Herencia
                </a>
            </div>
            <div className="item item--ksk">
                <a href="#ksk">
                    Shop Kosiuko
                </a>
            </div>
        </div>
    )
}

export default Directory;