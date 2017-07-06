import React from 'react'
import * as act from './../../setting/action'
import { Button, FloatingButton } from './../../component/wui'
import { Editor } from 'react-draft-wysiwyg';

export default class EditorContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {},
            value: '',
            editorContents: {},
            willUpdate: true,

        };

        this._setEditorContent(props.source);

        this._dispatch_editor_change = this._dispatch_editor_change.bind(this);
        this._dispatch_editor_save = this._dispatch_editor_save.bind(this);
        this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.change) {
            this._setEditorContent(nextProps.source)
        }

    }
    componentDidUpdate() {

        let _action = {
            type: 'componentDidUpdate',
            data: this.state.editorContents[0]
        };

        this.props.dispatch(_action);
    }

    _defautToolbar() {
        return {
            options: ['inline', 'blockType', 'fontFamily', 'list', 'textAlign', 'history', 'link', 'image', 'emoji', 'colorPicker'],
            inline: {
                options: ['bold', 'italic', 'strikethrough'],
            },
            fontFamily: {
                options: ['Tahoma', 'Verdana'],
            },
            list: {
                options: ['unordered', 'ordered'],
            },
            textAlign: {
                options: ['left', 'center', 'right', 'justify'],
            },
            image: { uploadCallback: this.uploadImageCallBack }
        }

    }

    _setEditorContent(source) {
        try {
            
            let editorContent = source;

            let editorContents = this.state.editorContents;
            editorContents[0] = editorContent;
            editorContents = [...editorContents];

            this.setState({
                willUpdate: true,
            });
        }
        catch (err) {

            let txt = "Error description: \n\n" + err.message + "\n\n";
            alert(txt);
        }

    }

    _dispatch_editor_change(index, editorContent) {
        let editorContents = this.state.editorContents;
        editorContents[0] = editorContent;
        editorContents = [...editorContents];

        // this.setState({
        //    editorContents,
        // });

    }

    uploadImageCallBack(file) {

    }
    _dispatch_editor_save() {
        //let _html = convert.toHtml(this.state.editorContents[0]);
        //alert(_html)

        let _action = {
            type: '',
            data: this.state.editorContents[0]
        };
        this.props.dispatch(_action);
    }


    render() {
        //alert('EditorContent render')defaultEditorState={this.state.editorContents[0]}      
        let _toolbar = this._defautToolbar();
        let _btm = <FloatingButton
            id="translate" className="colr-selected loc-btm-4"
            onTouch={this._dispatch_editor_save} />;

        return (
            <div className="draw-detail-tab-content-editor">
                <div className="draw-detail-tab-content-editor-box">
                    <Editor
                        hashtag={{}}
                        defaultEditorState={this.state.editorContents[0]}
                        onEditorStateChange={this._dispatch_editor_change.bind(this, 0)}

                        toolbarClassName="demo-toolbar"
                        wrapperClassName="demo-wrapper-wide"
                        editorClassName="demo-editor"
                        toolbar={_toolbar}
                    />
                </div>

                {this.props.show ? _btm : ''}
            </div>
        )
    }
}