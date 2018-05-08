import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './app';
import {appTheme} from './theme'
import {asyncComponent, baseHref} from "./util";


class Index extends React.Component {

    render() {

        return (
            <MuiThemeProvider muiTheme={appTheme}>
                <Router basename={baseHref()}>
                    <Route name="main" path="/" component={App}>
                    </Route>
                </Router>
            </MuiThemeProvider>
        );
    }
}
;

ReactDOM.render(<Index />, document.getElementById("main"));