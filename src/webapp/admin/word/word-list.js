import React from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import { TextField, Toggle, FlatButton, IconButton } from 'material-ui';
import { SIcon } from './../../component/wui'
import * as act from './../../setting/action'



export default class WordList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showCheckboxes: false,
      height: 'auto',
    };
  }

  _handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  _handleChange(event) {
    this.setState({ height: event.target.value });
  };

  //For Table List
  _handle_list_sort(event) {
    let _act = { type: act.Action_Admin_Word_List_Sort, data: event };
    this.props.dispatch(_act);
  }
  _handle_list_page(event) {
    let _act = { data: event };
    this.props.dispatch(_act);
  }

  //For Table List Item
  _handle_item_modify(event, data) {
    let _act = { type: act.Action_Admin_Word_List_Item_Modify, data: event };
    this.props.dispatch_item(_act)
  }
  _handle_item_regel(event) {
    alert(event.currentTarget.value.wort)
    // alert(value)
  }
  _handle_item_recommend(event) {
    alert(event.currentTarget.value['wort'])
    // alert(value)
  }
  _handle_item_approval(event) {
    alert(event.currentTarget.value)
    // alert(value)
  }


  render() {
    let _sortIcon = <SIcon id="arrow_downward" />
    let _result = this.props.source;

    let _tableBody = _result.map((row, index) => (
      <TableRow key={index} selected={row.selected}>

        <TableRowColumn className='admin-list-col-wo' tooltip="dgdgfdgfdg">
          {row.wort}{(row.plural === '' ? '' : ', ' + row.plural)}
        </TableRowColumn>
        <TableRowColumn className='admin-list-col-50'>{row.wort_sex}</TableRowColumn>
        <TableRowColumn className='admin-list-col-zh'>{row.zh} - {row.en}</TableRowColumn>
        <TableRowColumn className='admin-list-col-30'>
           <IconButton value={row}
            onTouchTap={this._handle_item_regel.bind(this)}>
            <SIcon id={row.is_regel === 1 ? 'star_border' : 'star_half'} selected={row.is_regel !== 1} />
          </IconButton>
        </TableRowColumn>
        <TableRowColumn className='admin-list-col-30'>
          <IconButton value={row}
            onTouchTap={this._handle_item_recommend.bind(this)}>
            <SIcon id={row.is_recommend === 1 ? 'favorite' : 'favorite_border'} selected={row.is_recommend === 1} />
          </IconButton>
        </TableRowColumn>
        <TableRowColumn className='admin-list-col-st'>
          {row.status}

          &nbsp;&nbsp;&nbsp;
          <IconButton value={row.wort}
            onTouchTap={this._handle_item_approval.bind(this)}>
            <SIcon id="thumb_up" selected={row.status === 'accepted'} />
          </IconButton>

          <IconButton value={row.wort}
            onTouchTap={this._handle_item_approval.bind(this)}>
            <SIcon id="thumb_down" selected={row.status === 'rejected'} />
          </IconButton>

          &nbsp;&nbsp;
          <IconButton onTouchTap={this._handle_item_modify.bind(this, row)}>
            <SIcon id="edit" />
          </IconButton>

        </TableRowColumn >

      </TableRow>

    ));

    let _classname = _tableBody.length === 0 ? 'admin-table-default' : 'admin-table';
    return (
      <div className="admin-table">
        <div className={_classname}>
          <Table style={{ tableLayout: 'auto' }}
            height={this.state.height}
            fixedHeader={false}
            selectable={this.state.showCheckboxes}
            multiSelectable={true}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
            >

              <TableRow>
                <TableHeaderColumn className='admin-list-col-wo' tooltip="Sort">
                  <FlatButton icon={_sortIcon} label={'Word'} labelPosition="before"
                    onTouchTap={this._handle_list_sort.bind(this)} />
                </TableHeaderColumn>

                <TableHeaderColumn className='admin-list-col-50' tooltip="">
                  <FlatButton label={'Sex'} labelPosition="before"
                    onTouchTap={this._handle_list_sort.bind(this)} />
                </TableHeaderColumn>

                <TableHeaderColumn style={{ textAlign: 'center' }} >
                  Zh
                </TableHeaderColumn>

                <TableHeaderColumn className='admin-list-col-30' tooltip="" >
                  <FlatButton label={'Regel'} labelPosition="before" />
                </TableHeaderColumn>

                <TableHeaderColumn tooltip="">Recommend</TableHeaderColumn>

                <TableHeaderColumn className='admin-list-col-st' tooltip="">
                  <FlatButton icon={_sortIcon} label={'Status'} labelPosition="before"
                    onTouchTap={this._handle_list_sort.bind(this)} />
                </TableHeaderColumn>

              </TableRow>
            </TableHeader>

            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              showRowHover={true}
              stripedRows={true}
            >
              {_tableBody}
            </TableBody>

            <TableFooter
              adjustForCheckbox={this.state.showCheckboxes}
            >
              <TableRow>
                <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                  Super Footer
              </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <div className='admin-list-setting'>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={this._handleChange.bind(this)}
          />
          <Toggle
            name="showCheckboxes"
            label="Show Checkboxes"
            onToggle={this._handleToggle.bind(this)}
            defaultToggled={this.state.showCheckboxes}
          />
        </div>

      </div>
    );
  }
}