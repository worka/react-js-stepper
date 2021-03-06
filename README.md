# react-js-stepper

#### based on react-router v6

¯\_(ツ)_/¯
### Documentation in development (can you help me)
¯\_(ツ)_/¯

```javascript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Stepper, Step } from 'react-js-stepper';

import YourFirstStep from './FirstStep';
import YourSecondStep from './SecondStep';
import YourThirdStep from './ThirdStep';

export default function App() {
    return (
        <BrowserRouter>
            <Stepper>
                <Step component={ YourFirstStep } title="FirstStepFromAppComponent"/>
                <Step component={ YourSecondStep }/>
                <Step component={ YourThirdStep } key="third"/>
            </Stepper>
        </BrowserRouter>
    );
}
```

#### Stepper props

`clearDataOnUnmount` `boolean` `default = true` - clear sessionStorage when unmount component

#### Step props

`component`
`key`
`any props`

#### YourComponent

Your component will receive next props:

`stepData` `allData` `goToStepByKey` `saveAndGoToStepByKey` `goToPrevStep` `saveAndGoToPrevStep` `goToNextStep` `saveAndGoToNextStep`

and any props from Step
