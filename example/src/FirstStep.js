import React from 'react';

export default function FirstStep({ goToStepByKey, saveAndGoToNextStep }) {
    return (
        <div>
            FirstStep
            <button className="btn btn-primary" onClick={ () => {
                goToStepByKey('third');
            } }>goToStepByKey</button>
            <button className="btn btn-primary" onClick={ () => {
                saveAndGoToNextStep('first');
            } }>saveAndGoToNextStep
            </button>
        </div>
    );
}
