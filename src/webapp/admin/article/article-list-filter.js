import React from 'react';
import { Dialog, RaisedButton, FlatButton } from 'material-ui';
import { RadioButtonGroup, RadioButton, Slider, DatePicker, Toggle, DropDownMenu, MenuItem } from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


export default class ArticleListFilter extends React.Component {
    constructor() {
        super();

        const fourYearAgo = new Date();
        fourYearAgo.setFullYear(fourYearAgo.getFullYear() - 4);
        fourYearAgo.setHours(0, 0, 0, 0);

        this.state = {
            type: 'All',
            sex: 'All',
            selectedLetter: 'All',
            unRegel: true,
            recommend: true,
            status: 'All',
        };
    }


    _handleCancel() {
        this.props.dispatch_filter({ type: "cancel", data: false })
    };

    _handleConfirm() {
        let _data = {
            language: this.state.language,
            star: this.state.starSlider,
            is_cache: this.state.recommend
        }
        this.props.dispatch_filter({ type: "Action_Admin_Word_List_Filter_Confirm", data: _data })
    };

    //For Filter
    _handle_type_choose(event, value) {
        this.setState({ type: value });
    };

    _handle_sex_choose(event, value) {
        this.setState({ sex: value });
    };

    _handle_letter_select(event, index, value) {
        this.setState({ selectedLetter: value });
    };

    _handle_date_picker(event, value) {
        this.state.createdAt = value
        //this.setState({ createdAt: value });
    };

    _handle_togle_regel(event, value) {
        this.setState({ unRegel: value });
    };
    _handle_togle_recommend(event, value) {
        this.setState({ recommend: value });
    };

    _handle_status(event, index, value) {
        this.setState({ status: value });
    };

    render() {
        const title = "Sort & Filter"
        const _actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this._handleCancel.bind(this)}
            />,
            <FlatButton
                label="Confirm"
                primary={true}
                onTouchTap={this._handleConfirm.bind(this)}
            />,
        ];

        let _status = (this.state.status !== 'All' ? ' ( ' + this.state.status + ' ) ' : '')
        let _haveSex = (this.state.type === 'Noun');
        let _content = <div className="popup-content">

            <div className="popup-content-text">
                <p className="popup-content-text-title">Title:</p>
            </div>
            <div className="popup-content-text">
                <p className="popup-content-text-title">Channel:</p>
                <RadioButtonGroup className="popup-dialog-radio-group" onChange={this._handle_type_choose.bind(this)}
                    name="shipSpeed" defaultSelected={this.state.type}>

                    <RadioButton className="popup-dialog-radio"
                        value="Verb"
                        label="Verb"
                    />
                    <RadioButton className="popup-dialog-radio"
                        value="Noun"
                        label="Noun"
                    />
                
                </RadioButtonGroup>
            </div>
            <div className="popup-content-text">
                <p className="popup-content-text-title">Tag:</p>
                <RadioButtonGroup className="popup-dialog-radio-group" onChange={this._handle_sex_choose.bind(this)}
                    name="shipSpeed" defaultSelected={this.state.sex}>

                    <RadioButton className="popup-dialog-radio"
                        value="Der"
                        label="Der"
                        disabled={!_haveSex}
                    />
                    <RadioButton className="popup-dialog-radio"
                        value="Die"
                        label="Die"
                        disabled={!_haveSex}
                    />
                   
                </RadioButtonGroup>
            </div>

            <div className="popup-content-text">
                <p className="popup-content-text-title">Updated: {this.state.selectedLetter} {_status}</p>
                <div className="popup-dialog-radio-group">
                    <DropDownMenu value={this.state.selectedLetter} onChange={this._handle_letter_select.bind(this)}>
                        <MenuItem value={'All'} primaryText="All" />
                        <MenuItem value={'3'} primaryText="Last 3 days" />
                        <MenuItem value={'A'} primaryText="Last one week" />
                        <MenuItem value={'B'} primaryText="Last one month" />

                    </DropDownMenu>
                    <DropDownMenu value={this.state.status} onChange={this._handle_status.bind(this)}>
                        <MenuItem value={'All'} primaryText="All Status" />
                        <MenuItem value={'pending'} primaryText="Pending" />
                        <MenuItem value={'accepted'} primaryText="Accepted" />
                        <MenuItem value={'rejected'} primaryText="Rejected" />
                    </DropDownMenu>
                </div>
            </div>

            <div className="popup-content-text">

                <Toggle
                    name="Recommend"
                    label="Recommend:"
                    defaultToggled={this.state.recommend}
                    onToggle={this._handle_togle_recommend.bind(this)}
                />
                <Toggle
                    name="Original"
                    label="Original:"
                    defaultToggled={this.state.recommend}
                    onToggle={this._handle_togle_recommend.bind(this)}
                />

            </div>
        </div >


        return (
            <div>
                <Dialog contentStyle={{ maxWidth: 500 }} modal={false} open={this.props.open} title={title}
                    actions={_actions}
                    autoScrollBodyContent={true}
                    onRequestClose={this._handleCancel.bind(this)}
                >
                    {_content}
                </Dialog>
            </div>
        )
    }
}


