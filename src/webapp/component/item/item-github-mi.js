import React from 'react';
import { Card } from 'material-ui/Card';
import { SuperButton } from './../wui'

const Action_List_Github_Repository = 'Action_Github_Repository'
const Action_List_Github_Author = 'Action_Github_Author'

export default class ItemGithub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            loading: true,
        };
        this._handleDetail = this._handleDetail.bind(this)
    }

    componentDidMount() {
        this.state.loading = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; //(this.state.total != nextProps.total);
    }


    _handleDetail(e) {
        //alert(this.props.value.coverSrc)
        let action = {
            type: Action_List_Github_Repository,
            data: this.props.value
        }
        this.props.dispatch(action)
    };
    _handleAuthor(e) {
        let action = {
            type: Action_List_Github_Author,
            data: e.target.id
        }
        this.props.dispatch(action)
    };

    _formatNumber(num, precision, separator) {
        var parts;
        if (!isNaN(parseFloat(num)) && isFinite(num)) {
            // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
            // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
            // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
            // 的值变成了 12312312.123456713
            num = Number(num);
            num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
            parts = num.split('.');
            // 整数部分加[separator]分隔, 借用一个著名的正则表达式
            parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

            return parts.join('.');
        }
        return NaN;
    };


    render() {
        let _coverID = this.props.value.coverSrc//covers[Math.floor(Math.random() * coverCount)] //this.props.src
        let _userThumb = this.props.value.owner.avatar_url;
        let _repoDateRange = this.props.value.created_at.substring(2, 10) + " ~ " + this.props.value.pushed_at.substring(2, 10);
        let _repoStarNum = this._formatNumber(this.props.value.stargazers_count);
        let _repoForkNum = this._formatNumber(this.props.value.forks);
        let _repoDesc = this.props.value.description;
        let _repoAuthorClass = (this.props.value.owner.type === 'User' ? 'itemBox-img-author' : 'itemBox-img-author img-organization');


        return (

            <div className="itemC">
                <Card className="itemBox">

                    <div className="itemBox-img-box with-author">
                        <img className="itemBox-img-cover" id={this.props.value.html_url} src={_coverID}
                            onClick={this._handleDetail} />

                        <img className={_repoAuthorClass} id={this.props.value.owner.html_url} src={_userThumb}
                            onClick={this._handleAuthor.bind(this)} />

                        <label className="itemBox-img-below loc-right-box">{'...'}</label>
                    </div>

                    <div className="itemBox-text-box">
                        <h2 className="itemBox-text-title"><a href={this.props.value.html_url} target="_blank">{this.props.value.name}</a></h2>
                        <p className="itemBox-text-subTitle">{_repoDateRange}</p>
                        <p className="itemBox-text-text limit-line-2">{_repoDesc}</p>
                    </div>

                    <div className="itemBox-social-box">
                       <SuperButton id="thumb_up" label={_repoStarNum} />
                       <SuperButton id="share" label={_repoForkNum} />
                    </div>


                </Card>
            </div>
        );
    }
}
