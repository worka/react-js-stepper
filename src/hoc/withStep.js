import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { addData, getData } from '../utils/storage';

export default function withStep(Component, activeStepKey, prevStepKey, nextStepKey) {
    return (props) => {
        const history = useHistory();
        const location = useLocation();

        const allData = getData();
        const stepData = allData[activeStepKey] || null;

        const goToStepByKey = key => {
            history.push({
                ...location,
                state: {
                    ...location.state,
                    activeStepKey: key
                }
            });
        };

        const goToPrevStep = () => {
            history.goBack();
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
