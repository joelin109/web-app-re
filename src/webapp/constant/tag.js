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
