import React from 'react';

import './styles.scss';

const AuthWrapper = ({headline, children, classes}) => {
    return (
        <div className={`authWrapper ${classes && classes}`}>
            {headline && <h2>{headline}</h2>}

            {children && children}
        </div>
    )
}

export default AuthWrapper;