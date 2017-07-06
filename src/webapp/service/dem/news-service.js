import { api_result_news } from './../../setting/data/news'
//c53e3bc3f12b4f8ba9b7505d14a4d9f3

export let findAll = (data) => {
    let _sortBy = data.filter === 'der-tagesspiegel' ? 'sortBy=latest' : 'sortBy=top';
    let _source = '&source=' + data.filter;
    let _apiKey = '&apiKey=c53e3bc3f12b4f8ba9b7505d14a4d9f3';
    let apiurl = 'https://newsapi.org/v1/articles?' + _sortBy +_apiKey + _source;

    if (data.filter === 'ars-technica') {
        return _asyncDemo(apiurl)
            .then(data => {
                return api_result_news;
            })
    }
    else {
        return fetch(apiurl)
            .then(response => response.json())
    }

}



function _asyncDemo(api) {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('asyncFn1 is done');
            resolve('asyncFn1 value');
        }, 1000);
    });
    return promise;
}