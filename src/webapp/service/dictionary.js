import * as api from '../constant/api';
import * as request from './request';


export let findAll = (filter, bodyData) => {

    let _bodyData = baseAPI_HTTP_BodyData
    return request.post(api.APIURL_Content_Dictionary_List, _bodyData)
        .then(data => {
            return data.result
        })
}
