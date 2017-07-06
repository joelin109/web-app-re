import { itemCovers } from './../../setting/data'
const covers = itemCovers;

const api_github_js = 'https://api.github.com/search/repositories?q=created:%3E2013-03-01%20language:javascript%20stars:%3E=3000&sort=stars';
const api_github_ts = 'https://api.github.com/search/repositories?q=created:%3E2013-03-13%20language:typescript%20stars:%3E=3000&sort=stars';
const api_github_go = 'https://api.github.com/search/repositories?q=created:%3E2013-03-01%20language:golang%20stars:%3E=3000&sort=stars';
const api_github_py = 'https://api.github.com/search/repositories?q=created:%3E2013-03-01%20language:python%20stars:%3E=3000&sort=stars';

export let findAll = (data) => {


    let _apiBase = 'https://api.github.com/search/repositories?q=created:%3E';
    let apiurl = 'https://api.github.com/search/repositories?q=created:%3E2013-03-01%20language:javascript%20stars:>=3000&sort=stars&page=2';
    /*return request({url: apiurl})
     .then(data => data = JSON.parse(data))*/

    let _page = data.page;
    let _language = data.filter.language.toLowerCase();
    let _createdAt = _toString(data.filter.created_at);
    let _star = data.filter.star;
    let _isCache = false // data.filter.is_cache;

    if (typeof(_isCache) !== "undefined" && _isCache === false) {

        apiurl = _apiBase + _createdAt + '%20language:' + _language + '%20stars:>=' + _star + '&sort=stars&page=' + _page;
        return fetch(apiurl)
            .then(response => {
                return response.json();
            })
    } else {

        let api_result = {
            "total_count": 0,
            "incomplete_results": false,
            "items": []
        }

        return _asyncDemo(apiurl)
            .then(data => {
                return api_result;
                //return _adjustResult(api_result);
            })
    }

}

function _adjustResult(result) {

    let _result = result;
    Array.from(_result.items, (item) => {
        item["coverSrc"] = covers[Math.floor(Math.random() * covers.length)];
        return item
    })

    return _result;
}

function _asyncDemo(api) {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('asyncFn1 is done');
            resolve('asyncFn1 value');
        }, 1000);
    });
    return promise;
}

function _toString(date) {
    let _createdAt = "2013-03-13";

    if (typeof(date) !== "undefined" && date !== null) {
        let _year = date.getFullYear();
        let _month = date.getMonth() + 1;
        let _day = date.getDate();
        _createdAt = _year + "-" + (_month >= 10 ? _month : '0' + _month) + "-" + (_day >= 10 ? _day : '0' + _day);
    }

    return _createdAt
}