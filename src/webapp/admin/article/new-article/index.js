import React from 'react'
import * as service from './../../../service/article';
import { Drawer } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { FloatingButton } from './../../../component/wui'
import * as act from './../../action'
import * as util from './../../../util'
import DetailHeader from './../../detail-header'
import ArticleTabBasic from './article-tab-basic'
import RichTextEditor from './../../editor/'
import * as convert from './../../editor/e-convert'


export default class NewArticle extends React.Component {
    constructor(props) {
        super(props);

        let _html = '<p>...</p>';
        this.state = {
            open: props.open,
            source: props.source,
            editorHtml: _html,
            willSave: false,
            refresh: false,

            tabIndex: 1,
            type: '-',
            sex: '-',
            unRegel: false,
            recommend: false,

        };


        this._handle_tab_save = this._handle_tab_save.bind(this);
        this._handle_tab_basic = this._handle_tab_basic.bind(this);
        this._handle_tab_desc = this._handle_tab_desc.bind(this);
        this._handle_tab_preview = this._handle_tab_preview.bind(this);
        this._dispatch_header = this._dispatch_header.bind(this);
        this._dispatch_tab_basic = this._dispatch_tab_basic.bind(this);
        this._dispatch_tab_desc = this._dispatch_tab_desc.bind(this);

    }

    componentDidMount() {
        this._getDetail()
    }

    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
        this.state.source = nextProps.source;
    }


    _getDetail() {

        if (this.state.source !== null) {
            let _filter = { id: this.state.source.id }
            service.detail(_filter)
                .then(result => {
                    if (result.body_text !== null) {
                        this.state.editorHtml = result.body_text;
                        this.state.source.title = result.title;
                        this.setState({ willSave: false, refresh: true });
                    }
                });
        }

    }

    _save() {
        let _data = this.state.source;
        _data.body_text = this.state.editorHtml;
        _data.body_match_level = this.state.editorHtml.length > 100 ? 3 : 1;
        service.update(_data)
            .then(data => {
                //Should update to the latest source.
                let _action = { type: act.Action_Handle_Save, data: this.state.source };
                this.props.dispatch_item_article(_action);   
                alert('save successful')
            });
    }

    _close() {
        let _action = { type: act.Action_Handle_Cancel }
        this.props.dispatch_item_article(_action);
    }

    _handle_item_refresh() {
        let _item = this.state.source;
        let _filter = {
            id: _item.id,
            original_url: _item.original_url
        }
        service.crawlHttpUrl(_filter)
            .then(result => {
                this.state.editorHtml = result.body_text;
                this.setState({ willSave: false, refresh: true });
            });
    }

    _handle_tab_save() {
        this.setState({ willSave: true, refresh: false });
        return false;
    }

    _handle_tab_basic(tab) {
        this.state.tabIndex = 1;
        this.setState({ willSave: false, refresh: false });
    }

    _handle_tab_desc(tab) {
        this.state.tabIndex = 2;
        this.setState({ willSave: false, refresh: false });
    }

    _handle_tab_preview(tab) {
        this.state.tabIndex = 3;
        this.setState({ willSave: false, refresh: false });
    }



    //Action for menu
    _dispatch_header(action) {
        this.state.willSave = false;

        switch (action.type) {
            case act.Action_Handle_Cancel:
                this._close()
                break;

            case act.Action_Handle_Save:
                this._save();
                break;

            case act.Action_Handle_Refresh:
                this._handle_item_refresh();
                break;

            default:
                break;
        }

        return false;
    }

    _dispatch_tab_basic(action) {
        switch (action.type) {
            case act.Action_Handle_Save:
                this.state.source = action.data;
                break;

            default:
                break;
        }

    }

    _dispatch_tab_desc(action) {
        switch (action.type) {
            case act.Action_Handle_Save:
                this.state.editorHtml = action.data;
                break;

            default:
                break;
        }

    }

    render() {
        let _blank = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        let _className = util.isSafari() === false ? 'draw-detail-root color-dark' : '';
        let _classNameHeader = this.state.open ? 'w-limit-xx8' : '';
        if (this.state.open === false) {
            this.state.tabIndex = 1;
            return (<div></div>);
        }

        return (
            <div>
                <Drawer
                    className={_className}
                    containerClassName="w-limit-808"
                    width={808}
                    open={this.state.open} docked={false}
                >

                    <div className={_classNameHeader}>
                        <DetailHeader dispatch={this._dispatch_header} />
                    </div>

                    <div className="draw-detail-root-container w-limit-808">
                        <div className="draw-detail-tab-container">
                            <Tabs className="draw-detail-tab">
                                <Tab label="Basic Info" onActive={this._handle_tab_basic}>
                                    <ArticleTabBasic
                                        source={this.state.source}
                                        dispatch={this._dispatch_tab_basic}
                                        onSave={this.state.willSave}
                                    />
                                </Tab>

                                <Tab label="Body-Content" onActive={this._handle_tab_desc}>
                                    <RichTextEditor
                                        show={this.state.tabIndex === 2}
                                        source={this.state.editorHtml}
                                        dispatch={this._dispatch_tab_desc}
                                        onSave={this.state.willSave}
                                        onRefresh={this.state.refresh}
                                    />
                                </Tab>
                                <Tab label="Preview &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" onActive={this._handle_tab_preview}>

                                </Tab>
                            </Tabs>
                        </div>

                    </div>

                    <div>
                        <FloatingButton onTouch={this._handle_tab_save} />
                    </div>
                </Drawer>
            </div>
        )
    }
}