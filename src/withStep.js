import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { addData, getData } from './storage';

export default function withStep(Component, activeStepKey, prevStepKey, nextStepKey) {
    return (props) => {
        const history = useHistory();
        const location = useLocation();

        const allData = getData();
        const stepData = allData[activeStepKey] || null;

        const goBack = () => {
            history.goBack();
        };

        const goForward = () => {
            history.push({
                ...location,
                state: {
                    ...location.state,
                    activeStepKey: nextStepKey
                }
            });
        };

        const saveAndGoBack = data => {
            addData({ [activeStepKey]: data });
            goBack();
        };

        const saveAndGoForward = data => {
            addData({ [activeStepKey]: data });
            goForward();
        };

        return <Component { ...props } stepData={ stepData } allData={ allData }
                          goBack={ goBack } saveAndGoBack={ saveAndGoBack }
                          goForward={ goForward } saveAndGoForward={ saveAndGoForward }/>;
    };
}
