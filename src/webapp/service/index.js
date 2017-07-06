import * as request from './request';
import * as api from './request/api';

let baseURL = app_API_Http_URL;

export let findAll = (filter, bodyData) => {

    let _bodyData = baseAPI_HTTP_BodyData
    let _apiURL = baseURL + api.APIURL_Content_Dictionary_List;
    return request.post(_apiURL, _bodyData)
        .then(data => {
            return data.result
        })
}


exports.getTagTitle = (tagID) => {

    let _tag = {
        "t10001": "ars-technica",
        "t10002": "buzzfeed",
        "t10003": "cnn",
        "t10004": "der-tagesspiegel",
        "t10005": "google-news",
        "t10006": "bbc-news",
        "t10007": "entertainment-weekly",
        "t10008": "the-new-york-times",
        "t10009": "wired-de",
        "t10010": "the-washington-post",
        "t10011": "bloomberg",
        "t10012": "the-next-web",
        "t10013": "mashable"
    }

    return _tag[tagID];
}
