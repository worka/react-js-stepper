import React from 'react';
import { useHistory } from 'react-router-dom';
import Stepper from './components/Stepper';
import Step from './components/Step';
import useStepperStateValue from './hooks/useStepperStateValue';

const StepperWrapper = ({ children, ...props }) => {
    const history = useHistory();

    if (!history) {
        // help to correctly determine the presence <BrowserRouter/> in the tree components :)
        throw new Error('<Stepper/> component must child the <BrowserRouter/> component');
    }

    const steps = [];

    React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === Step) {
            if (!('component' in child.props)) {
                throw new Error('Not all <Step/> have the "component" prop');
            }

            const { component, ...props } = child.props;
            const key = child.key || `step${ index + 1 }`;

            steps.push({ component, key, props });
        }
    });

    if (steps.length === 0) {
        throw new Error('No one <Step/> found in <Stepper/>');
    }

    return <Stepper steps={ steps } { ...props }/>;
};

export { StepperWrapper as Stepper, Step as Step };
export { useStepperStateValue };
