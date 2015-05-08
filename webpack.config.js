/// <reference path="typings/node/node.d.ts"/>

module.exports = {
    entry: "./client/entry.js",
    output: {
        path: __dirname + '/server/public',
        filename: "main.js"
    },

    resolve: {
      extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            { test: /\.ts$/, loader: 'awesome-typescript-loader'},
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
