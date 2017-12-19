import React from 'react';
import { Card } from 'material-ui/Card';
import { SuperButton } from './../wui'

const _formatNumber = (num, precision, separator) => {
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


const GithubItem = ({value, onClickAuthor, onClickDetail}) => {

    let _coverID = value.coverSrc
    let _userThumb = value.owner.avatar_url;
    let _repoDateRange = value.created_at.substring(2, 10) + " ~ " + value.pushed_at.substring(2, 10);
    let _repoStarNum = _formatNumber(value.stargazers_count);
    let _repoForkNum = _formatNumber(value.forks);
    let _repoDesc = value.description;
    let _repoAuthorClass = (value.owner.type === 'User' ? 'itemBox-img-author' : 'itemBox-img-author img-organization');


    return (

        <div className="itemC">
            <Card className="itemBox">

                <div className="itemBox-img-box with-author">
                    <img className="itemBox-img-cover" id={value.html_url} src={_coverID}
                         onClick={onClickDetail}/>

                    <img className={_repoAuthorClass} id={value.owner.html_url} src={_userThumb}
                         onClick={onClickAuthor}/>

                    <label className="itemBox-img-below loc-right-box">{'...'}</label>
                </div>

                <div className="itemBox-text-box">
                    <h2 className="itemBox-text-title"><a href={value.html_url} target="_blank">{value.name}</a></h2>
                    <p className="itemBox-text-subTitle">{_repoDateRange}</p>
                    <p className="itemBox-text-text limit-line-2">{_repoDesc}</p>
                </div>

                <div className="itemBox-social-box">
                    <SuperButton id="thumb_up" label={_repoStarNum}/>
                    <SuperButton id="share" label={_repoForkNum}/>
                </div>


            </Card>
        </div>
    );
}


export default GithubItem