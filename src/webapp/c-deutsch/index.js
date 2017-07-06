import React from 'react';
import * as wordService from './../service/dem/word-service';
import * as act from './../setting/action';

import ListTable from './../component/list/list-table'


export default class Deutsch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            pageSize: 30,
            total: 0,
            page: 1,
            filterData: { language: 'JavaScript', star: 3000 },
            filterVisible: false,
            willNeedUpdate: false,
        }
    }
    componentDidMount() {
        this._list_findAll(true)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.willNeedUpdate;
    }


    _list_findAll(willScrollTop) {
        this._list_deutsch_findAll(willScrollTop);
    }

    _list_deutsch_findAll(willScrollTop) {
        wordService.findAll({})
            .then(data => {
                this._list_prepare_update(willScrollTop)
                this.setState({
                    results: data.rows,
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
            case 'page':
                this.state.page = action.data;
                this._list_findAll(true)
                break;

            default:
                this.setState({ filterVisible: true });
                break;
        }
        return false;
    }

    _dispatch_list_item(action) {
        switch (action.type) {
            case act.Action_List_Github_Repository:
                window.open(action.data, '_blank');
                //this._router_link_detail(action)
                break;
            default:
                alert(action.type + "-" + action.data)
                break;
        }
        return false;
    }

    _dispatch_list_filter_popup(action) {
        switch (action.type) {
            case act.Action_Filter_List_Github_Confirm:
                this.state.filterData = action.data;
                this.state.page = 1;
                this._list_findAll(true)
                break;

            default:
                break;
        }

        this.state.willNeedUpdate = true;
        this.setState({ filterVisible: false });
        return false;
    }


    render() {
        return (
            <div>
                <ListTable
                    source={this.state.results} itemStyle="deutsch"
                    dispatch={this._dispatch_list.bind(this)} />
             
            </div>
        );
    }


}