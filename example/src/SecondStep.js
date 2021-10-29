import React, { Fragment } from 'react';

export default function SecondStep({ goToNextStep }) {
    return (
        <Fragment>
            <div className="mb-2">SecondStep</div>

            <div className="mb-2">
                <button className="btn btn-primary" onClick={ () => {
                    goToNextStep();
                } }>goToNextStep
                </button>
            </div>
        </Fragment>
    );
}
