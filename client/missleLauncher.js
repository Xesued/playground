/// <reference path="../typings/lodah/lodash.d.ts" />
/// <reference path="../typings/easeljs/easeljs.d.ts" />
/// <reference path="../typings/rx/rx.all.d.ts" />
//import _ = require('lodash');
//import createjs = require('exports?createjs!../lib/easel')
//import rx = require('rx');
//
//require('./lib/tween');
var MissleLauncher = (function () {
    function MissleLauncher(user, boardClicks, options) {
        this.options = _.defaults(options, {
            throttle: 5000
        });
        this.user = user;
        this.missleLaunches = boardClicks.throttle(this.options.throttle);
        this.missleLaunches.subscribe(this.handleMissleLaunch);
    }
    MissleLauncher.prototype.handleMissleLaunch = function (launch) {
    };
    return MissleLauncher;
})();
//# sourceMappingURL=missleLauncher.js.map