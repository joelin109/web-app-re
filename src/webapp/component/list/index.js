import React from 'react';
import { FloatingButton } from './../wui'
import ListCard from './list-card'
import Paginator from './paginator';
import { itemCovers, userThumbs } from './../../service/data/cover'
const covers = itemCovers
const thumbs = userThumbs

export const List_Page_Previous = 'List_Page_Previous'
export const List_Page_Next = 'List_Page_Next'
export const List_Filter = 'List_Filter'
export const List_New = 'List_New'
export const List_Refresh = 'List_Refresh'


export default class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            page: 1,
            listFilterButtonBground: app_Theme_Floating_Color, //#E57373',
        }

        this._dispatch_list_page_previous = this._dispatch_list_page_previous.bind(this);
        this._dispatch_list_page_next = this._dispatch_list_page_next.bind(this);
        this._handle_list_filter = this._handle_list_filter.bind(this);
        this._handle_list_new = this._handle_list_new.bind(this);
        this._handle_list_refresh = this._handle_list_refresh.bind(this);
        this._dispatch_list_item = this._dispatch_list_item.bind(this);

        // alert('ListBase-constructor')
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (typeof (nextProps.shouldUpdate) !== "undefined" && nextProps.shouldUpdate === false) {
            return false;
        }
        else {
            return true;
        }
    }

    //Dispatch
    _dispatch_list_item(action) {
        this.props.dispatch_item(action);
        return false;
    }

    _dispatch_list_page_previous() {
        this.state.page = this.state.page - 1;
        this.props.dispatch({ type: List_Page_Previous, payload: this.state.page });
        return false;
    }

    _dispatch_list_page_next() {
        this.state.page = this.state.page + 1;
        this.props.dispatch({ type: List_Page_Next, payload: this.state.page });
        return false;
    }

    _handle_list_filter() {
        this.props.dispatch({ type: List_Filter, payload: '' });
        return false;
    }
    _handle_list_new() {
        this.props.dispatch({ type: List_New, payload: '' });
        return false;
    }
    _handle_list_refresh() {
        this.props.dispatch({ type: List_Refresh, payload: '' });
        return false;
    }

    _adjustResult(result, page) {

        let _result = result;
        let _random = []
        let _length = page === 1 ? Math.floor(covers.length * 0.5) : covers.length
        Array.from(_result, (item) => {

            let _random_index = Math.floor(Math.random() * _length)

            for (var i = 0; i < 10; i++) {
                if (this._contains(_random, _random_index) === false) break;
                _random_index = Math.floor(Math.random() * _length)
            }
            _random.push(_random_index)

            item["coverSrc"] = covers[_random_index];
            item["userThumb"] = thumbs[Math.floor(Math.random() * thumbs.length)]
            return item
        })

        return _result;
    }

    _contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }

    render() {
        this.state.results = this._adjustResult(this.props.source, this.state.page);
        let _itemTag = this.props.itemTag;
        let _key = `list-${_itemTag}`;
        if (this.props.page !== null && this.props.page === 1) {
            this.state.page = 1;
        }

        let _new = '';
        let _refresh = '';
        if (this.props.admin !== null && this.props.admin) {
            _new = <FloatingButton className="loc-right-box colr-selected loc-top-3 z-3"
                id="add" onTouch={this._handle_list_new} />
            _refresh = <FloatingButton className="loc-right-box colr-selected loc-btm-1 z-3"
                id="refresh" onTouch={this._handle_list_refresh} />
        }

        return (
            <div>
                <ListCard key={_key}
                    itemTag={_itemTag}
                    source={this.state.results}
                    dispatch={this._dispatch_list_item.bind(this)}
                />

                <Paginator
                    page={this.state.page}
                    pageSize={this.props.pageSize} total={this.props.total}
                    onPrevious={this._dispatch_list_page_previous.bind(this)}
                    onNext={this._dispatch_list_page_next.bind(this)}
                />

         
                <FloatingButton className="loc-right-box colr-floating loc-top-1-2 z-3"
                        id="filter_list" onTouch={this._handle_list_filter}
                />
                          
                {_new}{_refresh}
            </div>
        );
    }


}