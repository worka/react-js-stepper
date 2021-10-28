import React from 'react';

export default function FirstStep({ saveAndGoForward }) {
    return (
        <div>
            FirstStep
            <button className="btn btn-primary" onClick={ () => {
                saveAndGoForward('first');
            } }>saveAndGoForward</button>
        </div>
    );
}
