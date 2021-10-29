import React, { Fragment } from 'react';


export default class ThirdStep extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        return (
            <Fragment>
                <div className="mb-2">ThirdStep</div>

                <div className="mb-2">
                    <button className="btn btn-primary" onClick={ () => {
                        this.props.saveAndGoToNextStep('third');
                    } }>saveAndGoToNextStep
                    </button>
                </div>
            </Fragment>
        );
    }
}
