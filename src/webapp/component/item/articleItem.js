import React from 'react';
import PropTypes from 'prop-types'
import {Card,} from 'material-ui/Card';


const ArticleItem = ({article, onClickTag, onClickDetail}) => {
    let _coverSrc = article.urlToImage;
    if (_coverSrc === null || _coverSrc === '') {
        return (<div></div>)
    }

    let _author = article.author === null ? '---' : article.author;
    let _title = article.title;
    let _pb = article.publishedAt;
    let _publish = _pb === null ? '' : _pb.replace("T", " . ").replace("Z", "");
    let pills = <li2 ><p className="word" onClick={onClickTag}>{article.tag}</p></li2>;

    return (

        <div className="itemC">
            <Card className="itemBox">

                <div className="itemBox-img-box">
                    <img
                        className="itemBox-img-cover" id="im-user-id"
                        src={_coverSrc}
                        onClick={onClickDetail}
                    />
                    <div className="itemBox-img-below loc-right-box">
                        <p className="itemBox-text-subTitle">{_publish}</p>
                    </div>
                </div>

                <div className="itemBox-text-box">
                    <h3 className="itemBox-text-title limit-line-3">
                        <a href={article.url} target="_blank">{_title}</a>
                    </h3>
                    <p className="itemBox-text-subTitle">{_author}</p>
                    <p className="itemBox-text-text">{article.description}</p>
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

ArticleItem.propTypes = {
    article: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        publishedAt: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired
    }).isRequired,
    onClickDetail: PropTypes.func.isRequired
}


export default ArticleItem