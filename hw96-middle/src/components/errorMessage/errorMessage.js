import React from 'react';
import './errorMessage.css';

const ErrorMessage = ({text}) => {
    return (
        <>
            <img className="block-img-error" src={process.env.PUBLIC_URL + '/img/error.png'} alt='error'/>
            <span>{text || "Something goes wrong"}</span>
        </>);
}

export default ErrorMessage;