import React from 'react';
import { Card, } from 'material-ui/Card';
import * as act from './../../setting/action';
var Markdown = require('react-markdown');


class ItemCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            loading: true,
        };
    }

    componentDidMount() {
        this.state.loading = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;//(this.state.total != nextProps.total);
    }


    _handleAuthor(e) {
        this.props.dispatch({ type: act.Action_List_Article_Author, data: e.target.id })
    };

    _handleDetail(e) {
        this.props.dispatch({ type: act.Action_List_Article_Detail, data: e.target.src })
    };

    _handleRange(e) {
        let _float =  parseFloat(e.target.innerHTML);
        let _int = parseInt(e.target.innerHTML);
        let _range = _float%1 === 0 ? [_float, _float + 0.9] : [_int, _int + 1];
        this.props.dispatch({ type: act.Action_List_Article_Range, data: _range })
    };

    _handleTag(e) {
        this.props.dispatch({ type: act.Action_List_Article_Tag, data: e.target.innerHTML })
    };

    _markdownHtml(title) {
        let _title = `## ${title} \n`;
        let markdownSrc = [
            'Changes are automatically rendered as ...\n\n* Follows the',
            '[CommonMark](http://commonmark.org/) spec\n* Renders actual, "native" React DOM ',
            'elements',
            '\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!',
            '\n* :scissors: Modern :clipboard:'
        ].join('')

        return <Markdown source={_title + markdownSrc} />;
    }


    render() {
        let _coverSrc = this.props.value.coverSrc;
        let _userThumb = this.props.value.userThumb;

        let pills;
        if (this.props.value.tags) {
            let tags = this.props.value.tags.split(', ');
            pills = tags.map((tag, i) =>
                <li2 key={i}><p className="word" onClick={this._handleTag.bind(this)}>{tag}</p></li2>
            );
        }
        let _title = this.props.value.name;
        let _desc = this._markdownHtml(_title);

        return (

            <div className="itemC">
                <Card className="itemBox">

                    <div className="itemBox-img-box with-author">
                        <img
                            className="itemBox-img-cover" id="im-user-id"
                            src={_coverSrc}
                            onClick={this._handleDetail.bind(this)}
                        />
                        <div className="itemBox-img-author">
                            <p className="itemBox-img-author-name" onClick={this._handleRange.bind(this)}>
                                {parseFloat(this.props.value.alcohol)}
                            </p>
                        </div>
                    </div>

                    <div className="itemBox-text-box">
                        {_desc}
                    </div>

                    <div className="itemBox-tag-box">
                        <ul className="keyword cfix">
                            {pills}
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}

export default ItemCard;
