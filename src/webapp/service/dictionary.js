import * as request from './request';
import * as api from '../constant/api';

let baseURL = app_API_Http_URL;

export let findAll = (filter, bodyData) => {

    let _bodyData = baseAPI_HTTP_BodyData
    let _apiURL = baseURL + api.APIURL_Content_Dictionary_List;
    return request.post(_apiURL, _bodyData)
        .then(data => {
            return data.result
        })
}
