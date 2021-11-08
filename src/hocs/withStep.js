import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addData, getData, initializeStorage } from '../utils/storage';
import { HISTORY_STATE_KEY } from '../constants';

export default function withStep(Component, activeStepKey, nextStepKey) {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();

        const allData = getData();
        const stepData = allData[activeStepKey] || null;

        const goToStepByKey = key => {
            initializeStorage();

            navigate(location.pathname, {
                state: {
                    ...location.state,
                    [HISTORY_STATE_KEY]: key
                }
            });
        };

        const goToPrevStep = () => {
            navigate(-1);
        };

        const goToNextStep = () => {
            goToStepByKey(nextStepKey);
        };

        const saveAndGoToStepByKey = (data, key) => {
            addData({ [activeStepKey]: data });
            goToStepByKey(key);
        };

        const saveAndGoToPrevStep = data => {
            addData({ [activeStepKey]: data });
            goToPrevStep();
        };

        const saveAndGoToNextStep = data => {
            addData({ [activeStepKey]: data });
            goToNextStep();
        };

        return <Component { ...props } stepData={ stepData } allData={ allData }
                          goToStepByKey={ goToStepByKey } saveAndGoToStepByKey={ saveAndGoToStepByKey }
                          goToPrevStep={ goToPrevStep } saveAndGoToPrevStep={ saveAndGoToPrevStep }
                          goToNextStep={ goToNextStep } saveAndGoToNextStep={ saveAndGoToNextStep }/>;
    };
}
