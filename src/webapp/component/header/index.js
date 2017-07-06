import React from 'react'
import ReactDOM from 'react-dom'
import { AppBar } from 'material-ui';
import HeaderRight from './nav-header-right'
import NavLeft from './nav-left'



export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            drawerVisible: false,
        };
    }


    _showDrawer() {
        this.setState({ drawerVisible: true });
    }

    _closeDrawer() {
        this.setState({ drawerVisible: false });
    }


    _dispatch_header_title_touch(type, value) {
        window.scrollTo(0, 0);
    }

    _dispatch_header_right(action) {
        this.props.dispatch(action);
        return false;
    }

    _dispatch_nav_left(action) {
        this.props.dispatch(action)
        this._closeDrawer()
        return false;
    }

    render() {
        return (
            <div>
                <AppBar title={this.props.title} zDepth={0}
                    iconElementRight={<HeaderRight onClick={this._dispatch_header_right.bind(this)} />}
                    onLeftIconButtonTouchTap={this._showDrawer.bind(this)}
                    onTitleTouchTap={this._dispatch_header_title_touch.bind(this)}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0 }} />

                <NavLeft open={this.state.drawerVisible} login={0}
                    dispatch={this._dispatch_nav_left.bind(this)} />

            </div>
        )
    }
}
