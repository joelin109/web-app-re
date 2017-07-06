import React from 'react';
import { FlatButton, FontIcon, FloatingActionButton } from 'material-ui';

export const Cancel = ({ id = 'arrow_back', onTouch }) => {
    //let _icon = <Icon id={id} />;
    let _hoverColor = "#EF5350"
    let _icon = <FontIcon className="material-icons" color={'#E0E0E0'} >{id}</FontIcon>;
    let _bgColor = '#424242';

    return <div className="detail-root-back-box">
        <FloatingActionButton
            className="detail-root-back-button"
            zDepth={2} backgroundColor={_bgColor}
            onTouchTap={onTouch}>
            {_icon}
        </FloatingActionButton>
    </div>
}