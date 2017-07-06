import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Divider, MenuItem, FontIcon } from 'material-ui';
import * as act from './../../setting/action'

class NavLeft extends React.Component {
    constructor() {
        super();
        this.state = {
            login: true,
            channel: '',
        };

        this._handle_left_channel_article = this._handle_left_channel_article.bind(this)
        this._handle_left_channel_word = this._handle_left_channel_word.bind(this)
        this._handle_left_channel_setting = this._handle_left_channel_setting.bind(this)
        this._handle_left_channel_crawler = this._handle_left_channel_crawler.bind(this)
    }



    _dispatch_left_channel(actionType) {
        this.props.dispatch({ type: actionType });
    }

    _dispatch_close() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Close);
        return false;
    }

    _handle_left_channel_article() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Article);
        return false;
    }
    _handle_left_channel_word() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Word);
        return false;
    }
    _handle_left_channel_setting() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Crawler);
        return false;
    }
    _handle_left_channel_crawler() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Crawler);
        return false;
    }



    _fontIcon(id, color = '#757575') {
        let _hoverColor = "#EF5350"
        return <FontIcon className="material-icons" color={color} hoverColor={_hoverColor}>{id}</FontIcon>;
    }
    render() {
        return (
            <div>
                <Drawer
                    open={this.props.open} docked={false}
                    onRequestChange={this._dispatch_close.bind(this)}>
                    <div className='nav-left-header'></div>
                    <Divider />
                    <MenuItem leftIcon={this._fontIcon('dashboard')}>Dashboard</MenuItem>
                    <Divider />
                    <MenuItem leftIcon={this._fontIcon('people')}>Account</MenuItem>
                    <MenuItem leftIcon={this._fontIcon('visibility')}>Channel</MenuItem>
                    <MenuItem leftIcon={this._fontIcon('flag')}>Tag</MenuItem>
                    <Divider />
                    <MenuItem leftIcon={this._fontIcon('local_library')} onTouchTap={this._handle_left_channel_article}>Article</MenuItem>
                    <MenuItem leftIcon={this._fontIcon('text_fields')} onTouchTap={this._handle_left_channel_word}>Word</MenuItem>
                    <Divider />
                    <MenuItem leftIcon={this._fontIcon('settings')} onTouchTap={this._handle_left_channel_setting}>Setting</MenuItem>
                    <MenuItem leftIcon={this._fontIcon('settings_power')}>Logout</MenuItem>

                </Drawer>
            </div>
        )
    }
}


export default NavLeft;
