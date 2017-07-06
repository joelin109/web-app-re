import React from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import {FlatButton, FontIcon, IconButton } from 'material-ui';


export default class ListTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showCheckboxes: false,
      height: 'auto',
    };
  }

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange(event) {
    this.setState({ height: event.target.value });
  };

  _handle_sort(event) {
    alert(event)
    // alert(value)
  }

  //Modify
  _handle_modify(event) {
    alert(event.currentTarget.value)
    // alert(value)
  }
  _handle_unregel(event) {
    alert(event.currentTarget.value.wort)
    // alert(value)
  }
  _handle_recommend(event) {
    alert(event.currentTarget.value['wort'])
    // alert(value)
  }
  _handle_approval(event) {
    alert(event.currentTarget.value)
    // alert(value)
  }

  _fontIcon(id, color = '#00838F') {
    let _hoverColor = "#EF5350"
    return <FontIcon className="material-icons" color={color} hoverColor={_hoverColor}>{id}</FontIcon>;
  }

  render() {
    let _defaultColor = "#757575"
    let _selectedColor = "#EF5350"
    let _tableBody = this.props.source.map((row, index) => (
      <TableRow key={index} selected={row.selected}>

        <TableRowColumn className='admin-list-col-wo' tooltip="dgdgfdgfdg">
          {row.wort}{(row.plural === '' ? '' : ', ' + row.plural)}
        </TableRowColumn>
        <TableRowColumn className='admin-list-col-40'>{row.wortsex}</TableRowColumn>
        <TableRowColumn className='admin-list-col-zh'>{row.zh} - {row.en}</TableRowColumn>
        <TableRowColumn className='admin-list-col-40'>{row.isregel}</TableRowColumn>
        <TableRowColumn className='admin-list-col-25'>
          <IconButton value={row} onTouchTap={this._handle_recommend.bind(this)}>
            {this._fontIcon((row.isrecommend === 1 ? 'favorite' : 'favorite_border'), (row.isrecommend === 1 ? _selectedColor : _defaultColor))}
          </IconButton>
        </TableRowColumn>
      </TableRow>

    ));
    return (
      <div className="admin-list">
        <div className="admin-list">
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
                  <FlatButton icon={this._fontIcon("arrow_downward")} label={'Word'} labelPosition="before"
                    onTouchTap={this._handle_sort.bind(this)} />
                </TableHeaderColumn>


                <TableHeaderColumn className='admin-list-col-40' tooltip="">
                  <FlatButton label={'Sex'} labelPosition="before"
                    onTouchTap={this._handle_sort.bind(this)} />
                </TableHeaderColumn>

                <TableHeaderColumn style={{ textAlign: 'center' }}>Zh</TableHeaderColumn>

                <TableHeaderColumn className='admin-list-col-40' tooltip="" >
                  <FlatButton label={'Regel'} labelPosition="before"
                    onTouchTap={this._handle_sort.bind(this)} />
                </TableHeaderColumn>
                <TableHeaderColumn tooltip="">Recommend</TableHeaderColumn>

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
      </div>
    );
  }
}