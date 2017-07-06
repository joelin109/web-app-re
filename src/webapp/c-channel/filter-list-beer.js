import React from 'react';
import { Dialog, RaisedButton} from 'material-ui';
import { Step, Stepper, StepButton} from 'material-ui/Stepper';
import { FButton } from './../component/wui'


export default class FilterListBeer extends React.Component {
    constructor() {
        super();
        this.state = {
            stepIndex: 0,
            stepValue: [0, 10],
        };
    }


    _handleCancel() {
        this.props.dispatch({ type: "cancel", data: false })
    };

    _handleConfirm() {
        let type="Action_Filter_List_Article_Confirm"
        this.props.dispatch({ type: type, data: this.state.stepValue })
    };

    _handleStep1() {
        this.setState({ stepIndex: 0, stepValue: [0, 7] })
    };
    _handleStep2() {
        this.setState({ stepIndex: 1, stepValue: [7, 11] })
    };
    _handleStep3() {
        this.setState({ stepIndex: 2, stepValue: [11, 26] })
    };


    render() {
        const title = "Sort & Filter"
        const actions = [
            <FButton label="Cancel" onTouch={this._handleCancel.bind(this)}/>,
            <FButton label="Confirm" onTouch={this._handleConfirm.bind(this)}/>,
        ];

        let content = <div style={{ width: '100%', maxWidth: 700, margin: 'auto', height: 400, }}>
            <Stepper linear={false} activeStep={this.state.stepIndex} orientation="vertical">
                <Step>
                    <StepButton onClick={this._handleStep1.bind(this)}>
                        [0 - 7]
                        </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep2.bind(this)}>
                        [7 - 11]
                        </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep3.bind(this)}>
                        [11 - 26]
                         </StepButton>
                </Step>
            </Stepper>
        </div>


        return (
            <div>
                <Dialog modal={false} open={this.props.open} title={title}
                    actions={actions}
                    autoScrollBodyContent={true}
                    onRequestClose={this._handleCancel.bind(this)}
                >
                    {content}
                </Dialog>
            </div>
        )
    }
}
