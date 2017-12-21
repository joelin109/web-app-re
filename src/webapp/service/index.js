/**
 * Created by joe on 12/21/17.
 */
import axios from 'axios'

function httpUrl(url) {

    let baseURL = typeof app_API_Http_URL === "undefined" ? "" : app_API_Http_URL
    if (url.indexOf('http:') >= 0) {
        baseURL = ""
    }

    return baseURL + url;
}

function httpBody(bodyData) {

    let _body = {
        "token": "1384595117-ddc161cb-3b93-4809-a54e-07ac49189737-178953",
        "sitecode": "colr.ios.phone",
        "channel": "",
        "locale": "zh_CN",
        "appver": 10000,
        "data": bodyData
    }
    return _body;
}


export let post = (url, data) => {

    let _apiURL = httpUrl(url);
    let _httpBody = httpBody(data);

    return axios.post(_apiURL, _httpBody)
        .then(response => response.data)

};
