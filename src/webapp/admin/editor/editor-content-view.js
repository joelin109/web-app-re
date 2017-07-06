import React from 'react'
import * as act from './../../setting/action'
import { Button } from './../../component/wui'


export default class EditorContentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: {},

        };

    }

    componentWillReceiveProps(nextProps) {
    }


    render() {
        /* <textarea
                         className="demo-content no-focus"
                         value={this.props.source}
                     />*/
                     
        let _html = { __html: this.props.source.replace(/target=\"_self\"/gi, 'target=\"_blank\"') };
        return (
            <div className="draw-detail-tab-content-preview">
                <div className="draw-detail-tab-content-preview-box"
                    dangerouslySetInnerHTML={_html}>
                </div>
            </div>
        )
    }
}