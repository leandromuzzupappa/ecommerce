import React from 'react';

import './styles.scss';

const FormInput = ({handlechange, label, ...otherProps}) => {
    return (
        <div className="formRow">
            {label && (
                <label>
                    {label}
                </label>
            )}
            <input className="formInput" onChange={handlechange} {...otherProps}/>
        </div>
    )
}

export default FormInput;