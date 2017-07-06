import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as act from './setting/action';
import Header from './component/header';
import HeaderChannel from './component/header/channel';
import Recommend from './component/recommend';

import News from './c-news';
import Channel from './c-channel';
import Geek from './c-geek';
import Deutsch from './c-deutsch'
import DetailGithub from './Component/detail/detail-github';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previousLocation: props.location,
        }
    }

    componentDidMount() {
    }

    componentWillUpdate(nextProps) {
        const { location } = this.props
        if (nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.modal)) {

            this.state.previousLocation = this.props.location
        }
    }

    //Dispatch
    _dispatch_header_navigator(action) {
        switch (action.type) {
            case act.Action_Filter_List_Article_Confirm:
                alert(action.data)
                break;

            case act.Action_Admin_Channel_Type_Word:
                //this.setState({ channel: action });
                this._dispatch_route_link_to(action)
                break;

            case act.Action_Admin_Channel_Type_Article:
                this._dispatch_route_link_to(action)
                break;

            case act.Action_Header_Right_Auth:
                let _link = window.location.href.replace("index.html", "admin.html");
                window.open(_link, '_blank');
                break;

            default:
                break;
        }
        return false;
    }

    _dispatch_header_channel(action) {
        this._dispatch_route_link_to(action)
        return false;
    }


    //for Testing
    _dispatch_route_link_to(action) {
        let _types = action.type.split("_");
        let _type = _types[_types.length - 1].toLowerCase();
        let _link = `/admin?_t=${_type}`;

        switch (action.type) {
            case act.Action_Channel_Type_Article:
                //_link = `/article?_s=${_type}`;
                _link = `/`;
                break;

            case act.Action_Channel_Type_Github:
                _link = `/geek?_t=${_type}`;
                //_link = `/`;
                break;

            case act.Action_Channel_Type_Grammar:
                _link = `/channel?_t=${_type}`;
                break;

            case act.Action_Channel_Type_Word:
                _link = `/deutsch?_t=${_type}`;
                break;

            case act.Action_Admin_Channel_Type_Word:
                //this.setState({ channel: action });
                _link = `/admin?_t=${_type}`;
                break;

            default:
                break;
        }

        let _link_to = {
            pathname: _link,
            state: {
                channel: action
            }
        }
        this.props.history.push(_link_to)
    }



    render() {
        //let _switchAdmin = (window.location.href.indexOf("admin?_t") > 0);
        //_switchAdmin = _switchAdmin === false ? !(window.location.href.indexOf("?_") > 0) : true;

        const { location } = this.props
        const _isUnInitial = (this.state.previousLocation !== location) //not initial render
        const _isStateModal = (location.state && location.state.modal)
        const _isModal = !!(_isStateModal && _isUnInitial)
        const _location = _isModal ? this.state.previousLocation : location;

        return (
            <div >
                <Header title="Joe.c" dispatch={this._dispatch_header_navigator.bind(this)} />
                <HeaderChannel value={3} hidden={_isModal} dispatch={this._dispatch_header_channel.bind(this)} />

                <div className='loc-center-box'>
                    <div className='root-body'>
                        <div className='root-list root-list-layout'>

                            <Switch location={_location}>
                                <Route exact path='/' component={News} />
                                <Route path='/article?_s=:source' component={News} />
                                <Route path='/geek?_t=:channel' component={Geek} />
                                <Route path='/channel?_t=:id' component={Channel} />
                                <Route path='/deutsch?_t=:channel' component={Deutsch} />
                            </Switch>
                            <Route path='/detail?_v=:id' component={DetailGithub} />

                        </div>
                        <Recommend value={0} />
                    </div>
                </div>
            </div>
        );
    }
};
