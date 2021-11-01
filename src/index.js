import React from 'react';
import { useHistory } from 'react-router-dom';
import Stepper from './components/Stepper';
import Step from './components/Step';

const StepperWrapper = ({ children, ...props }) => {
    const history = useHistory();

    if (!history) {
        // help to correctly determine the presence <BrowserRouter/> in the tree components :)
        throw new Error('<Stepper/> component must child the <BrowserRouter/> component');
    }

    const steps = [];

    let i = 1;

    React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === Step) {
            if (!('component' in child.props)) {
                throw new Error('Not all <Step/> have the "component" prop');
            }

            const { component, ...props } = child.props;
            const key = child.key || `step${ i }`;

            steps.push({ component, key, props });

            i++;
        }
    });

    if (steps.length === 0) {
        throw new Error('No one <Step/> found in <Stepper/>');
    }

    return <Stepper steps={ steps } { ...props }/>;
};

export { StepperWrapper as Stepper, Step };
