import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Step from './Step';
import withStep from '../hoc/withStep';
import { clearStorage, issetStorage } from '../utils/storage';
import { getObjectByKey, getNextObjectByKey, getPrevObjectByKey } from '../utils/search';
import { HISTORY_STATE_KEY } from '../constants';

export default ({ children, ...props }) => {
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
}

function Stepper({ steps, clearDataOnUnmount = true }) {
    let { state } = useLocation();

    useEffect(() => () => clearDataOnUnmount && clearStorage(), []);

    const firstStep = steps[0];
    const firstStepKey = firstStep.key;

    if (!state) {
        state = { [HISTORY_STATE_KEY]: firstStepKey };
    }

    if (state[HISTORY_STATE_KEY] !== firstStepKey && !issetStorage()) {
        state = { [HISTORY_STATE_KEY]: firstStepKey };
    }

    const activeStepKey = state[HISTORY_STATE_KEY];

    const prevStep = getPrevObjectByKey(steps, activeStepKey);
    const nextStep = getNextObjectByKey(steps, activeStepKey);
    const activeStep = getObjectByKey(steps, activeStepKey);

    if (!activeStep) {
        return false;
    }

    const ActiveStepComponent = withStep(activeStep.component, activeStep.key, prevStep.key, nextStep.key);

    return <ActiveStepComponent { ...activeStep.props }/>;
}
