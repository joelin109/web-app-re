import React from 'react';
import { FlatButton } from 'material-ui';

let _backgroundColor = app_Theme_Primary_Color
class Paginator extends React.Component {

    render() {
        let pages = Math.ceil(this.props.total / this.props.pageSize);
        let hoverColor = "#EF5350"
        let style = { color: '#EEEEEE' }
        if (pages > 1) {
            return (
                <div className='root-list-paginator'>

                    <FlatButton labelStyle={style} hoverColor={hoverColor}
                        backgroundColor={(this.props.page <= 1 ? 'transparent' : _backgroundColor)}
                        label={'Previous'} disabled={(this.props.page <= 1)}
                        onClick={this.props.onPrevious} />


                    <div className="legend">{this.props.total}  • page {this.props.page}/{pages}</div>


                    <FlatButton labelStyle={style} hoverColor={hoverColor}
                        backgroundColor={(this.props.page >= pages ? 'transparent' : _backgroundColor)}
                        label={'Next'} disabled={(this.props.page >= pages)}
                        onClick={this.props.onNext} />

                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}
;

export default Paginator;