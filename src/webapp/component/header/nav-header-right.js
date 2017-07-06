import React, { Component } from 'react';
import { Button, Link } from './../wui'


export default class HeaderRight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueSingle: '3',
      valueMultiple: ['3', '5'],
    };
  }


  handleChangeSingle(event, value) {
    this.setState({
      valueSingle: value,
    });
  };

  handleChangeMultiple(event, value) {
    this.setState({
      valueMultiple: value,
    });
  };

  handleOpenMenu() {
    this.setState({
      openMenu: true,
    });
  }

  handleOnRequestChange(value) {
    this.setState({
      openMenu: value,
    });
  }

  _linkHandler(e) {
    this.props.onClick({ type: "Action_Header_Right_Auth" })
  }
  _linkHandler2(e) {
    this.props.onClick({ type: "filter" })
  }


  render() {


    return (
      <div className="header-right">

        <Button id={'search'} onTouch={this._linkHandler2.bind(this)} />
        <Button id={'person'} onTouch={this._linkHandler.bind(this)} />
        <Link id={'home'} to="/#" />

      </div>
    );
  }
}