import React from 'react';

import { Stepper, Step } from '../../src';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

export default function App() {
    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-body">
                    <Stepper>
                        <Step component={ FirstStep } title="FirstStep"/>
                        <div>test</div>
                        <Step component={ <SecondStep/> }/>
                        <Step component={ ThirdStep } key="third"/>
                        <Step component={ ThirdStep }/>
                    </Stepper>
                </div>
            </div>
        </div>
    );
}
