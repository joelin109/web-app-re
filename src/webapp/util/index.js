import React from "react";

export let isSafari = () => {
    let browser = navigator.appName;
    let _version = navigator.appVersion.toLowerCase();
    return (
        _version.indexOf("applewebkit") > 0 && _version.indexOf("chrome/") <= 0
    );
};

export let isImage = src => {
    let _src = src.toLowerCase();

    if (_src.lastIndexOf(".png") > 0) {
        return true;
    }
    if (_src.lastIndexOf(".jpg") > 0) {
        return true;
    }

    return false;
};

export const baseHref = () => {
    let _basename = "";
    let _href = window.location.href;
    if (_href.toLowerCase().indexOf("e://") > 0) {
        window.location.hash = "/";
        _basename = window.location.href.replace("file://", "");
    }
    return _basename;
};

export const asyncComponent = loadComponent =>
    class AsyncComponent extends React.Component {
        state = {
            Component: null
        };

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then(Component => {
                    this.setState({Component});
                })
                .catch(err => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const {Component} = this.state;
            return Component ? <Component {...this.props} /> : null;
        }
    };
