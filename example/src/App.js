import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Stepper, Step } from 'react-js-stepper';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

export default function App() {
    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-body">
                    <BrowserRouter>
                        <Stepper>
                            <Step component={ FirstStep } title="FirstStepFromAppComponent"/>
                            <Step component={ SecondStep }/>
                            <Step component={ ThirdStep } key="third"/>
                        </Stepper>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
}
