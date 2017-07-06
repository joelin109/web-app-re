import React from 'react';
import { Dialog, RaisedButton} from 'material-ui';
import { Step, Stepper, StepButton, } from 'material-ui/Stepper';
import { FButton } from './../component/wui'


export default class FilterListNews extends React.Component {
    constructor() {
        super();
        this.state = {
            stepIndex: 0,
            stepValue: 'ars-technica',
        };
    }


    _handleCancel() {
        this.props.dispatch({ type: "cancel", data: false })
    };

    _handleConfirm() {
        let type = "Action_List_Filter_Confirm"
        this.props.dispatch({ type: type, data: this.state.stepValue })
    };

    _handleStep1() {
        this._handleStep(1);
    };
    _handleStep2() {
        this._handleStep(2);
    };
    _handleStep3() {
        this._handleStep(3);
    };
    _handleStep4() {
        this._handleStep(4);
    };
    _handleStep5() {
        this._handleStep(5);
    };
    _handleStep6() {
        this._handleStep(6);
    };
    _handleStep7() {
        this._handleStep(7);
    };
    _handleStep8() {
        this._handleStep(8);
    };
    _handleStep9() {
        this._handleStep(9);
    };

    _handleStep(index) {
        let _stepValue = 'ars-technica';
        switch (index - 1) {
            case 0:
                _stepValue = 'ars-technica';
                break;
            case 1:
                _stepValue = 'buzzfeed';
                break;
            case 2:
                _stepValue = 'cnn';
                break;
            case 3:
                _stepValue = 'der-tagesspiegel';
                break;
            case 4:
                _stepValue = 'google-news';
                break;
            case 5:
                _stepValue = 'bbc-news';
                break;
            case 6:
                _stepValue = 'entertainment-weekly';
                break;
            case 7:
                _stepValue = 'the-new-york-times';
                break;
            case 8:
                _stepValue = 'wired-de';
                break;
            default:
                break;
        }


        this.setState({ stepIndex: index - 1, stepValue: _stepValue })
        return false;
    };


    render() {
        const title = "Sort & Filter"
        const actions = [
            <FButton label="Cancel" onTouch={this._handleCancel.bind(this)} />,
            <FButton label="Confirm" onTouch={this._handleConfirm.bind(this)} />,
        ];

        let content = <div style={{ width: '100%', maxWidth: 700, margin: 'auto', minHeight: 400, }}>
            <Stepper linear={false} activeStep={this.state.stepIndex} orientation="vertical">
                <Step>
                    <StepButton onClick={this._handleStep1.bind(this)}>
                        Ars Technica
                        </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep2.bind(this)}>
                        Buzzfeed
                        </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep3.bind(this)}>
                        CNN
                         </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep4.bind(this)}>
                        Der Tagesspiegel
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep5.bind(this)}>
                        Google News
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep6.bind(this)}>
                        BBC News
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep7.bind(this)}>
                        Entertainment Weekly
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep8.bind(this)}>
                        The New York Times
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={this._handleStep9.bind(this)}>
                        Wired.de
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