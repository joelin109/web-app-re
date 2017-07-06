var path = require("path");
var webpack = require("webpack");

const vendor_dll = [
    'react',
    'react-dom',
    'react-router-dom',
    'material-ui',
    'react-tap-event-plugin'
];
const vendor_admin_dll = [
    'react',
    'react-dom',
    'react-router-dom',
    'material-ui',
    'react-tap-event-plugin',
    'react-draft-wysiwyg'
];


module.exports = {
    entry: {
        vendor: vendor_dll,
        vendor_admin: vendor_admin_dll
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: "[name].dll.js",
        library: "[name]_dll"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "www/dll", "manifest-[name]-dll.json"),
            name: "[name]_dll",
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};