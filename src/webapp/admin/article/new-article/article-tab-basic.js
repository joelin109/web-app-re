import React from 'react'
import { TextField, RadioButtonGroup, RadioButton, Toggle, Checkbox, DropDownMenu, MenuItem } from 'material-ui';
import * as act from './../../../setting/action'
import * as util from './../../../util'
import { Button, _colorLightGray, _colorSelected } from './../../../component/wui'

const _action_Handle_Save = 'Action_Handle_Save';
export default class ArticleTabBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNew: true,
            item: {},
            articleID: '',
            isRecommend: false,
            status: 0,
            channel: '',
            tag: '',
            coverSrc: '',
            coverThumbSrc: '',
            coverSrcReload: false,
            title: '',
            subTitle: '',
            originalUrl: '',
            desc: '',
            formatType: 'html',
            isOriginal: true,
            willUpdate: true,
        };

        this._initItem(props.source);


        this._handle_item_recommend = this._handle_item_recommend.bind(this);
        this._handle_item_approval = this._handle_item_approval.bind(this);
        this._handle_item_unapproval = this._handle_item_unapproval.bind(this);
        this._handle_item_channel = this._handle_item_channel.bind(this);
        this._handle_item_tag = this._handle_item_tag.bind(this);
        this._handle_item_coverSrc = this._handle_item_coverSrc.bind(this);
        this._handle_item_cover_thumbSrc = this._handle_item_cover_thumbSrc.bind(this);
        this._handle_item_title = this._handle_item_title.bind(this);
        this._handle_item_subTitle = this._handle_item_subTitle.bind(this);
        this._handle_item_desc = this._handle_item_desc.bind(this);
        this._handle_type_choose = this._handle_type_choose.bind(this);
        this._handle_togle_original = this._handle_togle_original.bind(this);

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.onSave) {
            this._save()
            this.state.willUpdate = false;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.willUpdate;
    }


    _initItem(source) {
        let _isNew = source === null;
        let _item = source;

        this.state.isNew = _isNew;
        this.state.articleID = _isNew ? '' : _item.id;
        this.state.coverSrc = _isNew ? '' : _item.cover_src;
        this.state.coverThumbSrc = _isNew ? '' : _item.cover_thumbnail_src;
        this.state.isRecommend = _isNew ? false : _item.is_recommend;
        this.state.status = _isNew ? 1 : _item.publish_status;
        this.state.title = _isNew ? '' : _item.title;
        this.state.desc = _isNew ? '' : _item.desc;
        this.state.originalUrl = _isNew ? '' : _item.original_url;

    }

    _save() {
        let _source = this.props.source === null ? {} : this.props.source;
        _source.is_recommend = this.state.isRecommend;
        _source.publish_status = this.state.status;
        _source.coverSrc = this.state.coverSrc;
        _source.coverThumbSrc = this.state.coverThumbSrc;
        _source.title = this.state.title;
        _source.desc = this.state.desc;
        _source.id = this.state.articleID;

        let _action = { type: _action_Handle_Save, data: _source };
        this.props.dispatch(_action);
        this.state.willUpdate = true;
    }




    _handle_item_recommend(event, value) {
        let _isRec = this.state.isRecommend;
        this.state.isRecommend = !_isRec;
        this._save();

        this.setState({ willUpdate: true });
    };
    _handle_item_approval(event, value) {
        let _status = this.state.status === 1 ? 0 : 1;
        this.state.status = _status;
        this._save();

        this.setState({ willUpdate: true });
    };
    _handle_item_unapproval(event, value) {
        let _status = this.state.status === -1 ? 0 : -1;
        this.state.status = _status;
        this._save();

        this.setState({ willUpdate: true });
    };

    _handle_item_channel() {

    }
    _handle_item_tag() {

    }

    //Add or edit the word info.
    _handle_item_coverSrc(event, newValue) {
        this.state.coverSrc = newValue;

        if (util.isImage(newValue)) {
            this.setState({ coverSrcReload: true });
        }
    }
    _handle_item_cover_thumbSrc(event, newValue) {
        this.state.coverThumbSrc = newValue;

         if (util.isImage(newValue)) {
            this.setState({ coverSrcReload: false });
        }
    }
    _handle_item_title(event, newValue) {
        this.state.title = newValue;
        this._save();
    }
    _handle_item_subTitle(event, newValue) {
        this.state.subTitle = newValue;
    }
    _handle_item_desc(event, newValue) {
        this.state.desc = newValue;
    }

    _handle_type_choose(event, value) {

    }
    _handle_togle_original(event, value) {
        //this.setState({ unRegel: value });
    };



    render() {
        let _fieldClassName = 'root-text-field-full';

        let _coverSrc = this.state.coverSrc;
        let _coverThumbSrc = this.state.coverThumbSrc;
        let _coverSrcDisplay = this.state.coverSrcReload;
        let _recommend = this.state.isRecommend;
        let _status = this.state.status;
        let _title = this.state.title;
        let _recommendButton = <Button id={_recommend ? 'favorite' : 'favorite_border'} styleColor={_recommend ? _colorSelected : _colorLightGray}
            onTouch={this._handle_item_recommend} />;
        let _upButton = <Button id="thumb_up" styleColor={_status === 1 ? app_Theme_Primary_Color : _colorLightGray}
            onTouch={this._handle_item_approval} />;
        let _downButton = <Button id="thumb_down" styleColor={_status === -1 ? app_Theme_Primary_Color : _colorLightGray}
            onTouch={this._handle_item_unapproval} />;

        return (

            <div className="draw-detail-tab-content-basic">
                <div className="draw-detail-tab-content-basic-box" tabindex="0">
                    <div className="content-line">

                        <div className="itemBox-img-box">
                            <img className="itemBox-img-cover" src={_coverSrcDisplay ? _coverSrc : _coverThumbSrc} />
                            <div className="itemBox-recommend">
                                {_recommendButton}
                            </div>
                        </div>
                        <div className="draw-content-box">
                            <div className="content-line">
                                Status: &nbsp;&nbsp;{_upButton} {_downButton}
                            </div>
                            <div className="content-line">
                                Channel:
                                 <DropDownMenu value={'pending'} onChange={this._handle_item_channel}>
                                    <MenuItem value={'pending'} primaryText="Pending" />
                                    <MenuItem value={'accepted'} primaryText="Accepted" />
                                    <MenuItem value={'rejected'} primaryText="Rejected" />
                                </DropDownMenu>
                            </div>
                            <div className="content-line">
                                Tag:
                                 <DropDownMenu value={'pending'} onChange={this._handle_item_tag}>
                                    <MenuItem value={'pending'} primaryText="Pending" />
                                    <MenuItem value={'accepted'} primaryText="Accepted" />
                                    <MenuItem value={'rejected'} primaryText="Rejected" />
                                </DropDownMenu>
                            </div>
                        </div>



                    </div>

                    <TextField
                        onChange={this._handle_item_coverSrc}
                        defaultValue={_coverSrc}
                        className={_fieldClassName}
                        hintText="Image link"
                        floatingLabelText="Cover Src"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        onChange={this._handle_item_cover_thumbSrc}
                        defaultValue={_coverThumbSrc}
                        className={_fieldClassName}
                        hintText="."
                        floatingLabelText="Cover Thumbnail Src"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        onChange={this._handle_item_title}
                        defaultValue={_title}
                        className={_fieldClassName}
                        hintText="..."
                        floatingLabelText="Title"
                        floatingLabelFixed={true}
                    />
                    <TextField
                        defaultValue={this.state.articleID}
                        className={_fieldClassName}
                        hintText="."
                        floatingLabelText="SubTitle"
                        floatingLabelFixed={true}
                    />

                    <TextField
                        defaultValue={this.state.originalUrl}
                        disabled={true}
                        className={_fieldClassName}
                        hintText="."
                        floatingLabelText="Original Resource"
                        floatingLabelFixed={true}
                    /><a href={this.state.originalUrl} target="_blank">    ...</a>

                    <TextField
                        defaultValue={this.state.desc}
                        className={_fieldClassName}
                        hintText="."
                        floatingLabelText="Desc"
                        floatingLabelFixed={true}
                    />
                    <div className="content-line">
                        <p className="draw-content-text-title">Format Type:&nbsp;&nbsp;</p>
                        <RadioButtonGroup
                            className="content-line w-limit-600"
                            onChange={this._handle_sex_choose}
                            name="shipSpeed"
                            defaultSelected={'html'}>

                            <RadioButton className="popup-dialog-radio"
                                value="html"
                                label="Html"
                                disabled={true}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="markdown"
                                label="Markdown"
                                disabled={true}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="json"
                                label="JSon"
                                disabled={true}
                            />
                            <RadioButton className="popup-dialog-radio"
                                value="xml"
                                label="Xml"
                                disabled={true}
                            />
                        </RadioButtonGroup>
                    </div>

                    <div className="content-line">

                        <Checkbox
                            disabled={true}
                            className="draw-content-check-regel"
                            label="Original"
                            defaultChecked={this.state.originalUrl === ''}
                            onCheck={this._handle_togle_regel}
                        />

                        Updated: 2017-04-21 . 11:06

                    </div>

                </div>
            </div>

        )
    }
}