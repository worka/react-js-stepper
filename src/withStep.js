import React from 'react';
import { useHistory } from 'react-router-dom';
import { addData, getData } from './storage';

export default function withStep(Component, stepDataKey, prevStepKey, nextStepKey) {
    return (props) => {
        const history = useHistory();

        const allData = getData();
        const stepData = allData[stepDataKey] || null;

        const goBack = () => {
            history.goBack();
        };

        const goForward = () => {
            history.push({
                ...location,
                state: {
                    ...location.state,
                    activeStep: nextStepKey
                }
            });
        };

        const saveAndGoBack = data => {
            addData({ [stepDataKey]: data });
            goBack();
        };

        const saveAndGoForward = data => {
            addData({ [stepDataKey]: data });
            goForward();
        };

        return <Component { ...props } stepData={ stepData } allData={ allData }
                          goBack={ goBack } saveAndGoBack={ saveAndGoBack }
                          goForward={ goForward } saveAndGoForward={ saveAndGoForward }/>;
    };
}
