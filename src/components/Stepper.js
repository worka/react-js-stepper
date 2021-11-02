import React, { useEffect } from 'react';
import withStep from '../hocs/withStep';
import { clearStorage } from '../utils/storage';
import { getObjectByKey, getNextObjectByKey } from '../utils/search';
import useActiveStepKey from '../hooks/useActiveStepKey';

/**
 * @param {Step[]} steps
 * @param {boolean} [clearDataOnUnmount = true]
 * @returns {JSX.Element|boolean}
 * @constructor
 */
export default function Stepper({ steps, clearDataOnUnmount = true }) {
    const firstStep = steps[0];
    const firstStepKey = firstStep.key;

    const activeStepKey = useActiveStepKey(firstStepKey);

    useEffect(() => () => clearDataOnUnmount && clearStorage(), []);

    const nextStep = getNextObjectByKey(steps, activeStepKey);
    const activeStep = getObjectByKey(steps, activeStepKey);

    if (!activeStep) {
        return false;
    }

    const ActiveStepComponent = withStep(activeStep.component, activeStep.key, nextStep.key);

    return <ActiveStepComponent { ...activeStep.props }/>;
}
