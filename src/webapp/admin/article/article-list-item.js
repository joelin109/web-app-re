import React from 'react';
import * as service from './../../service';
import { Card, } from 'material-ui/Card';
import { Button, StarRating, _colorDefault, _colorLightGray, _colorSelected } from './../../component/wui'
import * as act from './../action';

const _action_List_Item_Cover = 'Action_List_Item_Cover';
const _action_List_Item_Edit = 'Action_List_Item_Edit';
const _action_List_Item_Update = 'Action_List_Item_Update';
export default class ArticleListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            willUpdate: true,
            id: '',
            isRecommend: false,
            status: 0,
            coverThumbSrc: '',
            title: '',
            tagID: '',
            tagName: '',
            updated: '',
        };

        this._initItem(props.value)

        this._handle_item_cover = this._handle_item_cover.bind(this);
        this._handle_item_detail = this._handle_item_detail.bind(this);
        this._handle_item_tag = this._handle_item_tag.bind(this);
        this._handle_item_recommend = this._handle_item_recommend.bind(this);
        this._handle_item_approval = this._handle_item_approval.bind(this);
        this._handle_item_unapproval = this._handle_item_unapproval.bind(this);
        this._handle_item_edit = this._handle_item_edit.bind(this);
    }

    componentDidMount() {
        this.state.loading = false
    }

    componentWillReceiveProps(nextProps) {
        this._initItem(nextProps.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;//(this.state.total != nextProps.total);
    }

    _initItem(source) {

        let _item = source;
        this.state.id = _item.id;
        this.state.coverThumbSrc = _item.cover_thumbnail_src;
        this.state.title = _item.title;
        this.state.isRecommend = _item.is_recommend;
        this.state.status = _item.publish_status;
        this.state.updated = _item.last_update_date;
        this.state.tagID = _item.tag_id;
        this.state.tagName = service.getTagTitle(_item.tag_id);

    }

    _update(componentUpdate = true) {

        if (componentUpdate) {
            this.setState({ willUpdate: true });
        }

        let _updateItem = this.props.value;
        _updateItem["is_recommend"] = this.state.isRecommend;
        _updateItem["publish_status"] = this.state.status;
        this.props.dispatch({ type: _action_List_Item_Update, data: _updateItem })
    }


    _handle_item_cover(e) {
        this.props.dispatch({ type: _action_List_Item_Cover, data: this.props.value })
        //this.props.dispatch({ type: act.Action_List_Article_Detail, data: e.target.src })
    };

    _handle_item_detail(e) {
        //this.props.dispatch({ type: act.Action_List_Article_Detail, data: e.target.src })
    };

    _handle_item_tag(e) {
        //this.props.dispatch({ type: act.Action_List_Article_Tag, data: e.target.innerHTML })
    };

    _handle_item_recommend() {
        let _isRecommend = this.state.isRecommend;
        this.state.isRecommend = !_isRecommend;
        this._update(true);
    };

    _handle_item_approval() {
        let _status = this.state.status === 1 ? 0 : 1;
        this.state.status = _status;
        this._update(true);
    };

    _handle_item_unapproval() {
        let _status = this.state.status === -1 ? 0 : -1;
        this.state.status = _status;
        this._update(true);
    };

    _handle_item_edit() {
        this.props.dispatch({ type: _action_List_Item_Edit, data: this.props.value })
    };




    render() {
        let _author = this.props.value.author === null ? '---' : this.props.value.author;
        let pills = <li2 ><p className="word" onClick={this._handle_item_tag}>{this.state.tagName}</p></li2>;

        let _coverSrc = this.state.coverThumbSrc;
        let _title = this.state.title;
        let _recommend = this.state.isRecommend;
        let _status = this.state.status;
        let _body_match_level = this.props.value.body_match_level;

        let _recommendButton = <Button id={_recommend ? 'favorite' : 'favorite_border'}
            styleColor={_recommend ? _colorSelected : _colorLightGray} onTouch={this._handle_item_recommend} />;
        let _matchStarRating = <StarRating totalStar={_body_match_level} />
        let _upButton = <Button id="thumb_up" styleColor={_status === 1 ? app_Theme_Primary_Color : _colorLightGray}
            onTouch={this._handle_item_approval} />;
        let _downButton = <Button id="thumb_down" styleColor={_status === -1 ? app_Theme_Primary_Color : _colorLightGray}
            onTouch={this._handle_item_unapproval} />;
        let _editButton = <Button id="edit" styleColor={_colorDefault} onTouch={this._handle_item_edit} />;

        return (

            <div className="itemC">
                <Card className="itemBox">

                    <div className="itemBox-img-box">
                        <img
                            className="itemBox-img-cover" id="im-user-id"
                            src={_coverSrc}
                            onClick={this._handle_item_cover}
                        />

                        <div className="itemBox-recommend">
                            {_recommendButton}
                        </div>

                        <div className="limit-line-0">
                            {_matchStarRating}
                        </div>
                    </div>

                    <div className="itemBox-text-box-admin">
                        <h3 className="itemBox-text-title limit-line-3">
                            <a href={this.props.value.original_url} target="_blank">{_title}</a>
                        </h3>
                        <p className="itemBox-text-subTitle">{this.state.updated}</p>
                        <p></p>
                        <ul className="keyword cfix">
                            {pills}
                        </ul>
                    </div>

                    <div className="itemBox-console-box">
                        <div className="itemBox-console-box-left"> {_upButton} {_downButton} </div ><div className="itemBox-console-box-right"> {_editButton}</div>
                    </div>
                </Card>
            </div>
        );
    }
}