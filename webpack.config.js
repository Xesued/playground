module.exports = {
    entry: "./client/entry.js",
    output: {
        path: __dirname + '/server/public',
        filename: "main.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
