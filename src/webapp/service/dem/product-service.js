let baseURL = app_API_Http_URL;

export let findAll = (values) => {
    let qs = "";
    if (values) {
        qs = Object.keys(values).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]);
        }).join('&');
        qs = "?" + qs;
    }
    let apiurl = baseURL + "/products" + qs;
    /*return request({url: apiurl})
     .then(data => data = JSON.parse(data))*/

    return fetch(apiurl)
        .then(response => response.json())

}

export let findById = () => {
    return request({url: baseURL + "/products/" + id})
        .then(data => data = JSON.parse(data))
}