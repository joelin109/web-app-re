import React from 'react';
import * as _tag from './tag';
import ItemCard from './item-card-mi';
import ArticleItem from './articleItem';
import GithubItem from './githubItem';
import AdminArticleItem from './../../admin/article/article-list-item';
import * as act from './../../constant/action-type';

const Item = ({ tag, value, dispatch }) => {

    let _clickDetail = () => dispatch({type: act.Action_List_Item_Detail, payload: value});
    let _clickAuthor = () => dispatch({type: act.Action_List_Item_Author, payload: value.owner.html_url});
    let _clickTag = (e) => dispatch({type: act.Action_List_Item_Tag, payload: e.target.innerHTML});


    switch (tag) {
        case _tag.List_Item_Article:
            return <ArticleItem
                article={value} onClickDetail={_clickDetail} onClickTag={_clickTag}/>
            break;

        case _tag.List_Item_Github:
            return <GithubItem
                key={value.id} value={value} onClickDetail={_clickDetail} onClickAuthor={_clickAuthor}/>;
            break;

        case _tag.List_Item_Card:
            return <ItemCard
                key={value.id} value={value} onClickDetail={_clickDetail} onClickTag={_clickTag}
                dispatch={dispatch}/>
            break;

        case _tag.List_Item_Admin_Article:
            return <AdminArticleItem
                value={value} dispatch={dispatch}/>
            break;

        default:
            return <div></div>
            break;
    }

}

export default Item;