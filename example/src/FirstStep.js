import React, { Fragment } from 'react';

export default function FirstStep({ saveAndGoToStepByKey, saveAndGoToNextStep, title }) {
    return (
        <Fragment>
            <div className="mb-2">{ title }</div>

            <div className="mb-2">
                <button className="btn btn-primary me-2" onClick={ () => {
                    saveAndGoToStepByKey('third', 'third');
                } }>saveAndGoToThirdStep
                </button>

                <button className="btn btn-primary me-2" onClick={ () => {
                    saveAndGoToNextStep('first');
                } }>saveAndGoToNextStep
                </button>
            </div>
        </Fragment>
    );
}
