import React from 'react';

export default function SecondStep({ goToNextStep }) {
    return (
        <div>
            SecondStep
            <button className="btn btn-primary" onClick={ () => {
                goToNextStep();
            } }>goToNextStep</button>
        </div>
    );
}
