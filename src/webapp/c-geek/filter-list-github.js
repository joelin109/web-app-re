import React from 'react';
import {Dialog, RaisedButton, RadioButtonGroup, RadioButton, Slider, DatePicker, Toggle} from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { FButton } from './../component/wui'


class FilterListGithub extends React.Component {
    constructor() {
        super();

        const twoYearAgo = new Date();
        twoYearAgo.setFullYear(twoYearAgo.getFullYear() - 1);
        twoYearAgo.setMonth(3, 26);
        twoYearAgo.setHours(0, 0, 0, 0);

        this.state = {
            stepIndex: 0,
            stepValue: [0, 10],
            language: 'JavaScript',
            starSlider: 6200,
            createdAt: twoYearAgo,
            fromCache: false,

        };
    }


    _handleCancel() {
        this.props.dispatch({ type: "cancel", data: false })
    };

    _handleConfirm() {
        let _data = {
            language: this.state.language,
            star: this.state.starSlider,
            created_at: this.state.createdAt,
            is_cache: this.state.fromCache
        }
        this.props.dispatch({ type: "Action_List_Filter_Confirm", data: _data })
    };

    //For Filter
    _handle_language_choose(event, value) {
        this.setState({ language: value });
    };

    _handle_star_slider(event, value) {
        this.setState({ starSlider: value });
    };

    _handle_date_picker(event, value) {
        this.state.createdAt = value
        //this.setState({ createdAt: value });
    };

    _handle_cache_togle(event, value) {
        this.setState({ fromCache: value });
    };

    render() {
        const title = "Sort & Filter"
        const actions = [
            <FButton label="Cancel" onTouch={this._handleCancel.bind(this)}/>,
            <FButton label="Confirm" onTouch={this._handleConfirm.bind(this)}/>,
        ];

        let content = <div className="popup-content">

            <div className="popup-content-text">
                <p className="popup-content-text-title">Language:</p>
                <RadioButtonGroup className="popup-dialog-radio-group" onChange={this._handle_language_choose.bind(this)}
                    name="shipSpeed" defaultSelected={this.state.language}>

                    <RadioButton className="popup-dialog-radio"
                        value="JavaScript"
                        label="JavaScript"
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}

                    />
                    <RadioButton className="popup-dialog-radio"
                        value="TypeScript"
                        label="TypeScript"
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}

                    />
                    <RadioButton className="popup-dialog-radio"
                        value="Python"
                        label="Python"
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                    />
                    <RadioButton className="popup-dialog-radio"
                        value="Golang"
                        label="Golang"
                        checkedIcon={<ActionFavorite />}
                        uncheckedIcon={<ActionFavoriteBorder />}
                    />
                </RadioButtonGroup>
            </div>

            <div className="popup-content-text">
                <p className="popup-content-text-title">Star: >= {this.state.starSlider} </p>
                <Slider
                    min={0}
                    max={10000}
                    step={1}
                    defaultValue={this.state.starSlider}
                    onChange={this._handle_star_slider.bind(this)}
                />
            </div>

            <div className="popup-content-text">
                <p className="popup-content-text-title">CreateDate: </p>
                <DatePicker
                    defaultDate={this.state.createdAt}
                    hintText="date picker"
                    locale="en-US"
                    autoOk={true}
                    firstDayOfWeek={0}
                    onChange={this._handle_date_picker.bind(this)}
                />
            </div>

            <div className="popup-content-text">
                <p className="popup-content-text-title">FromCache: {this.state.fromCache ? 'Yes' : 'No'}</p>
                <Toggle
                    name="from_cache"
                    value="from_cache"
                    label=""
                    toggled={this.state.fromCache}
                    onToggle={this._handle_cache_togle.bind(this)}
                />
            </div>
        </div >


        return (
            <div>
                <Dialog contentStyle={{ maxWidth: 500 }} modal={false} open={this.props.open} title={title}
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


export default FilterListGithub;