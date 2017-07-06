import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './app';
import { appTheme } from './theme'


class Index extends React.Component {

    _getBaseName() {

        let _basename = '';
        let _href = window.location.href;
        if (_href.toLowerCase().indexOf("e://") > 0) {
            window.location.hash = '/';
            _basename = window.location.href.replace("file://", "");
        }
        return _basename;
    }

    render() {
        let _basename = this._getBaseName()

        return (
            <div>
                <MuiThemeProvider muiTheme={appTheme} >

                    <Router basename={_basename}>
                        <Route name="main" path="/" component={App}>
                        </Route>
                    </Router>

                </MuiThemeProvider>
            </div>
        );
    }
};

ReactDOM.render(<Index />, document.getElementById("main"));