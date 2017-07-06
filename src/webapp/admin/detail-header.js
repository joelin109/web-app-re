import React from 'react'
import { IconMenu, IconButton, MenuItem } from 'material-ui';
import { Button, Icon } from './../component/wui'
import * as act from './action'

export default class DetailHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            source: {},
            actionValue: 1,
        };

        this._handle_close = this._handle_close.bind(this);
        this._handle_save = this._handle_save.bind(this);
        this._handle_more = this._handle_more.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
    }


    //Action for menu
    _handle_close() {
        this.props.dispatch({ type: act.Action_Handle_Cancel })
        return false;
    }
    _handle_save() {

        this.props.dispatch({ type: act.Action_Handle_Save })
        return false;
    }

    _handle_more(event, value) {
        switch (value) {
            case '1':
                this.props.dispatch({ type: act.Action_Handle_Refresh })
                break;

            default:
                alert(value)
                break;
        }

    }

    render() {

        return (

            <div className="draw-detail-root-container-header-box">
                <div className="w-limit-60">
                    <div className="float-button colr-dark loc-top-1">
                        <Button id={'arrow_back'} onTouch={this._handle_close} />
                    </div>
                </div>

                <div className="loc-box-content-between w-limit-120">
                    <div className="w-limit-60">
                        <div className="float-button colr-dark loc-top-1">
                            <Button id={'save'} onTouch={this._handle_save} />
                        </div>
                    </div>
                    <div className="w-limit-60">
                        <div className="float-button colr-dark loc-top-1">
                            <IconMenu
                                iconButtonElement={<IconButton><Icon id={'more_horiz'} /></IconButton>}
                                onChange={this._handle_more}
                                value={this.state.actionValue}
                                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}

                            >
                                <MenuItem value="1" primaryText="Refresh" />
                                <MenuItem value="2" primaryText="Save & New" />
                                <MenuItem value="3" primaryText="Publish" />
                                <MenuItem value="4" primaryText="Share" />
                            </IconMenu>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}