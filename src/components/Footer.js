import React from 'react';

const Footer = () => {
    return (
        <div style={{
            width: '100%',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <p style={{margin: '0 auto'}}>Copyright @ 2020 Demo Streaming</p>
            <p>Home | Terms and Conditions | Privacy Policy | Collection Statement | Help | Manage Account</p>
            <div>
                <i className="facebook icon"></i>
                <i className="twitter icon"></i>
                <i className="instagram icon"></i>
            </div>
        </div>
    )
}

export default Footer;