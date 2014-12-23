﻿(function() {
    "use strict";
    
    var pathRx = new RegExp(/\/[^\/]+$/);
    var locationPath = location.href.replace(pathRx, "");

    define("angular", function() {
        if (angular) {
            return angular;
        }
        return {};
    });
    require({
        async: true,
        alias: [['text', 'dojo/text']],
        packages: [
            {
                name: 'controller',
                location: locationPath + '/js/controller'
            }, {
                name: 'service',
                location: locationPath + '/js/service'
            }, {
                name: 'template',
                location: locationPath + '/js/template'
            },{
                name: 'js',
                location: locationPath + '/js'
            }
        ]
    });

    var app = angular.module('app', ['ui.bootstrap', 'ngAnimate', 'app.templates']);
    require([
        'dojo/ready',
        'js/bootstrap'
    ], function(ready, bootstrap) {
        ready(function() {
            console.log("start the bootstrapper");
            bootstrap.start(app);
        });
    });
}).call(this);