import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import withStep from '../hoc/withStep';
import { clearStorage, issetStorage } from '../utils/storage';
import { getObjectByKey, getNextObjectByKey, getPrevObjectByKey } from '../utils/search';
import { HISTORY_STATE_KEY } from '../constants';

/**
 * @param {Step[]} steps
 * @param {boolean} [clearDataOnUnmount = true]
 * @returns {JSX.Element|boolean}
 * @constructor
 */
export default function Stepper({ steps, clearDataOnUnmount = true }) {
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

    const nextStep = getNextObjectByKey(steps, activeStepKey);
    const activeStep = getObjectByKey(steps, activeStepKey);

    if (!activeStep) {
        return false;
    }

    const ActiveStepComponent = withStep(activeStep.component, activeStep.key, nextStep.key);

    return <ActiveStepComponent { ...activeStep.props }/>;
}
