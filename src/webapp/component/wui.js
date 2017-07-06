import React from 'react';
import { IconButton, FlatButton, FontIcon, FloatingActionButton } from 'material-ui';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
const Style = {
    button: {
        paddingTop: 6,
        paddingLeft: 6,
        paddingBottom: 6,
    },
}
const _hoverColor = '#EF5350';

export const styleDefault = ''
export const styleLight = ''
export const styleDark = ''
export const _colorDefault = '#E0E0E0'
export const _colorLightGray = '#9E9E9E'
export const _colorDarkGray = '#757575'
export const _colorSelected = '#EF5350'

export const Icon = ({ id }) => {
    return <BasicIcon id={id} styleColor={_colorDefault} />;;
}

export const SIcon = ({ id, selected = false }) => {
    let _color = selected ? _colorSelected : _colorDarkGray;
    return <BasicIcon id={id} styleColor={_color} />;
}

const BasicIcon = ({ id, styleColor }) => {
    let _color = styleColor;
    return <FontIcon className="material-icons" color={_color} hoverColor={_hoverColor}>{id}</FontIcon>;
}

export const Button = ({ id, styleColor, onTouch }) => {

    let _styleColor = (typeof (styleColor) !== "undefined" && styleColor !== null) ? styleColor : _colorDefault
    let _icon = <BasicIcon id={id} styleColor={_styleColor} />

    return <IconButton className="base-button" onClick={onTouch}>{_icon}</IconButton>
}

export const FButton = ({ label, onTouch }) => {

    return  <FlatButton label={label} primary={true} onClick={onTouch}/>
}

export const TButton = ({ label, onTouch }) => {
    let _hoverBgColr = '#E57373';
    let _style = { color: '#BDBDBD', fontWeight: 'bold', paddingBottom: 8, maxWidth: 100 }
    return <FlatButton
        labelStyle={_style} hoverColor={_hoverBgColr}
        label={label} onClick={onTouch}
    />
}

export const SuperButton = ({ id, label, onTouch }) => {
    let _icon = <BasicIcon id={id} styleColor={_colorLightGray} />;
    let _labelStyle = { color: '#616161', fontWeight: 'normal', paddingBottom: 8 }

    return <FlatButton
        style={Style.button}
        icon={_icon}
        labelStyle={_labelStyle}
        label={label} onTouchTap={onTouch} />

}

export const FloatingButton = ({ id = 'save', className = 'colr-default loc-btm-1', onTouch }) => {
    let _containerClassName = `${className}`.indexOf('loc-right-box') >= 0 ? 'loc-right-box' : 'loc-left-box'
    let _className = `float-button ${className}`.replace('loc-right-box', '');

    let _styleColor = _colorDefault
    let _realFloating = false
    if (_className.indexOf('colr-floating') >= 0) {
        _styleColor = app_Theme_Floating_Color
        _realFloating = true
    } else if (_className.indexOf('colr-dark') >= 0) {
        _styleColor = _colorDarkGray
    } else if (_className.indexOf('colr-selected') >= 0) {
        _styleColor = _colorSelected
    }

    let _button =  <Button id={id} styleColor={_styleColor} onTouch={onTouch} />

    let _floatingIcon = <FontIcon className="material-icons" color={_colorDefault} >{id}</FontIcon>;
    let _floatingButton = <FloatingActionButton zDepth={2} backgroundColor={app_Theme_Floating_Color}
            onClick={onTouch}>{_floatingIcon}</FloatingActionButton>

    return <div className={_containerClassName}>
            <div className={_className}>
                {_realFloating ? _floatingButton : _button}
            </div>
        </div>
}


export const Link = ({ id, to }) => {
    let _icon = <Icon id={id} />;
    //return <FlatButton style={Style.button} icon={_icon} href={to} />
    return <IconButton className="header-icon-button-link" href={to} >{_icon}</IconButton>
}

export const StarRating = ({ totalStar = 0 }) => {
    //let _icon = <Icon id='star_border' />;
    let _id = totalStar >= 0 ? 'star' : 'star_half';
    let _nc = totalStar >= 0 ? _colorDefault : _colorSelected;
    let _c = app_Theme_Primary_Color;
    let _iconStyle = { maxHeight: 16, maxWidth: 16 };

    // let _star1 = <FontIcon className="material-icons" color={totalStar >= 1 ? _c : _nc}>{_id}</FontIcon>
    // let _star2 = <FontIcon className="material-icons" style={_iconStyle} color={totalStar >= 2 ? _c : _colorDefault}>{_id}</FontIcon>
    let _star1A = <ActionGrade style={_iconStyle} color={totalStar >= 1 ? _c : _nc} />
    let _star1B = <ActionVisibilityOff style={_iconStyle} color={totalStar >= 1 ? _c : _nc} />
    let _star2 = <ActionGrade style={_iconStyle} color={totalStar >= 2 ? _c : _colorDefault} />
    let _star3 = <ActionGrade style={_iconStyle} color={totalStar >= 3 ? _c : _colorDefault} />
    let _star4 = <ActionGrade style={_iconStyle} color={totalStar >= 4 ? _c : _colorDefault} />
    let _star5 = <ActionGrade style={_iconStyle} color={totalStar >= 5 ? _c : _colorDefault} />

    return <div className="loc-right-box">{totalStar >= 0 ? _star1A : _star1B}{_star2}{_star3}{_star4}{_star5}</div>
}


