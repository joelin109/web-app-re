import React from 'react'
import { TextField, RadioButtonGroup, RadioButton, Toggle, Checkbox } from 'material-ui';
import * as act from './../../../setting/action'
import { Button, SIcon } from './../../../component/wui'


export default class WordTabBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {},
            actionValue: 1,
            type: '-',
            sex: '-',
            unRegel: false,
            recommend: false,
        };

        this._handle_type_choose = this._handle_type_choose.bind(this);
        this._handle_sex_choose = this._handle_sex_choose.bind(this);
        this._handle_togle_regel = this._handle_togle_regel.bind(this);
        this._handle_togle_recommend = this._handle_togle_recommend.bind(this);

    }

    componentWillReceiveProps(nextProps) {

    }


    //Add or edit the word info.
    _handle_type_choose(event, value) {

    }

    _handle_sex_choose(event, value) {

    }
    _handle_togle_regel(event, value) {
        //this.setState({ unRegel: value });
    };
    _handle_togle_recommend(event, value) {
        //this.setState({ recommend: value });
    };






    render() {

        let _detail = this.props.source;
        let _haveSex = (this.state.type === 'n');
        let _regelIcon = <SIcon id="add_alert" selected />

        return (

            <div className="draw-detail-tab-content-basic">
                <div className="draw-detail-tab-content-basic-box" tabindex="0">
                    <TextField
                        className="root-text-field-0"
                        hintText="..."
                        floatingLabelText="Word"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        className="root-text-field"
                        hintText="."
                        floatingLabelText="Plural"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        className="root-text-field"
                        hintText="."
                        floatingLabelText="Zh"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        className="root-text-field"
                        hintText="."
                        floatingLabelText="En"
                        floatingLabelFixed={true}
                    />
                    <div className="content-line">
                        <p className="draw-content-text-title">Sex:&nbsp;&nbsp;</p>
                        <RadioButtonGroup
                            className="content-line w-limit-600"
                            onChange={this._handle_sex_choose}
                            name="shipSpeed"
                            defaultSelected={this.state.sex}>

                            <RadioButton className="popup-dialog-radio"
                                value="der"
                                label="der"
                                disabled={!_haveSex}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="die"
                                label="die"
                                disabled={!_haveSex}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="das"
                                label="das"
                                disabled={!_haveSex}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="-"
                                label="-"
                                disabled={!_haveSex}
                            />
                        </RadioButtonGroup>
                    </div>
                    <div className="content-line">
                        <p className="draw-content-text-title">Type:</p>
                        <RadioButtonGroup className="content-line w-limit-600" onChange={this._handle_type_choose}
                            name="shipSpeed" defaultSelected={this.state.type}>

                            <RadioButton className="popup-dialog-radio"
                                value="v"
                                label="v"
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="n"
                                label="n"
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="adj"
                                label="adj"
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="-"
                                label="-"
                            />
                        </RadioButtonGroup>
                    </div>

                    <div className="content-line">

                        <Checkbox
                            className="draw-content-check-regel"
                            label="regel"
                            defaultChecked={true}
                            onCheck={this._handle_togle_regel}
                        />
                        <Toggle
                            className="root-text-toggle"
                            name="Recommend"
                            label="Recommend:"
                            defaultToggled={this.state.recommend}
                            onToggle={this._handle_togle_recommend}
                        />
                    </div>

                </div>
            </div>

        )
    }
}