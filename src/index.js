import React from 'react';
import Stepper from './components/Stepper';
import Step from './components/Step';
import useActiveStepKey from './hooks/useActiveStepKey';
import useResetSteps from './hooks/useResetSteps';
import useCheckRouter from './hooks/useCheckRouter';

const StepperWrapper = ({ children, ...props }) => {
    useCheckRouter();

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

export { StepperWrapper as Stepper, Step };
export { useActiveStepKey, useResetSteps };
