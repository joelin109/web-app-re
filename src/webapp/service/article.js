import * as api from '../constant/api';
import * as request from './request';

let postBodyData = {
    "filter": {"page_num": 1, "page_size": 18},
    "article_id": "besichtigen"
};

export let request_page_size = 24;

export let findAll = (filter) => {

    postBodyData.filter.page_num = filter.page;
    postBodyData.filter.page_size = request_page_size;

    let _bodyData = postBodyData
    return request.post(api.APIURL_Content_Article_List, _bodyData)
        .then(response => {
            //alert(JSON.stringify(response))
            //alert(JSON.stringify(typeof response.data.result))
            return response.result
        })
}

export let detail = (filter) => {

    let _bodyData = filter
    return request.post(api.APIURL_Content_Article_Detail, _bodyData)
        .then(data => {
            return data.result
        })

}

export let update = (data) => {

    let _bodyData = data;
    return request.post(api.APIURL_Content_Article_Post, _bodyData)
        .then(data => {
            return data.result
        })
}

export let updateStatus = (data) => {

    let _bodyData = data;
    return request.post(api.APIURL_Content_Article_Status_Update, _bodyData)
        .then(data => {
            return data.result
        })
}

export let crawlArticle = (filter) => {

    let _bodyData = filter;
    return request.post(api.APIURL_Content_Crawler_Article, _bodyData)
        .then(data => {
            return data
        })

}

export let crawlHttpUrl = (filter) => {

    let _bodyData = filter
    return request.post(api.APIURL_Content_Crawler_Http_URL, _bodyData)
        .then(data => {
            return data.result
        })

}





