import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Divider, Avatar, RaisedButton } from 'material-ui';
import ListItem from 'material-ui/List/ListItem';
import * as act from './../setting/action'
import { Button, FButton } from './../component/wui'

/* Modified for material-ui/Drawer/Drawer.js (Line 233)
width: this.props.width >= 736 ?  '100%' : this.props.width || theme.width,
left: this.props.width >= 736 ? 'auto' : 0,
top: this.props.open ? 0 : -10000,
*/

export default class DetailGeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

        };

        this.state.open = props.open;
    }


    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
    }

    handleOpen() {
        this.setState({ open: true });
    };

    _dispatch_left_channel(actionType) {
        this.props.dispatch({ type: actionType });
    }

    _dispatch_close() {
        //this._dispatch_left_channel(act.Action_Admin_Channel_Type_Close);
        this.setState({ open: false });
        return false;
    }

    _dispatch_left_channel_word() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Word);
        return false;
    }

    _dispatch_left_channel_article() {
        this._dispatch_left_channel(act.Action_Admin_Channel_Type_Article);
        return false;
    }

    _isSafari() {
        let browser = navigator.appName;
        let _version = navigator.appVersion.toLowerCase();
        return _version.indexOf("applewebkit") > 0 && _version.indexOf("chrome/") <= 0;
    }

    _test(detail) {
        return detail.created_at.substring(2, 10) + " ~ " + detail.pushed_at.substring(2, 10);
    }

    render() {

        let _className = this._isSafari() === false ? 'draw-detail-root' : '';
        let _classNameHeader = this.state.open ? 'draw-detail-root-container-header linit-768' : '';

        if (this.state.open === false) {
            return (<div></div>);
        }

        let _detail = this.props.source;
        let _coverSrc = _detail.coverSrc;
        let _userThumb = _detail.owner.avatar_url;
        let _date = this._test(_detail);
        let _title = "美墨之間的「長城」，就聳立在我的眼前──看得見、與看不見的壁壘";

        return (
            <div>
                <Drawer
                    className={_className}
                    containerClassName="w-limit-768"
                    width={768}
                    open={this.state.open} docked={false}
                    onRequestChange={this._dispatch_close.bind(this)}>

                    <div className={_classNameHeader}>
                        <div className='draw-detail-root-container-header-box'>
                            <Button id={'arrow_back'} onTouch={this._dispatch_close.bind(this)} />
                            <ListItem className="draw-detail-root-container-header-thumb"
                                leftAvatar={<Avatar src={_userThumb} size={30} />}
                            >
                                AuthorName
                        </ListItem>
                            <Button id={'refresh'} onTouch={this._dispatch_close.bind(this)} />
                        </div>
                    </div>

                    <div className='draw-detail-root-container-box'>
                        <img className="draw-detail-root-container-box-cover" src={_coverSrc} />
                        <label className="">{_date}</label>
                        <div className='draw-detail-root-container-box-body'>
                            <p className="itemBox-Text-title">{_title}</p>
                            <p className="itemBox-Text-text">{_detail.description}</p>
                        </div>
                        <div className='draw-detail-root-container-box-body-3'>
                            3333
                         </div>
                    </div>

                    <div className='draw-detail-root-container-footer'>

                    </div>
                </Drawer>
            </div>
        )
    }
}
