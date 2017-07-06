import React from 'react';
import { LinearProgress } from 'material-ui';
import Item from './../item'


export default class ListCard extends React.Component {

    render() {

        let _itemTag = this.props.itemTag;
        let listItems = <div className='root-list-default'>
            <div className='root-list-default-loading'>
                <LinearProgress mode="indeterminate" />
            </div>
        </div>;

        if (this.props.source.length > 0) {
            listItems = this.props.source.map(item =>
                <Item tag={_itemTag} value={item} dispatch={this.props.dispatch} />
            );
        }

        return (
            <div className='root-list'>
                {listItems}
            </div>
        );
    }
};
