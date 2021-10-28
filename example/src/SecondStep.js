import React from 'react';

export default function SecondStep({ goForward }) {
    return (
        <div>
            SecondStep
            <button className="btn btn-primary" onClick={ () => {
                goForward();
            } }>goForward</button>
        </div>
    );
}
