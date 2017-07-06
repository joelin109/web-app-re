import React from 'react';
import * as productService from './../service/dem/product-service';
import * as act from './../setting/action';

import List, * as _list from './../component/list'
import FilterListBeer from './filter-list-beer'
import * as tag from './../component/item/tag'

export default class Channel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            page: 1,
            pageSize: 12,
            total: 0,
            channel: { type: '' },
            filterData: '',
            filterRange: [0, 26],
            filterVisible: false,
            willNeedUpdate: false,
        }

        let _props_channel = this._get_router_link_state_data(props)
        if (_props_channel !== null) {
            this._switch_channel(_props_channel, false)
        }
    }

    componentDidMount() {
        this._list_findAll(true)
    }

    componentWillReceiveProps(nextProps) {

        let _props_channel = this._get_router_link_state_data(nextProps)
        if (_props_channel !== null) {

            this.state.willNeedUpdate = false;
            if (this.state.channel.type !== _props_channel.type) {
                this._switch_channel(_props_channel)
            }
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.willNeedUpdate;
    }


    //-------------------
    _get_router_link_state_data(props) {
        const { location } = props
        const _props = location.state
        if (typeof (_props) !== "undefined" && _props !== null
            && typeof (_props.channel) !== "undefined") {

            return _props.channel
        }
        else {
            return null;
        }
    }

    _switch_channel(newChannel, willExcute = true) {
        this.state.channel = newChannel;
        this.state.filterData = newChannel.filter;
        this.state.filterRange = newChannel.data;
        this.state.page = 1;

        if (willExcute) {
            this._list_findAll();
        }
    }


    _list_findAll(willScrollTop) {
        this._list_article_findAll(willScrollTop);
    }

    _list_article_findAll(willScrollTop) {
        let filter = {
            search: this.state.filterData,
            min: this.state.filterRange[0], max: this.state.filterRange[1],
            page: this.state.page
        }

        productService.findAll(filter)
            .then(result => {

                this._list_prepare_update(willScrollTop)
                this.setState({
                    results: result.products,
                    total: result.total,
                });
            });
    }

    _list_prepare_update(willScrollTop) {
        if (willScrollTop == true) {
            window.scrollTo(0, 0);
        }
        this.state.willNeedUpdate = true;
    }


    //Dispatch 
    _dispatch_list(action) {

        switch (action.type) {
            case _list.List_Filter:
                this.setState({ filterVisible: true });
                break;

            default:
                this.state.page = action.data;
                this._list_findAll(action.type === _list.List_Page_Next)
                break;
        }
        return false;
    }

    _dispatch_list_item(action) {
        switch (action.type) {
            case act.Action_List_Article_Tag:
                this._action_list_article_tag(action.data)
                break;
            case act.Action_List_Article_Range:
                this._action_list_article_range(action.data)
                break;

            case act.Action_List_Article_Detail:
                window.open(action.data, '_blank');
                break;

            default:
                alert(action.type + "-" + action.data)
                break;
        }
        return false;
    }

    _dispatch_list_filter_popup(action) {
        switch (action.type) {
            case act.Action_Filter_List_Article_Confirm:
                this._action_list_article_filter(action.data)
                break;

            default:
                break;
        }

        this.state.willNeedUpdate = true;
        this.setState({ filterVisible: false });
        return false;
    }


    //Acton
    _action_list_article_range(range) {
        this.state.filterData = '';
        this.state.filterRange = range;
        this.state.page = 1;
        this._list_findAll(true)
    }
    _action_list_article_tag(tag) {
        this.state.filterData = tag;
        this.state.filterRange = [0, 26];
        this.state.page = 1;
        this._list_findAll(true)
    }

    _action_list_article_filter(range) {
        this._action_list_article_range(range);
    }

    //Router_link
    _router_link_detail(action) {
        let _types = action.type.split("_");
        let _type = _types[_types.length - 1].toLowerCase();
        let _link = `/article/?_${_type}`;
        this.state.link = {
            pathname: _link,
            // this is the trick!
            state: {
                modal: true,
                channel: action
            }
        }

        this.props.history.push(this.state.link)
    }

    render() {
        return (
            <div>
                <List
                    source={this.state.results}
                    pageSize={this.state.pageSize} total={this.state.total}
                    dispatch={this._dispatch_list.bind(this)}
                    dispatch_item={this._dispatch_list_item.bind(this)}
                    filterOpen={this.state.filterVisible}
                    itemTag={tag.List_Item_Card}
                />

                <FilterListBeer
                    open={this.state.filterVisible}
                    dispatch={this._dispatch_list_filter_popup.bind(this)}
                />
            </div>
        );
    }


}