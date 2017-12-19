import React from 'react';
import * as githubService from './../service/dem/github-service';
import * as act from './../constant/action-type';
import * as tag from './../component/item/tag'

import List, * as _list from './../component/list'
import FilterListGithub from './filter-list-github'
import DetailGeek from './detail-geek'


export default class Geek extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            pageSize: 30,
            total: 0,
            page: 1,
            filterData: { language: 'JavaScript', star: 10000, createdAt: new Date('2014-03-23')},
            detailObject: {},
            filterVisible: false,
            detailVisible: false,
            listShouldUpdate: true,
        }
    }
    componentDidMount() {
        this._list_findAll(true)
    }

    componentWillReceiveProps(nextProps) {
        this._list_should_update(false);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }


    _list_findAll(willScrollTop) {
        this._list_github_findAll(willScrollTop);
    }

    _list_github_findAll(willScrollTop) {
        this.state.pageSize = 30;
        let filter = { filter: this.state.filterData, page: this.state.page }

        githubService.findAll(filter)
            .then(data => {

                this._list_should_update(true, true)
                this.setState({
                    results: data.items,
                    total: data.total_count
                });
            });
    }

    _list_should_update(willUpdate = true, willScroll = false) {
        if (willScroll == true) {
            window.scrollTo(0, 0);
        }
        this.state.filterVisible = false;
        this.state.detailVisible = false;
        this.state.listShouldUpdate = willUpdate;
    }


    //Dispatch 
    _dispatch_list(action) {

        switch (action.type) {
            case _list.List_Filter:
                this._setFilter();
                break;

            default:
                this.state.page = action.payload;
                this._list_findAll(action.type === _list.List_Page_Next)
                break;
        }
        return false;
    }

    _dispatch_list_item(action) {
        switch (action.type) {
            case act.Action_List_Item_Author:
                //window.open(action.data, '_blank');
                this._router_link_author_forward(action)
                break;
            case act.Action_List_Item_Detail:
                this._list_should_update(false);
                this.setState({
                    detailVisible: true,
                    detailObject: action.payload
                });
                break;
            default:
                alert(action.type + "-" + action.payload)
                break;
        }
        return false;
    }

    _dispatch_list_detail(action) {

        this._list_should_update(false);
        this.setState({
            detailVisible: false
        });
    }

    _dispatch_list_filter_popup(action) {
        switch (action.type) {
            case act.Action_List_Filter_Confirm:
                this.state.filterData = action.payload;
                this.state.page = 1;
                this._list_findAll(true)
                break;

            default:
                break;
        }

        this._setFilter(false);
        return false;
    }

    _setFilter(open = true) {
        this._list_should_update(false);
        this.setState({
            filterVisible: open
        });
    }

    //Router_link
    _router_link_author_forward(action) {
        let _types = action.type.split("_");
        let _type = _types[_types.length - 1].toLowerCase();
        let _link = `/detail?_v=${_type}`;
        this.state.link = {
            pathname: _link,
            // this is the trick!
            state: {
                modal: true,
                channel: {
                    type:"",
                    payload:action.payload
                }
            }
        }

        this.props.history.push(this.state.link)
    }

    render() {
        return (
            <div>
                <List
                    source={this.state.results}
                    pageSize={this.state.pageSize} total={this.state.total} page={this.state.page}
                    dispatch={this._dispatch_list.bind(this)}
                    dispatch_item={this._dispatch_list_item.bind(this)}
                    shouldUpdate={this.state.listShouldUpdate}
                    itemTag={tag.List_Item_Github}
                />

                <FilterListGithub
                    open={this.state.filterVisible}
                    dispatch={this._dispatch_list_filter_popup.bind(this)}
                />

                <DetailGeek
                    open={this.state.detailVisible}
                    source={this.state.detailObject}
                    dispatch={this._dispatch_list_detail.bind(this)}
                />

            </div>
        );
    }


}