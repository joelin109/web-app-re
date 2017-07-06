import React from 'react';

import * as service from './../service/dem/news-service';
import * as act from './../setting/action';
import * as tag from './../component/item/tag'
import List, * as _list from './../component/list'
import FilterListNews from './filter-list-news'



export default class News extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            pageSize: 30,
            total: 0,
            page: 1,
            filterData: "ars-technica",
            filterVisible: false,
            detailVisible: false,
            willNeedUpdate: false,
        }
    }
    componentDidMount() {
        this._list_findAll(true)
    }

    componentWillReceiveProps(nextProps) {
        this._component_should_update(false);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.willNeedUpdate;
    }


    _list_findAll(willScrollTop) {
        this._list_news_findAll(willScrollTop);
    }

    _list_news_findAll(willScrollTop) {
        this.state.pageSize = 30;
        let filter = { filter: this.state.filterData, page: this.state.page }

        service.findAll(filter)
            .then(data => {

                let _results = this._mergeResult(data.articles, data.source);
                this._component_should_update(true, true)
                this.setState({
                    results: _results,
                });
            });
    }

    _component_should_update(willUpdate = true, willScroll = false) {
        if (willScroll == true) {
            window.scrollTo(0, 0);
        }
        this.state.filterVisible = false;
        this.state.detailVisible = false;
        this.state.willNeedUpdate = willUpdate;
    }

    _mergeResult(result, tag) {

        let _result = result;
        Array.from(_result, (item) => {
            item["tag"] = tag;
            return item
        })

        return _result;
    }


    //Dispatch 
    _dispatch_list(action) {

        switch (action.type) {
            case _list.List_Filter:
                this._setFilter()
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
            case act.Action_List_Github_Repository:
                this._component_should_update();
                this.setState({
                    detailVisible: true,
                    detailObject: action.data,
                });
                break;
                
            default:
                alert(action.type + "-" + action.data)
                break;
        }
        return false;
    }


    _dispatch_list_filter_popup(action) {
        switch (action.type) {
            case act.Action_List_Filter_Confirm:
                this.state.filterData = action.data;
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
        this._component_should_update();
        this.setState({
            filterVisible: open,
            detailVisible: false
        });
    }





    render() {
        let _filterOrDetail = this.state.filterVisible || this.state.detailVisible;
        return (
            <div>
                <List
                    source={this.state.results}
                    pageSize={this.state.pageSize} total={this.state.results.length}
                    dispatch={this._dispatch_list.bind(this)}
                    dispatch_item={this._dispatch_list_item.bind(this)}
                    filterOpen={_filterOrDetail}
                    itemTag={tag.List_Item_Article}
                />

                <FilterListNews
                    open={this.state.filterVisible}
                    dispatch={this._dispatch_list_filter_popup.bind(this)}
                />


            </div>
        );
    }


}