import React from 'react';


export default class ThirdStep extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        return (
            <div>
                ThirdStep
                <button className="btn btn-primary" onClick={ () => {
                    this.props.saveAndGoToNextStep('third');
                } }>saveAndGoToNextStep</button>
            </div>
        );
    }
}
