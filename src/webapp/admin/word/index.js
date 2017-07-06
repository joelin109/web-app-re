import React from 'react';
import { FloatingActionButton, FontIcon } from 'material-ui';
import * as service from './../../service';
import * as act from './../../setting/action'
import WordList from './word-list'
import WordListFilter from './word-list-filter'
import NewWord from './new-word'


export default class AdminWord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      pageSize: 0,
      page: 1,
      total: 0,
      filterVisible: false,
      filterObject: {},
      editVisible: false,
      editObject: {},
      willNeedUpdate: true,
    };

    this._handle_list_filter = this._handle_list_filter.bind(this);
    this._dispatch_list = this._dispatch_list.bind(this);
    this._dispatch_list_filter = this._dispatch_list_filter.bind(this);
    this._dispatch_list_item = this._dispatch_list_item.bind(this);
    this._dispatch_list_item_update = this._dispatch_list_item_update.bind(this);

  }

  componentDidMount() {
    this._list_findAll();
  }

  componentWillReceiveProps(nextProps) {
    this.state.filterVisible = nextProps.open;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.willNeedUpdate;
  }

  //API Request&Response
  _list_findAll(willScrollTop) {

    this.state.pageSize = 30;
    service.findAll('', {})
      .then(data => {
 
        this._component_prepare_update(willScrollTop)
        this.setState({
          results: data.rows,
          pageSize: 30,
        });
      });

  }

  _component_prepare_update(willScrollTop) {
    if (willScrollTop == true) {
      //window.scrollTo(0, 0);
    }
    this.state.willNeedUpdate = true;
  }


  _handle_list_filter() {
    this.state.willNeedUpdate = true;
    this.setState({ filterVisible: true })
  }


  //Acton
  _action_list_article_tag(tag) {
    this.state.filterObject = tag;
    this.state.page = 1;
    this._list_findAll()
  }

  _action_list_article_filter(range) {
    this.state.filterObject = ""
    this.state.page = 1;
    this._list_findAll()
  }


  _action_list_page_previous() {
    this.state.page = this.state.page - 1;
    this._list_findAll()
  }

  _action_list_page_next() {
    this.state.page = this.state.page + 1;
    this._list_findAll(true)
  }



  _dispatch_list(action) {

    switch (action.type) {
      case act.Action_List_Article_Tag:
        this._action_list_article_tag(action.data)
        break;
      case act.Action_Admin_Word_List_Sort:
        alert(action.data)
        break;

      default:
        //this.props.dispatch(action, action.data)
        break;
    }
    return false;
  }

  _dispatch_list_filter(action) {
    this.setState({
      filterVisible: false,
      editVisible: false
    });

    return false;
  }

  _dispatch_list_item(action) {
    let _item = action.data;
    switch (action.type) {
      case act.Action_Admin_Word_List_Item_Modify:
        this.setState({
          filterVisible: false,
          editVisible: true,
        });
        break;

      default:
        //this.props.dispatch(action, action.data)
        break;
    }
    return false;
  }

  _dispatch_list_item_update(action) {

  }


  render() {
    let _filterVisible = this.state.filterVisible;
    let _editVisible = _filterVisible ? false : this.state.editVisible;
    let _willUpdate = !_filterVisible && !_editVisible;

    let color = "#EEEEEE"
    let hoverColor = "#EF5350"
    let search = <FontIcon className="material-icons" color={hoverColor} hoverColor={hoverColor}>filter_list</FontIcon>;

    return (
      <div>
        <WordList
          source={this.state.results}
          pageSize={this.state.pageSize} total={this.state.total} page={this.state.page}
          dispatch={this._dispatch_list}
          dispatch_item={this._dispatch_list_item}
          refresh={_willUpdate} />

        <div className="loc-right-box">
          <FloatingActionButton className="loc-top-1-1 z-3"
            backgroundColor={hoverColor} zDepth={2}
            onTouchTap={this._handle_list_filter}>
            {search}
          </FloatingActionButton>
        </div>

        <WordListFilter
          open={_filterVisible}
          dispatch_filter={this._dispatch_list_filter}
        />

        <NewWord
          open={_editVisible}
          source={this.state.editObject}
          dispatch_item_update={this._dispatch_list_item_update}
        />
      </div>
    );
  }
}