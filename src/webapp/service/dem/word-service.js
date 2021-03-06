import * as api_response from '../data/word_response.json'


export let findAll = (data) => {

    let apiurl = 'https://api.github.com/search/repositories?q=created:%3E2013-03-01%20language:javascript%20stars:>=3000&sort=stars&page=2';

    return _asyncDemo(apiurl)
        .then(data => {
            return api_response.result
        })

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

