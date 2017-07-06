import React from 'react';
import * as service from './../../service/article';
import * as act from './../action';
import * as tag from './../../component/item/tag'
import List, * as _list from './../../component/list'
import ArticleListFilter from './article-list-filter'
import NewArticle from './new-article'


const _action_Admin_Channel_Type_Crawler = 'Action_Admin_Channel_Type_Crawler'
export default class AdminArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            pageSize: service.request_page_size,
            total: 0,
            page: 1,
            listUpdate: false,
            filterData: "ars-technica",
            filterVisible: false,
            editVisible: false,
            editObject: {},
            willNeedUpdate: false,
        }

        this._dispatch_list = this._dispatch_list.bind(this);
        this._dispatch_list_filter = this._dispatch_list_filter.bind(this);
        this._dispatch_list_item = this._dispatch_list_item.bind(this);
        this._dispatch_list_item_article = this._dispatch_list_item_article.bind(this);
    }

    componentDidMount() {
        this._list_findAll(true)
    }

    componentWillReceiveProps(nextProps) {
        let _props_channel = this._get_router_link_state_data(nextProps)
        if (_props_channel !== null && _props_channel.type === _action_Admin_Channel_Type_Crawler) {

            service.crawlArticle({})
                .then(data => { });
        }

        this._component_should_update(false);
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


    //-----------------------------------
    _list_findAll(willScrollTop) {
        let filter = { filter: this.state.filterData, page: this.state.page }

        service.findAll(filter)
            .then(data => {
                this._component_should_update(true, true)
                this.setState({
                    results: data.rows,
                    total: data.page.total_rows
                });
            });
    }

    _listItemStatusUpdate(updatedItem) {

        service.updateStatus(updatedItem)
            .then(data => {
                this._listItemUpdate(updatedItem, false)
            });

    }

    _listItemUpdate(updatedItem, willRefresh = true) {
        // delete old item, then insert new updated item.
        let _updatedResult = this.state.results.map(item => {
            return item["id"] !== updatedItem["id"] ? item : updatedItem
        });
        /*let _updatedResult = this.state.results;
        Array.from(_updatedResult, (item) => {
            return item["id"] !== updatedItem["id"] ? item : updatedItem
        })*/

        this.state.listUpdate = willRefresh;
        this.state.willNeedUpdate = willRefresh;
        this.setState({
            results: _updatedResult
        });
    }

    _component_should_update(willUpdate = true, willScroll = false) {
        if (willScroll == true) {
            window.scrollTo(0, 0);
        }
        this.state.filterVisible = false;
        this.state.detailVisible = false;
        this.state.editVisible = false;
        this.state.listUpdate = true;
        this.state.willNeedUpdate = willUpdate;
    }


    //Dispatch 
    _dispatch_list(action) {
        switch (action.type) {
            case _list.List_Filter:
                this._setFilter()
                break;
            case _list.List_New:
                this._setEditOrNew();
                break;
            case _list.List_Refresh:
                this._list_findAll(true)
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
            case act.Action_List_Item_Update:
                this._listItemStatusUpdate(action.data)
                break;
            case act.Action_List_Item_Edit:
                this._setEditOrNew(action.data, false)
                break;
            case act.Action_List_Item_Cover:
                this._setEditOrNew(action.data, false)
                break;

            default:
                break;
        }
        return false;

    }

    _dispatch_list_item_article(action) {
        switch (action.type) {
            case act.Action_Handle_Cancel:
                this._setFilter(false);
                break;
            case act.Action_Handle_Save:
                this._listItemUpdate(action.data)
                break;

            default:
                break;
        }

        return false;
    }


    _dispatch_list_filter(action) {
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
            listUpdate: false,
            filterVisible: open,
            editVisible: false
        });
    }
    _setEditOrNew(data, isNew = true) {
        this.state.editObject = isNew ? null : data;

        this._component_should_update();
        this.setState({
            listUpdate: false,
            filterVisible: false,
            editVisible: true,
        });
    }


    render() {
        let _filterVisible = this.state.filterVisible;
        let _editVisible = _filterVisible ? false : this.state.editVisible;
        let _pageSize = this.state.results.length >= this.state.pageSize ? this.state.results.length : this.state.pageSize

        let _newAticle = <div></div>
        if (_editVisible === true) {
            _newAticle = <NewArticle open={_editVisible} source={this.state.editObject}
                dispatch_item_article={this._dispatch_list_item_article} />
        }

        return (
            <div>
                <List
                    source={this.state.results}
                    pageSize={_pageSize} total={this.state.total}
                    dispatch={this._dispatch_list}
                    dispatch_item={this._dispatch_list_item}
                    shouldUpdate={this.state.listUpdate}
                    itemTag={tag.List_Item_Admin_Article}
                    admin={true}
                    updateItem={'id'}
                />

                <ArticleListFilter
                    open={_filterVisible}
                    dispatch_filter={this._dispatch_list_filter}
                />

                {_newAticle}
            </div>
        );
    }


}