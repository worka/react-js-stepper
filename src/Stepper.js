import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Step from './Step';
import { clearStorage } from './storage';
import withStep from './withStep';

export default function StepperWithRouter(props) {
    return <BrowserRouter><Stepper { ...props }/></BrowserRouter>;
}

function Stepper({ children }) {
    const steps = [];

    let i = 1;

    React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === Step) {
            if (!('component' in child.props)) {
                throw new Error('Not all <Step/> have the "component" prop');
            }

            const { component, ...props } = child.props;

            if (React.isValidElement(component)) {
                const key = child.key || `step${ i }`;

                console.log(component)
                // console.log(child)

                steps.push({ component, key, props });

                i++;
            }
        }
    });

    if (steps.length === 0) {
        throw new Error('No one <Step/> found in <Stepper/>');
    }

    const { state = { activeStepKey: steps[0].key } } = useLocation();
    useEffect(() => () => clearStorage(), []);

    // const activeStepKey = getActiveStepKey() || steps[0].key;
    const activeStepKey = state.activeStepKey;
    const prevStepKey = getPrevKey(steps, activeStepKey);
    const nextStepKey = getNextKey(steps, activeStepKey);
    const activeStep = getByKey(steps, activeStepKey);

    if (!activeStep) {
        return false;
    }

    const ActiveStepComponent = withStep(activeStep.component, activeStep.key, prevStepKey, nextStepKey);

    return <ActiveStepComponent { ...activeStep.props }/>;
}

function getByKey(objects, key) {
    for (let object of objects) {
        if (object.key === key) {
            return object;
        }
    }

    return null;
}

function getNextKey(objects, key) {
    let nextKey = objects[0].key;

    for (let i = objects.length - 1; i >= 0; i--) {
        const object = objects[i];

        if (object.key === key) {
            break;
        }

        nextKey = object.key;
    }

    return nextKey;
}

function getPrevKey(objects, key) {
    let prevKey = objects[objects.length - 1].key;

    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];

        if (object.key === key) {
            break;
        }

        prevKey = object.key;
    }

    return prevKey;
}
