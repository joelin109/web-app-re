import React from 'react'
import { Drawer } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { FloatingButton } from './../../../component/wui'
import * as act from './../../../setting/action'
import * as util from './../../../util'
import DetailHeader from './../../detail-header'
import WordTabBasic from './word-tab-basic'
import RichTextEditor from './../../editor/'
import * as convert from './../../editor/e-convert'


export default class NewWord extends React.Component {
    constructor(props) {
        super(props);

        let _html = '<p></p><img src="https://cdn.arstechnica.net/wp-content/uploads/2016/09/Colossal-1-760x380.jpg " style="float:none;height: auto;width: 100%"/>';
        this.state = {
            open: props.open,
            source: {},
            editorHtml: _html,
            editorContent: convert.toEditorContent(_html),
            willSave: false,

            tabIndex: 1,
            type: '-',
            sex: '-',
            unRegel: false,
            recommend: false,

        };

        //this.state.editorContent = _contentState;


        this._handle_save = this._handle_save.bind(this);
        this._handle_tab_basic = this._handle_tab_basic.bind(this);
        this._handle_tab_desc = this._handle_tab_desc.bind(this);
        this._dispatch_header = this._dispatch_header.bind(this);
        this._dispatch_tab_basic = this._dispatch_tab_basic.bind(this);
        this._dispatch_tab_desc = this._dispatch_tab_desc.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        this.state.open = nextProps.open;
    }


    onEditorStateChange(value) {

    }

    //Action for menu
    _dispatch_header(action) {
        this.state.willSave = false;
        this.setState({ open: false });
        return false;
    }
    _dispatch_close(action) {
        this.state.willSave = false;
        this.setState({ open: false });
        return false;
    }

    _handle_save() {
        this.setState({ willSave: true });
        return false;
    }

    _handle_tab_basic(tab) {
        this.state.tabIndex = 1;
        this.setState({ willSave: false });
    }

    _handle_tab_desc(tab) {
        this.state.tabIndex = 2;
        this.setState({ willSave: false });
    }

    _dispatch_tab_basic(action) {

    }

    _dispatch_tab_desc(action) {
        this.state.editorContent = action.data;
    }

    render() {

        let _className = util.isSafari() === false ? 'draw-detail-root color-dark' : '';
        let _classNameHeader = this.state.open ? 'w-limit-xx8' : '';
        if (this.state.open === false) {
            this.state.tabIndex = 1;
            return (<div></div>);
        }

        return (
            <div>
                <Drawer
                    openSecondary={true}
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
                                    <WordTabBasic
                                        source={this.props.source}
                                        dispatch={this._dispatch_tab_basic}
                                    />
                                </Tab>

                                <Tab label="Description" onActive={this._handle_tab_desc}>
                                    <RichTextEditor
                                        save={this.state.willSave}
                                        show={this.state.tabIndex === 2}
                                        source={this.state.editorContent}
                                        dispatch={this._dispatch_tab_desc}
                                    />
                                </Tab>
                            </Tabs>
                        </div>

                    </div>

                    <div>
                        <FloatingButton onTouch={this._handle_save} />
                    </div>
                </Drawer>
            </div>
        )
    }
}