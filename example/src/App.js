import React, { Fragment, useState } from 'react';
import { Stepper, Step } from '../../src';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

export default function App() {
    const [ showStepper, setShowStepper ] = useState(true);

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-body">
                    { showStepper
                        ? <Fragment>
                            <Stepper clearDataOnUnmount={ true }>
                                <Step component={ FirstStep } title="FirstStep"/>
                                <div>test</div>
                                <Step component={ SecondStep }/>
                                {/*<Step component={ <SecondStep/> }/>*/ }
                                <Step component={ ThirdStep } key="third"/>
                                {/*<Step component={ ThirdStep }/>*/ }
                            </Stepper>

                            <button className="btn btn-primary" onClick={ () => setShowStepper(false) }>hide</button>
                        </Fragment>
                        : <button className="btn btn-primary" onClick={ () => setShowStepper(true) }>show</button> }
                </div>
            </div>
        </div>
    );
}
